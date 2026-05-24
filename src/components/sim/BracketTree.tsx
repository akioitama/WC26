"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSimStore } from "@/store/simStore";
import {
  KNOCKOUT_MATCHES,
  canPickWinner,
  resolveMatchSides,
} from "@/lib/knockoutBracket";
import { getMatchWinPct } from "@/lib/tournamentPredictor";
import { teamFromName } from "@/data/teams";
import { OfficialFlag } from "@/components/ui/OfficialFlag";
import { cn } from "@/lib/cn";

type Round = "R32" | "R16" | "QF" | "SF" | "F";
const ROUND_ORDER: Round[] = ["R32", "R16", "QF", "SF", "F"];
const ROUND_LABEL: Record<Round, string> = {
  R32: "Round of 32",
  R16: "Round of 16",
  QF: "Quarter-finals",
  SF: "Semi-finals",
  F: "Final",
};
const ROUND_SHORT: Record<Round, string> = {
  R32: "R32",
  R16: "R16",
  QF: "QF",
  SF: "SF",
  F: "Final",
};

export function BracketTree() {
  const [activeRound, setActiveRound] = useState<Round>("R32");
  const getSnapshot = useSimStore((s) => s.getSnapshot);
  const groupRankings = useSimStore((s) => s.groupRankings);
  const koWinners = useSimStore((s) => s.koWinners);
  const setKoWinner = useSimStore((s) => s.setKoWinner);
  const clearKoWinners = useSimStore((s) => s.clearKoWinners);
  const autoFill = useSimStore((s) => s.autoFillKnockoutWithModel);
  const upsetLevel = useSimStore((s) => s.upsetLevel);
  const mode = useSimStore((s) => s.mode);
  const aiPrediction = useSimStore((s) => s.aiPrediction);
  const snap = useMemo(() => getSnapshot(), [getSnapshot, groupRankings]);

  const roundStats = useMemo(() => {
    if (!snap) return null;
    const stats: Record<Round, { total: number; picked: number; ready: number }> = {
      R32: { total: 0, picked: 0, ready: 0 },
      R16: { total: 0, picked: 0, ready: 0 },
      QF: { total: 0, picked: 0, ready: 0 },
      SF: { total: 0, picked: 0, ready: 0 },
      F: { total: 0, picked: 0, ready: 0 },
    };
    for (const m of KNOCKOUT_MATCHES) {
      if (m.round === "TP") continue;
      const s = stats[m.round as Round];
      s.total++;
      if (koWinners[m.id]) s.picked++;
      if (canPickWinner(m.id, snap, koWinners)) s.ready++;
    }
    return stats;
  }, [snap, koWinners]);

  if (!snap) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-8 text-center sm:p-12">
        <h3 className="display text-2xl text-[var(--fg)] sm:text-3xl">
          Knockout bracket
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-[var(--fg)]/55">
          Rank every group above (1st–4th). The bracket unlocks automatically
          once all 12 groups are ordered.
        </p>
      </div>
    );
  }

  const activeMatches = KNOCKOUT_MATCHES.filter(
    (m) => m.round === activeRound,
  );
  const activeStat = roundStats?.[activeRound];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="display text-2xl text-[var(--fg)] sm:text-3xl">
            Knockout bracket
          </h3>
          <p className="mt-1 text-xs text-[var(--fg)]/55">
            Tap a team to advance · Annex C #{snap.combinationId}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={autoFill}
            className="rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-2 text-xs font-semibold text-[var(--accent)] hover:bg-[var(--accent)]/20"
          >
            Fill with AI model
          </button>
          <button
            type="button"
            onClick={clearKoWinners}
            className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold text-[var(--fg)]/65 hover:text-[var(--fg)]"
          >
            Clear picks
          </button>
        </div>
      </div>

      {/* Round tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {ROUND_ORDER.map((round) => {
          const stat = roundStats?.[round];
          const complete = stat && stat.picked === stat.total;
          const locked = stat && stat.ready === 0 && stat.picked === 0;
          return (
            <button
              key={round}
              type="button"
              onClick={() => setActiveRound(round)}
              className={cn(
                "shrink-0 rounded-xl border px-4 py-2.5 text-left transition",
                activeRound === round
                  ? "border-[var(--accent)] bg-[var(--accent)]/12"
                  : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/30",
                locked && activeRound !== round && "opacity-50",
              )}
            >
              <span className="block text-sm font-bold text-[var(--fg)]">
                {ROUND_SHORT[round]}
              </span>
              <span className="text-[10px] text-[var(--fg)]/50">
                {stat ? `${stat.picked}/${stat.total}` : "—"}
                {complete && " ✓"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active round header */}
      <div className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[var(--fg)]">
            {ROUND_LABEL[activeRound]}
          </p>
          {activeStat && (
            <p className="text-xs text-[var(--fg)]/50">
              {activeStat.ready} ready · {activeStat.picked} picked
              {activeStat.ready < activeStat.total &&
                activeStat.picked < activeStat.total &&
                " · finish earlier rounds first"}
            </p>
          )}
        </div>
        {activeRound !== "F" && roundStats && (
          <button
            type="button"
            onClick={() => {
              const idx = ROUND_ORDER.indexOf(activeRound);
              if (idx < ROUND_ORDER.length - 1) setActiveRound(ROUND_ORDER[idx + 1]);
            }}
            disabled={!activeStat || activeStat.picked < activeStat.total}
            className="text-xs font-semibold text-[var(--accent)] disabled:opacity-30"
          >
            Next round →
          </button>
        )}
      </div>

      {/* Match list — full width, no horizontal scroll */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {activeMatches.map((m) => {
          const { home, away } = resolveMatchSides(m.id, snap, koWinners);
          const ready = canPickWinner(m.id, snap, koWinners);
          const picked = koWinners[m.id];
          const isFinal = m.round === "F";
          const aiPct =
            mode === "ai"
              ? aiPrediction?.matchPredictions.find((p) => p.matchId === m.id)
                  ?.homeWinPct
              : null;
          const manualPct =
            aiPct == null
              ? getMatchWinPct(snap, koWinners, m.id, upsetLevel)
              : null;
          const pct =
            aiPct != null
              ? Math.round(aiPct * (aiPct <= 1 ? 100 : 1))
              : manualPct;

          return (
            <MatchCard
              key={m.id}
              matchId={m.id}
              home={home}
              away={away}
              ready={ready}
              picked={picked}
              homeWinPct={pct}
              onPick={(side) => setKoWinner(m.id, side)}
              accent={isFinal}
            />
          );
        })}
      </div>
    </div>
  );
}

function MatchCard({
  matchId,
  home,
  away,
  ready,
  picked,
  homeWinPct,
  onPick,
  accent,
}: {
  matchId: number;
  home: string | null;
  away: string | null;
  ready: boolean;
  picked: "home" | "away" | undefined;
  homeWinPct: number | null;
  onPick: (side: "home" | "away") => void;
  accent?: boolean;
}) {
  const status = !ready
    ? "locked"
    : picked
      ? "done"
      : "ready";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-[var(--surface-strong)] transition",
        accent
          ? "border-[var(--accent)]/50 ring-1 ring-[var(--accent)]/15"
          : "border-[var(--line)]",
        status === "locked" && "opacity-60",
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--line)]/50 px-3 py-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--fg)]/40">
          Match {matchId}
        </span>
        {status === "locked" ? (
          <span className="text-[10px] text-[var(--fg)]/35">Waiting</span>
        ) : homeWinPct != null ? (
          <span className="font-mono text-[10px] text-[var(--accent)]">
            {homeWinPct}% {home?.split(" ")[0]}
          </span>
        ) : null}
      </div>
      <TeamRow
        team={home}
        active={picked === "home"}
        disabled={!ready || !home}
        onClick={() => ready && home && onPick("home")}
      />
      <div className="mx-3 h-px bg-[var(--line)]/40" />
      <TeamRow
        team={away}
        active={picked === "away"}
        disabled={!ready || !away}
        onClick={() => ready && away && onPick("away")}
      />
    </div>
  );
}

function TeamRow({
  team,
  active,
  disabled,
  onClick,
}: {
  team: string | null;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  const t = team ? teamFromName(team) : undefined;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full min-h-[44px] items-center gap-3 px-3 py-2.5 text-left transition",
        active
          ? "bg-[var(--accent)]/20 text-[var(--fg)]"
          : "hover:bg-[var(--accent)]/8 text-[var(--fg)]/90",
        disabled && "cursor-not-allowed",
      )}
    >
      {t ? (
        <OfficialFlag
          code={t.fifaCode}
          primary={t.colors.primary}
          secondary={t.colors.secondary}
          size={24}
          variant="rounded"
        />
      ) : (
        <span className="inline-block h-5 w-7 shrink-0 rounded-sm bg-[var(--line)]" />
      )}
      <span className="min-w-0 flex-1 truncate text-sm font-medium">
        {team ?? "TBD"}
      </span>
      <AnimatePresence>
        {active && (
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className="shrink-0 text-xs font-bold text-[var(--accent)]"
          >
            WIN
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
