"use client";

import { useId } from "react";
import type { PlayerPose } from "@/data/playerPoses";

type Size = "sm" | "md" | "lg" | "xl";

const HEIGHT: Record<Size, number> = { sm: 72, md: 120, lg: 180, xl: 260 };

/**
 * PlayerAnimatedArt — original animated footballer silhouettes.
 * Geometric SVG figures in kit colours; no photos, no likenesses.
 * Each pose loops a subtle CSS animation (kick, sprint, header, etc.).
 */
export function PlayerAnimatedArt({
  pose,
  primary,
  secondary,
  trim = "#0a0a14",
  number,
  size = "lg",
  className,
  label,
}: {
  pose: PlayerPose;
  primary: string;
  secondary: string;
  trim?: string;
  number?: string;
  size?: Size;
  className?: string;
  label?: string;
}) {
  const h = HEIGHT[size];
  const w = Math.round(h * 0.72);
  const uid = useId().replace(/:/g, "");
  const kitId = `kit-${uid}`;
  const glowId = `glow-${uid}`;

  return (
    <figure
      className={`player-art player-pose-${pose} ${className ?? ""}`}
      style={{ width: w, height: h }}
      aria-label={label ?? "Animated footballer"}
      role="img"
    >
      <svg
        viewBox="0 0 72 100"
        width={w}
        height={h}
        className="player-art-svg"
        aria-hidden
      >
        <defs>
          <linearGradient id={kitId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={primary} />
            <stop offset="100%" stopColor={secondary} />
          </linearGradient>
          <filter id={glowId}>
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse
          cx="36"
          cy="96"
          rx="18"
          ry="3"
          fill="rgba(0,0,0,0.35)"
          className="player-shadow"
        />

        {/* Ball (some poses) */}
        {(pose === "volley" ||
          pose === "dribble" ||
          pose === "chest-finish" ||
          pose === "poacher") && (
          <g className="player-ball">
            <circle cx="52" cy="78" r="6" fill="white" stroke={trim} strokeWidth="0.8" />
            <polygon
              points="52,74 54,76 52,78 50,76"
              fill={trim}
              opacity="0.7"
            />
          </g>
        )}

        {/* Figure — grouped limbs for CSS transform */}
        <g filter={`url(#${glowId})`}>
          {/* Head */}
          <circle
            cx="36"
            cy="14"
            r="9"
            fill="#e8c4a0"
            stroke={trim}
            strokeWidth="0.8"
            className="player-head"
          />

          {/* Torso / kit */}
          <rect
            x="26"
            y="24"
            width="20"
            height="26"
            rx="4"
            fill={`url(#${kitId})`}
            stroke={trim}
            strokeWidth="0.6"
            className="player-torso"
          />
          {number && (
            <text
              x="36"
              y="42"
              textAnchor="middle"
              fill={trim}
              style={{
                fontFamily: "var(--font-display), Bebas Neue, Impact, sans-serif",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {number}
            </text>
          )}

          {/* Arms */}
          <g className="player-arm-left" stroke={trim} strokeWidth="3" strokeLinecap="round">
            <line x1="28" y1="28" x2="16" y2="38" />
            <line x1="16" y1="38" x2="12" y2="48" />
          </g>
          <g className="player-arm-right" stroke={trim} strokeWidth="3" strokeLinecap="round">
            <line x1="44" y1="28" x2="56" y2="38" />
            <line x1="56" y1="38" x2="60" y2="48" />
          </g>

          {/* Shorts */}
          <rect
            x="27"
            y="48"
            width="18"
            height="10"
            rx="2"
            fill={secondary}
            stroke={trim}
            strokeWidth="0.5"
            className="player-shorts"
          />

          {/* Legs */}
          <g className="player-leg-left" stroke={trim} strokeWidth="3.5" strokeLinecap="round">
            <line x1="32" y1="58" x2="28" y2="78" />
            <line x1="28" y1="78" x2="24" y2="92" />
          </g>
          <g className="player-leg-right" stroke={trim} strokeWidth="3.5" strokeLinecap="round">
            <line x1="40" y1="58" x2="44" y2="78" />
            <line x1="44" y1="78" x2="48" y2="92" />
          </g>

          {/* Boots */}
          <g fill={trim}>
            <ellipse cx="24" cy="93" rx="5" ry="2.5" className="player-boot-left" />
            <ellipse cx="48" cy="93" rx="5" ry="2.5" className="player-boot-right" />
          </g>
        </g>

        {/* Motion lines (sprint / dribble) */}
        {(pose === "sprint" || pose === "dribble") && (
          <g className="player-speed-lines" stroke="rgba(255,255,255,0.35)" strokeWidth="1">
            <line x1="4" y1="50" x2="14" y2="50" />
            <line x1="2" y1="62" x2="12" y2="62" />
            <line x1="6" y1="74" x2="16" y2="74" />
          </g>
        )}
      </svg>
    </figure>
  );
}
