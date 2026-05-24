"use client";

import { create } from "zustand";
import groupsData from "@/data/groups.json";
import type { GroupLetter } from "@/lib/types";
import { GROUP_LETTERS } from "@/lib/types";
import { setGroupTeamsResolver } from "@/lib/thirdPlaceSelection";

type GroupsFile = { groups: Record<GroupLetter, { teams: string[] }> };
const original = (groupsData as GroupsFile).groups;

function clone(g: GroupsFile["groups"]): GroupsFile["groups"] {
  const next = {} as GroupsFile["groups"];
  for (const k of GROUP_LETTERS) {
    next[k] = { teams: [...g[k].teams] };
  }
  return next;
}

type GroupsState = {
  groups: GroupsFile["groups"];
  swap: (
    a: { group: GroupLetter; index: number },
    b: { group: GroupLetter; index: number },
  ) => void;
  reset: () => void;
  isModified: () => boolean;
};

export const useGroupsStore = create<GroupsState>((set, get) => ({
  groups: clone(original),
  swap: (a, b) =>
    set((s) => {
      const next = clone(s.groups);
      const A = next[a.group].teams[a.index];
      const B = next[b.group].teams[b.index];
      next[a.group].teams[a.index] = B;
      next[b.group].teams[b.index] = A;
      return { groups: next };
    }),
  reset: () => set({ groups: clone(original) }),
  isModified: () => {
    const cur = get().groups;
    for (const k of GROUP_LETTERS) {
      const a = cur[k].teams;
      const b = original[k].teams;
      for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return true;
    }
    return false;
  },
}));

/**
 * Use this from any place that previously imported `getGroupTeamNames`.
 * It now reads the (possibly modified) group state from the store.
 */
export function getGroupTeamsFromStore(g: GroupLetter): string[] {
  return useGroupsStore.getState().groups[g].teams;
}

// Wire the lib to read from the live store when running in the browser.
if (typeof window !== "undefined") {
  setGroupTeamsResolver((g) => useGroupsStore.getState().groups[g].teams);
}
