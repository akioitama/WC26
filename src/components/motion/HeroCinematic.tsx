"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import { Ball } from "./Ball";
import { Button } from "@/components/ui/Button";
import { GROUP_LETTERS } from "@/lib/types";
import { TEAMS } from "@/data/teams";
import { FlagPill } from "@/components/ui/FlagPill";

export function HeroCinematic() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const flagRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Initial entrance
      gsap.from(ballRef.current, {
        x: -240,
        rotation: -540,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
      });
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      // Idle gentle spin on the ball
      gsap.to(ballRef.current, {
        rotation: "+=360",
        duration: 14,
        ease: "none",
        repeat: -1,
      });

      // Flag-row drift
      gsap.to(flagRowRef.current, {
        xPercent: -50,
        duration: 60,
        ease: "none",
        repeat: -1,
      });

      // Scroll-driven scale & fade out as user leaves
      gsap.to([titleRef.current, ballRef.current], {
        scale: 1.18,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sceneRef}
      className="relative isolate overflow-hidden pitch-panel min-h-[92vh]"
    >
      <div className="floodlight absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" aria-hidden />

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-between px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[var(--chalk)]/70">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)] pitch-pulse" />
          Canada · México · United States
          <span className="hidden sm:inline">· June 11 → July 19, 2026</span>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h1
              ref={titleRef}
              className="display text-white"
              style={{ fontSize: "clamp(3rem, 12vw, 12rem)" }}
            >
              World <span className="text-[var(--accent)]">Cup</span>
              <br />
              <span className="gold-sweep">Twenty‑Six</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">
              48 nations. 12 groups. 104 matches. One trophy.
              <br className="hidden sm:block" />
              An advanced bracket simulator, a tour of every contender, and a
              love letter to the beautiful game.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/simulator" size="lg">
                Run the simulator
                <ArrowIcon />
              </Button>
              <Button href="/teams" variant="ghost" size="lg">
                Explore teams
              </Button>
              <Button href="/history/2006" variant="outline" size="lg">
                Berlin ’06 tribute
              </Button>
            </div>
          </div>

          <div className="relative flex h-[260px] items-center justify-center sm:h-[340px] lg:h-[420px]">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--accent) 30%, transparent), transparent 70%)",
              }}
            />
            <div
              ref={ballRef}
              className="relative grid place-items-center"
            >
              <Ball size={260} />
              <div className="absolute -bottom-2 left-1/2 h-3 w-40 -translate-x-1/2 rounded-full bg-black/60 blur-md" />
            </div>
            <BadgeStat label="Groups" value="12" className="absolute left-0 top-6 sm:left-4" />
            <BadgeStat label="Teams" value="48" className="absolute right-0 top-16 sm:right-4" />
            <BadgeStat label="Matches" value="104" className="absolute -bottom-2 right-2 sm:right-12" />
          </div>
        </div>

        {/* Flag drift row */}
        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg)] to-transparent" />
          <div ref={flagRowRef} className="flex w-max gap-3">
            {[...TEAMS, ...TEAMS].map((t, i) => (
              <FlagPill key={`${t.slug}-${i}`} team={t} size="sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Group tiles row at bottom */}
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {GROUP_LETTERS.map((g, i) => (
              <motion.div
                key={g}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.04, duration: 0.5 }}
              >
                <Link
                  href={`/simulator#group-${g}`}
                  className="flex min-w-[64px] flex-col items-center gap-0.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center transition hover:border-[var(--accent)]/60 hover:bg-white/10"
                >
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/55">
                    Group
                  </span>
                  <span className="display text-2xl text-[var(--accent)]">
                    {g}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BadgeStat({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-white backdrop-blur-md ${className ?? ""}`}
    >
      <div className="display tnum text-3xl leading-none">{value}</div>
      <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60">
        {label}
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
