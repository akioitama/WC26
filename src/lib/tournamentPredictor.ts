import type { GroupLetter } from "./types";

import { GROUP_LETTERS } from "./types";

import { teamFromName, type Team } from "@/data/teams";

import { getGroupTeamNames } from "./thirdPlaceSelection";

import { initGroupRankings, buildSnapshotFromRankings } from "./groupRankings";

import {
  KNOCKOUT_MATCHES,
  canPickWinner,
  resolveMatchSides,
  type QualifierSnapshot,
} from "./knockoutBracket";

import {
  predictGroupOrderDeterministic,
  koWinProbability as modelKoWinProb,
  compositeStrength,
  predictMatchByName,
  modelInsightsForTeam,
  modelWeights,
} from "./wc26Model";

import { analyticsForSlug as getAnalytics } from "@/data/teamAnalytics";

export type UpsetLevel = "low" | "medium" | "high";

export type SimMode = "manual" | "ai";

/** Deterministic logit nudge — favors favorites at low, allows closer calls at high. */
const UPSET_LOGIT: Record<UpsetLevel, number> = {
  low: 0.12,
  medium: 0.04,
  high: -0.06,
};

export function teamStrength(team: Team): number {
  return compositeStrength(team, getAnalytics(team.slug));
}

export function strengthForName(name: string): number {
  const t = teamFromName(name);
  return t ? teamStrength(t) : 1500;
}

export function predictGroupOrder(group: GroupLetter): string[] {
  return predictGroupOrderDeterministic(getGroupTeamNames(group));
}

export function predictAllGroups(): Record<GroupLetter, string[]> {
  const out = initGroupRankings();
  for (const g of GROUP_LETTERS) {
    out[g] = predictGroupOrder(g);
  }
  return out;
}

export function koWinProbability(
  homeName: string,
  awayName: string,
  upset: UpsetLevel,
): number {
  return modelKoWinProb(homeName, awayName, UPSET_LOGIT[upset]);
}

/** Always pick the side with higher win probability — same inputs → same winner. */
export function pickKoWinner(
  homeName: string,
  awayName: string,
  upset: UpsetLevel,
): "home" | "away" {
  const p = koWinProbability(homeName, awayName, upset);
  return p >= 0.5 ? "home" : "away";
}

export type MatchPrediction = {
  matchId: number;
  home: string;
  away: string;
  homeWinPct: number;
  modelNote?: string;
};

export type TournamentPrediction = {
  groupRankings: Record<GroupLetter, string[]>;
  koWinners: Record<number, "home" | "away">;
  matchPredictions: MatchPrediction[];
  champion: string | null;
  goldenBoot: { player: string; team: string; goals: number };
  topTeams: { name: string; reachRound: string; probability: number }[];
  modelVersion: number;
  trainedAt?: string;
  trainedBy?: string;
};

function predictGoldenBoot(
  rankings: Record<GroupLetter, string[]>,
): TournamentPrediction["goldenBoot"] {
  const candidates: { player: string; team: string; score: number }[] = [];
  for (const g of GROUP_LETTERS) {
    const leader = rankings[g][0];
    const team = teamFromName(leader);
    if (!team) continue;
    for (const p of team.keyPlayers.filter((k) => k.role === "FW")) {
      const insights = modelInsightsForTeam(team.name);
      candidates.push({
        player: p.name,
        team: team.name,
        score: (insights?.strength ?? 1500) / 100 + (p.caps ?? 0) * 0.02,
      });
    }
  }
  candidates.sort((a, b) => b.score - a.score);
  const top = candidates[0] ?? { player: "Unknown", team: "—", score: 0 };
  return {
    player: top.player,
    team: top.team,
    goals: Math.round(5 + top.score * 0.35),
  };
}

function modelNoteForMatch(home: string, away: string): string {
  const pred = predictMatchByName(home, away, 0);
  if (!pred) return "";
  const top = [...pred.features]
    .sort((a, b) => Math.abs(b.homeAdvantage) - Math.abs(a.homeAdvantage))
    .slice(0, 2);
  return top
    .map((f) => {
      const label = f.name.replace(/Diff$/, "").replace(/([A-Z])/g, " $1").trim();
      return f.homeAdvantage > 0 ? `${label} → ${home}` : `${label} → ${away}`;
    })
    .join(" · ");
}

/** Full AI tournament — deterministic groups + knockout. Re-runs produce identical results. */
export function simulateFullTournament(
  upset: UpsetLevel,
): TournamentPrediction {
  const groupRankings = predictAllGroups();
  const snap = buildSnapshotFromRankings(groupRankings)!;
  const koWinners: Record<number, "home" | "away"> = {};
  const matchPredictions: MatchPrediction[] = [];

  for (const m of KNOCKOUT_MATCHES) {
    if (!canPickWinner(m.id, snap, koWinners)) continue;
    const { home, away } = resolveMatchSides(m.id, snap, koWinners);
    if (!home || !away) continue;
    const homeWinPct = koWinProbability(home, away, upset);
    matchPredictions.push({
      matchId: m.id,
      home,
      away,
      homeWinPct,
      modelNote: modelNoteForMatch(home, away),
    });
    koWinners[m.id] = pickKoWinner(home, away, upset);
  }

  const finalSides = resolveMatchSides(104, snap, koWinners);
  const champion =
    koWinners[104] === "home"
      ? finalSides.home
      : koWinners[104] === "away"
        ? finalSides.away
        : null;

  const topTeams = GROUP_LETTERS.flatMap((g) => groupRankings[g].slice(0, 2))
    .map((name) => {
      const ins = modelInsightsForTeam(name);
      return {
        name,
        reachRound: champion === name ? "Champion" : "Knockout",
        probability: Math.round((ins?.strength ?? 1500) / 22),
      };
    })
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 8);

  return {
    groupRankings,
    koWinners,
    matchPredictions,
    champion,
    goldenBoot: predictGoldenBoot(groupRankings),
    topTeams,
    modelVersion: modelWeights.version ?? 1,
    trainedAt: modelWeights.trainedAt,
    trainedBy: modelWeights.trainedBy,
  };
}

export function getMatchWinPct(
  snap: QualifierSnapshot,
  koWinners: Record<number, "home" | "away">,
  matchId: number,
  upset: UpsetLevel,
): number | null {
  const { home, away } = resolveMatchSides(matchId, snap, koWinners);
  if (!home || !away) return null;
  return Math.round(koWinProbability(home, away, upset) * 100);
}

export { modelInsightsForTeam, predictMatchByName };
