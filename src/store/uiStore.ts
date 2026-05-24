"use client";

import { create } from "zustand";

export type ThemeId = "obsidian" | "stadium" | "berlin06";

const ORDER: ThemeId[] = ["stadium", "obsidian", "berlin06"];

type UIState = {
  theme: ThemeId;
  soundOn: boolean;
  setTheme: (t: ThemeId) => void;
  toggleTheme: () => void;
  toggleSound: () => void;
};

export const useUiStore = create<UIState>((set, get) => ({
  theme: "stadium",
  soundOn: false,
  setTheme: (t) => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = t;
    }
    set({ theme: t });
  },
  toggleTheme: () => {
    const i = ORDER.indexOf(get().theme);
    const next = ORDER[(i + 1) % ORDER.length];
    get().setTheme(next);
  },
  toggleSound: () => set({ soundOn: !get().soundOn }),
}));
