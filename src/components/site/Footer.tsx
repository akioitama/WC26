"use client";

import Link from "next/link";
import { TEAMS } from "@/data/teams";
import { WC26Logo } from "@/components/ui/WC26Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_92%,black)]">
      <div
        aria-hidden
        className="flex h-3 w-full overflow-hidden"
        title="Wall of nations"
      >
        {TEAMS.slice(0, 48).map((t) => (
          <span
            key={t.slug}
            className="block flex-1 transition-[flex-grow] duration-500 hover:[flex-grow:3]"
            style={{ background: t.colors.primary }}
          />
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-[2fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <WC26Logo context="footer" />
          <p className="display mt-5 text-3xl text-[var(--fg)] sm:text-4xl">
            The Beautiful Game,
            <br />
            <span className="text-[var(--accent)]">rendered.</span>
          </p>
          <p className="mt-4 max-w-md text-sm text-[var(--fg)]/65">
            A full FIFA World Cup 26 simulator with team histories, iconic
            moments, and a Berlin ’06 tribute. Built for fans, by a fan.
          </p>
        </div>
        <FooterCol
          title="Play"
          items={[
            { label: "Simulator", href: "/simulator" },
            { label: "Fixtures", href: "/fixtures" },
            { label: "Venues", href: "/venues" },
          ]}
        />
        <FooterCol
          title="Read"
          items={[
            { label: "Teams", href: "/teams" },
            { label: "History", href: "/history" },
            { label: "2006 tribute", href: "/history/2006" },
          ]}
        />
        <FooterCol
          title="Made with"
          items={[
            { label: "Next.js 15", href: "https://nextjs.org" },
            { label: "Framer Motion", href: "https://framer.com/motion" },
            { label: "GSAP", href: "https://gsap.com" },
          ]}
        />
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-[11px] uppercase tracking-[0.25em] text-[var(--fg)]/50 sm:px-6 lg:px-8">
          <span>© WC26 · Unofficial fan project</span>
          <span className="font-mono">A time to make friends</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--fg)]/50">
        {title}
      </h3>
      <ul className="space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              className="text-[var(--fg)]/80 transition hover:text-[var(--accent)]"
              href={i.href}
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
