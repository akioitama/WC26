"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas of drifting embers / fog particles. Sits behind the
 * content as ambience. Auto-pauses if reduced motion is on.
 */
export function ParticleField({
  density = 70,
  className,
}: {
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      hue: "blue" | "gold" | "white";
    };
    let particles: P[] = [];

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function seed() {
      particles = [];
      for (let i = 0; i < density; i++) {
        const hue = (Math.random() < 0.55 ? "blue" : Math.random() < 0.7 ? "gold" : "white") as P["hue"];
        particles.push({
          x: rand(0, w),
          y: rand(0, h),
          r: rand(0.4, 1.8),
          vx: rand(-0.08, 0.08),
          vy: rand(-0.45, -0.05),
          a: rand(0.15, 0.65),
          hue,
        });
      }
    }

    function tick() {
      ctx!.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = rand(0, w);
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const col =
          p.hue === "blue"
            ? `rgba(43,210,255,${p.a})`
            : p.hue === "gold"
              ? `rgba(245,196,81,${p.a})`
              : `rgba(255,255,255,${p.a * 0.7})`;
        ctx!.beginPath();
        ctx!.fillStyle = col;
        ctx!.shadowColor = col;
        ctx!.shadowBlur = 10;
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
    />
  );
}
