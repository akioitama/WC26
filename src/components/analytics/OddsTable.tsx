"use client";

import { motion } from "framer-motion";
import type { AdvancementOdds } from "@/lib/elo";
import { cn } from "@/lib/cn";
import { TeamFlag } from "@/components/ui/OfficialFlag";

export function OddsTable({ rows }: { rows: AdvancementOdds[] }) {
  const top = rows.slice(0, 24);
  return (
    <div className="surface overflow-hidden rounded-2xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/55">
            <th className="px-3 py-3 text-left">#</th>
            <th className="px-2 py-3 text-left">Team</th>
            <th className="px-2 py-3 text-right">Group</th>
            <th className="px-2 py-3 text-right">Elo</th>
            <th className="px-2 py-3">R16</th>
            <th className="px-2 py-3">QF</th>
            <th className="px-2 py-3">SF</th>
            <th className="px-2 py-3">Final</th>
            <th className="px-2 py-3">Win cup</th>
          </tr>
        </thead>
        <tbody>
          {top.map((r, i) => (
            <motion.tr
              key={r.team.slug}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.015, 0.4) }}
              className="border-t border-[var(--line)] text-[var(--fg)]/85"
            >
              <td className="px-3 py-2 font-mono tnum text-white/45">
                {String(i + 1).padStart(2, "0")}
              </td>
              <td className="px-2 py-2 font-medium text-white">
                <span className="inline-flex items-center gap-2">
                  <TeamFlag team={r.team} size={16} variant="rounded" />
                  {r.team.name}
                </span>
              </td>
              <td className="px-2 py-2 text-right font-mono text-[var(--electric)]">
                {r.team.group2026 ?? "—"}
              </td>
              <td className="px-2 py-2 text-right font-mono tnum">
                {r.team.elo}
              </td>
              <Bar pct={r.reachR16} />
              <Bar pct={r.reachQF} />
              <Bar pct={r.reachSF} />
              <Bar pct={r.reachF} />
              <Bar pct={r.winCup} highlight />
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Bar({ pct, highlight }: { pct: number; highlight?: boolean }) {
  const v = Math.round(pct * 100);
  return (
    <td className="px-2 py-2 align-middle">
      <div className="relative flex h-6 items-center overflow-hidden rounded-md bg-[color-mix(in_oklab,var(--bg)_85%,black)]">
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-0 left-0 transition-[width]",
            highlight
              ? "bg-gradient-to-r from-[var(--gold-deep)] via-[var(--gold)] to-[var(--gold-bright)]"
              : "bg-gradient-to-r from-[var(--electric-deep)] via-[var(--electric)] to-[var(--electric-hot)]",
          )}
          style={{ width: `${Math.max(2, v)}%`, opacity: 0.85 }}
        />
        <span className="relative ml-2 font-mono text-[10px] tnum text-white">
          {v}%
        </span>
      </div>
    </td>
  );
}
