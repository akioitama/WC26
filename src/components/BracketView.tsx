"use client";

import { useSimStore } from "@/store/simStore";
import {
  KNOCKOUT_MATCHES,
  buildQualifierSnapshot,
  canPickWinner,
  resolveMatchSides,
} from "@/lib/knockoutBracket";

const ROUND_ORDER = ["R32", "R16", "QF", "SF", "TP", "F"] as const;

export function BracketView() {
  const scores = useSimStore((s) => s.scores);
  const koWinners = useSimStore((s) => s.koWinners);
  const setKoWinner = useSimStore((s) => s.setKoWinner);

  const snap = buildQualifierSnapshot(scores);

  if (!snap) {
    return (
      <section className="rounded-2xl border border-dashed border-white/15 bg-pitch-900/40 p-10 text-center text-white/55">
        <p className="text-lg font-medium text-chalk/80">Knockout bracket</p>
        <p className="mt-2 text-sm">
          Complete every group-stage score to unlock the round of 32 through the
          final, including automatic Annex C third-place routing.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-10">
      <header className="flex flex-col gap-2 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-chalk">Knockout path</h2>
          <p className="mt-1 text-sm text-white/60">
            Annex C option{" "}
            <span className="font-mono text-gold">#{snap.combinationId}</span> —{" "}
            advancing third groups:{" "}
            <span className="font-mono text-white/80">
              {[...snap.advancingThirdGroups].sort().join(" ")}
            </span>
          </p>
        </div>
      </header>
      {ROUND_ORDER.map((round) => {
        const matches = KNOCKOUT_MATCHES.filter((m) => m.round === round);
        if (matches.length === 0) return null;
        return (
          <div key={round}>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold/90">
              {round === "R32"
                ? "Round of 32"
                : round === "R16"
                  ? "Round of 16"
                  : round === "QF"
                    ? "Quarter-finals"
                    : round === "SF"
                      ? "Semi-finals"
                      : round === "TP"
                        ? "Third place"
                        : "Final"}
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {matches.map((m) => {
                const { home, away } = resolveMatchSides(m.id, snap, koWinners);
                const ready = canPickWinner(m.id, snap, koWinners);
                const picked = koWinners[m.id];
                return (
                  <div
                    key={m.id}
                    className="min-w-[220px] shrink-0 rounded-2xl border border-white/10 bg-pitch-900/90 p-4 shadow-md shadow-black/40"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-white/40">
                        M{m.id}
                      </span>
                      <span className="truncate text-[10px] text-white/45">
                        {m.label}
                      </span>
                    </div>
                    <button
                      type="button"
                      disabled={!ready || !home}
                      onClick={() => ready && home && setKoWinner(m.id, "home")}
                      className={`mb-2 w-full rounded-xl border px-2 py-2 text-left text-sm transition ${
                        picked === "home"
                          ? "border-gold bg-gold/15 text-chalk"
                          : "border-white/10 bg-black/25 text-white/85 hover:border-white/25"
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      {home ?? "—"}
                    </button>
                    <button
                      type="button"
                      disabled={!ready || !away}
                      onClick={() => ready && away && setKoWinner(m.id, "away")}
                      className={`w-full rounded-xl border px-2 py-2 text-left text-sm transition ${
                        picked === "away"
                          ? "border-gold bg-gold/15 text-chalk"
                          : "border-white/10 bg-black/25 text-white/85 hover:border-white/25"
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      {away ?? "—"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
