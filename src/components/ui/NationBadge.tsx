/**
 * NationBadge — lightweight crest variant that takes raw colors + FIFA code.
 * Use when you don't have a full Team object (e.g. for moments where only
 * country code + colors are known).
 */
export function NationBadge({
  code,
  primary,
  secondary,
  size = 40,
  stars = 0,
  className,
}: {
  code: string;
  primary: string;
  secondary: string;
  size?: number;
  stars?: number;
  className?: string;
}) {
  const id = `nb-${code.toLowerCase()}`;
  return (
    <svg
      viewBox="0 0 100 110"
      width={size}
      height={(size * 110) / 100}
      className={className}
      aria-label={`${code} badge`}
      role="img"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={primary} />
          <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d="M50 2 L96 14 V58 C96 84 76 102 50 108 C24 102 4 84 4 58 V14 Z" />
        </clipPath>
      </defs>

      <path
        d="M50 2 L96 14 V58 C96 84 76 102 50 108 C24 102 4 84 4 58 V14 Z"
        fill={`url(#${id}-bg)`}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2"
      />

      <g clipPath={`url(#${id}-clip)`}>
        <polygon
          points="0,40 100,18 100,46 0,68"
          fill={secondary}
          opacity="0.85"
        />

        <text
          x="50"
          y="58"
          textAnchor="middle"
          fill={textOn(primary)}
          style={{
            fontFamily:
              "var(--font-display), Bebas Neue, Impact, sans-serif",
            fontSize: 28,
            letterSpacing: "0.06em",
          }}
          paintOrder="stroke"
          stroke="rgba(0,0,0,0.4)"
          strokeWidth="0.6"
        >
          {code}
        </text>

        {stars > 0 && (
          <g transform="translate(50 80)">
            {Array.from({ length: Math.min(stars, 5) }).map((_, i) => {
              const total = Math.min(stars, 5);
              const offset = (i - (total - 1) / 2) * 11;
              return (
                <polygon
                  key={i}
                  transform={`translate(${offset} 0)`}
                  points="0,-4 1.2,-1 4,-1 1.8,0.8 2.6,3.6 0,2 -2.6,3.6 -1.8,0.8 -4,-1 -1.2,-1"
                  fill="#FFD76A"
                  stroke="rgba(0,0,0,0.5)"
                  strokeWidth="0.3"
                />
              );
            })}
          </g>
        )}
      </g>

      <path
        d="M50 2 L96 14 V58 C96 84 76 102 50 108 C24 102 4 84 4 58 V14 Z"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.6"
      />
    </svg>
  );
}

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
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.55 ? "#0a0a14" : "#ffffff";
}
