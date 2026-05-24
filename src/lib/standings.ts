import type { GroupLetter, TeamStanding } from "./types";
import { GROUP_LETTERS } from "./types";

/** Six group matches: team index pairings (home, away) order preserved for GF/GA */
export const GROUP_MATCH_PAIRS: [number, number][] = [
  [0, 1],
  [2, 3],
  [0, 2],
  [1, 3],
  [0, 3],
  [1, 2],
];

export function matchKey(group: GroupLetter, matchIndex: number): string {
  return `${group}:${matchIndex}`;
}

export function parseMatchKey(key: string): { group: GroupLetter; matchIndex: number } {
  const [g, m] = key.split(":");
  return { group: g as GroupLetter, matchIndex: Number(m) };
}

function miniLeagueStats(
  teamIndices: number[],
  pairs: [number, number][],
  scores: Record<string, [number, number] | null>,
  group: GroupLetter,
): Map<number, { mp: number; gd: number; gf: number }> {
  const set = new Set(teamIndices);
  const map = new Map<number, { mp: number; gd: number; gf: number }>();
  for (const t of teamIndices) {
    map.set(t, { mp: 0, gd: 0, gf: 0 });
  }
  pairs.forEach((pair, idx) => {
    const [a, b] = pair;
    if (!set.has(a) || !set.has(b)) return;
    const sc = scores[matchKey(group, idx)];
    if (!sc) return;
    const [ga, gb] = sc;
    const sa = map.get(a)!;
    const sb = map.get(b)!;
    sa.gf += ga;
    sa.gd += ga - gb;
    sb.gf += gb;
    sb.gd += gb - ga;
    if (ga > gb) {
      sa.mp += 3;
    } else if (gb > ga) {
      sb.mp += 3;
    } else {
      sa.mp += 1;
      sb.mp += 1;
    }
  });
  return map;
}

function buildRows(
  group: GroupLetter,
  teamNames: string[],
  scores: Record<string, [number, number] | null> | undefined,
): TeamStanding[] {
  const safeScores = scores ?? {};
  const rows: TeamStanding[] = teamNames.map((name, index) => ({
    group,
    index,
    name,
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
  }));

  GROUP_MATCH_PAIRS.forEach((pair, idx) => {
    const [hi, ai] = pair;
    const sc = safeScores[matchKey(group, idx)];
    if (!sc) return;
    const [gHome, gAway] = sc;
    const home = rows[hi];
    const away = rows[ai];
    home.played += 1;
    away.played += 1;
    home.goalsFor += gHome;
    home.goalsAgainst += gAway;
    away.goalsFor += gAway;
    away.goalsAgainst += gHome;
    if (gHome > gAway) {
      home.wins += 1;
      home.points += 3;
      away.losses += 1;
    } else if (gAway > gHome) {
      away.wins += 1;
      away.points += 3;
      home.losses += 1;
    } else {
      home.draws += 1;
      away.draws += 1;
      home.points += 1;
      away.points += 1;
    }
  });

  return rows;
}

function compareTeams(
  a: TeamStanding,
  b: TeamStanding,
  h2h: Map<number, { mp: number; gd: number; gf: number }>,
): number {
  if (b.points !== a.points) return b.points - a.points;
  const gdA = a.goalsFor - a.goalsAgainst;
  const gdB = b.goalsFor - b.goalsAgainst;
  if (gdB !== gdA) return gdB - gdA;
  if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
  const ha = h2h.get(a.index);
  const hb = h2h.get(b.index);
  if (ha && hb) {
    if (hb.mp !== ha.mp) return hb.mp - ha.mp;
    if (hb.gd !== ha.gd) return hb.gd - ha.gd;
    if (hb.gf !== ha.gf) return hb.gf - ha.gf;
  }
  return a.index - b.index;
}

export function sortGroupStandings(
  group: GroupLetter,
  teamNames: string[],
  scores: Record<string, [number, number] | null>,
): TeamStanding[] {
  const rows = buildRows(group, teamNames, scores);
  const allPlayed = rows.every((r) => r.played === GROUP_MATCH_PAIRS.length);
  if (!allPlayed) {
    return [...rows].sort((a, b) => {
      const gdA = a.goalsFor - a.goalsAgainst;
      const gdB = b.goalsFor - b.goalsAgainst;
      if (b.points !== a.points) return b.points - a.points;
      if (gdB !== gdA) return gdB - gdA;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.index - b.index;
    });
  }

  const h2hFull = miniLeagueStats(
    [0, 1, 2, 3],
    GROUP_MATCH_PAIRS,
    scores,
    group,
  );

  const sorted = [...rows].sort((a, b) => compareTeams(a, b, h2hFull));

  let i = 0;
  while (i < sorted.length) {
    let j = i + 1;
    while (
      j < sorted.length &&
      sorted[j].points === sorted[i].points &&
      sorted[j].goalsFor - sorted[j].goalsAgainst ===
        sorted[i].goalsFor - sorted[i].goalsAgainst &&
      sorted[j].goalsFor === sorted[i].goalsFor
    ) {
      j += 1;
    }
    if (j - i >= 2) {
      const slice = sorted.slice(i, j);
      const idxs = slice.map((s) => s.index);
      const mini = miniLeagueStats(idxs, GROUP_MATCH_PAIRS, scores, group);
      slice.sort((a, b) => compareTeams(a, b, mini));
      for (let k = 0; k < slice.length; k++) sorted[i + k] = slice[k]!;
    }
    i = j;
  }

  return sorted;
}

export function groupThird(ordered: TeamStanding[]): TeamStanding | undefined {
  return ordered[2];
}

export function createEmptyScores(): Record<string, [number, number] | null> {
  const o: Record<string, [number, number] | null> = {};
  for (const g of GROUP_LETTERS) {
    for (let i = 0; i < GROUP_MATCH_PAIRS.length; i++) {
      o[matchKey(g, i)] = null;
    }
  }
  return o;
}

export function isGroupComplete(
  group: GroupLetter,
  scores: Record<string, [number, number] | null> | undefined,
): boolean {
  if (!scores) return false;
  for (let i = 0; i < GROUP_MATCH_PAIRS.length; i++) {
    if (scores[matchKey(group, i)] == null) return false;
  }
  return true;
}

export function allGroupsFullyScored(
  scores: Record<string, [number, number] | null> | undefined,
): boolean {
  if (!scores) return false;
  return GROUP_LETTERS.every((g) => isGroupComplete(g, scores));
}
