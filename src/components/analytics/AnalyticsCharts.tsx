"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AdvancementOdds } from "@/lib/elo";
import { TEAMS, TEAMS_BY_SLUG } from "@/data/teams";

const tooltipStyle = {
  background: "rgba(8, 14, 32, 0.96)",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: 12,
  padding: "8px 12px",
  color: "white",
  fontSize: 12,
  boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
};

export function TopWinnersBar({ rows }: { rows: AdvancementOdds[] }) {
  const data = rows.slice(0, 10).map((r) => ({
    name: r.team.fifaCode,
    win: Math.round(r.winCup * 1000) / 10,
    color: r.team.colors.primary,
  }));
  return (
    <div className="surface relative h-[340px] overflow-hidden rounded-2xl p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--electric)]">
        Title odds (top 10)
      </p>
      <p className="mt-1 text-xs text-white/55">
        Live Monte Carlo over current Elo. Refreshes when iteration count
        changes.
      </p>
      <div className="absolute inset-x-2 bottom-2 top-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={11} />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              fontSize={11}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v) => [`${v}%`, "Win odds"]}
              cursor={{ fill: "rgba(43,210,255,0.06)" }}
            />
            <Bar dataKey="win" radius={[6, 6, 0, 0]}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function GroupEloRadar({ group }: { group: string }) {
  const data = TEAMS.filter((t) => t.group2026 === group).map((t) => ({
    code: t.fifaCode,
    elo: t.elo,
  }));
  return (
    <div className="surface relative h-[340px] overflow-hidden rounded-2xl p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--electric)]">
        Group {group} · Elo radar
      </p>
      <p className="mt-1 text-xs text-white/55">
        Relative strength of each team in the group.
      </p>
      <div className="absolute inset-x-2 bottom-2 top-20">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.18)" />
            <PolarAngleAxis dataKey="code" stroke="rgba(255,255,255,0.6)" fontSize={11} />
            <PolarRadiusAxis stroke="rgba(255,255,255,0.18)" fontSize={10} angle={45} />
            <Tooltip contentStyle={tooltipStyle} />
            <Radar
              name="Elo"
              dataKey="elo"
              stroke="var(--electric)"
              fill="var(--electric)"
              fillOpacity={0.25}
              isAnimationActive
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function StagePyramid({ rows }: { rows: AdvancementOdds[] }) {
  const stages = [
    { label: "R16", key: "reachR16" as const },
    { label: "QF", key: "reachQF" as const },
    { label: "SF", key: "reachSF" as const },
    { label: "F", key: "reachF" as const },
    { label: "Win", key: "winCup" as const },
  ];
  const top = rows.slice(0, 5);
  const data = stages.map((s) => {
    const row: Record<string, string | number> = { stage: s.label };
    for (const r of top) row[r.team.fifaCode] = Math.round(r[s.key] * 1000) / 10;
    return row;
  });
  return (
    <div className="surface relative h-[360px] overflow-hidden rounded-2xl p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--electric)]">
        Stage progression — top 5
      </p>
      <p className="mt-1 text-xs text-white/55">
        Probability of reaching each stage of the tournament.
      </p>
      <div className="absolute inset-x-2 bottom-2 top-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={14}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="stage" stroke="rgba(255,255,255,0.5)" fontSize={11} />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={11} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
            <Legend wrapperStyle={{ fontSize: 11, color: "white" }} />
            {top.map((r) => (
              <Bar
                key={r.team.slug}
                dataKey={r.team.fifaCode}
                fill={r.team.colors.primary}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ConfederationSplit({ rows }: { rows: AdvancementOdds[] }) {
  const grouped: Record<string, number> = {};
  for (const r of rows) {
    grouped[r.team.confederation] = (grouped[r.team.confederation] ?? 0) + r.winCup;
  }
  const data = Object.entries(grouped)
    .map(([k, v]) => ({ confed: k, share: Math.round(v * 1000) / 10 }))
    .sort((a, b) => b.share - a.share);
  const palette = ["#2bd2ff", "#f5c451", "#ff5cd0", "#3affd9", "#ff8b3a", "#9b6dff"];
  return (
    <div className="surface relative h-[340px] overflow-hidden rounded-2xl p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--electric)]">
        Title share by confederation
      </p>
      <div className="absolute inset-x-2 bottom-2 top-16">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis type="number" stroke="rgba(255,255,255,0.5)" fontSize={11} tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="confed" stroke="rgba(255,255,255,0.6)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
            <Bar dataKey="share" radius={[0, 6, 6, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={palette[i % palette.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function HeadToHeadOdds({
  aSlug,
  bSlug,
}: {
  aSlug: string;
  bSlug: string;
}) {
  const a = TEAMS_BY_SLUG[aSlug];
  const b = TEAMS_BY_SLUG[bSlug];
  if (!a || !b) return null;
  const expected = 1 / (1 + 10 ** ((b.elo - a.elo) / 400));
  const draw = Math.max(0.12, 0.32 - Math.abs(a.elo - b.elo) / 1500);
  const home = (1 - draw) * expected;
  const away = (1 - draw) * (1 - expected);
  const data = [
    { x: a.fifaCode, y: Math.round(home * 1000) / 10, color: a.colors.primary },
    { x: "DRAW", y: Math.round(draw * 1000) / 10, color: "#888" },
    { x: b.fifaCode, y: Math.round(away * 1000) / 10, color: b.colors.primary },
  ];
  return (
    <div className="surface relative h-[300px] overflow-hidden rounded-2xl p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--electric)]">
        Head-to-head odds
      </p>
      <p className="mt-1 text-xs text-white/55">
        {a.name} vs {b.name} — based on Elo {a.elo} / {b.elo}.
      </p>
      <div className="absolute inset-x-2 bottom-2 top-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="x" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={11} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
            <Bar dataKey="y" radius={[6, 6, 0, 0]}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
