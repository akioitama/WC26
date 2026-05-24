"use client";

import { motion } from "framer-motion";
import { VENUES_2026 } from "@/data/venues2026";
import { StatCounter } from "@/components/ui/Stat";

export default function VenuesPage() {
  const total = VENUES_2026.reduce((s, v) => s + v.capacity, 0);
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]">
          16 cities · 3 nations
        </p>
        <h1 className="display mt-2 text-6xl text-[var(--fg)] sm:text-7xl">
          The hosts of <span className="text-[var(--accent)]">2026</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--fg)]/70">
          The first World Cup spread across three nations. From Estadio Azteca’s
          opener to MetLife’s final, every stadium has its own story.
        </p>
      </header>

      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCounter to={16} label="Cities" />
        <StatCounter to={3} label="Host nations" />
        <StatCounter to={104} label="Matches" />
        <StatCounter to={Math.round(total / 1000)} label="Capacity (k)" />
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VENUES_2026.map((v, i) => (
          <motion.li
            key={v.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            className="surface relative overflow-hidden rounded-2xl p-5"
            style={{ borderColor: `${v.accent}55` }}
          >
            <span
              aria-hidden
              className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-2xl"
              style={{ background: v.accent }}
            />
            <Stadium accent={v.accent} />
            <div className="relative">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--fg)]/55">
                {v.country} · {v.city}
              </p>
              <h3 className="display mt-1 text-3xl text-[var(--fg)]">
                {v.name}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[var(--fg)]/70">
                <span>
                  Capacity{" "}
                  <span className="font-mono tnum text-[var(--fg)]">
                    {v.capacity.toLocaleString()}
                  </span>
                </span>
                <span>
                  Matches{" "}
                  <span className="font-mono tnum text-[var(--fg)]">
                    {v.matchesHosted}
                  </span>
                </span>
              </div>
              {v.highlight && (
                <p
                  className="mt-3 text-xs font-bold uppercase tracking-[0.25em]"
                  style={{ color: v.accent }}
                >
                  ★ {v.highlight}
                </p>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function Stadium({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 60" className="mb-4 h-12 w-full" aria-hidden>
      <ellipse cx="100" cy="50" rx="92" ry="10" fill="rgba(0,0,0,0.35)" />
      <path
        d="M10 45 C 30 22, 80 12, 100 12 C 120 12, 170 22, 190 45 Z"
        fill={`${accent}55`}
        stroke={accent}
        strokeWidth="1.4"
      />
      <path
        d="M30 45 C 50 30, 80 24, 100 24 C 120 24, 150 30, 170 45 Z"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />
      <line x1="100" y1="24" x2="100" y2="45" stroke="white" strokeOpacity="0.4" />
    </svg>
  );
}
