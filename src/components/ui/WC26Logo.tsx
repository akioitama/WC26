import { cn } from "@/lib/cn";

/** Official FIFA World Cup 26 logo — trophy over "26" (transparent PNG). */
const LOGO = {
  src: "/brand/wc26-logo.png",
  width: 349,
  height: 530,
  label: "FIFA World Cup 26",
};

export type WC26LogoContext = "nav" | "hero" | "card" | "footer" | "scoreboard" | "inline";

const CONTEXT_HEIGHT: Record<WC26LogoContext, number> = {
  nav: 28,
  hero: 52,
  card: 64,
  footer: 36,
  scoreboard: 44,
  inline: 48,
};

const FRAME_CLASS: Record<WC26LogoContext, string | null> = {
  nav: "wc26-logo-frame wc26-logo-frame--nav",
  hero: "wc26-logo-frame wc26-logo-frame--hero",
  card: "wc26-logo-frame wc26-logo-frame--card",
  footer: "wc26-logo-frame wc26-logo-frame--footer",
  scoreboard: "wc26-logo-frame wc26-logo-frame--scoreboard",
  inline: null,
};

type WC26LogoProps = {
  /** Preset placement — controls frame styling and default size */
  context?: WC26LogoContext;
  /** Override render height in px */
  height?: number;
  className?: string;
  frameClassName?: string;
  priority?: boolean;
  /** Skip site frame wrapper (raw logo only) */
  bare?: boolean;
  /** Decorative logo — hides from assistive tech when parent is labeled */
  decorative?: boolean;
};

export function WC26Logo({
  context = "inline",
  height,
  className,
  frameClassName,
  priority,
  bare = false,
  decorative = false,
}: WC26LogoProps) {
  const h = height ?? CONTEXT_HEIGHT[context];
  const width = Math.round((LOGO.width / LOGO.height) * h);
  const frame = FRAME_CLASS[context];

  const img = (
    // eslint-disable-next-line @next/next/no-img-element -- local transparent PNG asset
    <img
      src={LOGO.src}
      alt={decorative ? "" : LOGO.label}
      width={width}
      height={h}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      aria-hidden={decorative || undefined}
      className={cn("wc26-logo-img", className)}
      style={{ height: h, width: "auto", maxWidth: width }}
    />
  );

  if (bare || !frame) return img;

  return <span className={cn(frame, frameClassName)}>{img}</span>;
}

/** Nav lockup: framed logo + site wordmark */
export function WC26BrandMark({ priority }: { priority?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      <WC26Logo context="nav" priority={priority} decorative />
      <span className="min-w-0 border-l border-[var(--line)] pl-2.5 sm:pl-3">
        <span className="display block truncate text-lg leading-none text-[var(--fg)] sm:text-xl">
          WC<span className="text-[var(--accent)]">26</span>
        </span>
        <span className="mt-0.5 hidden text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--fg)]/45 sm:block">
          The Beautiful Game
        </span>
      </span>
    </span>
  );
}
