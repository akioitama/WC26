"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TeamHistoryEntry } from "@/data/teams";

const ICON: Record<TeamHistoryEntry["result"], { color: string; symbol: string }> = {
  Champions: { color: "var(--gold-bright)", symbol: "★" },
  "Runners-up": { color: "#C0C0C0", symbol: "▲" },
  Third: { color: "#cd7f32", symbol: "●" },
  Fourth: { color: "#888", symbol: "●" },
  "Quarter-finals": { color: "var(--fg)", symbol: "◆" },
  "Round of 16": { color: "var(--fg)", symbol: "◆" },
  "Round of 32": { color: "var(--fg)", symbol: "◆" },
  "Group stage": { color: "var(--fg)", symbol: "·" },
  "Did not qualify": { color: "var(--fg)", symbol: "·" },
};

export function HonoursTimeline({
  entries,
  primary,
}: {
  entries: TeamHistoryEntry[];
  primary: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "0 50%",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
      gsap.from("[data-honour]", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const sorted = [...entries].sort((a, b) => a.year - b.year);

  return (
    <div ref={ref} className="relative">
      <div className="no-scrollbar relative overflow-x-auto pb-4">
        <div className="relative inline-flex min-w-full items-center gap-10 px-2 pt-10">
          <span
            ref={lineRef}
            aria-hidden
            className="absolute left-2 right-2 top-[58px] block h-[3px] origin-left rounded-full"
            style={{ background: `linear-gradient(90deg, ${primary}, var(--accent))` }}
          />
          {sorted.map((e) => {
            const k = ICON[e.result];
            return (
              <div
                data-honour
                key={`${e.year}-${e.host}`}
                className="relative flex min-w-[160px] flex-col items-center gap-2 text-center"
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-full border-2 bg-[var(--bg)] text-2xl"
                  style={{ borderColor: k.color, color: k.color }}
                >
                  {k.symbol}
                </span>
                <span className="display text-3xl text-[var(--fg)]">{e.year}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--fg)]/60">
                  {e.host}
                </span>
                <span className="text-xs text-[var(--fg)]/85">{e.result}</span>
                {e.notes && (
                  <span className="max-w-[180px] text-[11px] italic text-[var(--fg)]/55">
                    {e.notes}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
