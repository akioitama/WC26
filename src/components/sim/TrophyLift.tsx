"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSimStore } from "@/store/simStore";
import { resolveMatchSides } from "@/lib/knockoutBracket";
import { teamFromName } from "@/data/teams";
import { OfficialFlag } from "@/components/ui/OfficialFlag";

export function TrophyLift() {
  const getSnapshot = useSimStore((s) => s.getSnapshot);
  const groupRankings = useSimStore((s) => s.groupRankings);
  const ko = useSimStore((s) => s.koWinners);
  const [open, setOpen] = useState(false);
  const [seenChampion, setSeenChampion] = useState<string | null>(null);

  const champion = useMemo(() => {
    const snap = getSnapshot();
    if (!snap) return null;
    const finalPick = ko[104];
    if (!finalPick) return null;
    const { home, away } = resolveMatchSides(104, snap, ko);
    return finalPick === "home" ? home : away;
  }, [getSnapshot, groupRankings, ko]);

  useEffect(() => {
    if (champion && champion !== seenChampion) {
      setSeenChampion(champion);
      setOpen(true);
    }
    if (!champion) setSeenChampion(null);
  }, [champion, seenChampion]);

  const team = champion ? teamFromName(champion) : undefined;

  return (
    <AnimatePresence>
      {open && team && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.85), rgba(0,0,0,0.96))",
          }}
        >
          <Confetti color={team.colors.primary} />
          <Confetti color={team.colors.secondary} />
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80 hover:bg-white/10"
          >
            Close ✕
          </button>
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 22,
              delay: 0.1,
            }}
            className="relative mx-6 w-full max-w-3xl rounded-3xl border border-white/15 bg-[#0c0c0c] p-10 text-center shadow-[0_60px_120px_rgba(0,0,0,0.6)]"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 -top-1 h-2 rounded-t-3xl"
              style={{
                background: `linear-gradient(90deg, ${team.colors.primary}, ${team.colors.secondary}, ${team.colors.trim})`,
              }}
            />
            <Trophy />
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.5em] text-[var(--accent)]">
              Champions of the world
            </p>
            <h2
              className="display mt-2 text-white"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.85 }}
            >
              {team.name}
            </h2>
            <div className="mt-4 flex justify-center">
              <OfficialFlag
                code={team.fifaCode}
                primary={team.colors.primary}
                secondary={team.colors.secondary}
                size={64}
                variant="shield"
                stars={team.worldCup.titles + 1}
              />
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.4em] text-white/55">
              MetLife Stadium · 19 July 2026
            </p>
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: team.worldCup.titles + 1 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="display text-3xl text-[var(--gold-bright)]"
                >
                  ★
                </motion.span>
              ))}
            </div>
            <p className="mt-3 text-sm text-white/70">
              {team.worldCup.titles + 1 === 1
                ? "First-ever world title."
                : `Their ${ordinal(team.worldCup.titles + 1)} World Cup star.`}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Trophy() {
  return (
    <svg viewBox="0 0 200 220" className="mx-auto h-44 w-44" aria-hidden>
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe97a" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#7a6320" />
        </linearGradient>
        <radialGradient id="globe">
          <stop offset="0%" stopColor="#fff7c8" />
          <stop offset="100%" stopColor="#caa54f" />
        </radialGradient>
      </defs>
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="100" cy="50" rx="34" ry="40" fill="url(#globe)" />
        <ellipse
          cx="100"
          cy="50"
          rx="34"
          ry="40"
          fill="none"
          stroke="#7a6320"
          strokeWidth="1.5"
          opacity="0.35"
        />
        <path
          d="M70 75 C50 110, 100 110, 100 165 C100 110, 150 110, 130 75 Z"
          fill="url(#tg)"
        />
        <rect x="80" y="160" width="40" height="14" rx="3" fill="#a17e25" />
        <rect x="62" y="174" width="76" height="20" rx="4" fill="url(#tg)" />
        <rect x="50" y="194" width="100" height="10" rx="3" fill="#7a6320" />
      </motion.g>
    </svg>
  );
}

function Confetti({ color }: { color: string }) {
  const dots = Array.from({ length: 24 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => (
        <motion.span
          key={i}
          className="confetti-dot"
          style={{
            background: color,
            left: `${(i * 47) % 100}%`,
            top: `-10%`,
            transform: `rotate(${(i * 27) % 360}deg)`,
          }}
          initial={{ y: -100, opacity: 1 }}
          animate={{ y: 1100, opacity: [1, 1, 0.4, 0] }}
          transition={{
            duration: 5 + (i % 5) * 0.5,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}
