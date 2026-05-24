"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TEAMS, type Team } from "@/data/teams";
import { GROUP_LETTERS } from "@/lib/types";
import { cn } from "@/lib/cn";
import { KitSwatch } from "@/components/ui/KitSwatch";
import { TeamFlag } from "@/components/ui/OfficialFlag";

type ConfFilter = "ALL" | Team["confederation"];
type SortMode = "elo" | "az" | "titles" | "group";

const CONFEDS: { id: ConfFilter; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "UEFA", label: "UEFA" },
  { id: "CONMEBOL", label: "CONMEBOL" },
  { id: "CONCACAF", label: "CONCACAF" },
  { id: "CAF", label: "CAF" },
  { id: "AFC", label: "AFC" },
  { id: "OFC", label: "OFC" },
];

export function TeamsExplorer() {
  const [conf, setConf] = useState<ConfFilter>("ALL");
  const [group, setGroup] = useState<"ALL" | string>("ALL");
  const [sort, setSort] = useState<SortMode>("elo");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    let list = TEAMS.slice();
    if (conf !== "ALL") list = list.filter((t) => t.confederation === conf);
    if (group !== "ALL") list = list.filter((t) => t.group2026 === group);
    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(needle) ||
          t.fifaCode.toLowerCase().includes(needle),
      );
    }
    list.sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "titles") return b.worldCup.titles - a.worldCup.titles || b.elo - a.elo;
      if (sort === "group")
        return (a.group2026 ?? "Z").localeCompare(b.group2026 ?? "Z");
      return b.elo - a.elo;
    });
    return list;
  }, [conf, group, sort, q]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
        <div className="grow">
          <label className="block text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--fg)]/55">
            Search
          </label>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Italy, ARG, …"
            className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_85%,black)] px-3 py-2 text-sm text-[var(--fg)] outline-none placeholder:text-[var(--fg)]/40 focus:border-[var(--accent)]/60"
          />
        </div>
        <div>
          <label className="block text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--fg)]/55">
            Sort
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className="mt-1 rounded-lg border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_85%,black)] px-3 py-2 text-sm text-[var(--fg)] outline-none"
          >
            <option value="elo">Strength (Elo)</option>
            <option value="az">A → Z</option>
            <option value="titles">WC titles</option>
            <option value="group">Group 2026</option>
          </select>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {CONFEDS.map((c) => (
          <button
            key={c.id}
            onClick={() => setConf(c.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] transition",
              conf === c.id
                ? "border-[var(--accent)] bg-[var(--accent)] text-[#1a1208]"
                : "border-[var(--line)] text-[var(--fg)]/75 hover:border-[var(--accent)]/50 hover:text-[var(--fg)]",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap gap-1.5">
        <button
          onClick={() => setGroup("ALL")}
          className={cn(
            "rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]",
            group === "ALL"
              ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
              : "border-[var(--line)] text-[var(--fg)]/65 hover:text-[var(--fg)]",
          )}
        >
          All groups
        </button>
        {GROUP_LETTERS.map((g) => (
          <button
            key={g}
            onClick={() => setGroup(g)}
            className={cn(
              "rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]",
              group === g
                ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                : "border-[var(--line)] text-[var(--fg)]/65 hover:text-[var(--fg)]",
            )}
          >
            {g}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.ul
          layout
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {filtered.map((t, i) => (
            <motion.li
              key={t.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.008, 0.12) }}
            >
              <TeamCard team={t} />
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="rounded-xl border border-dashed border-[var(--line)] p-8 text-center text-sm text-[var(--fg)]/55">
          No teams match those filters.
        </p>
      )}
    </div>
  );
}

function TeamCard({ team }: { team: Team }) {
  return (
    <Link
      href={`/teams/${team.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--line)]"
      style={{
        background: `linear-gradient(160deg, ${team.colors.primary} 0%, ${team.colors.primary} 50%, color-mix(in oklab, ${team.colors.primary} 55%, black) 100%)`,
      }}
    >
      <span
        aria-hidden
        className="absolute -left-10 top-1/2 h-12 w-[140%] -rotate-12 opacity-60 transition-all group-hover:rotate-[-8deg] group-hover:opacity-90"
        style={{ background: team.colors.secondary }}
      />
      <span
        aria-hidden
        className="absolute -left-10 top-1/2 h-3 w-[140%] -rotate-12 opacity-90"
        style={{ background: team.colors.trim }}
      />

      <div className="absolute left-3 top-3">
        <TeamFlag team={team} size={64} variant="shield" stars={team.worldCup.titles} />
      </div>

      <div className="absolute right-3 top-3 flex gap-1">
        {Array.from({ length: team.worldCup.titles }).map((_, idx) => (
          <span
            key={idx}
            className="display text-base text-[var(--gold-bright)]"
            aria-hidden
          >
            ★
          </span>
        ))}
      </div>

      <div className="absolute inset-x-0 top-[28%] flex justify-center opacity-95 transition group-hover:scale-105">
        <KitSwatch team={team} variant="home" size={80} />
      </div>

      <div className="absolute inset-x-3 bottom-3">
        <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-white/70">
          Group {team.group2026 ?? "—"} · {team.confederation}
        </span>
        <span className="display text-3xl text-white">{team.name}</span>
        <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-white/65">
          Elo {team.elo} · {team.worldCup.appearances} apps
        </span>
      </div>
      <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
    </Link>
  );
}
