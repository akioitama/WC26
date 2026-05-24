"use client";

import Link from "next/link";
import type { Team } from "@/data/teams";
import { KitSwatch } from "@/components/ui/KitSwatch";
import { StatCounter } from "@/components/ui/Stat";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { HonoursTimeline } from "./HonoursTimeline";
import { PlayerCard3D } from "./PlayerCard3D";
import { PlayerFacePortrait } from "@/components/ui/PlayerFacePortrait";
import { TeamFlag } from "@/components/ui/OfficialFlag";

export function TeamProfile({ team }: { team: Team }) {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative isolate overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${team.colors.primary} 0%, color-mix(in oklab, ${team.colors.primary} 60%, black) 80%)`,
        }}
      >
        <span
          aria-hidden
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-50 blur-3xl"
          style={{ background: team.colors.secondary }}
        />
        <span
          aria-hidden
          className="absolute -left-12 top-1/2 h-20 w-[140%] -rotate-12"
          style={{ background: team.colors.trim, opacity: 0.55 }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
          <div className="text-white">
            <Link
              href="/teams"
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/70 hover:text-white"
            >
              ← All teams
            </Link>
            <div className="mt-4 flex items-center gap-4">
              <TeamFlag team={team} size={88} variant="shield" stars={team.worldCup.titles} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/70">
                  {team.confederation} · Group {team.group2026 ?? "—"}
                </p>
                <h1 className="display mt-1 text-white" style={{ fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 0.85 }}>
                  {team.name}
                </h1>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <Pill label={`FIFA #${team.fifaRank ?? "—"}`} />
              <Pill label={`Elo ${team.elo}`} />
              <Pill label={`${team.worldCup.titles} ★ titles`} />
              <Pill label={team.worldCup.bestFinish} />
              {team.manager && <Pill label={`Manager: ${team.manager}`} />}
            </div>
            {team.story && (
              <p className="mt-6 max-w-xl text-white/85">{team.story}</p>
            )}
            {team.motto && (
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.4em] text-white/60">
                “{team.motto}”
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={`/simulator#group-${team.group2026 ?? "A"}`}
                size="lg"
              >
                Simulate their path
              </Button>
              <Button href="/teams" variant="ghost" size="lg">
                Compare nations
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <KitSwatch team={team} variant="home" size={160} number={10} />
            <KitSwatch team={team} variant="away" size={130} number={9} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCounter to={team.worldCup.appearances} label="Appearances" />
          <StatCounter to={team.worldCup.titles} label="Titles" suffix="★" />
          <StatCounter
            to={team.worldCup.history.length}
            label="Historic results"
          />
          <StatCounter to={team.elo} label="Elo (est.)" />
        </div>
      </section>

      {/* Timeline */}
      {team.worldCup.history.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Reveal>
            <header className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]">
                Honours
              </p>
              <h2 className="display mt-2 text-4xl text-[var(--fg)] sm:text-5xl">
                Selected World Cup history
              </h2>
            </header>
            <HonoursTimeline entries={team.worldCup.history} primary={team.colors.primary} />
          </Reveal>
        </section>
      )}

      {/* Key players */}
      {team.keyPlayers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Reveal>
            <header className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]">
                Squad picks
              </p>
              <h2 className="display mt-2 text-4xl text-[var(--fg)] sm:text-5xl">
                Key players
              </h2>
            </header>
            <ul
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
              style={{ perspective: 1100 }}
            >
              {team.keyPlayers.map((p) => (
                <li key={p.name}>
                  <PlayerCard3D team={team} player={p} />
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      {/* Legends */}
      {team.legends.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Reveal>
            <header className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]">
                The greats
              </p>
              <h2 className="display mt-2 text-4xl text-[var(--fg)] sm:text-5xl">
                Legends
              </h2>
            </header>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {team.legends.map((l) => (
                <li
                  key={l.name}
                  className="surface flex items-center gap-4 rounded-2xl p-5"
                >
                  <PlayerFacePortrait
                    playerName={l.name}
                    primary={team.colors.primary}
                    secondary={team.colors.secondary}
                    size="md"
                  />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--fg)]/55">
                      {l.era}
                    </p>
                    <p className="mt-1 text-lg font-bold text-[var(--fg)]">
                      {l.name}
                    </p>
                    <p className="mt-1 text-sm text-[var(--fg)]/75">
                      {l.honour}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}
    </div>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
      {label}
    </span>
  );
}
