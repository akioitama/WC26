"use client";

import { useEffect, useMemo, useState } from "react";
import { simulateTournament, type AdvancementOdds } from "@/lib/elo";
import {
  ConfederationSplit,
  GroupEloRadar,
  HeadToHeadOdds,
  StagePyramid,
  TopWinnersBar,
} from "./AnalyticsCharts";
import { OddsTable } from "./OddsTable";
import { TEAMS } from "@/data/teams";
import { GROUP_LETTERS } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export default function AnalyticsClient() {
  const [iters, setIters] = useState(2000);
  const [pending, setPending] = useState(false);
  const [rows, setRows] = useState<AdvancementOdds[] | null>(null);
  const [group, setGroup] = useState("E");
  const [a, setA] = useState("argentina");
  const [b, setB] = useState("france");

  useEffect(() => {
    setPending(true);
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      setRows(simulateTournament(iters));
      setPending(false);
    };

    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(run, { timeout: 400 });
      return () => {
        cancelled = true;
        cancelIdleCallback(id);
      };
    }

    const id = window.setTimeout(run, 50);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [iters]);

  const top = useMemo(() => (rows ? rows.slice(0, 16) : []), [rows]);

  return (
    <div className="relative">
      <header className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--electric)]">
          Analytics intelligence
        </p>
        <h1 className="display mt-2 text-6xl text-white sm:text-7xl">
          Predict the <span className="electric-sweep">cup.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/70">
          A live Monte‑Carlo engine running on Elo ratings curated for the 48
          nations of WC26. Every chart updates when iteration count changes.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
            Iterations
          </span>
          {[500, 1000, 2000, 5000].map((n) => (
            <button
              key={n}
              onClick={() => setIters(n)}
              className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] transition ${
                iters === n
                  ? "border-[var(--electric)] bg-[var(--electric)]/15 text-[var(--electric)] glow-electric"
                  : "border-[var(--line)] text-white/65 hover:text-white"
              }`}
            >
              {n.toLocaleString()}
            </button>
          ))}
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
            {pending ? "Running…" : `Status · ready`}
          </span>
        </div>
      </header>

      {!rows && (
        <div className="surface grid h-64 place-items-center rounded-2xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/55">
            Computing…
          </div>
        </div>
      )}

      {rows && (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <TopWinnersBar rows={rows} />
            <StagePyramid rows={rows} />
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <ConfederationSplit rows={rows} />
            <div className="surface rounded-2xl p-5">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--electric)]">
                  Group radar
                </p>
                <div className="flex flex-wrap gap-1">
                  {GROUP_LETTERS.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGroup(g)}
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] ${
                        group === g
                          ? "border-[var(--electric)] bg-[var(--electric)]/15 text-[var(--electric)]"
                          : "border-[var(--line)] text-white/65 hover:text-white"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <GroupEloRadar group={group} />
              </div>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="display text-3xl text-white sm:text-4xl">
              Head‑to‑head <span className="text-[var(--electric)]">arena</span>
            </h2>
            <p className="mt-1 text-xs text-white/60">
              Pick any two nations to see Elo-derived match probabilities.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr]">
              <select
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="rounded-xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_85%,black)] px-3 py-2 text-sm text-white"
              >
                {TEAMS.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.name}
                  </option>
                ))}
              </select>
              <span className="grid place-items-center font-mono text-xs uppercase tracking-[0.3em] text-white/55">
                vs
              </span>
              <select
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="rounded-xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_85%,black)] px-3 py-2 text-sm text-white"
              >
                {TEAMS.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <HeadToHeadOdds aSlug={a} bSlug={b} />
            </div>
          </section>

          <section className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="display text-3xl text-white sm:text-4xl">
                  The full <span className="text-[var(--electric)]">odds board</span>
                </h2>
                <p className="mt-1 text-xs text-white/60">
                  Top 24 nations across every stage probability.
                </p>
              </div>
              <Button href="/simulator" variant="ghost">
                Open simulator
              </Button>
            </div>
            <div className="mt-4">
              <OddsTable rows={top.length ? rows : []} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
