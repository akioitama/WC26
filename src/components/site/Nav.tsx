"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useUiStore } from "@/store/uiStore";
import { WC26BrandMark } from "@/components/ui/WC26Logo";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/simulator", label: "Simulator" },
  { href: "/analytics", label: "Analytics" },
  { href: "/teams", label: "Teams" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/venues", label: "Venues" },
  { href: "/history", label: "History" },
];

export function Nav() {
  const pathname = usePathname();
  const theme = useUiStore((s) => s.theme);
  const toggleTheme = useUiStore((s) => s.toggleTheme);
  const soundOn = useUiStore((s) => s.soundOn);
  const toggleSound = useUiStore((s) => s.toggleSound);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group min-w-0 shrink-0" aria-label="WC26 home">
          <WC26BrandMark priority />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(l.href) ?? false;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium uppercase tracking-wider transition",
                  active
                    ? "text-[var(--accent)]"
                    : "text-[var(--fg)]/75 hover:text-[var(--fg)]",
                )}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label="Toggle sound"
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] text-[var(--fg)]/70 transition hover:bg-[var(--surface)] hover:text-[var(--fg)]"
          >
            {soundOn ? <SoundOnIcon /> : <SoundOffIcon />}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--fg)]/80 transition hover:bg-[var(--surface)] hover:text-[var(--fg)]"
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                theme === "obsidian"
                  ? "bg-[var(--electric)]"
                  : theme === "stadium"
                    ? "bg-[var(--gold)]"
                    : "bg-[var(--accent)]",
              )}
            />
            {theme === "obsidian"
              ? "Obsidian"
              : theme === "stadium"
                ? "Stadium"
                : "Berlin '06"}
          </button>
        </div>
      </div>
    </header>
  );
}

function SoundOnIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19" fill="currentColor" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19" fill="currentColor" />
      <line x1="22" y1="9" x2="16" y2="15" />
      <line x1="16" y1="9" x2="22" y2="15" />
    </svg>
  );
}
