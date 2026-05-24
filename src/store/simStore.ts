"use client";

import { create } from "zustand";
import type { GroupLetter } from "@/lib/types";
import {
  initGroupRankings,
  buildSnapshotFromRankings,
  allGroupsRanked,
} from "@/lib/groupRankings";
import {
  KNOCKOUT_MATCHES,
  canPickWinner,
  resolveMatchSides,
} from "@/lib/knockoutBracket";
import {
  type UpsetLevel,
  type SimMode,
  type TournamentPrediction,
  simulateFullTournament,
  pickKoWinner,
} from "@/lib/tournamentPredictor";
import { decodeState, encodeState } from "@/lib/share";
import { createEmptyScores } from "@/lib/standings";

type KoWinners = Record<number, "home" | "away">;
type GroupRankings = Record<GroupLetter, string[]>;

type SimState = {
  mode: SimMode;
  upsetLevel: UpsetLevel;
  groupRankings: GroupRankings;
  koWinners: KoWinners;
  aiPrediction: TournamentPrediction | null;
  setMode: (mode: SimMode) => void;
  setUpsetLevel: (level: UpsetLevel) => void;
  setGroupOrder: (group: GroupLetter, ordered: string[]) => void;
  reorderInGroup: (group: GroupLetter, from: number, to: number) => void;
  resetAll: () => void;
  setKoWinner: (matchId: number, side: "home" | "away") => void;
  clearKoWinners: () => void;
  clearDownstreamKo: (fromMatchId: number) => void;
  autoFillKnockoutWithModel: () => void;
  runAISimulation: () => void;
  simulateEntireTournament: () => void;
  loadFromHash: (hash: string) => boolean;
  share: () => string;
  isGroupsComplete: () => boolean;
  getSnapshot: () => ReturnType<typeof buildSnapshotFromRankings>;
};

function clearKoFromMatch(
  matchId: number,
  winners: KoWinners,
): KoWinners {
  const next = { ...winners };
  for (const m of KNOCKOUT_MATCHES) {
    if (m.id >= matchId) delete next[m.id];
  }
  return next;
}

export const useSimStore = create<SimState>((set, get) => ({
  mode: "manual",
  upsetLevel: "medium",
  groupRankings: initGroupRankings(),
  koWinners: {},
  aiPrediction: null,

  setMode: (mode) => set({ mode, aiPrediction: mode === "manual" ? null : get().aiPrediction }),

  setUpsetLevel: (upsetLevel) => set({ upsetLevel }),

  setGroupOrder: (group, ordered) =>
    set((s) => ({
      groupRankings: { ...s.groupRankings, [group]: ordered },
      koWinners: {},
      aiPrediction: null,
    })),

  reorderInGroup: (group, from, to) => {
    const list = [...get().groupRankings[group]];
    const [item] = list.splice(from, 1);
    list.splice(to, 0, item);
    set((s) => ({
      groupRankings: { ...s.groupRankings, [group]: list },
      koWinners: {},
      aiPrediction: null,
    }));
  },

  resetAll: () =>
    set({
      groupRankings: initGroupRankings(),
      koWinners: {},
      aiPrediction: null,
      mode: "manual",
      upsetLevel: "medium",
    }),

  /** Re-sync rankings when draw changes */
  syncRankingsFromDraw: () =>
    set({ groupRankings: initGroupRankings(), koWinners: {}, aiPrediction: null }),

  setKoWinner: (matchId, side) =>
    set((s) => ({
      koWinners: clearKoFromMatch(matchId, {
        ...s.koWinners,
        [matchId]: side,
      }),
    })),

  clearKoWinners: () => set({ koWinners: {} }),

  clearDownstreamKo: (fromMatchId) =>
    set((s) => ({ koWinners: clearKoFromMatch(fromMatchId, s.koWinners) })),

  autoFillKnockoutWithModel: () => {
    const snap = buildSnapshotFromRankings(get().groupRankings);
    if (!snap) return;
    const upset = get().upsetLevel;
    const next: KoWinners = {};
    for (const m of KNOCKOUT_MATCHES) {
      if (!canPickWinner(m.id, snap, next)) continue;
      const { home, away } = resolveMatchSides(m.id, snap, next);
      if (!home || !away) continue;
      next[m.id] = pickKoWinner(home, away, upset);
    }
    set({ koWinners: next, aiPrediction: null });
  },

  runAISimulation: () => {
    const pred = simulateFullTournament(get().upsetLevel);
    set({
      mode: "ai",
      groupRankings: pred.groupRankings,
      koWinners: pred.koWinners,
      aiPrediction: pred,
    });
  },

  simulateEntireTournament: () => {
    get().runAISimulation();
  },

  isGroupsComplete: () => allGroupsRanked(get().groupRankings),

  getSnapshot: () => buildSnapshotFromRankings(get().groupRankings),

  loadFromHash: (hash) => {
    const decoded = decodeState(hash);
    if (!decoded) return false;
    set({ koWinners: decoded.ko, aiPrediction: null });
    return true;
  },

  share: () => encodeState(createEmptyScores(), get().koWinners),
}));
