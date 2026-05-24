"use client";

import { useState } from "react";
import type { Team } from "@/data/teams";
import { kitImageUrl, kitRemoteUrl, hasKit, patternForCode } from "@/data/kits";
import { cn } from "@/lib/cn";

const SHIRT =
  "M20 16 L46 8 Q60 22 74 8 L100 16 L114 36 L96 44 L96 132 Q96 138 90 138 L30 138 Q24 138 24 132 L24 44 L6 36 Z";

function PatternFill({
  pattern,
  primary,
  secondary,
  id,
}: {
  pattern: ReturnType<typeof patternForCode>;
  primary: string;
  secondary: string;
  id: string;
}) {
  switch (pattern) {
    case "argentina":
      return (
        <pattern id={id} width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="6" height="12" fill="#75AADB" />
          <rect x="6" width="6" height="12" fill="#FFFFFF" />
        </pattern>
      );
    case "brazil":
      return (
        <>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFDF00" />
            <stop offset="100%" stopColor="#E8C800" />
          </linearGradient>
        </>
      );
    case "germany":
      return (
        <pattern id={id} width="120" height="140" patternUnits="userSpaceOnUse">
          <rect width="120" height="140" fill="#FFFFFF" />
          <rect y="0" width="120" height="18" fill="#000000" />
          <rect y="122" width="120" height="18" fill="#DD0000" />
        </pattern>
      );
    case "france":
      return (
        <pattern id={id} width="120" height="140" patternUnits="userSpaceOnUse">
          <rect width="40" height="140" fill="#002395" />
          <rect x="40" width="40" height="140" fill="#FFFFFF" />
          <rect x="80" width="40" height="140" fill="#ED2939" />
        </pattern>
      );
    case "italy":
      return (
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#009246" />
          <stop offset="100%" stopColor="#007A3D" />
        </linearGradient>
      );
    case "spain":
      return (
        <pattern id={id} width="120" height="140" patternUnits="userSpaceOnUse">
          <rect width="120" height="140" fill="#AA151B" />
          <rect y="35" width="120" height="70" fill="#F1BF00" />
        </pattern>
      );
    case "england":
      return (
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E8E8E8" />
        </linearGradient>
      );
    case "portugal":
      return (
        <pattern id={id} width="120" height="140" patternUnits="userSpaceOnUse">
          <rect width="50" height="140" fill="#006600" />
          <rect x="50" width="70" height="140" fill="#FF0000" />
        </pattern>
      );
    case "netherlands":
      return (
        <pattern id={id} width="120" height="140" patternUnits="userSpaceOnUse">
          <rect width="120" height="46" fill="#AE1C28" />
          <rect y="46" width="120" height="48" fill="#FFFFFF" />
          <rect y="94" width="120" height="46" fill="#21468B" />
        </pattern>
      );
    case "belgium":
      return (
        <pattern id={id} width="120" height="140" patternUnits="userSpaceOnUse">
          <rect width="40" height="140" fill="#000000" />
          <rect x="40" width="40" height="140" fill="#FAE042" />
          <rect x="80" width="40" height="140" fill="#ED2939" />
        </pattern>
      );
    case "croatia":
      return (
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#FF0000" />
          <rect x="8" y="8" width="8" height="8" fill="#FF0000" />
          <rect x="8" width="8" height="8" fill="#FFFFFF" />
          <rect y="8" width="8" height="8" fill="#FFFFFF" />
        </pattern>
      );
    case "uruguay":
      return (
        <pattern id={id} width="120" height="140" patternUnits="userSpaceOnUse">
          <rect width="120" height="140" fill="#FFFFFF" />
          <rect y="0" width="120" height="14" fill="#55B5FF" />
          <rect y="28" width="120" height="14" fill="#55B5FF" />
          <rect y="56" width="120" height="14" fill="#55B5FF" />
          <rect y="84" width="120" height="14" fill="#55B5FF" />
          <rect y="112" width="120" height="14" fill="#55B5FF" />
        </pattern>
      );
    case "mexico":
      return (
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#006847" />
          <stop offset="100%" stopColor="#004D35" />
        </linearGradient>
      );
    case "usa":
      return (
        <pattern id={id} width="120" height="140" patternUnits="userSpaceOnUse">
          <rect width="120" height="140" fill="#FFFFFF" />
          <rect width="50" height="70" fill="#3C3B6E" />
        </pattern>
      );
    case "japan":
      return (
        <pattern id={id} width="120" height="140" patternUnits="userSpaceOnUse">
          <rect width="120" height="140" fill="#FFFFFF" />
          <circle cx="60" cy="70" r="22" fill="#BC002D" />
        </pattern>
      );
    case "stripes-v":
      return (
        <pattern id={id} width="10" height="12" patternUnits="userSpaceOnUse">
          <rect width="5" height="12" fill={primary} />
          <rect x="5" width="5" height="12" fill={secondary} />
        </pattern>
      );
    case "stripes-h":
      return (
        <pattern id={id} width="12" height="10" patternUnits="userSpaceOnUse">
          <rect width="12" height="5" fill={primary} />
          <rect y="5" width="12" height="5" fill={secondary} />
        </pattern>
      );
    case "hoops":
      return (
        <pattern id={id} width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="6" fill={primary} />
          <rect y="6" width="12" height="6" fill={secondary} />
        </pattern>
      );
    default:
      return (
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={primary} />
          <stop offset="100%" stopColor={primary} stopOpacity="0.85" />
        </linearGradient>
      );
  }
}

function PatternKitSvg({
  team,
  variant,
  size,
  number,
}: {
  team: Team;
  variant: "home" | "away";
  size: number;
  number?: number;
}) {
  const { primary, secondary, trim } = team.colors;
  const pattern = patternForCode(team.fifaCode);
  const pid = `kit-pat-${team.slug}-${variant}`;
  const bg = variant === "home" ? primary : secondary;
  const fg = variant === "home" ? secondary : primary;
  const h = (size * 140) / 120;

  return (
    <svg viewBox="0 0 120 140" width={size} height={h} aria-hidden>
      <defs>
        <PatternFill
          pattern={pattern}
          primary={bg}
          secondary={fg}
          id={pid}
        />
        <clipPath id={`clip-${team.slug}-${variant}`}>
          <path d={SHIRT} />
        </clipPath>
      </defs>
      <path d={SHIRT} fill={`url(#${pid})`} stroke={trim} strokeWidth="1.4" />
      {pattern === "brazil" && (
        <ellipse cx="60" cy="72" rx="18" ry="22" fill="#009B3A" opacity="0.9" />
      )}
      <path d="M50 12 Q60 22 70 12" fill="none" stroke={trim} strokeWidth="2.4" />
      <text
        x="60"
        y="64"
        textAnchor="middle"
        fontFamily="var(--font-display, Bebas Neue)"
        fontSize="14"
        fill={pattern === "england" || pattern === "argentina" || pattern === "japan" ? primary : fg}
        opacity="0.9"
      >
        {team.fifaCode}
      </text>
      {number != null && (
        <text
          x="60"
          y="108"
          textAnchor="middle"
          fontFamily="var(--font-display, Bebas Neue)"
          fontSize="44"
          fill={pattern === "england" || pattern === "argentina" ? primary : fg}
        >
          {number}
        </text>
      )}
    </svg>
  );
}

export function KitSwatch({
  team,
  variant = "home",
  size = 88,
  number,
  className,
}: {
  team: Team;
  variant?: "home" | "away";
  size?: number;
  number?: number;
  className?: string;
}) {
  const localSrc = hasKit(team.fifaCode) ? kitImageUrl(team.fifaCode, variant) : null;
  const remoteSrc = kitRemoteUrl(team.fifaCode, variant);
  const [useRemote, setUseRemote] = useState(false);
  const [errored, setErrored] = useState(false);
  const h = (size * 140) / 120;
  const showImage = localSrc && !errored;

  return (
    <figure
      className={cn(
        "relative inline-flex flex-col items-center drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]",
        className,
      )}
      aria-label={`${team.name} ${variant} kit`}
    >
      {showImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={useRemote && remoteSrc ? remoteSrc : localSrc!}
            alt=""
            width={size}
            height={h}
            className="object-contain"
            style={{ width: size, height: h, maxHeight: h }}
            onError={() => {
              if (!useRemote && remoteSrc) setUseRemote(true);
              else setErrored(true);
            }}
          />
          {number != null && (
            <span
              className="display pointer-events-none absolute bottom-[18%] left-1/2 -translate-x-1/2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{ fontSize: size * 0.28 }}
            >
              {number}
            </span>
          )}
        </>
      ) : (
        <PatternKitSvg team={team} variant={variant} size={size} number={number} />
      )}
    </figure>
  );
}
