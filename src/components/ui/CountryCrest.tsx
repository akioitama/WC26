import type { Team } from "@/data/teams";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
const SIZES: Record<Size, number> = { xs: 28, sm: 40, md: 56, lg: 80, xl: 120 };

/**
 * CountryCrest — procedural football federation crest.
 *
 * Real federation logos (FA, AFA, FFF, DFB, etc.) are trademarked. This is a
 * heraldically-styled, original SVG crest using each team's colors, 3-letter
 * FIFA code, and World Cup star count. Renders crisp at any size, no images.
 */
export function CountryCrest({
  team,
  size = "md",
  className,
}: {
  team: Pick<Team, "fifaCode" | "name" | "colors" | "worldCup">;
  size?: Size;
  className?: string;
}) {
  const px = SIZES[size];
  const stars = team.worldCup.titles;
  const id = `crest-${team.fifaCode.toLowerCase()}`;

  return (
    <svg
      viewBox="0 0 100 110"
      width={px}
      height={(px * 110) / 100}
      className={className}
      aria-label={`${team.name} crest`}
      role="img"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={team.colors.primary} />
          <stop offset="100%" stopColor={shade(team.colors.primary, -25)} />
        </linearGradient>
        <linearGradient id={`${id}-foil`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.30)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d="M50 2 L96 14 V58 C96 84 76 102 50 108 C24 102 4 84 4 58 V14 Z" />
        </clipPath>
      </defs>

      {/* Shield silhouette outline */}
      <path
        d="M50 2 L96 14 V58 C96 84 76 102 50 108 C24 102 4 84 4 58 V14 Z"
        fill={`url(#${id}-bg)`}
        stroke={team.colors.trim}
        strokeWidth="2.5"
      />

      <g clipPath={`url(#${id}-clip)`}>
        {/* Diagonal banner of secondary color */}
        <polygon
          points="0,40 100,18 100,46 0,68"
          fill={team.colors.secondary}
          opacity="0.95"
        />

        {/* Football pitch arc behind code (subtle) */}
        <g
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.6"
          fill="none"
        >
          <circle cx="50" cy="60" r="22" />
          <circle cx="50" cy="60" r="10" />
        </g>

        {/* FIFA 3-letter code */}
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fill={textOn(team.colors.primary)}
          style={{
            fontFamily:
              "var(--font-display), Bebas Neue, Impact, Arial Black, sans-serif",
            fontSize: 26,
            letterSpacing: "0.06em",
          }}
          paintOrder="stroke"
          stroke={team.colors.trim}
          strokeWidth="0.5"
        >
          {team.fifaCode}
        </text>

        {/* Stars row (one per WC title, max 5) */}
        {stars > 0 && (
          <g transform="translate(50 76)">
            {Array.from({ length: Math.min(stars, 5) }).map((_, i) => {
              const total = Math.min(stars, 5);
              const spread = total === 1 ? 0 : (total - 1) * 6;
              return (
                <g
                  key={i}
                  transform={`translate(${i * 12 - spread / 1.2 * (total === 1 ? 0 : 1)} 0)`}
                >
                  <Star fill="#FFD76A" />
                </g>
              );
            })}
          </g>
        )}

        {/* Foil sheen overlay */}
        <rect width="100" height="110" fill={`url(#${id}-foil)`} />
      </g>

      {/* Outline ring */}
      <path
        d="M50 2 L96 14 V58 C96 84 76 102 50 108 C24 102 4 84 4 58 V14 Z"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="0.8"
      />

      {/* Trim accent piping */}
      <path
        d="M50 8 L90 18 V56 C90 80 72 96 50 102 C28 96 10 80 10 56 V18 Z"
        fill="none"
        stroke={team.colors.trim}
        strokeWidth="0.8"
        opacity="0.6"
      />
    </svg>
  );
}

function Star({ fill }: { fill: string }) {
  return (
    <polygon
      points="0,-5 1.4,-1.5 5,-1.5 2.2,0.7 3.3,4.5 0,2.5 -3.3,4.5 -2.2,0.7 -5,-1.5 -1.4,-1.5"
      fill={fill}
      stroke="rgba(0,0,0,0.5)"
      strokeWidth="0.4"
    />
  );
}

/** Shift a hex color toward black (negative) or white (positive). */
function shade(hex: string, amount: number) {
  const c = hex.replace("#", "");
  const num = parseInt(
    c.length === 3
      ? c
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : c,
    16
  );
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  const factor = amount / 100;
  r = Math.max(0, Math.min(255, Math.round(r + 255 * factor)));
  g = Math.max(0, Math.min(255, Math.round(g + 255 * factor)));
  b = Math.max(0, Math.min(255, Math.round(b + 255 * factor)));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/** Pick a contrasting text color for a given hex background. */
function textOn(hex: string) {
  const c = hex.replace("#", "");
  const full =
    c.length === 3
      ? c
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : c;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#0a0a14" : "#ffffff";
}
