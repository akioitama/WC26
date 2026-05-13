import type { GroupLetter, ThirdPlaceRow } from "./types";
import { GROUP_LETTERS } from "./types";
import { groupThird, sortGroupStandings } from "./standings";
import groupsData from "@/data/groups.json";

type GroupsFile = {
  groups: Record<GroupLetter, { teams: string[] }>;
};

const data = groupsData as GroupsFile;

export function getGroupTeamNames(g: GroupLetter): string[] {
  return data.groups[g].teams;
}

export function computeAllThirdPlaces(
  scores: Record<string, [number, number] | null>,
): ThirdPlaceRow[] {
  const thirds: ThirdPlaceRow[] = [];
  for (const g of GROUP_LETTERS) {
    const ordered = sortGroupStandings(g, getGroupTeamNames(g), scores);
    const t = groupThird(ordered);
    if (t && t.played === 3) {
      thirds.push(t);
    }
  }
  return thirds;
}

/** Rank third-placed teams (FIFA: points, GD, GF; then stable group letter). */
export function rankThirdPlaces(rows: ThirdPlaceRow[]): ThirdPlaceRow[] {
  return [...rows].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    if (gdB !== gdA) return gdB - gdA;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.group.localeCompare(b.group);
  });
}

export function pickAdvancingThirdGroups(
  rankedThirds: ThirdPlaceRow[],
): GroupLetter[] {
  return rankedThirds.slice(0, 8).map((r) => r.group);
}
