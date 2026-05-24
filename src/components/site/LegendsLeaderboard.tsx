"use client";

import { TOP_SCORERS } from "@/data/moments";
import { OfficialFlag } from "@/components/ui/OfficialFlag";
import { PlayerFacePortrait } from "@/components/ui/PlayerFacePortrait";
import { TrophyIcon } from "@/components/ui/Icons";

const COUNTRY_COLORS: Record<
  string,
  { primary: string; secondary: string; titles: number }
> = {
  GER: { primary: "#000000", secondary: "#FFCC00", titles: 4 },
  FRG: { primary: "#000000", secondary: "#FFCC00", titles: 4 },
  BRA: { primary: "#FFCC00", secondary: "#0E5E2D", titles: 5 },
  FRA: { primary: "#0055A4", secondary: "#EF4135", titles: 2 },
  ARG: { primary: "#75AADB", secondary: "#FFFFFF", titles: 3 },
  HUN: { primary: "#477050", secondary: "#CD2A3E", titles: 0 },
};

/**
 * LegendsLeaderboard — all-time World Cup top scorers, broadsheet style.
 * Real, public-record data only.
 */
export function LegendsLeaderboard() {
  const max = Math.max(...TOP_SCORERS.map((s) => s.goals));

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20"
      style={{
        background:
          "linear-gradient(180deg, var(--pitch-900) 0%, var(--pitch-deep) 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Editorial column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <TrophyIcon
                width={28}
                height={28}
                className="text-[var(--gold)]"
              />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.6em] text-[var(--gold)]">
                Chapter 03 · The record
              </p>
            </div>
            <h2 className="display mt-2 text-5xl text-white sm:text-6xl">
              All-time
              <br />
              <span className="gold-sweep">scorers.</span>
            </h2>
            <p className="mt-5 font-serif text-base leading-relaxed text-white/85">
              The World Cup goal-scoring chart is football&rsquo;s holy text.
              Klose passed Ronaldo at the Mineirão in 2014. Messi tied Just
              Fontaine in Lusail 2022. Mbappé will rewrite this chart inside
              the next ten years.
            </p>
            <p className="mt-5 border-l-2 border-[var(--gold)] pl-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white/70">
              Sources · FIFA tournament records, public archives.
            </p>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-8">
            <ul className="space-y-2">
              {TOP_SCORERS.map((s) => {
                const colors = COUNTRY_COLORS[s.country] ?? {
                  primary: "#666666",
                  secondary: "#cccccc",
                  titles: 0,
                };
                return (
                  <li
                    key={s.player}
                    className="grid grid-cols-[2rem_2.5rem_4rem_1fr_auto] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 transition hover:border-[var(--gold)]/40 hover:bg-white/[0.06] sm:gap-4"
                  >
                    <span className="display tnum text-2xl text-[var(--gold)]">
                      {String(s.rank).padStart(2, "0")}
                    </span>
                    <OfficialFlag
                      code={s.country}
                      primary={colors.primary}
                      secondary={colors.secondary}
                      size={40}
                      variant="circle"
                      stars={colors.titles}
                    />
                    <PlayerFacePortrait
                      playerName={s.player}
                      primary={colors.primary}
                      secondary={colors.secondary}
                      size="sm"
                      label={s.player}
                      className="mx-auto"
                    />
                    <span>
                      <span className="display block text-2xl leading-none text-white">
                        {s.player}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
                        {s.country} · {s.span}
                      </span>
                    </span>

                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="hidden h-1.5 w-32 overflow-hidden rounded-full bg-white/5 sm:block"
                      >
                        <span
                          className="block h-full rounded-full"
                          style={{
                            width: `${(s.goals / max) * 100}%`,
                            background:
                              "linear-gradient(90deg, var(--pitch-500), var(--gold))",
                          }}
                        />
                      </span>
                      <span className="display tnum text-3xl text-white">
                        {s.goals}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                        goals
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
