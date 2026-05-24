"use client";

import { MOMENTS, type Moment } from "@/data/moments";
import { OfficialFlag } from "@/components/ui/OfficialFlag";
import { PlayerFacePortrait } from "@/components/ui/PlayerFacePortrait";
import { FootballIcon } from "@/components/ui/Icons";

const TITLES_BY_COUNTRY: Record<string, number> = {
  BRA: 5,
  ITA: 4,
  GER: 4,
  FRG: 4,
  ARG: 3,
  FRA: 2,
  URU: 2,
  ENG: 1,
  ESP: 1,
  NED: 0,
  HUN: 0,
};

/**
 * IconicMoments — horizontal-scroll showcase of legendary World Cup moments.
 * Native CSS overflow scrolling (no JS), snap-x for tactile feel.
 * Each card is a self-contained programme-style moment card.
 */
export function IconicMoments() {
  return (
    <section
      className="relative overflow-hidden border-y border-white/15 py-16 sm:py-20"
      style={{
        background:
          "linear-gradient(180deg, var(--pitch-deep) 0%, var(--pitch-900) 50%, var(--pitch-deep) 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 border-b border-white/15 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <FootballIcon width={28} height={28} />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.6em] text-[var(--gold)]">
                Chapter 02 · The vault
              </p>
            </div>
            <h2 className="display mt-2 text-5xl text-white sm:text-7xl">
              Sixteen moments,
              <br />
              <span className="gold-sweep">a century of football.</span>
            </h2>
          </div>
          <p className="hidden max-w-sm font-serif text-base leading-relaxed text-white/75 lg:block">
            From Pelé&rsquo;s chest-trap in Stockholm to Messi&rsquo;s
            coronation in Lusail — the ten frames of footage every kid in
            the world has watched.
          </p>
        </div>
      </div>

      <div className="relative mt-10">
        <div
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-8"
          style={{ scrollPaddingLeft: "1.5rem" }}
        >
          {MOMENTS.map((m, i) => (
            <MomentCard key={m.id} m={m} index={i} />
          ))}
          <div className="shrink-0 pr-4" aria-hidden />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-2 sm:px-6 lg:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
          ← Drag · Scroll · Swipe →
        </p>
      </div>
    </section>
  );
}

function MomentCard({ m, index }: { m: Moment; index: number }) {
  const titles = TITLES_BY_COUNTRY[m.country] ?? 0;
  return (
    <article
      className="relative w-[88vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/15 sm:w-[480px] lg:w-[540px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(10,37,21,0.95) 0%, rgba(6,20,12,0.98) 100%)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.04), 0 30px 60px -30px rgba(0,0,0,0.8)",
      }}
    >
      {/* Country accent stripe */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${m.countryColors.primary}, ${m.countryColors.secondary})`,
        }}
      />

      {/* Halftone graphic + crest */}
      <PhotoPanel m={m} index={index} titles={titles} />

      <div className="relative px-6 pb-6 pt-5">
        {/* Year tab + flag mini */}
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.4em]">
          <span className="inline-flex items-center gap-2">
            <OfficialFlag
              code={m.country}
              primary={m.countryColors.primary}
              secondary={m.countryColors.secondary}
              size={28}
              variant="rounded"
              stars={titles}
            />
            <span className="text-white/85">
              {m.countryName} · {m.year}
            </span>
          </span>
          <span className="text-white/55">{m.stage}</span>
        </div>

        {/* Headline */}
        <h3 className="display mt-4 text-3xl leading-tight text-white sm:text-4xl">
          {m.headline}
        </h3>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/65">
            {m.player}
          </span>
          {m.number && (
            <span className="display tnum text-base text-[var(--gold)]">
              #{m.number}
            </span>
          )}
        </div>

        {/* Scoreline ribbon */}
        <div
          className="mt-4 rounded-lg border border-white/10 px-3 py-2 font-mono text-xs text-white/90"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <span className="text-white/55">Fixture · </span>
          <span className="tnum">{m.fixture}</span>
          {m.minute && (
            <>
              <span className="text-white/55"> · </span>
              <span className="tnum text-[var(--gold)]">{m.minute}</span>
            </>
          )}
        </div>

        <p className="mt-4 font-serif text-[15px] leading-relaxed text-white/85">
          {m.blurb}
        </p>

        <p className="mt-4 border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">
          {m.legacy}
        </p>
      </div>
    </article>
  );
}

/**
 * PhotoPanel — a fictional but evocative "match programme" graphic.
 * Pure SVG: country color block + halftone dot pattern + jersey number.
 * No copyrighted images; the vibe carries the story.
 */
function PhotoPanel({
  m,
  index,
  titles,
}: {
  m: Moment;
  index: number;
  titles: number;
}) {
  const dotId = `dot-${m.id}`;
  const gradId = `grad-${m.id}`;

  return (
    <div className="relative aspect-[5/3] w-full overflow-hidden">
      {/* Color block + halftone background */}
      <svg
        viewBox="0 0 600 360"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern
            id={dotId}
            x="0"
            y="0"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="1.2" fill="rgba(255,255,255,0.20)" />
          </pattern>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="0%"
              stopColor={m.countryColors.primary}
              stopOpacity="0.92"
            />
            <stop
              offset="100%"
              stopColor={m.countryColors.secondary}
              stopOpacity="0.6"
            />
          </linearGradient>
        </defs>

        <rect width="600" height="360" fill={`url(#${gradId})`} />
        <rect width="600" height="360" fill={`url(#${dotId})`} />

        {/* Pitch arcs */}
        <g
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.2"
          transform="translate(300 240)"
        >
          <circle r="120" />
          <circle r="80" />
          <circle r="2" fill="rgba(255,255,255,0.7)" />
        </g>

        {/* Year tag */}
        <text
          x="560"
          y="40"
          textAnchor="end"
          fill="rgba(255,255,255,0.85)"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 16,
            letterSpacing: "0.4em",
            fontWeight: 700,
          }}
        >
          WC {m.year}
        </text>

        {/* Bottom-right index counter */}
        <text
          x="568"
          y="338"
          textAnchor="end"
          fill="rgba(255,255,255,0.45)"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.3em",
          }}
        >
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(MOMENTS.length).padStart(2, "0")}
        </text>
      </svg>

      {/* Animated face portrait */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center pt-2">
        <PlayerFacePortrait
          playerName={m.player}
          primary={m.countryColors.primary}
          secondary={m.countryColors.secondary}
          size="xl"
          label={`${m.player} — ${m.headline}`}
        />
      </div>

      {/* Real flag in shield-crest variant, top-right */}
      <div className="absolute right-4 top-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        <OfficialFlag
          code={m.country}
          primary={m.countryColors.primary}
          secondary={m.countryColors.secondary}
          size={60}
          variant="shield"
          stars={titles}
        />
      </div>

      {/* Player name plate (overlay) */}
      <div className="absolute bottom-3 left-4 right-4 z-10">
        <div className="display text-3xl leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] sm:text-4xl">
          {m.player.toUpperCase()}
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.4em] text-white/90">
          {m.countryName}
        </div>
      </div>

      {/* Vignette */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
