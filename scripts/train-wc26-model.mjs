/**
 * Train WC26 match-outcome logistic regression from team features.
 * Output: src/data/modelWeights.json
 * Run: npm run train:model
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const teamsTs = fs.readFileSync(path.join(root, "src/data/teams.ts"), "utf8");
const analyticsTs = fs.readFileSync(path.join(root, "src/data/teamAnalytics.ts"), "utf8");
const injuriesTs = fs.readFileSync(path.join(root, "src/data/injuries.ts"), "utf8");
const groupsJson = JSON.parse(
  fs.readFileSync(path.join(root, "src/data/groups.json"), "utf8"),
);

function eloToFifaRank(elo) {
  return Math.max(1, Math.min(50, Math.round(51 - (elo - 1450) / 12)));
}

/** Parse all teams — detailed objects + basicTeam() entries (48 WC26 nations). */
function parseTeams() {
  const bySlug = new Map();

  const basicRe =
    /basicTeam\(\s*"([^"]+)",\s*"([^"]+)",\s*"[^"]+",\s*"[^"]+",\s*"[^"]+",\s*"[^"]+",\s*"[^"]+",\s*"[^"]+",\s*(\d+)/g;
  for (const m of teamsTs.matchAll(basicRe)) {
    const elo = Number(m[3]);
    bySlug.set(m[1], {
      slug: m[1],
      name: m[2],
      elo,
      fifaRank: eloToFifaRank(elo),
    });
  }

  for (const block of teamsTs.split(/\n  \{/)) {
    const slugM = block.match(/slug:\s*"([^"]+)"/);
    const nameM = block.match(/name:\s*"([^"]+)"/);
    const eloM = block.match(/elo:\s*(\d+)/);
    if (!slugM || !nameM || !eloM) continue;
    const elo = Number(eloM[1]);
    const rankM = block.match(/fifaRank:\s*(\d+)/);
    bySlug.set(slugM[1], {
      slug: slugM[1],
      name: nameM[1],
      elo,
      fifaRank: rankM ? Number(rankM[1]) : eloToFifaRank(elo),
    });
  }

  return [...bySlug.values()];
}

function parseAnalytics() {
  const map = {};
  const re =
    /"([^"]+)":\s*\{\s*formPoints:\s*(\d+)[^}]*goalsForPerGame:\s*([\d.]+)[^}]*goalsAgainstPerGame:\s*([\d.]+)[^}]*squadRating:\s*(\d+)[^}]*cleanSheetRate:\s*([\d.]+)[^}]*wcKnockoutExp:\s*([\d.]+)[^}]*homeBoost:\s*([\d.]+)/g;
  for (const m of analyticsTs.matchAll(re)) {
    map[m[1]] = {
      formPoints: Number(m[2]),
      goalsForPerGame: Number(m[3]),
      goalsAgainstPerGame: Number(m[4]),
      squadRating: Number(m[5]),
      cleanSheetRate: Number(m[6]),
      wcKnockoutExp: Number(m[7]),
      homeBoost: Number(m[8]),
    };
  }
  return map;
}

function parseInjuries() {
  const map = {};
  const re = /team:\s*"([^"]+)"[^}]*status:\s*"([^"]+)"[^}]*impact:\s*([\d.]+)/g;
  for (const m of injuriesTs.matchAll(re)) {
    const team = m[1];
    const status = m[2];
    const impact = Number(m[3]);
    map[team] ??= 0;
    if (status === "out") map[team] += impact;
    else if (status === "doubtful") map[team] += impact * 0.45;
  }
  return map;
}

const DEFAULT = {
  formPoints: 8,
  goalsForPerGame: 1.2,
  goalsAgainstPerGame: 1.0,
  squadRating: 68,
  cleanSheetRate: 0.25,
  wcKnockoutExp: 0.2,
  homeBoost: 0,
};

function features(home, away, analytics, injuries) {
  const ha = analytics[home.slug] ?? DEFAULT;
  const aa = analytics[away.slug] ?? DEFAULT;
  const hi = injuries[home.name] ?? 0;
  const ai = injuries[away.name] ?? 0;
  return [
    (home.elo - away.elo) / 400,
    ((away.fifaRank ?? 40) - (home.fifaRank ?? 40)) / 40,
    (ha.formPoints - aa.formPoints) / 15,
    (ha.squadRating - aa.squadRating) / 100,
    ha.goalsForPerGame - aa.goalsForPerGame,
    aa.goalsAgainstPerGame - ha.goalsAgainstPerGame,
    ha.cleanSheetRate - aa.cleanSheetRate,
    ha.wcKnockoutExp - aa.wcKnockoutExp,
    ha.homeBoost - aa.homeBoost,
    ai - hi,
  ];
}

const FEATURE_NAMES = [
  "eloDiff",
  "fifaRankDiff",
  "formDiff",
  "squadRatingDiff",
  "goalsForDiff",
  "defenseDiff",
  "cleanSheetDiff",
  "wcExpDiff",
  "homeBoostDiff",
  "injuryDiff",
];

function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

function train(samples, lr = 0.06, epochs = 12000) {
  const dim = samples[0].x.length;
  const w = new Array(dim).fill(0);
  let bias = 0;
  for (let e = 0; e < epochs; e++) {
    for (const { x, y } of samples) {
      let z = bias;
      for (let i = 0; i < dim; i++) z += w[i] * x[i];
      const p = sigmoid(z);
      const err = p - y;
      bias -= lr * err;
      for (let i = 0; i < dim; i++) w[i] -= lr * err * x[i];
    }
  }
  return { weights: w, bias };
}

const teams = parseTeams();
const analytics = parseAnalytics();
const injuries = parseInjuries();
const drawTeamCount = Object.values(groupsJson.groups).flatMap((g) => g.teams).length;
const samples = [];

for (let i = 0; i < teams.length; i++) {
  for (let j = i + 1; j < teams.length; j++) {
    const a = teams[i];
    const b = teams[j];
    const x = features(a, b, analytics, injuries);
    const eloP = 1 / (1 + 10 ** ((b.elo - a.elo) / 400));
    const formA = (analytics[a.slug] ?? DEFAULT).formPoints;
    const formB = (analytics[b.slug] ?? DEFAULT).formPoints;
    const squadA = (analytics[a.slug] ?? DEFAULT).squadRating;
    const squadB = (analytics[b.slug] ?? DEFAULT).squadRating;
    const injA = injuries[a.name] ?? 0;
    const injB = injuries[b.name] ?? 0;
    const formAdj = ((formA - formB) / 15) * 0.1;
    const squadAdj = ((squadA - squadB) / 100) * 0.12;
    const injAdj = (injB - injA) * 0.18;
    const label = Math.max(0.03, Math.min(0.97, eloP + formAdj + squadAdj + injAdj));
    samples.push({ x, y: label });
    samples.push({ x: x.map((v) => -v), y: 1 - label });
  }
}

const { weights, bias } = train(samples);

const out = {
  version: 2,
  trainedAt: new Date().toISOString(),
  trainedBy: "scripts/train-wc26-model.mjs",
  featureNames: FEATURE_NAMES,
  weights,
  bias,
  drawBase: 0.26,
  metrics: {
    samples: samples.length,
    teams: teams.length,
    drawTeams: drawTeamCount,
    analyticsProfiles: Object.keys(analytics).length,
  },
};

const outPath = path.join(root, "src/data/modelWeights.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log("Wrote", outPath);
console.log(`Teams: ${teams.length} (draw has ${drawTeamCount})`);
console.log("Weights:", weights.map((w, i) => `${FEATURE_NAMES[i]}=${w.toFixed(4)}`).join(", "));
console.log("Bias:", bias.toFixed(4));
