"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { ParticleField } from "./ParticleField";
import { Countdown } from "./Countdown";
import { Button } from "@/components/ui/Button";
import { TEAMS } from "@/data/teams";
import Link from "next/link";
import { TeamFlag } from "@/components/ui/OfficialFlag";

const StadiumScene = dynamic(() => import("./StadiumScene"), {
  ssr: false,
  loading: () => null,
});

export function CinematicHero() {
  const root = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Mount gate prevents framer-motion / WebGL from rendering before the
  // browser is ready (avoids "removeChild ... not a child" reconciler errors
  // on hydration).
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax via scroll progress
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Mouse parallax for foreground elements
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useTransform(mx, [-0.5, 0.5], [-12, 12]);
  const ty = useTransform(my, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 60,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.2,
        });
      }
    }, root);

    const sectionEl = root.current;
    function onMove(e: PointerEvent) {
      const rect = sectionEl?.getBoundingClientRect();
      if (!rect) return;
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    }
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, [mx, my]);

  return (
    <section
      ref={root}
      className="relative isolate min-h-[100vh] overflow-hidden"
    >
      {/* Background layers (pure DOM, never touched by motion exit) */}
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-60" aria-hidden />
      {mounted && <ParticleField density={70} />}
      <span
        aria-hidden
        className="beam"
        style={{ left: "-10vw", top: "-30vh", transform: "rotate(-12deg)" }}
      />
      <span
        aria-hidden
        className="beam"
        style={{ right: "-10vw", top: "-30vh", transform: "rotate(14deg)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(2,4,10,0.85) 80%, var(--obsidian) 100%)",
        }}
      />

      {/* 3D scene — only render after mount to avoid SSR / WebGL race */}
      {mounted && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ x: tx, y: ty, opacity, scale }}
        >
          <div className="absolute inset-0">
            <StadiumScene />
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100vh] max-w-7xl flex-col justify-between px-4 py-20 sm:px-6 lg:px-8">
        {/* Top */}
        <motion.div
          style={{ y: yTitle, opacity }}
          className="flex items-center justify-between gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--electric)]">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--electric)] pitch-pulse align-middle" />
            Live · Pre-tournament · 2026
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.4em] text-white/55 sm:block">
            Canada · México · United States
          </span>
        </motion.div>

        {/* Center */}
        <motion.div
          style={{ y: yTitle, opacity, scale }}
          className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-[var(--electric)] text-glow-electric">
              The Football Universe · Re-rendered
            </p>
            <h1
              ref={titleRef}
              className="display mt-5 text-white"
              style={{ fontSize: "clamp(3.5rem, 13vw, 13rem)" }}
            >
              <span className="block text-glow-electric">World</span>
              <span className="electric-sweep block">Cup 26</span>
              <span className="block text-glow-gold gold-sweep">Awaits.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              48 nations. 16 cities. 104 matches. Powered by an Annex-C accurate
              simulator, cinematic team stories, and a live analytics engine.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/simulator" size="lg" className="glow-electric">
                Run the simulator
              </Button>
              <Button href="/analytics" variant="outline" size="lg">
                View analytics
              </Button>
              <Button href="/teams" variant="ghost" size="lg">
                The 48 nations
              </Button>
            </div>
            <div className="mt-10 max-w-md">
              <Countdown />
            </div>
          </div>

          {/* Right rail: stat tiles */}
          <motion.div
            style={{ x: tx, y: ty }}
            className="grid grid-cols-2 gap-3"
          >
            <StatTile k="48" label="Nations" />
            <StatTile k="12" label="Groups" />
            <StatTile k="104" label="Matches" />
            <StatTile k="495" label="Annex C" />
            <div className="col-span-2 surface relative overflow-hidden rounded-2xl p-4">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 grid-fade opacity-40"
              />
              <p className="relative text-[9px] font-bold uppercase tracking-[0.4em] text-white/55">
                Story arc
              </p>
              <p className="relative mt-1 text-base text-white">
                Maradona. Zidane. Messi. <br className="hidden sm:block" />
                Mbappé. Bellingham. Yamal. Vinícius.
              </p>
              <Link
                href="/teams"
                className="relative mt-2 inline-flex text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--electric)] hover:text-white"
              >
                Explore the legends →
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom: flag drift — pure CSS marquee (no GSAP) */}
        <div className="relative mt-14 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />
          <div className="marquee-track flex w-max gap-2.5 py-2">
            {[...TEAMS, ...TEAMS].map((t, i) => (
              <Link
                key={`${t.slug}-${i}`}
                href={`/teams/${t.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur transition hover:border-[var(--electric)]/60 hover:bg-white/10"
              >
                <TeamFlag team={t} size={12} variant="circle" />
                <span className="text-xs font-semibold text-white/85 group-hover:text-white">
                  {t.fifaCode}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Floor reflection */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(43,210,255,0.08))",
          maskImage: "linear-gradient(180deg, transparent, black)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black)",
        }}
      />
    </section>
  );
}

function StatTile({ k, label }: { k: string; label: string }) {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-4">
      <span
        aria-hidden
        className="pointer-events-none holo absolute inset-0 holo-shimmer"
      />
      <div className="display relative tnum text-5xl text-white sm:text-6xl">
        {k}
      </div>
      <p className="relative font-mono text-[9px] uppercase tracking-[0.3em] text-white/55">
        {label}
      </p>
    </div>
  );
}
