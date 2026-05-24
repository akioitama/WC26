"use client";

import { useState } from "react";
import type { Team } from "@/data/teams";
import { flagFor } from "@/data/flags";
import { NationBadge } from "./NationBadge";

type Variant = "rounded" | "circle" | "shield";

/**
 * OfficialFlag — renders the real public-domain national flag SVG from
 * Wikimedia Commons. Falls back to the procedural NationBadge if the
 * flag fails to load (e.g. offline, corrupt URL).
 *
 * The "shield" variant clips the flag into a football-crest silhouette,
 * giving you the broadcast-graphic look while still using a real flag.
 */
export function OfficialFlag({
  code,
  primary,
  secondary,
  size = 40,
  variant = "rounded",
  stars = 0,
  className,
}: {
  code: string;
  primary: string;
  secondary: string;
  size?: number;
  variant?: Variant;
  stars?: number;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const url = flagFor(code);

  if (!url || errored) {
    return (
      <NationBadge
        code={code}
        primary={primary}
        secondary={secondary}
        size={size}
        stars={stars}
        className={className}
      />
    );
  }

  if (variant === "circle") {
    return (
      <span
        className={`relative inline-block overflow-hidden rounded-full ring-2 ring-white/30 ${className ?? ""}`}
        style={{
          width: size,
          height: size,
          boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
        }}
        aria-label={`${code} flag`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={`${code} flag`}
          loading="lazy"
          decoding="async"
          onError={() => setErrored(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </span>
    );
  }

  if (variant === "shield") {
    const id = `shield-${code.toLowerCase()}`;
    return (
      <svg
        viewBox="0 0 100 110"
        width={size}
        height={(size * 110) / 100}
        className={className}
        aria-label={`${code} crest`}
        role="img"
      >
        <defs>
          <clipPath id={id}>
            <path d="M50 2 L96 14 V58 C96 84 76 102 50 108 C24 102 4 84 4 58 V14 Z" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${id})`}>
          <rect width="100" height="110" fill={primary} />
          <image
            href={url}
            x="-5"
            y="0"
            width="110"
            height="110"
            preserveAspectRatio="xMidYMid slice"
            onError={(e) => {
              (e.target as SVGImageElement).style.display = "none";
              setErrored(true);
            }}
          />
          {stars > 0 && (
            <g transform="translate(50 88)">
              {Array.from({ length: Math.min(stars, 5) }).map((_, i) => {
                const total = Math.min(stars, 5);
                const offset = (i - (total - 1) / 2) * 11;
                return (
                  <polygon
                    key={i}
                    transform={`translate(${offset} 0)`}
                    points="0,-4 1.2,-1 4,-1 1.8,0.8 2.6,3.6 0,2 -2.6,3.6 -1.8,0.8 -4,-1 -1.2,-1"
                    fill="#FFD76A"
                    stroke="rgba(0,0,0,0.55)"
                    strokeWidth="0.5"
                  />
                );
              })}
            </g>
          )}
        </g>
        <path
          d="M50 2 L96 14 V58 C96 84 76 102 50 108 C24 102 4 84 4 58 V14 Z"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
      </svg>
    );
  }

  // default: rounded rectangle (broadcast scoreboard style)
  return (
    <span
      className={`relative inline-block overflow-hidden rounded-md ring-1 ring-white/20 ${className ?? ""}`}
      style={{
        width: size,
        height: Math.round(size * 0.66),
        boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
      }}
      aria-label={`${code} flag`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={`${code} flag`}
        loading="lazy"
        decoding="async"
        onError={() => setErrored(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </span>
  );
}

/** Convenience wrapper when a full Team object is available. */
export function TeamFlag({
  team,
  size = 24,
  variant = "rounded",
  stars,
  className,
}: {
  team: Pick<Team, "fifaCode" | "colors" | "worldCup">;
  size?: number;
  variant?: Variant;
  stars?: number;
  className?: string;
}) {
  return (
    <OfficialFlag
      code={team.fifaCode}
      primary={team.colors.primary}
      secondary={team.colors.secondary}
      size={size}
      variant={variant}
      stars={stars ?? team.worldCup.titles}
      className={className}
    />
  );
}
