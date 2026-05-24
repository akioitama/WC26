"use client";

import { useEffect, useState } from "react";

export function MouseSpotlight() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEnabled(false);
      return;
    }
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) {
      setEnabled(false);
      return;
    }
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  if (!enabled) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] mix-blend-screen"
      style={{
        background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(43,210,255,0.10), transparent 70%)`,
        transition: "background 60ms linear",
      }}
    />
  );
}
