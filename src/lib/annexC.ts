import type { GroupLetter } from "./types";
import annex from "@/data/r32AnnexC.json";

type AnnexFile = {
  byKey: Record<string, { id: number; thirdByWinnerSlot: string[] }>;
};

const { byKey } = annex as AnnexFile;

const WINNER_THIRD_SLOT_ORDER: GroupLetter[] = [
  "A",
  "B",
  "D",
  "E",
  "G",
  "I",
  "K",
  "L",
];

/**
 * @param advancingThirdGroups eight group letters whose third-placed teams qualify (any order)
 * @returns map from winner group letter (one of A,B,D,E,G,I,K,L) to the opponent third's group letter
 */
export function resolveAnnexThirdMapping(
  advancingThirdGroups: GroupLetter[],
): { combinationId: number; thirdVsWinner: Record<GroupLetter, GroupLetter> } {
  if (advancingThirdGroups.length !== 8) {
    throw new Error("Annex C requires exactly eight advancing third-placed teams");
  }
  const key = [...advancingThirdGroups].sort().join("");
  const row = byKey[key];
  if (!row) {
    throw new Error(`Unknown Annex C key: ${key}`);
  }
  const thirdVsWinner = {} as Record<GroupLetter, GroupLetter>;
  WINNER_THIRD_SLOT_ORDER.forEach((winnerGroup, i) => {
    const letter = row.thirdByWinnerSlot[i];
    if (!letter || letter.length !== 1) {
      throw new Error(`Invalid annex slot ${i} for key ${key}`);
    }
    thirdVsWinner[winnerGroup] = letter as GroupLetter;
  });
  return { combinationId: row.id, thirdVsWinner };
}
