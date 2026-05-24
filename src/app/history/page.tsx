"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const TOURNAMENTS = [
  { year: 1930, host: "Uruguay", winner: "Uruguay", color: "#5DADE2" },
  { year: 1934, host: "Italy", winner: "Italy", color: "#003399" },
  { year: 1938, host: "France", winner: "Italy", color: "#003399" },
  { year: 1950, host: "Brazil", winner: "Uruguay", color: "#5DADE2", note: "Maracanazo" },
  { year: 1954, host: "Switzerland", winner: "West Germany", color: "#000000", note: "Miracle of Bern" },
  { year: 1958, host: "Sweden", winner: "Brazil", color: "#FFCC00", note: "17-yr-old Pelé" },
  { year: 1962, host: "Chile", winner: "Brazil", color: "#FFCC00" },
  { year: 1966, host: "England", winner: "England", color: "#FFFFFF", note: "Hurst hat-trick" },
  { year: 1970, host: "Mexico", winner: "Brazil", color: "#FFCC00" },
  { year: 1974, host: "West Germany", winner: "West Germany", color: "#000000" },
  { year: 1978, host: "Argentina", winner: "Argentina", color: "#75AADB" },
  { year: 1982, host: "Spain", winner: "Italy", color: "#003399" },
  { year: 1986, host: "Mexico", winner: "Argentina", color: "#75AADB", note: "Maradona" },
  { year: 1990, host: "Italy", winner: "West Germany", color: "#000000" },
  { year: 1994, host: "United States", winner: "Brazil", color: "#FFCC00" },
  { year: 1998, host: "France", winner: "France", color: "#0055A4", note: "Zidane double" },
  { year: 2002, host: "Korea/Japan", winner: "Brazil", color: "#FFCC00" },
  { year: 2006, host: "Germany", winner: "Italy", color: "#003399", note: "A time to make friends" },
  { year: 2010, host: "South Africa", winner: "Spain", color: "#AA151B" },
  { year: 2014, host: "Brazil", winner: "Germany", color: "#000000", note: "Mineirazo" },
  { year: 2018, host: "Russia", winner: "France", color: "#0055A4" },
  { year: 2022, host: "Qatar", winner: "Argentina", color: "#75AADB", note: "Messi crowned" },
  { year: 2026, host: "USA/Mex/Can", winner: "?", color: "#d4af37", note: "Coming up" },
];

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]">
          Since 1930
        </p>
        <h1 className="display mt-2 text-6xl text-[var(--fg)] sm:text-7xl">
          Every World <span className="text-[var(--accent)]">Cup.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--fg)]/70">
          A complete trophy ledger from Uruguay 1930 to the upcoming 2026
          tri-nation. Click 2006 for the dedicated Berlin tribute.
        </p>
      </header>

      <ol className="space-y-3">
        {TOURNAMENTS.map((t, i) => (
          <motion.li
            key={t.year}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.5) }}
          >
            <Link
              href={t.year === 2006 ? "/history/2006" : "/history"}
              className="group relative grid grid-cols-[80px_1fr_auto] items-center gap-4 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 transition hover:border-[var(--accent)]/40 sm:grid-cols-[120px_1fr_auto]"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1.5"
                style={{ background: t.color }}
              />
              <span
                className="display pl-3 text-4xl text-[var(--fg)]/85 sm:text-5xl"
                style={{ color: t.year === 2006 ? "var(--accent)" : undefined }}
              >
                {t.year}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--fg)]/55">
                  Host · {t.host}
                </p>
                <p className="text-lg font-bold text-[var(--fg)]">
                  {t.winner === "?" ? "To be decided" : t.winner}
                </p>
                {t.note && (
                  <p className="text-xs italic text-[var(--fg)]/65">{t.note}</p>
                )}
              </div>
              <span className="display text-xl text-[var(--gold-bright)]">
                {t.winner === "?" ? "·" : "★"}
              </span>
            </Link>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
