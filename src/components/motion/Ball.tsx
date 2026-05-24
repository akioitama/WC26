import { cn } from "@/lib/cn";

export function Ball({
  size = 56,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={cn("drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]", className)}
      aria-hidden
    >
      <defs>
        <radialGradient id="ballShade" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f0efe9" />
          <stop offset="100%" stopColor="#9b9b9b" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#ballShade)" />
      <g
        fill="#0a0a0a"
        stroke="#0a0a0a"
        strokeWidth="0.6"
        strokeLinejoin="round"
      >
        <polygon points="32,18 39,23 36.5,31.5 27.5,31.5 25,23" />
      </g>
      <g
        fill="none"
        stroke="#0a0a0a"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <line x1="32" y1="18" x2="32" y2="8" />
        <line x1="39" y1="23" x2="49" y2="20" />
        <line x1="36.5" y1="31.5" x2="42" y2="42" />
        <line x1="27.5" y1="31.5" x2="22" y2="42" />
        <line x1="25" y1="23" x2="15" y2="20" />
      </g>
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="1"
      />
    </svg>
  );
}
