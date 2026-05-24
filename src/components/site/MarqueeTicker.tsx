"use client";

import { useMemo } from "react";

const ITEMS = [
  "ARGENTINA 2 — 1 BRAZIL · GROUP J UPSET",
  "ITALY 1 — 1 FRANCE · 5–3 PENS · BERLIN ’06",
  "DONNARUMMA SAVES TWO IN R16",
  "FRANCE TOPS GROUP I",
  "ENGLAND 3 — 0 GHANA",
  "MBAPPÉ HAT-TRICK",
  "GERMANY ADVANCE AS BEST 3RD",
  "ZIDANE LIFTS GOLDEN BALL",
  "MOROCCO STUN BELGIUM",
  "JAPAN TOP GROUP F",
];

export function MarqueeTicker() {
  const reel = useMemo(() => [...ITEMS, ...ITEMS], []);
  return (
    <div className="border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_94%,black)]">
      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 animate-[marquee_55s_linear_infinite] gap-10 whitespace-nowrap py-2 pr-10 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--fg)]/70">
          {reel.map((t, i) => (
            <span key={i} className="flex items-center gap-3">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] pitch-pulse"
                aria-hidden
              />
              {t}
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 animate-[marquee_55s_linear_infinite] gap-10 whitespace-nowrap py-2 pr-10 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--fg)]/70"
        >
          {reel.map((t, i) => (
            <span key={i} className="flex items-center gap-3">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] pitch-pulse"
                aria-hidden
              />
              {t}
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
