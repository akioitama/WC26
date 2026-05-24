"use client";

import { useSimStore } from "@/store/simStore";
import type { UpsetLevel, SimMode } from "@/lib/tournamentPredictor";
import { modelWeights } from "@/lib/wc26Model";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const MODES: { id: SimMode; label: string; desc: string }[] = [
  {
    id: "manual",
    label: "Manual",
    desc: "You rank groups and pick knockout winners",
  },
  {
    id: "ai",
    label: "AI Predict",
    desc: "Deterministic model — same data, same champion every run",
  },
];

const UPSET_LEVELS: { id: UpsetLevel; label: string; hint: string }[] = [
  { id: "low", label: "Low upset", hint: "Strong favorites advance" },
  { id: "medium", label: "Medium", hint: "Balanced probabilities" },
  { id: "high", label: "High upset", hint: "Closer matches, more upsets" },
];

function formatTrainedDate(iso?: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function SimulatorControls() {
  const mode = useSimStore((s) => s.mode);
  const upsetLevel = useSimStore((s) => s.upsetLevel);
  const setMode = useSimStore((s) => s.setMode);
  const setUpsetLevel = useSimStore((s) => s.setUpsetLevel);
  const runAI = useSimStore((s) => s.runAISimulation);
  const simulateAll = useSimStore((s) => s.simulateEntireTournament);
  const resetAll = useSimStore((s) => s.resetAll);
  const aiPrediction = useSimStore((s) => s.aiPrediction);

  const metrics = modelWeights.metrics as
    | { teams?: number; drawTeams?: number; analyticsProfiles?: number }
    | undefined;

  return (
    <div className="space-y-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--fg)]/50">
          Simulation mode
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left transition",
                mode === m.id
                  ? "border-[var(--accent)] bg-[var(--accent)]/10"
                  : "border-[var(--line)] hover:border-[var(--accent)]/40",
              )}
            >
              <span className="display block text-xl text-[var(--fg)]">
                {m.label}
              </span>
              <span className="text-xs text-[var(--fg)]/55">{m.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--fg)]/50">
            Upset sensitivity
          </p>
          <span className="font-mono text-xs text-[var(--accent)]">
            {upsetLevel}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-[var(--fg)]/45">
          Adjusts win probabilities only — picks stay deterministic (no random
          dice rolls).
        </p>
        <div className="mt-3 flex gap-2">
          {UPSET_LEVELS.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setUpsetLevel(u.id)}
              title={u.hint}
              className={cn(
                "flex-1 rounded-lg border py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition",
                upsetLevel === u.id
                  ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)]"
                  : "border-[var(--line)] text-[var(--fg)]/55 hover:text-[var(--fg)]",
              )}
            >
              {u.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={simulateAll} size="md">
          Simulate entire tournament
        </Button>
        {mode === "ai" && (
          <Button onClick={runAI} variant="ghost" size="md">
            Re-run AI
          </Button>
        )}
        <Button onClick={resetAll} variant="danger" size="md">
          Reset
        </Button>
      </div>

      <div className="rounded-xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_94%,black)] p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--fg)]/45">
          Model training
        </p>
        <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
          <div>
            <dt className="text-[var(--fg)]/45">Script</dt>
            <dd className="font-mono text-[var(--fg)]/80">
              scripts/train-wc26-model.mjs
            </dd>
          </div>
          <div>
            <dt className="text-[var(--fg)]/45">Weights file</dt>
            <dd className="font-mono text-[var(--fg)]/80">
              src/data/modelWeights.json
            </dd>
          </div>
          <div>
            <dt className="text-[var(--fg)]/45">Version</dt>
            <dd className="text-[var(--fg)]">v{modelWeights.version ?? 1}</dd>
          </div>
          <div>
            <dt className="text-[var(--fg)]/45">Trained</dt>
            <dd className="text-[var(--fg)]">
              {formatTrainedDate(modelWeights.trainedAt)}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[var(--fg)]/45">Data used</dt>
            <dd className="text-[var(--fg)]/75">
              {metrics?.teams ?? 48} national teams · ELO & FIFA rankings ·
              form, squad ratings, goals, clean sheets · injury reports · WC
              experience · 2026 home boost (USA/Mexico/Canada)
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-[10px] text-[var(--fg)]/40">
          Retrain locally:{" "}
          <code className="rounded bg-[var(--line)]/30 px-1">npm run train:model</code>
        </p>
      </div>

      {aiPrediction && (
        <div className="rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--gold)]">
            AI prediction
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--fg)]/45">
                Champion
              </span>
              <p className="display mt-1 text-2xl text-[var(--fg)]">
                {aiPrediction.champion ?? "—"}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--fg)]/45">
                Golden Boot
              </span>
              <p className="mt-1 text-sm font-semibold text-[var(--fg)]">
                {aiPrediction.goldenBoot.player}
              </p>
              <p className="text-xs text-[var(--fg)]/50">
                {aiPrediction.goldenBoot.team} · ~{aiPrediction.goldenBoot.goals}{" "}
                goals
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--fg)]/45">
                Top contenders
              </span>
              <p className="mt-1 text-xs text-[var(--fg)]/70">
                {aiPrediction.topTeams
                  .slice(0, 4)
                  .map((t) => t.name)
                  .join(" · ")}
              </p>
            </div>
          </div>
          <p className="mt-3 text-[10px] text-[var(--fg)]/45">
            Model v{aiPrediction.modelVersion ?? 1} · deterministic — re-running
            with the same upset level yields the same bracket
          </p>
        </div>
      )}
    </div>
  );
}
