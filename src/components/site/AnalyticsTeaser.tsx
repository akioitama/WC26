"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function AnalyticsTeaser() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 sm:p-12">
          <span
            aria-hidden
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--electric)]/15 blur-3xl"
          />
          <span
            aria-hidden
            className="absolute inset-0 grid-fade opacity-50"
          />
          <div className="relative grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--electric)]">
                Analytics intelligence
              </p>
              <h2 className="display mt-2 text-5xl text-white sm:text-6xl">
                A live <span className="electric-sweep">prediction</span>
                <br />
                engine. <span className="text-glow-gold gold-sweep">In your pocket.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm text-white/70">
                Monte‑Carlo over Elo. Stage probability charts. Group radars.
                Head‑to‑head match odds. Built like the analytics rooms inside
                top-tier broadcasters.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/analytics"
                  className="glow-electric inline-flex items-center gap-2 rounded-full bg-[var(--electric)] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.2em] text-[#02040a] hover:brightness-110"
                >
                  Open analytics
                </Link>
                <Link
                  href="/simulator"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.2em] text-white/85 hover:bg-white/5"
                >
                  Run a simulation
                </Link>
              </div>
            </div>
            <div className="relative">
              <FakeChart />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FakeChart() {
  const bars = [
    { code: "ARG", h: 90, c: "#75AADB" },
    { code: "FRA", h: 78, c: "#0055A4" },
    { code: "BRA", h: 72, c: "#FFCC00" },
    { code: "ESP", h: 64, c: "#AA151B" },
    { code: "ENG", h: 60, c: "#FFFFFF" },
    { code: "GER", h: 54, c: "#000000" },
    { code: "POR", h: 51, c: "#006600" },
    { code: "NED", h: 48, c: "#FF6B00" },
  ];
  return (
    <div className="surface relative h-[300px] overflow-hidden rounded-2xl p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--electric)]">
        Title odds (preview)
      </p>
      <div className="absolute inset-x-4 bottom-4 top-12 flex items-end gap-3">
        {bars.map((b, i) => (
          <div key={b.code} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-md transition-all"
              style={{
                height: `${b.h}%`,
                background: `linear-gradient(180deg, ${b.c} 0%, ${b.c}55 100%)`,
                boxShadow: `0 0 30px ${b.c}33`,
                animation: `chart-rise 1.4s ${i * 80}ms cubic-bezier(.65,0,.35,1) backwards`,
              }}
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/65">
              {b.code}
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes chart-rise {
          from {
            height: 0%;
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
