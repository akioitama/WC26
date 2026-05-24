"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function StatCounter({
  to,
  label,
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  label: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const v = useMotionValue(0);
  const rounded = useTransform(v, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (inView) {
      animate(v, to, { duration, ease: [0.2, 0.7, 0.2, 1] });
    }
  }, [inView, to, duration, v]);

  return (
    <div
      ref={ref}
      className={cn(
        "surface rounded-2xl p-5",
        "transition-transform duration-500 hover:-translate-y-1",
        className,
      )}
    >
      <motion.div
        className="display tnum text-5xl text-[var(--fg)] sm:text-6xl"
        style={{ color: "var(--fg)" }}
      >
        <motion.span>{rounded}</motion.span>
      </motion.div>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--fg)]/55">
        {label}
      </p>
    </div>
  );
}
