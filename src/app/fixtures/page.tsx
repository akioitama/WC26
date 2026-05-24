"use client";

import { useMemo } from "react";
import Link from "next/link";
import { GROUP_LETTERS } from "@/lib/types";
import { GROUP_MATCH_PAIRS } from "@/lib/standings";
import { TEAMS_BY_NAME } from "@/data/teams";
import { getGroupTeamNames } from "@/lib/thirdPlaceSelection";
import { VENUES_2026 } from "@/data/venues2026";
import { TeamFlag } from "@/components/ui/OfficialFlag";

const KICKOFF_BASE = new Date("2026-06-11T20:00:00-04:00").getTime();

export default function FixturesPage() {
  const fixtures = useMemo(
    () =>
      GROUP_LETTERS.flatMap((g, gi) => {
        const names = getGroupTeamNames(g);
        return GROUP_MATCH_PAIRS.map((pair, mi) => {
          const [hi, ai] = pair;
          const home = names[hi];
          const away = names[ai];
          const kickoff = new Date(
            KICKOFF_BASE + (gi * 6 + mi) * 1000 * 60 * 60 * 14,
          );
          const venue = VENUES_2026[(gi * 6 + mi) % VENUES_2026.length];
          return { g, mi, home, away, kickoff, venue };
        });
      }),
    [],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]">
          Group stage · 72 matches
        </p>
        <h1 className="display mt-2 text-6xl text-[var(--fg)] sm:text-7xl">
          Fixture <span className="text-[var(--accent)]">calendar</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--fg)]/70">
          Indicative kickoff order. Click any fixture to jump straight to its
          group in the simulator.
        </p>
      </header>

      <ul className="space-y-3">
        {fixtures.map((f) => {
          const home = TEAMS_BY_NAME[f.home];
          const away = TEAMS_BY_NAME[f.away];
          return (
            <li key={`${f.g}-${f.mi}`}>
              <Link
                href={`/simulator#group-${f.g}`}
                className="group flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 transition hover:border-[var(--accent)]/40 sm:p-4"
              >
                <div className="grid w-16 shrink-0 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--bg)_88%,black)] py-2 text-center">
                  <span className="display text-2xl text-[var(--accent)]">
                    {f.g}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--fg)]/55">
                    M{f.mi + 1}
                  </span>
                </div>
                <div className="grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
                  <span className="flex items-center justify-end gap-2 truncate text-right text-sm font-semibold text-[var(--fg)]">
                    <span className="truncate">{f.home}</span>
                    {home && <TeamFlag team={home} size={18} variant="rounded" />}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg)]/55">
                    vs
                  </span>
                  <span className="flex items-center gap-2 truncate text-sm font-semibold text-[var(--fg)]">
                    {away && <TeamFlag team={away} size={18} variant="rounded" />}
                    <span className="truncate">{f.away}</span>
                  </span>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--fg)]/55">
                    {f.kickoff.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                    })}{" "}
                    ·{" "}
                    {f.kickoff.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-[11px] text-[var(--fg)]/65">
                    {f.venue.name} · {f.venue.city}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
