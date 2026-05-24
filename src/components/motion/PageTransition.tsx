"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cinematic curtain transition between routes.
 *
 * IMPORTANT: AnimatePresence cannot diff Fragment children. We render a single
 * top-level `motion.div` and put the curtain halves + glowing line inside it
 * as plain divs. This avoids the "removeChild ... not a child" reconciler
 * crash that React 19 throws when AnimatePresence loses track of fragmented
 * exit animations.
 */
export function PageTransition() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) {
      setArmed(true);
      return;
    }
    setShow(true);
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={`curtain-${pathname}`}
          className="pointer-events-none fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div
            className="curtain absolute inset-x-0 top-0 h-1/2"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.div
            className="curtain absolute inset-x-0 bottom-0 h-1/2"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.div
            className="absolute left-0 right-0 top-1/2 h-px"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.65, 0, 0.35, 1],
              delay: 0.05,
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--electric), transparent)",
              boxShadow: "0 0 30px var(--electric)",
              transformOrigin: "50% 50%",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
