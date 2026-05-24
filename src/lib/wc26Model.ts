/**
 * WC26 trained logistic model — form, squad, injuries, ELO, FIFA rank.
 * Weights: scripts/train-wc26-model.mjs → src/data/modelWeights.json
 * Predictions are deterministic (no random sampling).
 */

import modelWeights from "@/data/modelWeights.json";
import { teamFromName, type Team } from "@/data/teams";
import { analyticsForSlug, type TeamAnalytics } from "@/data/teamAnalytics";
import { injuryPenalty } from "@/data/injuries";

export type ModelFeatureBreakdown = {
  name: string;
  homeAdvantage: number;
};

export type MatchModelOutput = {
  homeWin: number;
  draw: number;
  awayWin: number;
  homeStrength: number;
  awayStrength: number;
  features: ModelFeatureBreakdown[];
};

const W = modelWeights.weights;
const B = modelWeights.bias;
const FEATURE_NAMES = modelWeights.featureNames as string[];
const DRAW_BASE = modelWeights.drawBase ?? 0.26;

function teamFeatures(team: Team, analytics: TeamAnalytics) {
  return {
    eloNorm: team.elo / 400,
    fifaNorm: team.fifaRank ? (41 - team.fifaRank) / 40 : 0,
    form: analytics.formPoints / 15,
    squad: analytics.squadRating / 100,
    gf: analytics.goalsForPerGame,
    ga: analytics.goalsAgainstPerGame,
    cleanSheet: analytics.cleanSheetRate,
    wcExp: analytics.wcKnockoutExp,
    homeBoost: analytics.homeBoost,
    injury: injuryPenalty(team.name),
  };
}

function featureVector(home: Team, away: Team): number[] {
  const ha = analyticsForSlug(home.slug);
  const aa = analyticsForSlug(away.slug);
  const hf = teamFeatures(home, ha);
  const af = teamFeatures(away, aa);
  return [
    hf.eloNorm - af.eloNorm,
    hf.fifaNorm - af.fifaNorm,
    hf.form - af.form,
    hf.squad - af.squad,
    hf.gf - af.gf,
    af.ga - hf.ga,
    hf.cleanSheet - af.cleanSheet,
    hf.wcExp - af.wcExp,
    hf.homeBoost - af.homeBoost,
    af.injury - hf.injury,
  ];
}

function dot(x: number[]): number {
  let z = B;
  for (let i = 0; i < W.length; i++) z += W[i] * x[i];
  return z;
}

/** Fixed logit shift for upset level — deterministic, never random. */
export function upsetLogitShift(upsetNoise = 0): number {
  return upsetNoise;
}

export function predictMatchByName(
  homeName: string,
  awayName: string,
  upsetNoise = 0,
): MatchModelOutput | null {
  const home = teamFromName(homeName);
  const away = teamFromName(awayName);
  if (!home || !away) return null;
  return predictMatch(home, away, upsetNoise);
}

export function predictMatch(
  home: Team,
  away: Team,
  upsetNoise = 0,
): MatchModelOutput {
  const x = featureVector(home, away);
  const z = dot(x) + upsetLogitShift(upsetNoise);
  const homeWinRaw = 1 / (1 + Math.exp(-z));
  const diff = Math.abs(home.elo - away.elo);
  const drawAdj = Math.max(0.1, DRAW_BASE - diff / 2000);
  const remaining = 1 - drawAdj;
  let homeWin = remaining * homeWinRaw;
  let awayWin = remaining * (1 - homeWinRaw);
  let draw = drawAdj;

  const total = homeWin + draw + awayWin;
  homeWin /= total;
  draw /= total;
  awayWin /= total;

  const features: ModelFeatureBreakdown[] = FEATURE_NAMES.map((name, i) => ({
    name,
    homeAdvantage: x[i],
  }));

  const ha = analyticsForSlug(home.slug);
  const aa = analyticsForSlug(away.slug);

  return {
    homeWin,
    draw,
    awayWin,
    homeStrength: compositeStrength(home, ha),
    awayStrength: compositeStrength(away, aa),
    features,
  };
}

export function compositeStrength(team: Team, analytics: TeamAnalytics): number {
  return (
    team.elo * 0.35 +
    analytics.squadRating * 8 +
    analytics.formPoints * 12 +
    analytics.goalsForPerGame * 40 -
    analytics.goalsAgainstPerGame * 25 +
    analytics.wcKnockoutExp * 80 +
    analytics.homeBoost * 200 -
    injuryPenalty(team.name) * 400
  );
}

export function koWinProbability(
  homeName: string,
  awayName: string,
  upsetNoise = 0,
): number {
  const pred = predictMatchByName(homeName, awayName, upsetNoise);
  if (!pred) return 0.5;
  const noDraw = pred.homeWin + pred.awayWin;
  return pred.homeWin / (noDraw || 1);
}

/** Expected group-stage points from model (deterministic). */
export function expectedGroupPoints(teamName: string, groupNames: string[]): number {
  let pts = 0;
  for (const opp of groupNames) {
    if (opp === teamName) continue;
    const pred = predictMatchByName(teamName, opp, 0);
    if (!pred) continue;
    pts += pred.homeWin * 3 + pred.draw;
  }
  return pts;
}

/** Rank a 4-team group by expected points + tiebreakers — no randomness. */
export function predictGroupOrderDeterministic(teamNames: string[]): string[] {
  return [...teamNames].sort((a, b) => {
    const ptsA = expectedGroupPoints(a, teamNames);
    const ptsB = expectedGroupPoints(b, teamNames);
    if (ptsB !== ptsA) return ptsB - ptsA;
    const ta = teamFromName(a);
    const tb = teamFromName(b);
    if (!ta || !tb) return 0;
    return (
      compositeStrength(tb, analyticsForSlug(tb.slug)) -
      compositeStrength(ta, analyticsForSlug(ta.slug))
    );
  });
}

export type GroupStanding = {
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  points: number;
};

/** Legacy Monte Carlo group sim — kept for tests; AI uses predictGroupOrderDeterministic. */
export function simulateGroup(teamNames: string[], upsetNoise = 0): string[] {
  void upsetNoise;
  return predictGroupOrderDeterministic(teamNames);
}

export function modelInsightsForTeam(name: string): {
  form: string;
  squadRating: number;
  injuryImpact: number;
  strength: number;
} | null {
  const team = teamFromName(name);
  if (!team) return null;
  const a = analyticsForSlug(team.slug);
  return {
    form: a.formString,
    squadRating: a.squadRating,
    injuryImpact: injuryPenalty(name),
    strength: compositeStrength(team, a),
  };
}

export { modelWeights };
