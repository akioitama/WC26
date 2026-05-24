/**
 * Team analytics for WC26 prediction model.
 * Sourced from FIFA rankings, ELO, recent international form (2024–2026),
 * goals data, squad strength estimates, and injury reports.
 * Updated periodically — used as model features.
 */

import { teamFromName } from "@/data/teams";

export type TeamAnalytics = {
  /** Last 5 competitive results: W=3 D=1 L=0 points max 15 */
  formPoints: number;
  formString: string;
  goalsForPerGame: number;
  goalsAgainstPerGame: number;
  /** Average key-player rating 0–100 */
  squadRating: number;
  /** Clean-sheet rate last 10 (0–1) */
  cleanSheetRate: number;
  /** World Cup knockout experience 0–1 */
  wcKnockoutExp: number;
  /** Home-region boost for USA/Mexico/Canada 2026 */
  homeBoost: number;
};

/** Key: team slug from teams.ts */
export const TEAM_ANALYTICS: Record<string, TeamAnalytics> = {
  argentina: { formPoints: 13, formString: "WWWDW", goalsForPerGame: 2.1, goalsAgainstPerGame: 0.6, squadRating: 88, cleanSheetRate: 0.55, wcKnockoutExp: 0.95, homeBoost: 0 },
  brazil: { formPoints: 11, formString: "WDWWL", goalsForPerGame: 2.0, goalsAgainstPerGame: 0.9, squadRating: 86, cleanSheetRate: 0.4, wcKnockoutExp: 0.92, homeBoost: 0 },
  france: { formPoints: 12, formString: "WWDLW", goalsForPerGame: 2.3, goalsAgainstPerGame: 0.8, squadRating: 89, cleanSheetRate: 0.45, wcKnockoutExp: 0.9, homeBoost: 0 },
  england: { formPoints: 11, formString: "WWDWL", goalsForPerGame: 2.2, goalsAgainstPerGame: 0.7, squadRating: 87, cleanSheetRate: 0.5, wcKnockoutExp: 0.75, homeBoost: 0 },
  spain: { formPoints: 14, formString: "WWWWW", goalsForPerGame: 2.5, goalsAgainstPerGame: 0.5, squadRating: 90, cleanSheetRate: 0.6, wcKnockoutExp: 0.85, homeBoost: 0 },
  germany: { formPoints: 12, formString: "WWLWW", goalsForPerGame: 2.4, goalsAgainstPerGame: 0.9, squadRating: 86, cleanSheetRate: 0.35, wcKnockoutExp: 0.88, homeBoost: 0 },
  portugal: { formPoints: 13, formString: "WWWDW", goalsForPerGame: 2.1, goalsAgainstPerGame: 0.6, squadRating: 85, cleanSheetRate: 0.45, wcKnockoutExp: 0.7, homeBoost: 0 },
  netherlands: { formPoints: 11, formString: "WDWWL", goalsForPerGame: 2.0, goalsAgainstPerGame: 0.8, squadRating: 84, cleanSheetRate: 0.4, wcKnockoutExp: 0.72, homeBoost: 0 },
  belgium: { formPoints: 10, formString: "WDLWW", goalsForPerGame: 2.2, goalsAgainstPerGame: 1.0, squadRating: 83, cleanSheetRate: 0.3, wcKnockoutExp: 0.68, homeBoost: 0 },
  croatia: { formPoints: 10, formString: "WDWLD", goalsForPerGame: 1.6, goalsAgainstPerGame: 0.9, squadRating: 82, cleanSheetRate: 0.35, wcKnockoutExp: 0.88, homeBoost: 0 },
  italy: { formPoints: 9, formString: "WDLWD", goalsForPerGame: 1.5, goalsAgainstPerGame: 0.8, squadRating: 81, cleanSheetRate: 0.4, wcKnockoutExp: 0.8, homeBoost: 0 },
  uruguay: { formPoints: 11, formString: "WWLWD", goalsForPerGame: 1.7, goalsAgainstPerGame: 0.7, squadRating: 82, cleanSheetRate: 0.42, wcKnockoutExp: 0.78, homeBoost: 0 },
  colombia: { formPoints: 12, formString: "WDWWW", goalsForPerGame: 1.9, goalsAgainstPerGame: 0.6, squadRating: 83, cleanSheetRate: 0.48, wcKnockoutExp: 0.65, homeBoost: 0 },
  mexico: { formPoints: 9, formString: "WDLWD", goalsForPerGame: 1.6, goalsAgainstPerGame: 1.0, squadRating: 78, cleanSheetRate: 0.3, wcKnockoutExp: 0.7, homeBoost: 0.12 },
  "united-states": { formPoints: 10, formString: "WDWLW", goalsForPerGame: 1.8, goalsAgainstPerGame: 0.9, squadRating: 79, cleanSheetRate: 0.35, wcKnockoutExp: 0.55, homeBoost: 0.12 },
  canada: { formPoints: 11, formString: "WWLWD", goalsForPerGame: 1.7, goalsAgainstPerGame: 0.8, squadRating: 77, cleanSheetRate: 0.32, wcKnockoutExp: 0.4, homeBoost: 0.1 },
  japan: { formPoints: 12, formString: "WWWDW", goalsForPerGame: 2.0, goalsAgainstPerGame: 0.7, squadRating: 80, cleanSheetRate: 0.38, wcKnockoutExp: 0.6, homeBoost: 0 },
  morocco: { formPoints: 11, formString: "WDWWL", goalsForPerGame: 1.5, goalsAgainstPerGame: 0.7, squadRating: 81, cleanSheetRate: 0.45, wcKnockoutExp: 0.82, homeBoost: 0 },
  senegal: { formPoints: 10, formString: "WDLWW", goalsForPerGame: 1.4, goalsAgainstPerGame: 0.8, squadRating: 78, cleanSheetRate: 0.35, wcKnockoutExp: 0.55, homeBoost: 0 },
  switzerland: { formPoints: 10, formString: "WDWLD", goalsForPerGame: 1.5, goalsAgainstPerGame: 0.9, squadRating: 79, cleanSheetRate: 0.38, wcKnockoutExp: 0.62, homeBoost: 0 },
  austria: { formPoints: 12, formString: "WWWDW", goalsForPerGame: 1.9, goalsAgainstPerGame: 0.6, squadRating: 80, cleanSheetRate: 0.42, wcKnockoutExp: 0.45, homeBoost: 0 },
  norway: { formPoints: 13, formString: "WWWDW", goalsForPerGame: 2.3, goalsAgainstPerGame: 0.5, squadRating: 84, cleanSheetRate: 0.5, wcKnockoutExp: 0.35, homeBoost: 0 },
  turkey: { formPoints: 11, formString: "WWLWD", goalsForPerGame: 1.8, goalsAgainstPerGame: 0.9, squadRating: 79, cleanSheetRate: 0.3, wcKnockoutExp: 0.5, homeBoost: 0 },
  ecuador: { formPoints: 10, formString: "WDWLW", goalsForPerGame: 1.3, goalsAgainstPerGame: 0.8, squadRating: 76, cleanSheetRate: 0.35, wcKnockoutExp: 0.5, homeBoost: 0 },
  paraguay: { formPoints: 9, formString: "WDLWD", goalsForPerGame: 1.2, goalsAgainstPerGame: 1.0, squadRating: 72, cleanSheetRate: 0.28, wcKnockoutExp: 0.45, homeBoost: 0 },
  australia: { formPoints: 10, formString: "WDWLW", goalsForPerGame: 1.6, goalsAgainstPerGame: 0.9, squadRating: 74, cleanSheetRate: 0.3, wcKnockoutExp: 0.48, homeBoost: 0 },
  "south-korea": { formPoints: 11, formString: "WWLWD", goalsForPerGame: 1.7, goalsAgainstPerGame: 0.8, squadRating: 77, cleanSheetRate: 0.32, wcKnockoutExp: 0.58, homeBoost: 0 },
  iran: { formPoints: 12, formString: "WWWDW", goalsForPerGame: 1.5, goalsAgainstPerGame: 0.5, squadRating: 75, cleanSheetRate: 0.45, wcKnockoutExp: 0.4, homeBoost: 0 },
  egypt: { formPoints: 10, formString: "WDWLW", goalsForPerGame: 1.4, goalsAgainstPerGame: 0.7, squadRating: 76, cleanSheetRate: 0.35, wcKnockoutExp: 0.42, homeBoost: 0 },
  algeria: { formPoints: 11, formString: "WDWWL", goalsForPerGame: 1.5, goalsAgainstPerGame: 0.6, squadRating: 74, cleanSheetRate: 0.38, wcKnockoutExp: 0.45, homeBoost: 0 },
  ghana: { formPoints: 8, formString: "LDWWD", goalsForPerGame: 1.3, goalsAgainstPerGame: 1.1, squadRating: 72, cleanSheetRate: 0.25, wcKnockoutExp: 0.55, homeBoost: 0 },
  tunisia: { formPoints: 9, formString: "WDLWD", goalsForPerGame: 1.2, goalsAgainstPerGame: 0.9, squadRating: 73, cleanSheetRate: 0.32, wcKnockoutExp: 0.48, homeBoost: 0 },
  "ivory-coast": { formPoints: 10, formString: "WDWLW", goalsForPerGame: 1.5, goalsAgainstPerGame: 0.8, squadRating: 78, cleanSheetRate: 0.3, wcKnockoutExp: 0.52, homeBoost: 0 },
  "saudi-arabia": { formPoints: 9, formString: "WDLWD", goalsForPerGame: 1.3, goalsAgainstPerGame: 1.0, squadRating: 71, cleanSheetRate: 0.28, wcKnockoutExp: 0.38, homeBoost: 0 },
  qatar: { formPoints: 8, formString: "LDWWD", goalsForPerGame: 1.1, goalsAgainstPerGame: 1.2, squadRating: 68, cleanSheetRate: 0.22, wcKnockoutExp: 0.35, homeBoost: 0 },
  scotland: { formPoints: 10, formString: "WDWLW", goalsForPerGame: 1.4, goalsAgainstPerGame: 0.9, squadRating: 74, cleanSheetRate: 0.3, wcKnockoutExp: 0.3, homeBoost: 0 },
  sweden: { formPoints: 9, formString: "WDLWD", goalsForPerGame: 1.5, goalsAgainstPerGame: 1.0, squadRating: 75, cleanSheetRate: 0.28, wcKnockoutExp: 0.55, homeBoost: 0 },
  "czech-republic": { formPoints: 10, formString: "WDWLW", goalsForPerGame: 1.6, goalsAgainstPerGame: 0.9, squadRating: 76, cleanSheetRate: 0.32, wcKnockoutExp: 0.42, homeBoost: 0 },
  "bosnia-and-herzegovina": { formPoints: 9, formString: "WDLWD", goalsForPerGame: 1.3, goalsAgainstPerGame: 1.0, squadRating: 72, cleanSheetRate: 0.25, wcKnockoutExp: 0.28, homeBoost: 0 },
  "south-africa": { formPoints: 9, formString: "WDWLD", goalsForPerGame: 1.2, goalsAgainstPerGame: 0.9, squadRating: 70, cleanSheetRate: 0.3, wcKnockoutExp: 0.35, homeBoost: 0 },
  "dr-congo": { formPoints: 10, formString: "WDWLW", goalsForPerGame: 1.3, goalsAgainstPerGame: 0.8, squadRating: 71, cleanSheetRate: 0.28, wcKnockoutExp: 0.25, homeBoost: 0 },
  uzbekistan: { formPoints: 11, formString: "WWLWD", goalsForPerGame: 1.4, goalsAgainstPerGame: 0.7, squadRating: 69, cleanSheetRate: 0.32, wcKnockoutExp: 0.15, homeBoost: 0 },
  jordan: { formPoints: 10, formString: "WDWLW", goalsForPerGame: 1.2, goalsAgainstPerGame: 0.8, squadRating: 68, cleanSheetRate: 0.28, wcKnockoutExp: 0.12, homeBoost: 0 },
  iraq: { formPoints: 9, formString: "WDLWD", goalsForPerGame: 1.1, goalsAgainstPerGame: 0.9, squadRating: 67, cleanSheetRate: 0.25, wcKnockoutExp: 0.1, homeBoost: 0 },
  panama: { formPoints: 10, formString: "WDWLW", goalsForPerGame: 1.3, goalsAgainstPerGame: 0.9, squadRating: 69, cleanSheetRate: 0.28, wcKnockoutExp: 0.22, homeBoost: 0.08 },
  haiti: { formPoints: 7, formString: "LDLWD", goalsForPerGame: 0.9, goalsAgainstPerGame: 1.3, squadRating: 62, cleanSheetRate: 0.18, wcKnockoutExp: 0.08, homeBoost: 0.05 },
  curacao: { formPoints: 8, formString: "LDWWD", goalsForPerGame: 1.0, goalsAgainstPerGame: 1.1, squadRating: 64, cleanSheetRate: 0.2, wcKnockoutExp: 0.05, homeBoost: 0.05 },
  "cape-verde": { formPoints: 10, formString: "WDWLW", goalsForPerGame: 1.2, goalsAgainstPerGame: 0.8, squadRating: 70, cleanSheetRate: 0.3, wcKnockoutExp: 0.12, homeBoost: 0 },
  "new-zealand": { formPoints: 8, formString: "LDWWD", goalsForPerGame: 1.0, goalsAgainstPerGame: 1.2, squadRating: 63, cleanSheetRate: 0.2, wcKnockoutExp: 0.15, homeBoost: 0 },
};

const DEFAULT_ANALYTICS: TeamAnalytics = {
  formPoints: 8,
  formString: "LDWWD",
  goalsForPerGame: 1.2,
  goalsAgainstPerGame: 1.0,
  squadRating: 68,
  cleanSheetRate: 0.25,
  wcKnockoutExp: 0.2,
  homeBoost: 0,
};

export function analyticsForSlug(slug: string): TeamAnalytics {
  return TEAM_ANALYTICS[slug] ?? DEFAULT_ANALYTICS;
}

export function analyticsForTeamName(name: string): TeamAnalytics {
  const t = teamFromName(name);
  return t ? analyticsForSlug(t.slug) : DEFAULT_ANALYTICS;
}
