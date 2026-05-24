"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { WC26Logo } from "@/components/ui/WC26Logo";
import { TOURNAMENT_FACTS } from "@/data/moments";
import {
  FootballIcon,
  TrophyIcon,
  WhistleIcon,
  CornerFlagIcon,
  GoalpostIcon,
} from "@/components/ui/Icons";
import { OfficialFlag, TeamFlag } from "@/components/ui/OfficialFlag";
import { getGroupTeamNames } from "@/lib/thirdPlaceSelection";
import { TEAMS_BY_NAME } from "@/data/teams";
import { VENUES_2026 } from "@/data/venues2026";

/**
 * MatchdayHero — a real football pitch as the hero. Field markings backdrop,
 * scattered footballs, scoreboard ribbon, programme typography. No WebGL.
 */
export function MatchdayHero() {
  const reduced = useReducedMotion();
  const fade = reduced
    ? ({ initial: false } as const)
    : ({
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const },
      } as const);

  return (
    <section className="relative isolate overflow-hidden">
      {/* Host stripe */}
      <div
        aria-label="Hosts: Canada, Mexico, United States"
        className="grid h-1.5 w-full grid-cols-3"
      >
        <span className="bg-[#FF0000]" />
        <span className="bg-[#006847]" />
        <span className="bg-[#3C3B6E]" />
      </div>

      {/* Pitch backdrop with field markings — pure SVG */}
      <PitchBackdrop />

      {/* Floating footballs */}
      <FloatingBalls />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28 lg:pt-16">
        {/* Programme masthead row */}
      <div className="flex flex-col gap-3 border-b border-white/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]">
            Official programme · Edition I
          </span>
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <WC26Logo context="hero" priority />
            <div className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-white/60 md:flex">
              <span>11 Jun → 19 Jul 2026</span>
              <span aria-hidden>·</span>
              <span>16 cities</span>
              <span aria-hidden>·</span>
              <span>48 nations</span>
            </div>
          </div>
        </div>

        <motion.div {...fade} className="grid gap-10 pt-10 lg:grid-cols-12">
          {/* Editorial headline */}
          <div className="lg:col-span-7">
            <h1 className="display text-white">
              <span
                className="block leading-[0.82]"
                style={{ fontSize: "clamp(3rem, 11vw, 11rem)" }}
              >
                The 23<sup className="text-[0.45em]">rd</sup>
              </span>
              <span
                className="gold-sweep block leading-[0.82]"
                style={{ fontSize: "clamp(3rem, 11vw, 11rem)" }}
              >
                World Cup.
              </span>
              <span
                className="block leading-[0.82]"
                style={{ fontSize: "clamp(3rem, 11vw, 11rem)" }}
              >
                Three nations.
              </span>
            </h1>

            <p className="mt-7 max-w-xl border-l-2 border-[var(--gold)] pl-5 font-serif text-lg leading-relaxed text-white/90">
              Canada. México. United States. The first 48-team tournament in
              history begins at <strong className="text-white">Estadio Azteca</strong>{" "}
              on the 11th of June and ends 39 days later under the lights of{" "}
              <strong className="text-white">MetLife Stadium</strong>. 104 matches.
              16 host cities. One trophy.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/simulator" size="lg" className="glow-gold">
                <span className="inline-flex items-center gap-2">
                  <WhistleIcon
                    width={16}
                    height={16}
                    className="text-[#0a1208]"
                  />
                  Run the simulator
                </span>
              </Button>
              <Button href="/teams" variant="outline" size="lg">
                The 48 nations
              </Button>
              <Button href="/history/2006" variant="ghost" size="lg">
                <span className="inline-flex items-center gap-2">
                  <TrophyIcon
                    width={16}
                    height={16}
                    className="text-[var(--gold)]"
                  />
                  Berlin 2006
                </span>
              </Button>
            </div>

            {/* Hosts row */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <HostTile code="CAN" name="Canada" cities="2" matches="13" />
              <HostTile code="MEX" name="México" cities="3" matches="13" />
              <HostTile code="USA" name="United States" cities="11" matches="78" />
            </div>
          </div>

          {/* Right: scoreboard + facts */}
          <div className="space-y-5 lg:col-span-5">
            <ScoreboardCard />
            <FactsCard />
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl border-t border-white/15 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">
          <span className="inline-flex items-center gap-2">
            <CornerFlagIcon
              width={14}
              height={14}
              className="text-[var(--gold)]"
            />
            WC26 · The Beautiful Game, Rendered
          </span>
          <Link
            href="/fixtures"
            className="text-[var(--gold)] hover:text-white"
          >
            104 fixtures →
          </Link>
        </div>
      </div>
    </section>
  );
}

function PitchBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* Mowing pattern */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 56px, transparent 56px 112px)," +
            "linear-gradient(180deg, var(--pitch-800) 0%, var(--pitch-deep) 100%)",
        }}
      />
      {/* Sun-like floodlight glow */}
      <div
        className="absolute inset-x-0 top-0 h-[60%]"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% -10%, rgba(245,196,81,0.18), transparent 60%)",
        }}
      />
      {/* Field lines SVG */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <g
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.2"
        >
          {/* Touchlines / outer rectangle (just the upper half visible) */}
          <line x1="0" y1="120" x2="1200" y2="120" />
          {/* Halfway line is at top */}
          <line x1="600" y1="120" x2="600" y2="800" />
          {/* Center circle */}
          <circle cx="600" cy="120" r="120" />
          <circle cx="600" cy="120" r="3" fill="rgba(255,255,255,0.7)" />
          {/* Penalty box hint at bottom */}
          <rect x="380" y="700" width="440" height="100" />
          <rect x="500" y="770" width="200" height="30" />
          <circle cx="600" cy="730" r="3" fill="rgba(255,255,255,0.7)" />
        </g>
      </svg>
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}

function FloatingBalls() {
  // Hand-tuned scatter positions. Pure CSS animation, no JS rAF.
  const balls = [
    { top: "14%", left: "6%", size: 32, delay: "0s", duration: "8s" },
    { top: "62%", left: "4%", size: 22, delay: "1.5s", duration: "10s" },
    { top: "26%", right: "8%", size: 28, delay: "0.7s", duration: "9s" },
    { top: "78%", right: "12%", size: 18, delay: "2s", duration: "11s" },
    { top: "8%", right: "32%", size: 14, delay: "0.3s", duration: "12s" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-[1]">
      {balls.map((b, i) => (
        <div
          key={i}
          className="absolute float-y opacity-30"
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        >
          <FootballIcon width={b.size} height={b.size} />
        </div>
      ))}
    </div>
  );
}

function HostTile({
  code,
  name,
  cities,
  matches,
}: {
  code: string;
  name: string;
  cities: string;
  matches: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-3 backdrop-blur-sm">
      <OfficialFlag
        code={code}
        primary="#FFFFFF"
        secondary="#FFFFFF"
        size={44}
        variant="rounded"
      />
      <div className="mt-2 text-xs font-bold uppercase tracking-wider text-white">
        {name}
      </div>
      <div className="mt-1 flex gap-3 font-mono text-[10px] text-white/70">
        <span>
          <span className="tnum text-white">{cities}</span> cities
        </span>
        <span>
          <span className="tnum text-white">{matches}</span> matches
        </span>
      </div>
    </div>
  );
}

function ScoreboardCard() {
  const openingVenue = VENUES_2026.find((v) => v.id === "azteca")!;
  const groupA = getGroupTeamNames("A");
  const homeTeam = TEAMS_BY_NAME[groupA[0]];
  const awayTeam = TEAMS_BY_NAME[groupA[1]];

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/15 p-5 backdrop-blur-md"
      style={{
        background:
          "linear-gradient(180deg, rgba(8,22,13,0.85) 0%, rgba(6,20,12,0.95) 100%)",
        boxShadow: "0 30px 60px -30px rgba(0,0,0,0.7)",
      }}
    >
      <div className="absolute right-4 top-4 z-10">
        <WC26Logo context="scoreboard" />
      </div>
      <div className="flex items-center justify-between border-b border-white/15 pb-2 pr-16">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/60">
          Opening match · Group A · Match 1
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--gold)]">
          11 · Jun · 2026
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        {homeTeam ? (
          <Side team={homeTeam} />
        ) : (
          <SideFallback code={groupA[0]} name={groupA[0]} />
        )}
        <div className="text-center">
          <div className="display tnum text-5xl text-white sm:text-6xl">
            <span>—</span>
            <span className="mx-2 text-white/30">vs</span>
            <span>—</span>
          </div>
          <div className="mt-1 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.4em] text-white/55">
            <GoalpostIcon
              width={11}
              height={11}
              className="text-white/55"
            />
            {openingVenue.name} · {openingVenue.city}
          </div>
        </div>
        {awayTeam ? (
          <Side team={awayTeam} right />
        ) : (
          <SideFallback code={groupA[1]} name={groupA[1]} right />
        )}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
        <Mini k="20:00" label="CDMX local" />
        <Mini k="GMT-6" label="Time zone" />
        <Mini k={openingVenue.capacity.toLocaleString()} label="Capacity" />
      </div>
    </div>
  );
}

function Side({ team, right }: { team: (typeof TEAMS_BY_NAME)[string]; right?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 ${
        right ? "justify-end text-right" : ""
      }`}
    >
      {!right && <TeamFlag team={team} size={48} variant="rounded" />}
      <div>
        <div className="display text-2xl text-white">{team.fifaCode}</div>
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/60">
          {team.name}
        </div>
      </div>
      {right && <TeamFlag team={team} size={48} variant="rounded" />}
    </div>
  );
}

function SideFallback({
  code,
  name,
  right,
}: {
  code: string;
  name: string;
  right?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        right ? "justify-end text-right" : ""
      }`}
    >
      {!right && (
        <OfficialFlag
          code={code.slice(0, 3).toUpperCase()}
          primary="#666666"
          secondary="#cccccc"
          size={48}
          variant="rounded"
        />
      )}
      <div>
        <div className="display text-2xl text-white">{code.slice(0, 3).toUpperCase()}</div>
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/60">
          {name}
        </div>
      </div>
      {right && (
        <OfficialFlag
          code={code.slice(0, 3).toUpperCase()}
          primary="#666666"
          secondary="#cccccc"
          size={48}
          variant="rounded"
        />
      )}
    </div>
  );
}

function Mini({ k, label }: { k: string; label: string }) {
  return (
    <div>
      <div className="display tnum text-base text-white">{k}</div>
      <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/55">
        {label}
      </div>
    </div>
  );
}

function FactsCard() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/15 p-5 backdrop-blur-md"
      style={{
        background:
          "linear-gradient(180deg, rgba(8,22,13,0.85) 0%, rgba(6,20,12,0.95) 100%)",
      }}
    >
      <div className="flex items-center justify-between border-b border-white/15 pb-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/60">
          Tournament facts · since 1930
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--gold)]">
          <TrophyIcon
            width={12}
            height={12}
            className="text-[var(--gold)]"
          />
          FIFA records
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-x-3 gap-y-5">
        {TOURNAMENT_FACTS.map((f) => (
          <div key={f.label}>
            <div className="display tnum text-3xl leading-none text-white">
              {f.k}
            </div>
            <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-white/65">
              {f.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
