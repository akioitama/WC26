"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function LiveSimulatorPreview() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 sm:p-12">
          <span
            aria-hidden
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--accent)]/15 blur-3xl"
          />
          <span
            aria-hidden
            className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-[var(--accent-2)]/15 blur-3xl"
          />
          <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]">
                The simulator
              </p>
              <h2 className="display mt-2 text-5xl text-[var(--fg)] sm:text-6xl">
                Predict every
                <br />
                match. <span className="text-[var(--accent)]">Lift the cup.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm text-[var(--fg)]/75">
                Drag to rank groups 1st–4th, pick knockout winners, or hit
                Simulate to let AI predict the champion using ELO, FIFA
                rankings, and injury data.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-[var(--fg)]/80">
                <li className="flex items-center gap-2">
                  <Dot /> Drag-and-drop group ranking
                </li>
                <li className="flex items-center gap-2">
                  <Dot /> AI tournament simulation
                </li>
                <li className="flex items-center gap-2">
                  <Dot /> R32 → final bracket tree
                </li>
                <li className="flex items-center gap-2">
                  <Dot /> Random fill, undo, share
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/simulator" size="lg">
                  Open simulator
                </Button>
                <Button href="/history/2006" variant="ghost" size="lg">
                  Replay Berlin ’06
                </Button>
              </div>
            </div>
            <FakeBracket />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
    />
  );
}

function FakeBracket() {
  return (
    <svg viewBox="0 0 360 280" className="h-auto w-full" aria-hidden>
      <defs>
        <linearGradient id="bk" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {[20, 70, 120, 170, 220].map((y, i) => (
        <g key={i}>
          <rect x="0" y={y - 10} width="80" height="20" rx="4" fill="var(--surface-strong)" stroke="var(--line)" />
          <rect x="0" y={y + 16} width="80" height="20" rx="4" fill="var(--surface-strong)" stroke="var(--line)" />
        </g>
      ))}
      {[45, 145, 195].map((y, i) => (
        <rect
          key={i}
          x="120"
          y={y - 10}
          width="90"
          height="22"
          rx="4"
          fill="var(--surface-strong)"
          stroke="var(--accent)"
          strokeOpacity="0.4"
        />
      ))}
      <rect x="240" y="120" width="100" height="36" rx="6" fill="var(--accent)" opacity="0.85" />
      <text x="290" y="142" textAnchor="middle" fontFamily="var(--font-display)" fontSize="14" fill="#1a1208">
        FINAL
      </text>
      <g stroke="url(#bk)" strokeWidth="1.4" fill="none">
        <path d="M80 24 H100 V46 H120" />
        <path d="M80 76 H100 V54 H120" />
        <path d="M80 124 H100 V146 H120" />
        <path d="M80 176 H100 V154 H120" />
        <path d="M80 222 H100 V200 H120" />
        <path d="M210 46 H230 V134 H240" />
        <path d="M210 146 H230 V134 H240" />
      </g>
    </svg>
  );
}
