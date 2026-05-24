import type { SVGProps } from "react";

/**
 * Football icon library — hand-drawn SVGs, no external font/image deps.
 * Each icon takes standard SVG props (className, style, etc.) and inherits
 * the parent's currentColor for stroke when applicable.
 */

export function FootballIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <circle cx="32" cy="32" r="28" fill="white" stroke="#0a0a14" strokeWidth="1.6" />
      {/* Center pentagon */}
      <polygon
        points="32,18 41.5,25 38,36 26,36 22.5,25"
        fill="#0a0a14"
      />
      {/* Outer panel lines (5-fold symmetry) */}
      <g stroke="#0a0a14" strokeWidth="1.8" strokeLinejoin="round" fill="none">
        <line x1="32" y1="18" x2="32" y2="6" />
        <line x1="41.5" y1="25" x2="52" y2="20" />
        <line x1="38" y1="36" x2="46" y2="48" />
        <line x1="26" y1="36" x2="18" y2="48" />
        <line x1="22.5" y1="25" x2="12" y2="20" />
      </g>
      {/* Outer hint hexes */}
      <g stroke="#0a0a14" strokeWidth="1.4" strokeLinejoin="round" fill="none" opacity="0.85">
        <polygon points="32,6 44,8 52,20 49,32 42,38 38,36 41.5,25" />
        <polygon points="32,6 20,8 12,20 15,32 22,38 26,36 22.5,25" />
        <polygon points="46,48 38,58 32,58 26,58 18,48 26,36 38,36" />
      </g>
    </svg>
  );
}

export function BootIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M6 38c0-3 2-5 5-5h12l4-12c1-3 4-5 7-5h6c4 0 7 3 7 7v6h7c4 0 7 3 7 7v6c0 3-2 5-5 5H11c-3 0-5-2-5-5z"
        fill="currentColor"
      />
      <path
        d="M6 43h48"
        stroke="rgba(0,0,0,0.45)"
        strokeWidth="1.5"
      />
      {/* Studs */}
      <g fill="rgba(0,0,0,0.6)">
        <circle cx="14" cy="49" r="1.6" />
        <circle cx="22" cy="49" r="1.6" />
        <circle cx="30" cy="49" r="1.6" />
        <circle cx="38" cy="49" r="1.6" />
        <circle cx="46" cy="49" r="1.6" />
        <circle cx="54" cy="49" r="1.6" />
      </g>
      {/* Lacing detail */}
      <g stroke="rgba(255,255,255,0.5)" strokeWidth="1.2">
        <line x1="32" y1="22" x2="42" y2="32" />
        <line x1="36" y1="20" x2="44" y2="28" />
        <line x1="28" y1="26" x2="38" y2="36" />
      </g>
    </svg>
  );
}

export function GloveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M14 22c0-3 2-5 5-5h2c0-3 2-5 5-5s5 2 5 5h2c0-3 2-5 5-5s5 2 5 5h1c4 0 7 3 7 7v18c0 7-6 13-13 13H22c-5 0-8-3-8-8z"
        fill="currentColor"
      />
      <g stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" fill="none">
        <path d="M22 24v18" />
        <path d="M30 22v18" />
        <path d="M38 22v18" />
        <path d="M46 28v14" />
      </g>
      <rect x="14" y="46" width="36" height="4" fill="rgba(0,0,0,0.3)" rx="1" />
    </svg>
  );
}

export function WhistleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M8 26c0-4 3-7 7-7h27c2 0 4 1 5 3l8 14c1 2 0 4-2 5l-9 4c-2 1-4 0-5-2l-2-3H15c-4 0-7-3-7-7z"
        fill="currentColor"
      />
      <circle cx="44" cy="30" r="3.5" fill="rgba(0,0,0,0.55)" />
      <line x1="14" y1="20" x2="14" y2="14" stroke="rgba(0,0,0,0.45)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TrophyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M16 8h32v14c0 9-7 16-16 16s-16-7-16-16z"
        fill="currentColor"
      />
      <path
        d="M16 12H8c0 8 4 14 12 16M48 12h8c0 8-4 14-12 16"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      <rect x="26" y="38" width="12" height="8" fill="currentColor" />
      <rect x="20" y="46" width="24" height="6" fill="currentColor" rx="1" />
      <rect x="16" y="52" width="32" height="4" fill="currentColor" rx="1" />
    </svg>
  );
}

export function CornerFlagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <line x1="20" y1="8" x2="20" y2="56" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M20 8 L48 14 L20 22 Z"
        fill="currentColor"
      />
      <ellipse cx="20" cy="56" rx="8" ry="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function NetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="6" y="14" width="52" height="36" stroke="currentColor" strokeWidth="2" fill="none" rx="2" />
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.75">
        {/* Vertical net lines */}
        {[14, 22, 30, 38, 46, 54].map((x) => (
          <line key={`v${x}`} x1={x} y1="14" x2={x} y2="50" />
        ))}
        {/* Horizontal net lines */}
        {[20, 26, 32, 38, 44].map((y) => (
          <line key={`h${y}`} x1="6" x2="58" y1={y} y2={y} />
        ))}
        {/* Diagonals */}
        <line x1="6" y1="14" x2="58" y2="50" />
        <line x1="58" y1="14" x2="6" y2="50" />
      </g>
    </svg>
  );
}

export function YellowCardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="18" y="8" width="28" height="44" rx="2" fill="var(--yellow-card)" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
    </svg>
  );
}

export function RedCardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="18" y="8" width="28" height="44" rx="2" fill="var(--red-card)" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
    </svg>
  );
}

export function GoalpostIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="6" y="22" width="52" height="3" fill="currentColor" rx="1" />
      <rect x="6" y="22" width="3" height="32" fill="currentColor" rx="1" />
      <rect x="55" y="22" width="3" height="32" fill="currentColor" rx="1" />
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.6">
        <line x1="9" y1="25" x2="9" y2="54" />
        <line x1="55" y1="25" x2="55" y2="54" />
        <line x1="9" y1="34" x2="55" y2="34" />
        <line x1="9" y1="44" x2="55" y2="44" />
        <line x1="20" y1="25" x2="20" y2="54" />
        <line x1="32" y1="25" x2="32" y2="54" />
        <line x1="44" y1="25" x2="44" y2="54" />
      </g>
    </svg>
  );
}

export function WhistleBlowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <circle cx="50" cy="32" r="2" fill="currentColor" />
      <circle cx="56" cy="20" r="2" fill="currentColor" />
      <circle cx="56" cy="44" r="2" fill="currentColor" />
      <circle cx="44" cy="14" r="1.5" fill="currentColor" />
      <circle cx="44" cy="50" r="1.5" fill="currentColor" />
    </svg>
  );
}

/** Spinning football badge inline (used in nav as the brand mark) */
export function BallSpin({
  size = 32,
  ...props
}: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <span
      className="ball-spin grid place-items-center rounded-full bg-white text-[#0a0a14]"
      style={{
        width: size,
        height: size,
        boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
      }}
    >
      <FootballIcon
        width={size * 0.78}
        height={size * 0.78}
        {...props}
      />
    </span>
  );
}
