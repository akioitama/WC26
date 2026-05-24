"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

/**
 * Pinned scroll section — ball follows a curved path into the goal.
 * GSAP MotionPath + ScrollTrigger (scrubbed to page scroll).
 */
export function BallScrollPath() {
  const root = useRef<HTMLDivElement>(null);
  const ballRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const goalRef = useRef<SVGGElement>(null);
  const netRef = useRef<SVGCircleElement>(null);
  const [scored, setScored] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    let t1 = 0;
    let t2 = 0;
    const refresh = () => ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const ball = ballRef.current;
      const section = root.current;
      if (!path || !ball || !section) return;

      const stops = gsap.utils.toArray<HTMLElement>("[data-stop]", section);

      stops.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: () => `top+=${120 + i * 220} top`,
            end: () => `top+=${320 + i * 220} top`,
            scrub: 0.4,
          },
        });
      });

      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2200",
          scrub: 0.55,
          pin: true,
          pinType: "fixed",
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const hit = self.progress > 0.92;
            setScored((prev) => (prev !== hit ? hit : prev));
          },
        },
      });

      timeline.to(
        path,
        { strokeDashoffset: 0, ease: "none", duration: 1 },
        0,
      );

      timeline.to(
        ball,
        {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: "none",
          duration: 1,
        },
        0,
      );

      if (goalRef.current) {
        timeline.fromTo(
          goalRef.current,
          { scale: 1, opacity: 0.85 },
          { scale: 1.08, opacity: 1, duration: 0.08, yoyo: true, repeat: 1 },
          0.92,
        );
      }

      if (netRef.current) {
        gsap.set(netRef.current, { scale: 0.6, opacity: 0 });
        timeline.to(
          netRef.current,
          { scale: 1.5, opacity: 0, duration: 0.35, ease: "power2.out" },
          0.93,
        );
      }

      refresh();
      t1 = window.setTimeout(refresh, 400);
      t2 = window.setTimeout(refresh, 1200);
    }, root);

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate min-h-[100vh] overflow-hidden bg-[var(--bg)]"
      aria-label="The tournament, in motion"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 20%, color-mix(in oklab, var(--accent) 25%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 net-mesh opacity-30" aria-hidden />

      <div className="relative mx-auto grid h-[100vh] max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:px-8">
        <div className="flex flex-col justify-around gap-10 py-4">
          <div data-stop className="max-w-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--accent)]">
              Phase 01
            </p>
            <h3 className="display mt-2 text-4xl text-[var(--fg)] sm:text-5xl">
              Twelve groups.
              <br />
              <span className="text-[var(--fg)]/55">Forty‑eight nations.</span>
            </h3>
            <p className="mt-3 text-sm text-[var(--fg)]/70">
              Six matches per group, three points for a win, every result rippling
              through the seeding.
            </p>
          </div>
          <div data-stop className="max-w-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--accent)]">
              Phase 02
            </p>
            <h3 className="display mt-2 text-4xl text-[var(--fg)] sm:text-5xl">
              Eight best
              <br />
              <span className="text-[var(--fg)]/55">third‑placed teams</span>
            </h3>
            <p className="mt-3 text-sm text-[var(--fg)]/70">
              The simulator resolves all 495 Annex C combinations. Pick any
              twelve outcomes and the bracket arranges itself in microseconds.
            </p>
          </div>
          <div data-stop className="max-w-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--accent)]">
              Phase 03
            </p>
            <h3 className="display mt-2 text-4xl text-[var(--fg)] sm:text-5xl">
              32 knockout
              <br />
              <span className="text-[var(--fg)]/55">matches to glory.</span>
            </h3>
            <p className="mt-3 text-sm text-[var(--fg)]/70">
              R32, R16, QF, SF, third place, and the final at MetLife. Scroll
              the ball home — then pick your champion in the simulator.
            </p>
          </div>
        </div>

        <div className="relative flex min-h-[320px] items-center lg:min-h-0 lg:h-full">
          <svg
            viewBox="0 0 400 700"
            className="mx-auto h-[min(80vh,640px)] w-full max-w-md"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="ball-trail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
              </linearGradient>
              <radialGradient id="ball-glow">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx="200" cy="350" r="180" fill="url(#ball-glow)" />

            <path
              ref={pathRef}
              d="M 60 60
                 C 320 110, 80 230, 340 290
                 S 60 460, 320 530
                 S 200 660, 200 660"
              stroke="url(#ball-trail)"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />

            <g fill="var(--accent)" opacity="0.9">
              <circle cx="60" cy="60" r="5" />
              <circle cx="340" cy="290" r="5" />
              <circle cx="320" cy="530" r="5" />
              <circle cx="200" cy="660" r="7" />
            </g>

            <g ref={goalRef} transform="translate(200,660)">
              <rect
                x="-52"
                y="-34"
                width="104"
                height="42"
                fill="none"
                stroke="var(--fg)"
                strokeOpacity="0.75"
                strokeWidth="2"
              />
              <line
                x1="-52"
                y1="-34"
                x2="52"
                y2="-34"
                stroke="var(--fg)"
                strokeOpacity="0.9"
                strokeWidth="3"
              />
              <g stroke="var(--fg)" strokeOpacity="0.25" strokeWidth="0.8">
                {[...Array(9)].map((_, i) => (
                  <line key={`v${i}`} x1={-44 + i * 11} y1="-34" x2={-44 + i * 11} y2="8" />
                ))}
                {[...Array(5)].map((_, i) => (
                  <line key={`h${i}`} x1="-52" y1={-28 + i * 8} x2="52" y2={-28 + i * 8} />
                ))}
              </g>
              <circle
                ref={netRef}
                cx="0"
                cy="-8"
                r="40"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                opacity="0"
              />
            </g>

            <g ref={ballRef} className={scored ? "net-rip" : undefined}>
              <circle r="16" fill="white" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
              <polygon
                points="0,-10 7,-3 4.5,6 -4.5,6 -7,-3"
                fill="#0a0a0a"
              />
              <g
                fill="none"
                stroke="#0a0a0a"
                strokeWidth="1.2"
                strokeLinejoin="round"
              >
                <line x1="0" y1="-10" x2="0" y2="-16" />
                <line x1="7" y1="-3" x2="12" y2="-6" />
                <line x1="4.5" y1="6" x2="8" y2="11" />
                <line x1="-4.5" y1="6" x2="-8" y2="11" />
                <line x1="-7" y1="-3" x2="-12" y2="-6" />
              </g>
            </g>
          </svg>

          <p
            className={`pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.35em] transition-opacity duration-300 ${
              scored ? "text-[var(--accent)] opacity-100" : "text-[var(--fg)]/40 opacity-70"
            }`}
          >
            {scored ? "Goal!" : "Scroll to play"}
          </p>
        </div>
      </div>
    </section>
  );
}
