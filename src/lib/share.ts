import { GROUP_LETTERS } from "./types";
import { GROUP_MATCH_PAIRS, matchKey } from "./standings";
import { KNOCKOUT_MATCHES } from "./knockoutBracket";

/**
 * Compact base64-style encoding of simulator state into a URL hash.
 * Format:
 *   <72 bytes for groups (12 groups * 6 matches * 2 bytes home,away)>
 *   <32 nibbles for KO winners packed into 16 bytes; 0=unset, 1=home, 2=away>
 *
 * Goals are clamped to 0..15 (one nibble each).
 */
type Scores = Record<string, [number, number] | null>;
type KoWinners = Record<number, "home" | "away">;

const KO_IDS = KNOCKOUT_MATCHES.map((m) => m.id);

function clampGoal(n: number): number {
  if (!Number.isFinite(n)) return 0;
  if (n < 0) return 0;
  if (n > 15) return 15;
  return Math.floor(n);
}

export function encodeState(scores: Scores, ko: KoWinners): string {
  const bytes: number[] = [];

  for (const g of GROUP_LETTERS) {
    for (let i = 0; i < GROUP_MATCH_PAIRS.length; i++) {
      const sc = scores[matchKey(g, i)];
      if (!sc) {
        bytes.push(0xff); // sentinel for unset
        continue;
      }
      bytes.push(((clampGoal(sc[0]) & 0x0f) << 4) | (clampGoal(sc[1]) & 0x0f));
    }
  }

  // KO: 32 ids → pack 2 nibbles per byte (16 bytes)
  for (let i = 0; i < KO_IDS.length; i += 2) {
    const a = ko[KO_IDS[i]];
    const b = ko[KO_IDS[i + 1]];
    const va = a === "home" ? 1 : a === "away" ? 2 : 0;
    const vb = b === "home" ? 1 : b === "away" ? 2 : 0;
    bytes.push(((va & 0x0f) << 4) | (vb & 0x0f));
  }

  return bytesToBase64Url(Uint8Array.from(bytes));
}

export function decodeState(hash: string): { scores: Scores; ko: KoWinners } | null {
  try {
    const bytes = base64UrlToBytes(hash);
    let p = 0;
    const scores: Scores = {};
    for (const g of GROUP_LETTERS) {
      for (let i = 0; i < GROUP_MATCH_PAIRS.length; i++) {
        const b = bytes[p++];
        if (b === 0xff || b == null) {
          scores[matchKey(g, i)] = null;
        } else {
          scores[matchKey(g, i)] = [(b >> 4) & 0x0f, b & 0x0f];
        }
      }
    }
    const ko: KoWinners = {};
    for (let i = 0; i < KO_IDS.length; i += 2) {
      const byte = bytes[p++] ?? 0;
      const va = (byte >> 4) & 0x0f;
      const vb = byte & 0x0f;
      if (va === 1) ko[KO_IDS[i]] = "home";
      if (va === 2) ko[KO_IDS[i]] = "away";
      if (vb === 1) ko[KO_IDS[i + 1]] = "home";
      if (vb === 2) ko[KO_IDS[i + 1]] = "away";
    }
    return { scores, ko };
  } catch {
    return null;
  }
}

function bytesToBase64Url(bytes: Uint8Array): string {
  if (typeof window === "undefined") {
    return Buffer.from(bytes).toString("base64url");
  }
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(s: string): Uint8Array {
  if (typeof window === "undefined") {
    return Uint8Array.from(Buffer.from(s, "base64url"));
  }
  const padded = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
