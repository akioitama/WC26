"use client";

import { useMemo } from "react";
import { useSimStore } from "@/store/simStore";
import { OfficialFlag } from "@/components/ui/OfficialFlag";
import { teamFromName } from "@/data/teams";

export function ThirdPlaceRankingPanel() {
  const getSnapshot = useSimStore((s) => s.getSnapshot);
  const groupRankings = useSimStore((s) => s.groupRankings);
  const snap = useMemo(() => getSnapshot(), [getSnapshot, groupRankings]);

  if (!snap) {
    return (
      <section className="rounded-2xl border border-dashed border-[var(--line)] p-8 text-center">
        <p className="text-sm text-[var(--fg)]/55">
          Rank all 12 groups to see third-place qualification standings.
        </p>
      </section>
    );
  }

  const ranked = snap.rankedThirdRows;
  const advancing = new Set(snap.advancingThirdGroups);

  return (
    <section className="space-y-4">
      <header>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]">
          Third-place ranking
        </p>
        <h3 className="display mt-2 text-3xl text-[var(--fg)]">
          Best 8 thirds advance
        </h3>
        <p className="mt-1 text-xs text-[var(--fg)]/55">
          Annex C combination{" "}
          <span className="font-mono text-[var(--accent)]">#{snap.combinationId}</span>
        </p>
      </header>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {ranked.map((row, i) => {
          const advances = advancing.has(row.group);
          const team = teamFromName(row.name);
          return (
            <div
              key={row.group}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition ${
                advances
                  ? "border-[var(--accent)]/40 bg-[var(--accent)]/5"
                  : "border-[var(--line)] bg-[var(--surface)] opacity-60"
              }`}
            >
              <span className="font-mono text-lg font-bold tnum text-[var(--fg)]/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              {team && (
                <OfficialFlag
                  code={team.fifaCode}
                  primary={team.colors.primary}
                  secondary={team.colors.secondary}
                  size={28}
                  variant="rounded"
                />
              )}
              <div className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-[var(--fg)]">
                  {row.name}
                </span>
                <span className="text-[10px] text-[var(--fg)]/45">
                  Group {row.group} · {row.points} pts
                </span>
              </div>
              {advances && (
                <span className="shrink-0 rounded-full bg-[var(--accent)]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                  R32
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
