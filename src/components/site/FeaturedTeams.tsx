"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TEAMS } from "@/data/teams";
import { Reveal } from "@/components/ui/Reveal";
import { OfficialFlag } from "@/components/ui/OfficialFlag";

const FEATURED_SLUGS = [
  "argentina",
  "brazil",
  "germany",
  "france",
  "italy",
  "spain",
  "england",
  "portugal",
  "morocco",
  "japan",
];

export function FeaturedTeams() {
  const teams = FEATURED_SLUGS
    .map((slug) => TEAMS.find((t) => t.slug === slug))
    .filter(Boolean) as typeof TEAMS;

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <header className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]">
              The contenders
            </p>
            <h2 className="display mt-2 text-5xl text-[var(--fg)] sm:text-6xl">
              Featured teams
            </h2>
            <p className="mt-3 max-w-xl text-sm text-[var(--fg)]/70">
              Hover a card to see the kit and stars. Click to dive into a team’s
              full World Cup story, key players, and 2026 path.
            </p>
          </div>
          <Link
            href="/teams"
            className="inline-flex w-max items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--fg)]/80 transition hover:border-[var(--accent)]/60 hover:text-[var(--fg)]"
          >
            All 48 teams →
          </Link>
        </header>
      </Reveal>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {teams.map((t, i) => (
          <motion.li
            key={t.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <Link
              href={`/teams/${t.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--line)]"
              style={{
                background: `linear-gradient(160deg, ${t.colors.primary} 0%, ${t.colors.primary} 55%, color-mix(in oklab, ${t.colors.primary} 55%, black) 100%)`,
              }}
            >
              {/* Diagonal kit ribbon */}
              <span
                aria-hidden
                className="absolute -left-10 top-1/2 h-12 w-[140%] -rotate-12 opacity-60 transition-opacity group-hover:opacity-90"
                style={{ background: t.colors.secondary }}
              />
              <span
                aria-hidden
                className="absolute -left-10 top-1/2 h-3 w-[140%] -rotate-12 opacity-90"
                style={{ background: t.colors.trim }}
              />

              {/* Group tab top-right */}
              <span className="absolute right-3 top-3 rounded-md bg-black/30 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-white/85">
                Group {t.group2026 ?? "—"}
              </span>

              {/* Centered flag-as-shield */}
              <span className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
                <OfficialFlag
                  code={t.fifaCode}
                  primary={t.colors.primary}
                  secondary={t.colors.secondary}
                  size={96}
                  variant="shield"
                  stars={t.worldCup.titles}
                />
              </span>

              {/* Name */}
              <div className="absolute inset-x-3 bottom-3">
                <span className="display block text-3xl text-white">
                  {t.name}
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-white/70">
                  {t.worldCup.appearances} apps · {t.worldCup.bestFinish}
                </span>
              </div>

              {/* Hover overlay */}
              <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
