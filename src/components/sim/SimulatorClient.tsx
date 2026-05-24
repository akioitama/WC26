"use client";

import { useEffect, useState } from "react";
import { GroupRankingPanel } from "./GroupRankingPanel";
import { ThirdPlaceRankingPanel } from "./ThirdPlaceRankingPanel";
import { BracketTree } from "./BracketTree";
import { TrophyLift } from "./TrophyLift";
import { AlternateHistoryEditor } from "./AlternateHistoryEditor";
import { SimulatorControls } from "./SimulatorControls";
import { useSimStore } from "@/store/simStore";
import { useGroupsStore } from "@/store/groupsStore";
import { Button } from "@/components/ui/Button";
import { WC26Logo } from "@/components/ui/WC26Logo";

export default function SimulatorClient() {
  const resetAll = useSimStore((s) => s.resetAll);
  const share = useSimStore((s) => s.share);
  const loadFromHash = useSimStore((s) => s.loadFromHash);
  const autoFillKo = useSimStore((s) => s.autoFillKnockoutWithModel);
  useGroupsStore((s) => s.groups);
  const [shareMsg, setShareMsg] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [stage, setStage] = useState<"groups" | "knockout">("groups");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.match(/[#&]s=([^&]+)/)?.[1];
    if (hash) loadFromHash(hash);
  }, [loadFromHash]);

  function onShare() {
    const code = share();
    const url = `${window.location.origin}${window.location.pathname}#s=${code}`;
    navigator.clipboard
      ?.writeText(url)
      .then(() => setShareMsg("Link copied"))
      .catch(() => setShareMsg(url));
    history.replaceState(null, "", `#s=${code}`);
    setTimeout(() => setShareMsg(null), 2400);
  }

  return (
    <div
      id="simulator"
      className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <header className="relative isolate mb-10 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 sm:p-12">
        <span
          aria-hidden
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--accent)]/15 blur-3xl"
        />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="display text-5xl text-[var(--fg)] sm:text-6xl">
              Predict the <span className="text-[var(--accent)]">tournament.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-[var(--fg)]/75 sm:text-base">
              Rank groups by drag-and-drop — no score entry. Pick knockout winners
              or let AI simulate everything using ELO, FIFA rankings, form, and
              injury data.
            </p>
          </div>
          <WC26Logo context="card" className="shrink-0 self-start" />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setStage("groups")}
            className={`rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition ${
              stage === "groups"
                ? "bg-[var(--accent)] text-[var(--bg)]"
                : "border border-[var(--line)] text-[var(--fg)]/70 hover:text-[var(--fg)]"
            }`}
          >
            1 · Groups
          </button>
          <button
            type="button"
            onClick={() => setStage("knockout")}
            className={`rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition ${
              stage === "knockout"
                ? "bg-[var(--accent)] text-[var(--bg)]"
                : "border border-[var(--line)] text-[var(--fg)]/70 hover:text-[var(--fg)]"
            }`}
          >
            2 · Knockout
          </button>
        </div>
      </header>

      <div className="mb-10">
        <SimulatorControls />
      </div>

      {editMode && (
        <div className="mb-10">
          <AlternateHistoryEditor />
        </div>
      )}

      {stage === "groups" ? (
        <>
          <GroupRankingPanel />
          <div className="my-10">
            <ThirdPlaceRankingPanel />
          </div>
          <div className="flex justify-center">
            <Button onClick={() => setStage("knockout")} size="lg">
              Continue to knockout →
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-3">
            <Button onClick={() => setStage("groups")} variant="ghost">
              ← Back to groups
            </Button>
            <Button onClick={autoFillKo} variant="ghost">
              Auto-fill winners
            </Button>
            <Button onClick={() => setEditMode((v) => !v)} variant="ghost">
              {editMode ? "Hide draw editor" : "Edit draw"}
            </Button>
            <Button onClick={onShare} variant="outline">
              {shareMsg ?? "Share bracket"}
            </Button>
            <Button onClick={resetAll} variant="danger">
              Reset
            </Button>
          </div>
          <BracketTree />
        </>
      )}

      <TrophyLift />
    </div>
  );
}
