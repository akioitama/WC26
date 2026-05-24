"use client";

import { useState } from "react";
import { photoFor, portraitUrl } from "@/data/playerPhotos";

type Size = "sm" | "md" | "lg" | "xl";

const PX: Record<Size, number> = { sm: 64, md: 96, lg: 140, xl: 200 };

/**
 * Realistic face-only player portrait — real CC-licensed Wikipedia photo,
 * circular crop, subtle Ken Burns animation.
 */
export function PlayerFacePortrait({
  playerName,
  primary,
  secondary,
  size = "lg",
  className,
  label,
}: {
  playerName: string;
  primary: string;
  secondary: string;
  number?: string;
  size?: Size;
  className?: string;
  label?: string;
}) {
  const config = photoFor(playerName);
  const px = PX[size];
  const [useRemote, setUseRemote] = useState(false);
  const [errored, setErrored] = useState(false);

  if (!config || errored) {
    return (
      <figure
        className={`player-real-portrait ${className ?? ""}`}
        style={{ width: px, height: px }}
        aria-label={label ?? `${playerName} portrait`}
        role="img"
      >
        <div
          className="player-real-fallback flex h-full w-full items-center justify-center rounded-full text-white/70"
          style={{
            background: `radial-gradient(circle at 40% 30%, ${primary}44, #06140a 70%)`,
            border: `2px solid ${primary}`,
          }}
        >
          <span className="display font-bold leading-none" style={{ fontSize: px * 0.28 }}>
            {initials(playerName)}
          </span>
        </div>
      </figure>
    );
  }

  const src =
    useRemote && config.remoteUrl
      ? config.remoteUrl
      : config.remoteUrl && !useRemote
        ? portraitUrl(config)
        : config.remoteUrl || portraitUrl(config);

  return (
    <figure
      className={`player-real-portrait ${className ?? ""}`}
      style={{ width: px, height: px }}
      aria-label={label ?? `${playerName} portrait`}
      role="img"
    >
      <svg
        className="pointer-events-none absolute inset-0"
        viewBox="0 0 100 100"
        width={px}
        height={px}
        aria-hidden
      >
        <circle cx="50" cy="50" r="48" fill="none" stroke={primary} strokeWidth="2.5" />
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke={secondary}
          strokeWidth="1"
          strokeDasharray="3 5"
          opacity="0.6"
        />
      </svg>

      <div
        className="player-real-disc"
        style={{ width: px * 0.88, height: px * 0.88, margin: "6% auto 0" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => {
            if (!useRemote && config.remoteUrl) setUseRemote(true);
            else setErrored(true);
          }}
          className="player-real-photo"
          style={{
            objectPosition: config.objectPosition,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ["--real-zoom" as any]: String(config.zoom ?? 1.25),
          }}
        />
        <div className="player-real-vignette" aria-hidden />
        <div className="player-real-shine" aria-hidden />
      </div>
    </figure>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
