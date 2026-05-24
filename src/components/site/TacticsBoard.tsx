"use client";

import { useState } from "react";

type Formation = {
  id: string;
  label: string;
  era: string;
  team: string;
  description: string;
  positions: { x: number; y: number; role: string }[];
};

const FORMATIONS: Formation[] = [
  {
    id: "4-2-3-1",
    label: "4–2–3–1",
    era: "Modern WC",
    team: "Spain '10 · Germany '14 · France '18",
    description:
      "Two pivots screen the back four; an attacking 10 links to a lone striker between two wide forwards. The default shape of the modern World Cup.",
    positions: [
      { x: 50, y: 92, role: "GK" },
      { x: 14, y: 70, role: "LB" },
      { x: 36, y: 72, role: "CB" },
      { x: 64, y: 72, role: "CB" },
      { x: 86, y: 70, role: "RB" },
      { x: 36, y: 52, role: "DM" },
      { x: 64, y: 52, role: "DM" },
      { x: 16, y: 30, role: "LW" },
      { x: 50, y: 32, role: "AM" },
      { x: 84, y: 30, role: "RW" },
      { x: 50, y: 12, role: "ST" },
    ],
  },
  {
    id: "4-3-3",
    label: "4–3–3",
    era: "Total Football",
    team: "Netherlands '74 · Brazil '82 · Spain '10",
    description:
      "Cruyff's Ajax took it to the world. A holding 6 with two interiors; three forwards stretched wide. The ancestor of every pressing system since.",
    positions: [
      { x: 50, y: 92, role: "GK" },
      { x: 14, y: 70, role: "LB" },
      { x: 36, y: 72, role: "CB" },
      { x: 64, y: 72, role: "CB" },
      { x: 86, y: 70, role: "RB" },
      { x: 50, y: 52, role: "DM" },
      { x: 28, y: 38, role: "CM" },
      { x: 72, y: 38, role: "CM" },
      { x: 14, y: 18, role: "LW" },
      { x: 50, y: 16, role: "ST" },
      { x: 86, y: 18, role: "RW" },
    ],
  },
  {
    id: "3-5-2",
    label: "3–5–2",
    era: "Catenaccio's heir",
    team: "Argentina '86 · Germany '90 · Italy '06",
    description:
      "Three centre-halves, wing-backs that bomb both flanks, two strikers at the top. Maradona's Argentina ran it. Cannavaro's Italy lifted in Berlin from this shape.",
    positions: [
      { x: 50, y: 92, role: "GK" },
      { x: 28, y: 72, role: "CB" },
      { x: 50, y: 76, role: "CB" },
      { x: 72, y: 72, role: "CB" },
      { x: 12, y: 50, role: "LWB" },
      { x: 88, y: 50, role: "RWB" },
      { x: 30, y: 40, role: "CM" },
      { x: 50, y: 44, role: "CM" },
      { x: 70, y: 40, role: "CM" },
      { x: 38, y: 14, role: "ST" },
      { x: 62, y: 14, role: "ST" },
    ],
  },
  {
    id: "4-4-2",
    label: "4–4–2",
    era: "British classic",
    team: "England '90 · Brazil '94 · Italy '82",
    description:
      "Two banks of four, two strikers, two wingers hugging the touchline. Won England '66, Italy '82, Brazil '94. The shape every kid is taught first.",
    positions: [
      { x: 50, y: 92, role: "GK" },
      { x: 14, y: 70, role: "LB" },
      { x: 36, y: 72, role: "CB" },
      { x: 64, y: 72, role: "CB" },
      { x: 86, y: 70, role: "RB" },
      { x: 14, y: 44, role: "LM" },
      { x: 38, y: 46, role: "CM" },
      { x: 62, y: 46, role: "CM" },
      { x: 86, y: 44, role: "RM" },
      { x: 38, y: 16, role: "ST" },
      { x: 62, y: 16, role: "ST" },
    ],
  },
];

/**
 * TacticsBoard — interactive SVG pitch showing four era-defining formations.
 * No JS animation; tab switching only.
 */
export function TacticsBoard() {
  const [active, setActive] = useState(FORMATIONS[0]);

  return (
    <section
      className="relative overflow-hidden border-y border-white/15 py-16 sm:py-20"
      style={{
        background:
          "linear-gradient(180deg, var(--pitch-deep) 0%, var(--pitch-900) 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Lead column */}
          <div className="lg:col-span-4">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.6em] text-[var(--gold)]">
              Chapter 04 · The blueprint
            </p>
            <h2 className="display mt-2 text-5xl text-white sm:text-6xl">
              Four shapes,
              <br />
              <span className="gold-sweep">four eras.</span>
            </h2>
            <p className="mt-5 font-serif text-base leading-relaxed text-white/75">
              Tactics drive the World Cup. The dressing-room board has gone
              from chalk to iPad, but the eleven dots haven&rsquo;t changed. Tap a
              formation — see who lifted with it.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-2">
              {FORMATIONS.map((f) => (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => setActive(f)}
                    className={`group block w-full rounded-lg border px-3 py-3 text-left transition ${
                      active.id === f.id
                        ? "border-[var(--gold)] bg-[var(--gold)]/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/25"
                    }`}
                  >
                    <span className="display tnum block text-2xl text-white">
                      {f.label}
                    </span>
                    <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.3em] text-white/55">
                      {f.era}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Pitch */}
          <div className="lg:col-span-8">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10"
              style={{
                background:
                  "repeating-linear-gradient(90deg,#0e2a1a 0 56px,#0c2517 56px 112px)",
                boxShadow:
                  "inset 0 0 80px rgba(0,0,0,0.5), 0 30px 60px -30px rgba(0,0,0,0.8)",
              }}
            >
              {/* Pitch markings */}
              <svg
                viewBox="0 0 100 130"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  fill="none"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="0.4"
                >
                  {/* Touchlines */}
                  <rect x="2" y="2" width="96" height="126" />
                  {/* Halfway line */}
                  <line x1="2" y1="65" x2="98" y2="65" />
                  {/* Center circle */}
                  <circle cx="50" cy="65" r="9" />
                  <circle cx="50" cy="65" r="0.5" fill="white" />
                  {/* Penalty boxes */}
                  <rect x="20" y="2" width="60" height="16" />
                  <rect x="34" y="2" width="32" height="6" />
                  <circle cx="50" cy="13" r="0.5" fill="white" />
                  <path
                    d="M 38 18 A 11 11 0 0 0 62 18"
                    fill="none"
                  />
                  <rect x="20" y="112" width="60" height="16" />
                  <rect x="34" y="122" width="32" height="6" />
                  <circle cx="50" cy="117" r="0.5" fill="white" />
                  <path
                    d="M 38 112 A 11 11 0 0 1 62 112"
                    fill="none"
                  />
                  {/* Corners */}
                  <path d="M 2 4 A 2 2 0 0 1 4 2" />
                  <path d="M 98 4 A 2 2 0 0 0 96 2" />
                  <path d="M 2 126 A 2 2 0 0 0 4 128" />
                  <path d="M 98 126 A 2 2 0 0 1 96 128" />
                </g>

                {/* Players */}
                {active.positions.map((p, i) => (
                  <g
                    key={`${active.id}-${i}`}
                    transform={`translate(${p.x} ${p.y})`}
                    style={{
                      animation: `tactic-pop 380ms ${i * 30}ms cubic-bezier(0.34,1.56,0.64,1) backwards`,
                    }}
                  >
                    <circle
                      r="3.4"
                      fill="var(--gold)"
                      stroke="white"
                      strokeWidth="0.5"
                      style={{
                        filter:
                          "drop-shadow(0 0 8px rgba(245,196,81,0.7))",
                      }}
                    />
                    <text
                      y="1.2"
                      textAnchor="middle"
                      fill="#06140a"
                      style={{
                        fontFamily:
                          "var(--font-mono), monospace",
                        fontWeight: 700,
                        fontSize: 2.4,
                      }}
                    >
                      {p.role}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Header */}
              <div className="absolute left-4 top-4 right-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.4em] text-white/85">
                <span>Tactics board · {active.label}</span>
                <span>{active.era}</span>
              </div>
            </div>

            {/* Caption */}
            <div className="mt-5 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
              <span
                className="display rounded-lg bg-[var(--gold)]/10 px-3 py-2 text-center text-3xl text-[var(--gold)]"
                style={{ minWidth: "5.5rem" }}
              >
                {active.label}
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">
                  {active.team}
                </p>
                <p className="mt-2 font-serif text-base leading-relaxed text-white/85">
                  {active.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
