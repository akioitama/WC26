import type { GroupLetter, TeamStanding, ThirdPlaceRow } from "./types";
import { GROUP_LETTERS } from "./types";
import { sortGroupStandings, allGroupsFullyScored } from "./standings";
import {
  computeAllThirdPlaces,
  getGroupTeamNames,
  pickAdvancingThirdGroups,
  rankThirdPlaces,
} from "./thirdPlaceSelection";
import { resolveAnnexThirdMapping } from "./annexC";

export type BracketSlot =
  | { type: "rank"; group: GroupLetter; rank: 1 | 2 | 3 }
  | { type: "third_with"; hostWinner: GroupLetter };

export type KnockoutMatchTemplate = {
  id: number;
  round: "R32" | "R16" | "QF" | "SF" | "TP" | "F";
  label: string;
  home:
    | BracketSlot
    | { type: "winner"; of: number }
    | { type: "loser"; of: number };
  away:
    | BracketSlot
    | { type: "winner"; of: number }
    | { type: "loser"; of: number };
};

export type AnyBracketSide = KnockoutMatchTemplate["home"] | KnockoutMatchTemplate["away"];

export type QualifierSnapshot = {
  standingsByGroup: Record<GroupLetter, TeamStanding[]>;
  advancingThirdGroups: GroupLetter[];
  rankedThirdRows: ThirdPlaceRow[];
  combinationId: number;
  thirdVsWinner: Record<GroupLetter, GroupLetter>;
};

export const KNOCKOUT_MATCHES: KnockoutMatchTemplate[] = [
  {
    id: 73,
    round: "R32",
    label: "2A vs 2B",
    home: { type: "rank", group: "A", rank: 2 },
    away: { type: "rank", group: "B", rank: 2 },
  },
  {
    id: 74,
    round: "R32",
    label: "1E vs 3rd",
    home: { type: "rank", group: "E", rank: 1 },
    away: { type: "third_with", hostWinner: "E" },
  },
  {
    id: 75,
    round: "R32",
    label: "1F vs 2C",
    home: { type: "rank", group: "F", rank: 1 },
    away: { type: "rank", group: "C", rank: 2 },
  },
  {
    id: 76,
    round: "R32",
    label: "1C vs 2F",
    home: { type: "rank", group: "C", rank: 1 },
    away: { type: "rank", group: "F", rank: 2 },
  },
  {
    id: 77,
    round: "R32",
    label: "1I vs 3rd",
    home: { type: "rank", group: "I", rank: 1 },
    away: { type: "third_with", hostWinner: "I" },
  },
  {
    id: 78,
    round: "R32",
    label: "2E vs 2I",
    home: { type: "rank", group: "E", rank: 2 },
    away: { type: "rank", group: "I", rank: 2 },
  },
  {
    id: 79,
    round: "R32",
    label: "1A vs 3rd",
    home: { type: "rank", group: "A", rank: 1 },
    away: { type: "third_with", hostWinner: "A" },
  },
  {
    id: 80,
    round: "R32",
    label: "1L vs 3rd",
    home: { type: "rank", group: "L", rank: 1 },
    away: { type: "third_with", hostWinner: "L" },
  },
  {
    id: 81,
    round: "R32",
    label: "1D vs 3rd",
    home: { type: "rank", group: "D", rank: 1 },
    away: { type: "third_with", hostWinner: "D" },
  },
  {
    id: 82,
    round: "R32",
    label: "1G vs 3rd",
    home: { type: "rank", group: "G", rank: 1 },
    away: { type: "third_with", hostWinner: "G" },
  },
  {
    id: 83,
    round: "R32",
    label: "2K vs 2L",
    home: { type: "rank", group: "K", rank: 2 },
    away: { type: "rank", group: "L", rank: 2 },
  },
  {
    id: 84,
    round: "R32",
    label: "1H vs 2J",
    home: { type: "rank", group: "H", rank: 1 },
    away: { type: "rank", group: "J", rank: 2 },
  },
  {
    id: 85,
    round: "R32",
    label: "1B vs 3rd",
    home: { type: "rank", group: "B", rank: 1 },
    away: { type: "third_with", hostWinner: "B" },
  },
  {
    id: 86,
    round: "R32",
    label: "1J vs 2H",
    home: { type: "rank", group: "J", rank: 1 },
    away: { type: "rank", group: "H", rank: 2 },
  },
  {
    id: 87,
    round: "R32",
    label: "1K vs 3rd",
    home: { type: "rank", group: "K", rank: 1 },
    away: { type: "third_with", hostWinner: "K" },
  },
  {
    id: 88,
    round: "R32",
    label: "2D vs 2G",
    home: { type: "rank", group: "D", rank: 2 },
    away: { type: "rank", group: "G", rank: 2 },
  },
  {
    id: 89,
    round: "R16",
    label: "W74 vs W77",
    home: { type: "winner", of: 74 },
    away: { type: "winner", of: 77 },
  },
  {
    id: 90,
    round: "R16",
    label: "W73 vs W75",
    home: { type: "winner", of: 73 },
    away: { type: "winner", of: 75 },
  },
  {
    id: 91,
    round: "R16",
    label: "W76 vs W78",
    home: { type: "winner", of: 76 },
    away: { type: "winner", of: 78 },
  },
  {
    id: 92,
    round: "R16",
    label: "W79 vs W80",
    home: { type: "winner", of: 79 },
    away: { type: "winner", of: 80 },
  },
  {
    id: 93,
    round: "R16",
    label: "W83 vs W84",
    home: { type: "winner", of: 83 },
    away: { type: "winner", of: 84 },
  },
  {
    id: 94,
    round: "R16",
    label: "W81 vs W82",
    home: { type: "winner", of: 81 },
    away: { type: "winner", of: 82 },
  },
  {
    id: 95,
    round: "R16",
    label: "W86 vs W88",
    home: { type: "winner", of: 86 },
    away: { type: "winner", of: 88 },
  },
  {
    id: 96,
    round: "R16",
    label: "W85 vs W87",
    home: { type: "winner", of: 85 },
    away: { type: "winner", of: 87 },
  },
  {
    id: 97,
    round: "QF",
    label: "W89 vs W90",
    home: { type: "winner", of: 89 },
    away: { type: "winner", of: 90 },
  },
  {
    id: 98,
    round: "QF",
    label: "W93 vs W94",
    home: { type: "winner", of: 93 },
    away: { type: "winner", of: 94 },
  },
  {
    id: 99,
    round: "QF",
    label: "W91 vs W92",
    home: { type: "winner", of: 91 },
    away: { type: "winner", of: 92 },
  },
  {
    id: 100,
    round: "QF",
    label: "W95 vs W96",
    home: { type: "winner", of: 95 },
    away: { type: "winner", of: 96 },
  },
  {
    id: 101,
    round: "SF",
    label: "W97 vs W98",
    home: { type: "winner", of: 97 },
    away: { type: "winner", of: 98 },
  },
  {
    id: 102,
    round: "SF",
    label: "W99 vs W100",
    home: { type: "winner", of: 99 },
    away: { type: "winner", of: 100 },
  },
  {
    id: 103,
    round: "TP",
    label: "3rd place",
    home: { type: "loser", of: 101 },
    away: { type: "loser", of: 102 },
  },
  {
    id: 104,
    round: "F",
    label: "Final",
    home: { type: "winner", of: 101 },
    away: { type: "winner", of: 102 },
  },
];

export function buildQualifierSnapshot(
  scores: Record<string, [number, number] | null>,
): QualifierSnapshot | null {
  if (!allGroupsFullyScored(scores)) return null;
  const standingsByGroup = {} as Record<GroupLetter, TeamStanding[]>;
  for (const g of GROUP_LETTERS) {
    standingsByGroup[g] = sortGroupStandings(g, getGroupTeamNames(g), scores);
  }
  const allThirds = computeAllThirdPlaces(scores);
  const ranked = rankThirdPlaces(allThirds);
  const advancing = pickAdvancingThirdGroups(ranked);
  const { combinationId, thirdVsWinner } = resolveAnnexThirdMapping(advancing);
  return {
    standingsByGroup,
    advancingThirdGroups: advancing,
    rankedThirdRows: ranked,
    combinationId,
    thirdVsWinner,
  };
}

function standingAtRank(
  snap: QualifierSnapshot,
  group: GroupLetter,
  rank: 1 | 2 | 3,
): TeamStanding | undefined {
  const table = snap.standingsByGroup[group];
  if (!table) return undefined;
  return table[rank - 1];
}

export function resolveBracketSlot(
  slot: AnyBracketSide,
  snap: QualifierSnapshot,
  winners: Record<number, "home" | "away">,
): string | null {
  if ("type" in slot && slot.type === "winner") {
    const w = winners[slot.of];
    const m = KNOCKOUT_MATCHES.find((x) => x.id === slot.of);
    if (!m || !w) return null;
    const left = resolveBracketSlot(m.home, snap, winners);
    const right = resolveBracketSlot(m.away, snap, winners);
    if (!left || !right) return null;
    return w === "home" ? left : right;
  }
  if ("type" in slot && slot.type === "loser") {
    const m = KNOCKOUT_MATCHES.find((x) => x.id === slot.of);
    if (!m) return null;
    const w = winners[slot.of];
    const left = resolveBracketSlot(m.home, snap, winners);
    const right = resolveBracketSlot(m.away, snap, winners);
    if (!left || !right || !w) return null;
    return w === "home" ? right : left;
  }
  if ("type" in slot && slot.type === "rank") {
    const row = standingAtRank(snap, slot.group, slot.rank);
    return row?.name ?? null;
  }
  if ("type" in slot && slot.type === "third_with") {
    const letter = snap.thirdVsWinner[slot.hostWinner];
    if (!letter) return null;
    const row = standingAtRank(snap, letter, 3);
    return row?.name ?? null;
  }
  return null;
}

export function resolveMatchSides(
  matchId: number,
  snap: QualifierSnapshot,
  winners: Record<number, "home" | "away">,
): { home: string | null; away: string | null } {
  const m = KNOCKOUT_MATCHES.find((x) => x.id === matchId);
  if (!m) return { home: null, away: null };
  return {
    home: resolveBracketSlot(m.home, snap, winners),
    away: resolveBracketSlot(m.away, snap, winners),
  };
}

export function canPickWinner(
  matchId: number,
  snap: QualifierSnapshot,
  winners: Record<number, "home" | "away">,
): boolean {
  const { home, away } = resolveMatchSides(matchId, snap, winners);
  return Boolean(home && away);
}

export function randomKoWinner(): "home" | "away" {
  return Math.random() < 0.5 ? "home" : "away";
}
