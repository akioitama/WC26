import { describe, expect, it } from "vitest";
import { sortGroupStandings, matchKey, createEmptyScores } from "./standings";
import { resolveAnnexThirdMapping } from "./annexC";
import type { GroupLetter } from "./types";
import {
  buildQualifierSnapshot,
  KNOCKOUT_MATCHES,
  resolveMatchSides,
} from "./knockoutBracket";

describe("sortGroupStandings", () => {
  it("orders by points and goal difference", () => {
    const names = ["A", "B", "C", "D"];
    const scores: Record<string, [number, number] | null> = {};
    const g = "A" as GroupLetter;
    scores[matchKey(g, 0)] = [3, 0];
    scores[matchKey(g, 1)] = [0, 0];
    scores[matchKey(g, 2)] = [3, 0];
    scores[matchKey(g, 3)] = [0, 0];
    scores[matchKey(g, 4)] = [3, 0];
    scores[matchKey(g, 5)] = [0, 0];
    const t = sortGroupStandings(g, names, scores);
    expect(t[0].name).toBe("A");
    expect(t[0].points).toBe(9);
  });
});

describe("Annex C", () => {
  it("resolves combination 1 (EFGHIJKL)", () => {
    const adv: GroupLetter[] = ["E", "F", "G", "H", "I", "J", "K", "L"];
    const r = resolveAnnexThirdMapping(adv);
    expect(r.combinationId).toBe(1);
    expect(r.thirdVsWinner.A).toBe("E");
    expect(r.thirdVsWinner.L).toBe("K");
  });

  it("resolves combination 495 (ABCDEFGH)", () => {
    const adv: GroupLetter[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const r = resolveAnnexThirdMapping(adv);
    expect(r.combinationId).toBe(495);
    expect(r.thirdVsWinner.A).toBe("H");
    expect(r.thirdVsWinner.E).toBe("C");
  });

  it("resolves row 82 from Wikipedia table", () => {
    const adv: GroupLetter[] = ["B", "C", "G", "H", "I", "J", "K", "L"];
    const r = resolveAnnexThirdMapping(adv);
    expect(r.combinationId).toBe(82);
  });
});

describe("knockout wiring", () => {
  it("has 32 knockout matches ending at the final", () => {
    expect(KNOCKOUT_MATCHES.length).toBe(32);
    expect(KNOCKOUT_MATCHES.at(-1)?.id).toBe(104);
  });

  it("builds a snapshot when all scores filled with identical draws", () => {
    const scores = createEmptyScores();
    const letters: GroupLetter[] = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
    ];
    for (const g of letters) {
      for (let i = 0; i < 6; i++) {
        scores[matchKey(g, i)] = [1, 1];
      }
    }
    const snap = buildQualifierSnapshot(scores);
    expect(snap).not.toBeNull();
    if (!snap) return;
    expect(snap.advancingThirdGroups.length).toBe(8);
    const { home, away } = resolveMatchSides(73, snap, {});
    expect(home).toBeTruthy();
    expect(away).toBeTruthy();
  });
});
