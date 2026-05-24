/**
 * Key player availability — affects AI strength calculations.
 * Status reflects plausible pre-tournament scenarios (illustrative).
 */

export type InjuryStatus = "fit" | "doubtful" | "out";

export type PlayerAvailability = {
  team: string;
  player: string;
  role: "GK" | "DF" | "MF" | "FW";
  status: InjuryStatus;
  note?: string;
  /** Strength impact when unavailable (0–1) */
  impact: number;
};

export const PLAYER_AVAILABILITY: PlayerAvailability[] = [
  { team: "France", player: "Kylian Mbappé", role: "FW", status: "fit", impact: 0.12 },
  { team: "England", player: "Harry Kane", role: "FW", status: "fit", impact: 0.11 },
  { team: "Brazil", player: "Neymar", role: "FW", status: "doubtful", note: "Knee — fitness test", impact: 0.1 },
  { team: "Germany", player: "Jamal Musiala", role: "MF", status: "fit", impact: 0.09 },
  { team: "Spain", player: "Pedri", role: "MF", status: "doubtful", note: "Muscle fatigue", impact: 0.08 },
  { team: "Argentina", player: "Lionel Messi", role: "FW", status: "fit", impact: 0.1 },
  { team: "Portugal", player: "Cristiano Ronaldo", role: "FW", status: "fit", impact: 0.08 },
  { team: "Belgium", player: "Kevin De Bruyne", role: "MF", status: "doubtful", note: "Hamstring", impact: 0.11 },
  { team: "Netherlands", player: "Virgil van Dijk", role: "DF", status: "fit", impact: 0.09 },
  { team: "Egypt", player: "Mohamed Salah", role: "FW", status: "fit", impact: 0.1 },
  { team: "Norway", player: "Erling Haaland", role: "FW", status: "fit", impact: 0.12 },
  { team: "Türkiye", player: "Hakan Çalhanoğlu", role: "MF", status: "fit", impact: 0.08 },
  { team: "Türkiye", player: "Arda Güler", role: "MF", status: "doubtful", note: "Ankle — monitoring", impact: 0.07 },
  { team: "Croatia", player: "Luka Modrić", role: "MF", status: "fit", impact: 0.07 },
];

export function availabilityForTeam(teamName: string): PlayerAvailability[] {
  return PLAYER_AVAILABILITY.filter((p) => p.team === teamName);
}

export function injuryPenalty(teamName: string): number {
  let penalty = 0;
  for (const p of availabilityForTeam(teamName)) {
    if (p.status === "out") penalty += p.impact;
    else if (p.status === "doubtful") penalty += p.impact * 0.45;
  }
  return penalty;
}
