"use client";

import { motion, AnimatePresence } from "framer-motion";

export function ScoreFlip({ value }: { value: number | null }) {
  const v = value ?? 0;
  return (
    <span className="relative inline-flex h-12 w-10 items-center justify-center overflow-hidden rounded-md bg-[color-mix(in_oklab,var(--bg)_85%,black)] font-mono text-3xl tnum text-[var(--fg)] ring-1 ring-[var(--line)] sm:h-14 sm:w-12 sm:text-4xl">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={v}
          initial={{ y: "-100%", rotateX: -90, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          exit={{ y: "100%", rotateX: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 26 }}
          className="absolute"
          style={{ backfaceVisibility: "hidden" }}
        >
          {v}
        </motion.span>
      </AnimatePresence>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/40"
      />
    </span>
  );
}
