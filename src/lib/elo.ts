import { TEAMS, type Team } from "@/data/teams";

/**
 * Win-probability from Elo difference. Standard logistic.
 */
export function eloWinProbability(eloA: number, eloB: number): number {
  return 1 / (1 + 10 ** ((eloB - eloA) / 400));
}

/**
 * Three-way probability with a fixed draw share inversely proportional
 * to |Elo diff|. Simple but stable for visualizations.
 */
export function matchProbabilities(eloA: number, eloB: number): {
  home: number;
  draw: number;
  away: number;
} {
  const expected = eloWinProbability(eloA, eloB);
  const diff = Math.abs(eloA - eloB);
  const drawBase = 0.32;
  const drawAdj = Math.max(0.12, drawBase - diff / 1500);
  const remaining = 1 - drawAdj;
  return {
    home: remaining * expected,
    draw: drawAdj,
    away: remaining * (1 - expected),
  };
}

/**
 * Crude Monte Carlo over the 12 groups using Elo ratings only.
 * Returns each team's % chance to (a) win their group, (b) reach R16, (c) reach SF, (d) win the tournament.
 * Quick mode (1000–4000 simulations) so it can run in the browser.
 */
export type AdvancementOdds = {
  team: Team;
  winGroup: number;
  reachR16: number;
  reachQF: number;
  reachSF: number;
  reachF: number;
  winCup: number;
};

export function simulateTournament(iterations = 2000): AdvancementOdds[] {
  const counters = new Map<string, AdvancementOdds>();
  for (const t of TEAMS) {
    counters.set(t.slug, {
      team: t,
      winGroup: 0,
      reachR16: 0,
      reachQF: 0,
      reachSF: 0,
      reachF: 0,
      winCup: 0,
    });
  }

  const groups: Record<string, Team[]> = {};
  for (const t of TEAMS) {
    if (!t.group2026) continue;
    (groups[t.group2026] ??= []).push(t);
  }

  function pickWinner(a: Team, b: Team): Team {
    const p = eloWinProbability(a.elo, b.elo);
    return Math.random() < p ? a : b;
  }

  for (let it = 0; it < iterations; it++) {
    const advancing: Team[] = [];
    const thirdCandidates: { team: Team; pts: number }[] = [];
    for (const g of Object.values(groups)) {
      const points = new Map<Team, number>();
      for (const t of g) points.set(t, 0);
      for (let i = 0; i < g.length; i++) {
        for (let j = i + 1; j < g.length; j++) {
          const probs = matchProbabilities(g[i].elo, g[j].elo);
          const r = Math.random();
          if (r < probs.home) points.set(g[i], (points.get(g[i]) ?? 0) + 3);
          else if (r < probs.home + probs.draw) {
            points.set(g[i], (points.get(g[i]) ?? 0) + 1);
            points.set(g[j], (points.get(g[j]) ?? 0) + 1);
          } else points.set(g[j], (points.get(g[j]) ?? 0) + 3);
        }
      }
      const sorted = [...g].sort((a, b) => {
        const pa = points.get(a) ?? 0;
        const pb = points.get(b) ?? 0;
        if (pa !== pb) return pb - pa;
        return b.elo - a.elo;
      });
      const winner = sorted[0];
      counters.get(winner.slug)!.winGroup += 1;
      advancing.push(sorted[0], sorted[1]);
      thirdCandidates.push({ team: sorted[2], pts: points.get(sorted[2]) ?? 0 });
    }
    const bestThirds = [...thirdCandidates]
      .sort((a, b) => b.pts - a.pts || b.team.elo - a.team.elo)
      .slice(0, 8)
      .map((x) => x.team);
    const r32 = [...advancing, ...bestThirds];
    for (const t of r32) counters.get(t.slug)!.reachR16 += 1;

    let pool: Team[] = r32;
    const targets = ["reachQF", "reachSF", "reachF", "winCup"] as const;
    for (const target of targets) {
      const next: Team[] = [];
      for (let i = 0; i < pool.length; i += 2) {
        const a = pool[i];
        const b = pool[i + 1];
        if (!b) {
          next.push(a);
          continue;
        }
        const w = pickWinner(a, b);
        next.push(w);
      }
      for (const t of next) {
        const o = counters.get(t.slug)!;
        o[target] = (o[target] as number) + 1;
      }
      pool = next;
    }
  }

  return Array.from(counters.values())
    .map((o) => ({
      ...o,
      winGroup: o.winGroup / iterations,
      reachR16: o.reachR16 / iterations,
      reachQF: o.reachQF / iterations,
      reachSF: o.reachSF / iterations,
      reachF: o.reachF / iterations,
      winCup: o.winCup / iterations,
    }))
    .sort((a, b) => b.winCup - a.winCup);
}
