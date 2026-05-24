import type { GroupLetter, TeamStanding, ThirdPlaceRow } from "./types";
import { GROUP_LETTERS } from "./types";
import { getGroupTeamNames } from "./thirdPlaceSelection";
import { resolveAnnexThirdMapping } from "./annexC";
import type { QualifierSnapshot } from "./knockoutBracket";
import { teamFromName } from "@/data/teams";

/** Default order = draw order from groups.json */
export function initGroupRankings(): Record<GroupLetter, string[]> {
  const out = {} as Record<GroupLetter, string[]>;
  for (const g of GROUP_LETTERS) {
    out[g] = [...getGroupTeamNames(g)];
  }
  return out;
}

export function allGroupsRanked(
  rankings: Record<GroupLetter, string[]>,
): boolean {
  return GROUP_LETTERS.every((g) => {
    const names = getGroupTeamNames(g);
    const r = rankings[g];
    return (
      r?.length === 4 &&
      names.every((n) => r.includes(n)) &&
      new Set(r).size === 4
    );
  });
}

function standingFromRank(
  group: GroupLetter,
  name: string,
  rank: 0 | 1 | 2 | 3,
): TeamStanding {
  const pts = [9, 6, 3, 0][rank];
  const gd = [4, 1, -1, -4][rank];
  const gf = 5 + rank;
  const ga = gf - gd;
  return {
    group,
    index: rank,
    name,
    played: 3,
    wins: rank === 0 ? 3 : rank === 1 ? 2 : rank === 2 ? 1 : 0,
    draws: 0,
    losses: rank === 3 ? 3 : rank === 2 ? 2 : rank === 1 ? 1 : 0,
    goalsFor: gf,
    goalsAgainst: ga,
    points: pts,
  };
}

/** Rank third-placed teams: pts → GD → GF → ELO → group letter */
export function rankThirdPlaceTeams(
  standingsByGroup: Record<GroupLetter, TeamStanding[]>,
): ThirdPlaceRow[] {
  const rows: ThirdPlaceRow[] = GROUP_LETTERS.map((g) => ({
    ...standingsByGroup[g][2],
    group: g,
  }));

  return [...rows].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    if (gdB !== gdA) return gdB - gdA;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    const eloA = teamFromName(a.name)?.elo ?? 0;
    const eloB = teamFromName(b.name)?.elo ?? 0;
    if (eloB !== eloA) return eloB - eloA;
    return a.group.localeCompare(b.group);
  });
}

/** Build knockout qualifier snapshot directly from user/AI group rankings. */
export function buildSnapshotFromRankings(
  rankings: Record<GroupLetter, string[]>,
): QualifierSnapshot | null {
  if (!allGroupsRanked(rankings)) return null;

  const standingsByGroup = {} as Record<GroupLetter, TeamStanding[]>;
  for (const g of GROUP_LETTERS) {
    standingsByGroup[g] = rankings[g].map((name, i) =>
      standingFromRank(g, name, i as 0 | 1 | 2 | 3),
    );
  }

  const rankedThirdRows = rankThirdPlaceTeams(standingsByGroup);
  const advancingThirdGroups = rankedThirdRows.slice(0, 8).map((r) => r.group);
  const { combinationId, thirdVsWinner } =
    resolveAnnexThirdMapping(advancingThirdGroups);

  return {
    standingsByGroup,
    advancingThirdGroups,
    rankedThirdRows,
    combinationId,
    thirdVsWinner,
  };
}
