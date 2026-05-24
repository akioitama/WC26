import { describe, expect, it } from "vitest";
import { initGroupRankings, buildSnapshotFromRankings } from "./groupRankings";

describe("buildSnapshotFromRankings", () => {
  it("builds a qualifier snapshot from drag rankings", () => {
    const rankings = initGroupRankings();
    const snap = buildSnapshotFromRankings(rankings);
    expect(snap).not.toBeNull();
    expect(snap!.advancingThirdGroups).toHaveLength(8);
    expect(snap!.combinationId).toBeGreaterThan(0);
  });
});
