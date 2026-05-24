/** Stylised animation pose for an iconic moment or legend. */
export type PlayerPose =
  | "volley"
  | "sprint"
  | "header"
  | "celebration"
  | "dribble"
  | "headbutt"
  | "scream"
  | "skill-turn"
  | "chest-finish"
  | "arms-up"
  | "poacher";

/** Map each iconic moment to the pose that best evokes it. */
export const MOMENT_POSES: Record<string, PlayerPose> = {
  "1958-pele-debut": "volley",
  "1966-hurst-hattrick": "sprint",
  "1970-pele-saldanha": "celebration",
  "1974-cruyff-turn": "skill-turn",
  "1982-tardelli": "scream",
  "1986-hand-of-god": "header",
  "1986-goal-of-the-century": "dribble",
  "1990-schillaci": "header",
  "1998-zidane-double": "header",
  "2002-ronaldo-redemption": "poacher",
  "2006-zidane-headbutt": "headbutt",
  "2010-iniesta-winner": "volley",
  "2014-gotze": "chest-finish",
  "2018-mbappe-run": "sprint",
  "2022-messi-coronation": "arms-up",
  "2022-mbappe-hattrick": "volley",
};

/** Default pose for all-time scorers on the leaderboard. */
export const SCORER_POSES: Record<string, PlayerPose> = {
  "Miroslav Klose": "header",
  Ronaldo: "poacher",
  "Gerd Müller": "poacher",
  "Just Fontaine": "volley",
  "Lionel Messi": "dribble",
  Pelé: "volley",
  "Kylian Mbappé": "sprint",
  "Sándor Kocsis": "header",
  "Jürgen Klinsmann": "sprint",
  "Helmut Rahn": "volley",
};

export function poseForMoment(momentId: string): PlayerPose {
  return MOMENT_POSES[momentId] ?? "celebration";
}

export function poseForScorer(playerName: string): PlayerPose {
  return SCORER_POSES[playerName] ?? "celebration";
}
