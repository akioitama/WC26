"use client";

import { teamFromName } from "@/data/teams";
import { OfficialFlag } from "@/components/ui/OfficialFlag";
import { availabilityForTeam } from "@/data/injuries";
import { cn } from "@/lib/cn";

const RANK_LABELS = ["1st", "2nd", "3rd", "4th"] as const;
const RANK_COLORS = [
  "text-[var(--gold)]",
  "text-[var(--accent)]",
  "text-[var(--fg)]/75",
  "text-[var(--fg)]/45",
];

export function TeamSimCard({
  name,
  rank,
  dragHandle,
  className,
  showInjuries = true,
  winPct,
}: {
  name: string;
  rank?: number;
  dragHandle?: React.ReactNode;
  className?: string;
  showInjuries?: boolean;
  winPct?: number;
}) {
  const team = teamFromName(name);
  const injuries = showInjuries ? availabilityForTeam(name) : [];
  const out = injuries.filter((i) => i.status === "out");
  const doubtful = injuries.filter((i) => i.status === "doubtful");

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_88%,black)] px-2.5 py-2",
        className,
      )}
    >
      {dragHandle}
      {rank != null && (
        <span
          className={cn(
            "display w-8 shrink-0 text-center text-lg leading-none",
            RANK_COLORS[rank] ?? RANK_COLORS[3],
          )}
        >
          {RANK_LABELS[rank] ?? `${rank + 1}`}
        </span>
      )}
      {team ? (
        <OfficialFlag
          code={team.fifaCode}
          primary={team.colors.primary}
          secondary={team.colors.secondary}
          size={32}
          variant="rounded"
        />
      ) : (
        <span className="h-8 w-11 rounded-md bg-[var(--line)]" />
      )}
      <div className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-[var(--fg)]">
          {name}
        </span>
        <span className="flex flex-wrap items-center gap-2 text-[10px] text-[var(--fg)]/50">
          {team?.fifaRank && (
            <span className="font-mono">FIFA #{team.fifaRank}</span>
          )}
          {team && (
            <span className="font-mono tnum">ELO {team.elo}</span>
          )}
          {out.length > 0 && (
            <span className="text-red-400/90">
              {out.length} out
            </span>
          )}
          {doubtful.length > 0 && (
            <span className="text-amber-400/90">
              {doubtful.length} doubtful
            </span>
          )}
        </span>
      </div>
      {winPct != null && (
        <div className="shrink-0 text-right">
          <span className="font-mono text-sm font-bold tnum text-[var(--accent)]">
            {winPct}%
          </span>
          <div className="mt-0.5 h-1 w-12 overflow-hidden rounded-full bg-[var(--line)]">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-all"
              style={{ width: `${winPct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
