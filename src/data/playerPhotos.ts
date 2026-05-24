/**
 * Real player portrait registry.
 * Photos bundled in /public/players/ (run npm run fetch:players).
 * remoteUrl is the verified Wikipedia thumbnail fallback.
 */

import { PLAYER_SLUGS } from "./playerRegistry";
import playerManifest from "../../public/players/manifest.json";

export type PlayerPhotoConfig = {
  slug: string;
  remoteUrl: string;
  objectPosition: string;
  zoom?: number;
  credit: string;
};

export function portraitUrl(config: PlayerPhotoConfig): string {
  return `/players/${config.slug}.jpg`;
}

/** Fine-tuned crop overrides for known players */
const CROP_OVERRIDES: Partial<Record<string, Pick<PlayerPhotoConfig, "objectPosition" | "zoom">>> = {
  messi: { objectPosition: "50% 12%", zoom: 1.35 },
  mbappe: { objectPosition: "50% 15%", zoom: 1.32 },
  "cristiano-ronaldo": { objectPosition: "50% 14%", zoom: 1.3 },
  "harry-kane": { objectPosition: "50% 16%", zoom: 1.28 },
  "mohamed-salah": { objectPosition: "50% 15%", zoom: 1.3 },
  "erling-haaland": { objectPosition: "50% 14%", zoom: 1.32 },
  "lamine-yamal": { objectPosition: "50% 18%", zoom: 1.25 },
};

/** Legacy entries with explicit remote URLs (legends / moments) */
export const PLAYER_PHOTOS: Record<string, PlayerPhotoConfig> = {
  "Lionel Messi": {
    slug: "messi",
    remoteUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Lionel_Messi_White_House_2026_%283x4_cropped%29.jpg/330px-Lionel_Messi_White_House_2026_%283x4_cropped%29.jpg",
    objectPosition: "50% 12%",
    zoom: 1.35,
    credit: "Wikimedia Commons · CC BY-SA",
  },
  "Diego Maradona": {
    slug: "maradona",
    remoteUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Argentina_celebrando_copa_%28cropped%29.jpg/330px-Argentina_celebrando_copa_%28cropped%29.jpg",
    objectPosition: "50% 18%",
    zoom: 1.3,
    credit: "Wikimedia Commons · CC BY-SA",
  },
  "Kylian Mbappé": {
    slug: "mbappe",
    remoteUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Picture_with_Mbapp%C3%A9_%28cropped_and_rotated%29.jpg/330px-Picture_with_Mbapp%C3%A9_%28cropped_and_rotated%29.jpg",
    objectPosition: "50% 15%",
    zoom: 1.32,
    credit: "Wikimedia Commons · CC BY-SA",
  },
  Pelé: {
    slug: "pele",
    remoteUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pele_con_brasil_%28cropped%29.jpg/330px-Pele_con_brasil_%28cropped%29.jpg",
    objectPosition: "50% 20%",
    zoom: 1.28,
    credit: "Wikimedia Commons · CC BY-SA",
  },
  "Zinédine Zidane": {
    slug: "zidane",
    remoteUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg/330px-Zinedine_Zidane_by_Tasnim_03.jpg",
    objectPosition: "50% 14%",
    zoom: 1.3,
    credit: "Wikimedia Commons · CC BY-SA",
  },
  Ronaldo: {
    slug: "ronaldo",
    remoteUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Ronaldo_Lu%C3%ADs_Naz%C3%A1rio_de_Lima_2019_%283x4_cropped%29.jpg/330px-Ronaldo_Lu%C3%ADs_Naz%C3%A1rio_de_Lima_2019_%283x4_cropped%29.jpg",
    objectPosition: "50% 16%",
    zoom: 1.28,
    credit: "Wikimedia Commons · CC BY-SA",
  },
  "Geoff Hurst": {
    slug: "hurst",
    remoteUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Geoff_Hurst_%282%29.jpg/330px-Geoff_Hurst_%282%29.jpg",
    objectPosition: "50% 22%",
    zoom: 1.22,
    credit: "Wikimedia Commons · CC BY-SA",
  },
  "Gerd Müller": {
    slug: "muller",
    remoteUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gerd_M%C3%BCller_c1973_%28cropped%29.jpg/330px-Gerd_M%C3%BCller_c1973_%28cropped%29.jpg",
    objectPosition: "50% 20%",
    zoom: 1.25,
    credit: "Wikimedia Commons · CC BY-SA",
  },
};

const manifestCache: Record<string, string> = playerManifest as Record<string, string>;

/** Wikipedia CDN fallbacks when local bundle missing (rate-limit safe at runtime) */
const REMOTE_BY_SLUG: Record<string, string> = {
  "harry-kane":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Harry_Kane_2018.jpg/330px-Harry_Kane_2018.jpg",
  "jude-bellingham":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Jude_Bellingham_2023.jpg/330px-Jude_Bellingham_2023.jpg",
  "cristiano-ronaldo":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/330px-Cristiano_Ronaldo_2018.jpg",
  "kevin-de-bruyne":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Kevin_De_Bruyne_2018070910327.jpg/330px-Kevin_De_Bruyne_2018070910327.jpg",
  "mohamed-salah":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mohamed_Salah_2018.jpg/330px-Mohamed_Salah_2018.jpg",
  "erling-haaland":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Erling_Haaland_2023.jpg/330px-Erling_Haaland_2023.jpg",
  "virgil-van-dijk":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Virgil_van_Dijk_2019.jpg/330px-Virgil_van_Dijk_2019.jpg",
  "lamine-yamal":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lamine_Yamal_2024_%28cropped%29.jpg/330px-Lamine_Yamal_2024_%28cropped%29.jpg",
  rodri:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Rodri_2023_%28cropped%29.jpg/330px-Rodri_2023_%28cropped%29.jpg",
  pedri:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pedri_2021_%28cropped%29.jpg/330px-Pedri_2021_%28cropped%29.jpg",
  "vinicius-junior":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vin%C3%ADcius_J%C3%BAnior_2023_%28cropped%29.jpg/330px-Vin%C3%ADcius_J%C3%BAnior_2023_%28cropped%29.jpg",
  mbappe:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Picture_with_Mbapp%C3%A9_%28cropped_and_rotated%29.jpg/330px-Picture_with_Mbapp%C3%A9_%28cropped_and_rotated%29.jpg",
  "luka-modric":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Luka_Modri%C4%87_2018_%28cropped%29.jpg/330px-Luka_Modri%C4%87_2018_%28cropped%29.jpg",
  "jamal-musiala":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Jamal_Musiala_2023.jpg/330px-Jamal_Musiala_2023.jpg",
  "manuel-neuer":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Manuel_Neuer_2019_%28cropped%29.jpg/330px-Manuel_Neuer_2019_%28cropped%29.jpg",
  zidane:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg/330px-Zinedine_Zidane_by_Tasnim_03.jpg",
  cruyff:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Johan_Cruijff_%281974%29.jpg/330px-Johan_Cruijff_%281974%29.jpg",
  iniesta:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Andr%C3%A9s_Iniesta_%28cropped%29.jpg/330px-Andr%C3%A9s_Iniesta_%28cropped%29.jpg",
  "phil-foden":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Phil_Foden_2023.jpg/330px-Phil_Foden_2023.jpg",
  "bukayo-saka":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Bukayo_Saka_2021.jpg/330px-Bukayo_Saka_2021.jpg",
  "florian-wirtz":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Florian_Wirtz_2023.jpg/330px-Florian_Wirtz_2023.jpg",
  "alphonso-davies":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Alphonso_Davies_2019.jpg/330px-Alphonso_Davies_2019.jpg",
  alisson:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Alisson_Becker_2018.jpg/330px-Alisson_Becker_2018.jpg",
  "sadio-mane":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Sadio_Man%C3%A9_2018.jpg/330px-Sadio_Man%C3%A9_2018.jpg",
  "federico-valverde":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Federico_Valverde_2021_%28cropped%29.jpg/330px-Federico_Valverde_2021_%28cropped%29.jpg",
  figo:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Luis_Figo_2017.jpg/330px-Luis_Figo_2017.jpg",
  "memphis-depay":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Memphis_Depay_2018.jpg/330px-Memphis_Depay_2018.jpg",
  "romelu-lukaku":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Romelu_Lukaku_2018.jpg/330px-Romelu_Lukaku_2018.jpg",
  "thibaut-courtois":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Thibaut_Courtois_2018070910327.jpg/330px-Thibaut_Courtois_2018070910327.jpg",
  "eden-hazard":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Eden_Hazard_2018.jpg/330px-Eden_Hazard_2018.jpg",
  xavi:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Xavi_2017.jpg/330px-Xavi_2017.jpg",
  "wataru-endo":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Wataru_Endo_2023_%28cropped%29.jpg/330px-Wataru_Endo_2023_%28cropped%29.jpg",
};

function remoteFromManifest(slug: string): string {
  return manifestCache[slug] ?? REMOTE_BY_SLUG[slug] ?? "";
}

function configForSlug(slug: string): PlayerPhotoConfig {
  const crop = CROP_OVERRIDES[slug];
  return {
    slug,
    remoteUrl: remoteFromManifest(slug),
    objectPosition: crop?.objectPosition ?? "50% 18%",
    zoom: crop?.zoom ?? 1.28,
    credit: "Wikimedia Commons · CC BY-SA",
  };
}

export function photoFor(playerName: string): PlayerPhotoConfig | undefined {
  if (playerName in PLAYER_PHOTOS) return PLAYER_PHOTOS[playerName];
  const slug = PLAYER_SLUGS[playerName];
  if (!slug) return undefined;
  return configForSlug(slug);
}

export function hasPlayerPhoto(playerName: string): boolean {
  return playerName in PLAYER_PHOTOS || playerName in PLAYER_SLUGS;
}
