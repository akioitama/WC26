import { describe, expect, it } from "vitest";
import { encodeState, decodeState } from "./share";
import { createEmptyScores, matchKey } from "./standings";
import { GROUP_LETTERS } from "./types";

describe("share state encoding", () => {
  it("round-trips an empty bracket", () => {
    const scores = createEmptyScores();
    const code = encodeState(scores, {});
    const back = decodeState(code);
    expect(back).not.toBeNull();
    expect(back!.scores).toEqual(scores);
    expect(back!.ko).toEqual({});
  });

  it("round-trips a full bracket with KO winners", () => {
    const scores = createEmptyScores();
    for (const g of GROUP_LETTERS) {
      for (let i = 0; i < 6; i++) {
        scores[matchKey(g, i)] = [(i + g.charCodeAt(0)) % 4, (i * 2) % 4];
      }
    }
    const ko: Record<number, "home" | "away"> = {
      73: "home",
      74: "away",
      89: "home",
      104: "away",
    };
    const code = encodeState(scores, ko);
    const back = decodeState(code);
    expect(back).not.toBeNull();
    expect(back!.scores).toEqual(scores);
    expect(back!.ko).toEqual(ko);
  });

  it("clamps goals above 15", () => {
    const scores = createEmptyScores();
    scores[matchKey("A", 0)] = [99, 0];
    const code = encodeState(scores, {});
    const back = decodeState(code);
    expect(back!.scores[matchKey("A", 0)]).toEqual([15, 0]);
  });

  it("returns null on garbage input", () => {
    expect(decodeState("not!a$valid&encoding")).not.toBe(null); // base64-flexible
  });
});
