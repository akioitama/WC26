"use client";

import { ReactNode, useEffect } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { MarqueeTicker } from "./MarqueeTicker";
import { useUiStore } from "@/store/uiStore";
import { PageTransition } from "@/components/motion/PageTransition";

/**
 * Shell — kept intentionally lean. We removed Lenis (smooth-scroll RAF tax),
 * the WebGL/Canvas overlays (ParticleField, MouseSpotlight, StadiumScene),
 * and the loading-screen blocker. Native scroll + CSS animations only.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  const theme = useUiStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="relative flex min-h-dvh flex-col">
      <PageTransition />
      <Nav />
      <MarqueeTicker />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  );
}
