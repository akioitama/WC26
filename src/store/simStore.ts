import { create } from "zustand";
import {
  createEmptyScores,
  matchKey,
  GROUP_MATCH_PAIRS,
} from "@/lib/standings";
import { GROUP_LETTERS } from "@/lib/types";
import {
  KNOCKOUT_MATCHES,
  buildQualifierSnapshot,
  canPickWinner,
  randomKoWinner,
} from "@/lib/knockoutBracket";

type SimState = {
  scores: Record<string, [number, number] | null>;
  koWinners: Record<number, "home" | "away">;
  setScore: (key: string, home: number, away: number) => void;
  clearScore: (key: string) => void;
  resetAll: () => void;
  fillRandomGroupScores: () => void;
  setKoWinner: (matchId: number, side: "home" | "away") => void;
  clearKoWinners: () => void;
  autoFillKnockoutRandom: () => void;
};

export const useSimStore = create<SimState>((set, get) => ({
  scores: createEmptyScores(),
  koWinners: {},

  setScore: (key, home, away) =>
    set((s) => ({
      scores: { ...s.scores, [key]: [home, away] },
    })),

  clearScore: (key) =>
    set((s) => ({
      scores: { ...s.scores, [key]: null },
    })),

  resetAll: () => set({ scores: createEmptyScores(), koWinners: {} }),

  fillRandomGroupScores: () => {
    const next = createEmptyScores();
    for (const g of GROUP_LETTERS) {
      for (let i = 0; i < GROUP_MATCH_PAIRS.length; i++) {
        next[matchKey(g, i)] = [
          Math.floor(Math.random() * 4),
          Math.floor(Math.random() * 4),
        ];
      }
    }
    set({ scores: next, koWinners: {} });
  },

  setKoWinner: (matchId, side) =>
    set((s) => ({
      koWinners: { ...s.koWinners, [matchId]: side },
    })),

  clearKoWinners: () => set({ koWinners: {} }),

  autoFillKnockoutRandom: () => {
    const snap = buildQualifierSnapshot(get().scores);
    if (!snap) return;
    const next: Record<number, "home" | "away"> = {};
    for (const m of KNOCKOUT_MATCHES) {
      if (canPickWinner(m.id, snap, next)) {
        next[m.id] = randomKoWinner();
      }
    }
    set({ koWinners: next });
  },
}));
