"use client";

import { GROUP_LETTERS } from "@/lib/types";
import {
  GROUP_MATCH_PAIRS,
  matchKey,
  sortGroupStandings,
} from "@/lib/standings";
import { getGroupTeamNames } from "@/lib/thirdPlaceSelection";
import { useSimStore } from "@/store/simStore";

export function GroupStagePanel() {
  const scores = useSimStore((s) => s.scores);
  const setScore = useSimStore((s) => s.setScore);
  const clearScore = useSimStore((s) => s.clearScore);

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-chalk">
            Group stage
          </h2>
          <p className="mt-1 max-w-xl text-sm text-white/60">
            Enter results for all six matches in each group. Tables update live;
            when every match has a score, the Annex C combination for the round
            of 32 is resolved automatically.
          </p>
        </div>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {GROUP_LETTERS.map((g) => {
          const names = getGroupTeamNames(g);
          const table = sortGroupStandings(g, names, scores);
          return (
            <article
              key={g}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-pitch-900/80 shadow-lg shadow-black/30 backdrop-blur-sm"
            >
              <div className="border-b border-white/10 bg-pitch-800/50 px-4 py-3">
                <h3 className="text-lg font-bold text-gold">Group {g}</h3>
              </div>
              <div className="space-y-2 border-b border-white/5 p-3">
                {GROUP_MATCH_PAIRS.map((pair, idx) => {
                  const [hi, ai] = pair;
                  const key = matchKey(g, idx);
                  const sc = scores[key];
                  return (
                    <div
                      key={key}
                      className="flex flex-wrap items-center gap-2 rounded-xl bg-black/20 px-2 py-2 text-sm"
                    >
                      <span className="min-w-[7rem] flex-1 text-right text-white/85">
                        {names[hi]}
                      </span>
                      <div className="flex items-center gap-1">
                        <input
                          aria-label={`${g} match ${idx + 1} ${names[hi]} goals`}
                          className="w-11 rounded-md border border-white/15 bg-pitch-950 px-1 py-1 text-center text-chalk outline-none focus:border-gold/70"
                          type="number"
                          min={0}
                          value={sc?.[0] ?? ""}
                          onChange={(e) => {
                            const raw = e.target.value;
                            if (raw === "") {
                              clearScore(key);
                              return;
                            }
                            const home = Number(raw);
                            const away = sc?.[1] ?? 0;
                            if (!Number.isNaN(home))
                              setScore(key, home, away);
                          }}
                        />
                        <span className="text-white/40">–</span>
                        <input
                          aria-label={`${g} match ${idx + 1} ${names[ai]} goals`}
                          className="w-11 rounded-md border border-white/15 bg-pitch-950 px-1 py-1 text-center text-chalk outline-none focus:border-gold/70"
                          type="number"
                          min={0}
                          value={sc?.[1] ?? ""}
                          onChange={(e) => {
                            const raw = e.target.value;
                            if (raw === "") {
                              clearScore(key);
                              return;
                            }
                            const away = Number(raw);
                            const home = sc?.[0] ?? 0;
                            if (!Number.isNaN(away))
                              setScore(key, home, away);
                          }}
                        />
                      </div>
                      <span className="min-w-[7rem] flex-1 text-white/85">
                        {names[ai]}
                      </span>
                    </div>
                  );
                })}
              </div>
              <MiniTable rows={table} />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function MiniTable({
  rows,
}: {
  rows: ReturnType<typeof sortGroupStandings>;
}) {
  return (
    <div className="overflow-x-auto p-2">
      <table className="w-full text-left text-xs text-white/80">
        <thead>
          <tr className="text-white/50">
            <th className="px-2 py-1">#</th>
            <th className="px-2 py-1">Team</th>
            <th className="px-2 py-1">Pld</th>
            <th className="px-2 py-1">GD</th>
            <th className="px-2 py-1">Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.name}
              className={i < 2 ? "text-gold/95" : i === 2 ? "text-white/70" : ""}
            >
              <td className="px-2 py-1">{i + 1}</td>
              <td className="px-2 py-1 font-medium text-chalk">{r.name}</td>
              <td className="px-2 py-1">{r.played}</td>
              <td className="px-2 py-1">
                {r.goalsFor - r.goalsAgainst >= 0 ? "+" : ""}
                {r.goalsFor - r.goalsAgainst}
              </td>
              <td className="px-2 py-1 font-semibold">{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
