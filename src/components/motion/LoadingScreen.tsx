"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("wc26-loaded")) {
      setDone(true);
      return;
    }
    setHasShown(true);
    const t1 = setTimeout(() => {
      sessionStorage.setItem("wc26-loaded", "1");
      setDone(true);
    }, 2400);
    return () => clearTimeout(t1);
  }, []);

  if (!hasShown) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] grid place-items-center"
          style={{
            background:
              "radial-gradient(ellipse at center, #0a1024 0%, #02040a 80%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } }}
        >
          {/* Grid backdrop */}
          <div
            className="pointer-events-none absolute inset-0 grid-fade opacity-60"
            aria-hidden
          />
          {/* Beams */}
          <motion.span
            aria-hidden
            className="beam"
            style={{ left: "-10vw", transform: "rotate(-12deg)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.3] }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="beam"
            style={{ right: "-10vw", transform: "rotate(14deg)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.3] }}
            transition={{ duration: 2.2, ease: "easeInOut", delay: 0.1 }}
          />

          <div className="relative flex flex-col items-center gap-10">
            {/* Spinning football with rings */}
            <div className="relative">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-[var(--electric)]/30"
                  initial={{ scale: 0.6, opacity: 0.7 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  style={{ width: 120, height: 120 }}
                />
              ))}
              <motion.div
                initial={{ rotate: -540, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
                className="relative z-10"
              >
                <svg
                  viewBox="0 0 64 64"
                  width="120"
                  height="120"
                  className="drop-shadow-[0_0_30px_rgba(43,210,255,0.55)]"
                >
                  <defs>
                    <radialGradient id="lball" cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="55%" stopColor="#cfe7ff" />
                      <stop offset="100%" stopColor="#234580" />
                    </radialGradient>
                  </defs>
                  <circle cx="32" cy="32" r="30" fill="url(#lball)" />
                  <g
                    fill="#0a0a14"
                    stroke="#0a0a14"
                    strokeWidth="0.6"
                    strokeLinejoin="round"
                  >
                    <polygon points="32,18 39,23 36.5,31.5 27.5,31.5 25,23" />
                  </g>
                  <g
                    fill="none"
                    stroke="#0a0a14"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  >
                    <line x1="32" y1="18" x2="32" y2="8" />
                    <line x1="39" y1="23" x2="49" y2="20" />
                    <line x1="36.5" y1="31.5" x2="42" y2="42" />
                    <line x1="27.5" y1="31.5" x2="22" y2="42" />
                    <line x1="25" y1="23" x2="15" y2="20" />
                  </g>
                </svg>
              </motion.div>
            </div>

            <div className="text-center">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="font-mono text-[10px] uppercase tracking-[0.6em] text-[var(--electric)]"
              >
                FIFA · World Cup · 26
              </motion.p>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="display mt-4 text-5xl text-white sm:text-7xl"
              >
                <span className="electric-sweep">Kickoff.</span>
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 1, ease: [0.65, 0, 0.35, 1] }}
                className="mx-auto mt-8 h-[2px] w-64 origin-left bg-gradient-to-r from-transparent via-[var(--electric)] to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
