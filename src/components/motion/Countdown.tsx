"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KICKOFF = new Date("2026-06-11T20:00:00-04:00").getTime();

function diff(now: number) {
  let s = Math.max(0, Math.floor((KICKOFF - now) / 1000));
  const d = Math.floor(s / 86400);
  s -= d * 86400;
  const h = Math.floor(s / 3600);
  s -= h * 3600;
  const m = Math.floor(s / 60);
  s -= m * 60;
  return { d, h, m, s };
}

export function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const id = setInterval(() => setT(diff(Date.now())), 1000);
    setT(diff(Date.now()));
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Days", value: t.d },
    { label: "Hours", value: t.h },
    { label: "Minutes", value: t.m },
    { label: "Seconds", value: t.s },
  ];

  return (
    <div className="glass relative overflow-hidden rounded-2xl px-5 py-3">
      <span aria-hidden className="holo absolute inset-0 holo-shimmer" />
      <p className="relative text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--electric)]">
        Kickoff · Estadio Azteca
      </p>
      <div className="relative mt-2 flex items-end gap-3">
        {items.map((i, idx) => (
          <div key={i.label} className="flex items-end gap-3">
            <div className="text-center">
              <div className="display tnum text-3xl text-white sm:text-4xl">
                <FlipNumber value={i.value} />
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/55">
                {i.label}
              </div>
            </div>
            {idx < items.length - 1 && (
              <span className="display pb-3 text-2xl text-[var(--electric)]/55 sm:text-3xl">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FlipNumber({ value }: { value: number }) {
  const v = String(value).padStart(2, "0");
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={v}
          initial={{ y: "-90%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "90%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 26 }}
          className="inline-block"
          style={{ minWidth: "2ch" }}
        >
          {v}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
