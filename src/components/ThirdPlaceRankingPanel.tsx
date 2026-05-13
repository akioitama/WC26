"use client";

import { useMemo } from "react";
import { GROUP_LETTERS } from "@/lib/types";
import { isGroupComplete, sortGroupStandings } from "@/lib/standings";
import {
  computeAllThirdPlaces,
  getGroupTeamNames,
  rankThirdPlaces,
  pickAdvancingThirdGroups,
} from "@/lib/thirdPlaceSelection";
import { useSimStore } from "@/store/simStore";

export function ThirdPlaceRankingPanel() {
  const scores = useSimStore((s) => s.scores);

  const { byGroup, ranked, advancing, allComplete } = useMemo(() => {
    const all = computeAllThirdPlaces(scores);
    const ranked = rankThirdPlaces(all);
    const advancing = new Set(pickAdvancingThirdGroups(ranked));
    const byGroup = new Map(
      ranked.map((r) => [r.group, r]),
    );
    return {
      byGroup,
      ranked,
      advancing,
      allComplete: ranked.length === 12,
    };
  }, [scores]);

  return (
    <section className="rounded-2xl border border-white/10 bg-pitch-900/70 p-5 shadow-inner shadow-black/20 backdrop-blur-sm">
      <h2 className="text-lg font-semibold text-chalk">Third-placed teams</h2>
      <p className="mt-1 text-xs text-white/55">
        Per-group third when that group is finished; when all twelve groups are
        complete, the ranked list and top eight advancers (gold) match FIFA’s
        third-place rules used for Annex&nbsp;C.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {GROUP_LETTERS.map((g) => {
          const r = byGroup.get(g);
          const names = getGroupTeamNames(g);
          const complete = isGroupComplete(g, scores);
          const third = complete ? sortGroupStandings(g, names, scores)[2] : undefined;
          return (
            <div
              key={g}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm"
            >
              <span className="font-bold text-gold/90">Grp {g}</span>
              <span className="truncate text-white/85">
                {third?.name ?? "—"}
              </span>
              <span className="font-mono text-xs text-white/50">
                {r ? `${r.points} pts` : "—"}
              </span>
            </div>
          );
        })}
      </div>

      {ranked.length > 0 && (
        <div className="mt-6 border-t border-white/10 pt-4">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-white/45">
            {allComplete ? "Ranking (all groups done)" : "Ranking (completed groups)"}
          </h3>
          <ol className="space-y-1.5 text-sm">
            {ranked.map((r, i) => (
              <li
                key={r.group}
                className={`flex items-center justify-between rounded-lg px-2 py-1.5 ${
                  allComplete && advancing.has(r.group)
                    ? "bg-gold/10 text-chalk"
                    : "text-white/75"
                }`}
              >
                <span>
                  <span className="mr-2 font-mono text-white/40">{i + 1}.</span>
                  <span className="font-semibold text-gold/90">{r.group}</span>{" "}
                  {r.name}
                </span>
                <span className="shrink-0 font-mono text-xs">
                  {r.points} pts · GD{" "}
                  {r.goalsFor - r.goalsAgainst >= 0 ? "+" : ""}
                  {r.goalsFor - r.goalsAgainst}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {!allComplete && ranked.length === 0 && (
        <p className="mt-4 text-xs text-white/45">
          Enter scores group by group; each finished group adds its third-placed
          team to the ranking pool.
        </p>
      )}
    </section>
  );
}
