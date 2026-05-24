/**
 * Nation-specific kit patterns — visually matches official home kits.
 * CC-safe SVG renderings (not trademarked manufacturer assets).
 */

import kitManifest from "../../public/kits/manifest.json";

export type KitPattern =
  | "argentina"
  | "brazil"
  | "germany"
  | "france"
  | "italy"
  | "spain"
  | "england"
  | "portugal"
  | "netherlands"
  | "belgium"
  | "croatia"
  | "uruguay"
  | "mexico"
  | "usa"
  | "japan"
  | "stripes-v"
  | "stripes-h"
  | "hoops"
  | "solid";

export const KIT_PATTERN: Record<string, KitPattern> = {
  ARG: "argentina",
  BRA: "brazil",
  GER: "germany",
  FRA: "france",
  ITA: "italy",
  ESP: "spain",
  ENG: "england",
  POR: "portugal",
  NED: "netherlands",
  BEL: "belgium",
  CRO: "croatia",
  URU: "uruguay",
  MEX: "mexico",
  USA: "usa",
  JPN: "japan",
  MAR: "solid",
  SEN: "stripes-v",
  CAN: "solid",
  SUI: "solid",
  KOR: "solid",
  ECU: "stripes-h",
  CIV: "solid",
  KSA: "solid",
  EGY: "solid",
  COL: "stripes-v",
  AUS: "hoops",
  TUR: "solid",
  SWE: "stripes-h",
  NOR: "solid",
  AUT: "solid",
  SCO: "hoops",
  CZE: "solid",
  IRN: "solid",
  GHA: "stripes-h",
  TUN: "solid",
  ALG: "solid",
  PAR: "stripes-h",
  RSA: "solid",
  BIH: "solid",
  QAT: "solid",
  HAI: "stripes-h",
  CUW: "solid",
  NZL: "solid",
  CPV: "stripes-h",
  IRQ: "solid",
  JOR: "solid",
  COD: "solid",
  UZB: "solid",
  PAN: "stripes-h",
};

export function patternForCode(fifaCode: string): KitPattern {
  return KIT_PATTERN[fifaCode] ?? "solid";
}

/** Optional bundled PNG from npm run fetch:kits */
export type KitConfig = {
  home: string;
  away?: string;
  credit: string;
};

export const TEAM_KITS: Record<string, KitConfig> = {
  ARG: { home: "arg-home", credit: "Wikimedia Commons · CC BY-SA" },
  BRA: { home: "bra-home", credit: "Wikimedia Commons · CC BY-SA" },
  GER: { home: "ger-home", credit: "Wikimedia Commons · CC BY-SA" },
  FRA: { home: "fra-home", credit: "Wikimedia Commons · CC BY-SA" },
  ITA: { home: "ita-home", credit: "Wikimedia Commons · CC BY-SA" },
  ESP: { home: "esp-home", credit: "Wikimedia Commons · CC BY-SA" },
  ENG: { home: "eng-home", credit: "Wikimedia Commons · CC BY-SA" },
  POR: { home: "por-home", credit: "Wikimedia Commons · CC BY-SA" },
  NED: { home: "ned-home", credit: "Wikimedia Commons · CC BY-SA" },
  BEL: { home: "bel-home", credit: "Wikimedia Commons · CC BY-SA" },
  CRO: { home: "cro-home", credit: "Wikimedia Commons · CC BY-SA" },
  URU: { home: "uru-home", credit: "Wikimedia Commons · CC BY-SA" },
  MAR: { home: "mar-home", credit: "Wikimedia Commons · CC BY-SA" },
  JPN: { home: "jpn-home", credit: "Wikimedia Commons · CC BY-SA" },
  SEN: { home: "sen-home", credit: "Wikimedia Commons · CC BY-SA" },
  MEX: { home: "mex-home", credit: "Wikimedia Commons · CC BY-SA" },
  USA: { home: "usa-home", credit: "Wikimedia Commons · CC BY-SA" },
  CAN: { home: "can-home", credit: "Wikimedia Commons · CC BY-SA" },
  SUI: { home: "sui-home", credit: "Wikimedia Commons · CC BY-SA" },
  KOR: { home: "kor-home", credit: "Wikimedia Commons · CC BY-SA" },
  ECU: { home: "ecu-home", credit: "Wikimedia Commons · CC BY-SA" },
  CIV: { home: "civ-home", credit: "Wikimedia Commons · CC BY-SA" },
  KSA: { home: "ksa-home", credit: "Wikimedia Commons · CC BY-SA" },
  EGY: { home: "egy-home", credit: "Wikimedia Commons · CC BY-SA" },
  COL: { home: "col-home", credit: "Wikimedia Commons · CC BY-SA" },
  AUS: { home: "aus-home", credit: "Wikimedia Commons · CC BY-SA" },
  TUR: { home: "tur-home", credit: "Wikimedia Commons · CC BY-SA" },
  SWE: { home: "swe-home", credit: "Wikimedia Commons · CC BY-SA" },
  NOR: { home: "nor-home", credit: "Wikimedia Commons · CC BY-SA" },
  AUT: { home: "aut-home", credit: "Wikimedia Commons · CC BY-SA" },
  SCO: { home: "sco-home", credit: "Wikimedia Commons · CC BY-SA" },
  CZE: { home: "cze-home", credit: "Wikimedia Commons · CC BY-SA" },
  IRN: { home: "irn-home", credit: "Wikimedia Commons · CC BY-SA" },
  GHA: { home: "gha-home", credit: "Wikimedia Commons · CC BY-SA" },
  TUN: { home: "tun-home", credit: "Wikimedia Commons · CC BY-SA" },
  ALG: { home: "alg-home", credit: "Wikimedia Commons · CC BY-SA" },
  PAR: { home: "par-home", credit: "Wikimedia Commons · CC BY-SA" },
  RSA: { home: "rsa-home", credit: "Wikimedia Commons · CC BY-SA" },
  BIH: { home: "bih-home", credit: "Wikimedia Commons · CC BY-SA" },
  QAT: { home: "qat-home", credit: "Wikimedia Commons · CC BY-SA" },
  HAI: { home: "hai-home", credit: "Wikimedia Commons · CC BY-SA" },
  CUW: { home: "cuw-home", credit: "Wikimedia Commons · CC BY-SA" },
  NZL: { home: "nzl-home", credit: "Wikimedia Commons · CC BY-SA" },
  CPV: { home: "cpv-home", credit: "Wikimedia Commons · CC BY-SA" },
  IRQ: { home: "irq-home", credit: "Wikimedia Commons · CC BY-SA" },
  JOR: { home: "jor-home", credit: "Wikimedia Commons · CC BY-SA" },
  COD: { home: "cod-home", credit: "Wikimedia Commons · CC BY-SA" },
  UZB: { home: "uzb-home", credit: "Wikimedia Commons · CC BY-SA" },
  PAN: { home: "pan-home", credit: "Wikimedia Commons · CC BY-SA" },
};

export const KIT_REMOTE: Record<string, string> = kitManifest as Record<string, string>;

export function kitImageUrl(
  fifaCode: string,
  variant: "home" | "away" = "home",
): string | null {
  const cfg = TEAM_KITS[fifaCode];
  if (!cfg) return null;
  const slug = variant === "home" ? cfg.home : cfg.away ?? cfg.home;
  return `/kits/${slug}.png`;
}

export function kitRemoteUrl(
  fifaCode: string,
  variant: "home" | "away" = "home",
): string | null {
  const cfg = TEAM_KITS[fifaCode];
  if (!cfg) return null;
  const slug = variant === "home" ? cfg.home : cfg.away ?? cfg.home;
  return KIT_REMOTE[slug] ?? null;
}

export function hasKit(fifaCode: string): boolean {
  const cfg = TEAM_KITS[fifaCode];
  if (!cfg) return false;
  // Only attempt PNG load when fetch:kits actually saved the file (manifest entry)
  return cfg.home in KIT_REMOTE;
}
