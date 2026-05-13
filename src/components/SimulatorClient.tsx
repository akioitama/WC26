"use client";

import { GroupStagePanel } from "@/components/GroupStagePanel";
import { ThirdPlaceRankingPanel } from "@/components/ThirdPlaceRankingPanel";
import { BracketView } from "@/components/BracketView";
import { useSimStore } from "@/store/simStore";

export default function SimulatorClient() {
  const fillRandom = useSimStore((s) => s.fillRandomGroupScores);
  const resetAll = useSimStore((s) => s.resetAll);
  const autoKo = useSimStore((s) => s.autoFillKnockoutRandom);
  const clearKo = useSimStore((s) => s.clearKoWinners);

  return (
    <div
      id="simulator"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <header className="mb-12 text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold/80">
          Canada · México · United States
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-chalk sm:text-5xl">
          FIFA World Cup 2026
          <span className="block text-2xl font-medium text-white/70 sm:text-3xl">
            Bracket simulator
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm text-white/65 sm:mx-0">
          Explore the 48-team format: twelve groups, best third-placed teams, full
          Annex C routing into the round of 32, then a single-elimination path to
          the final.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
          <a
            href="#simulator"
            className="inline-flex items-center justify-center rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold transition hover:bg-gold/20"
          >
            Run simulator
          </a>
          <button
            type="button"
            onClick={fillRandom}
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-pitch-950 shadow-lg shadow-black/30 transition hover:brightness-110"
          >
            Random group results
          </button>
          <button
            type="button"
            onClick={autoKo}
            className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-chalk transition hover:bg-white/10"
          >
            Random knockout
          </button>
          <button
            type="button"
            onClick={clearKo}
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/75 hover:text-chalk"
          >
            Clear KO picks
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="rounded-full border border-red-400/30 px-5 py-2.5 text-sm text-red-200/90 hover:bg-red-500/10"
          >
            Reset all
          </button>
        </div>
      </header>
      <GroupStagePanel />
      <div className="my-10">
        <ThirdPlaceRankingPanel />
      </div>
      <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <BracketView />
    </div>
  );
}
