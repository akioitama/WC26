export type GroupLetter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L";

export const GROUP_LETTERS: GroupLetter[] = [
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

export type TeamStanding = {
  group: GroupLetter;
  index: number;
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
};

export type GroupStandingsResult = {
  ordered: TeamStanding[];
  third: TeamStanding;
};

export type ThirdPlaceRow = TeamStanding & { group: GroupLetter };

export type KnockoutSlot =
  | { kind: "group_place"; group: GroupLetter; place: 1 | 2 | 3 }
  | { kind: "winner"; match: number }
  | { kind: "loser"; match: number };

export type KnockoutMatchDef = {
  id: number;
  home: KnockoutSlot;
  away: KnockoutSlot;
  label: string;
};
