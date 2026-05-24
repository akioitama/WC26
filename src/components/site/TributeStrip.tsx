"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const MOMENTS = [
  {
    year: "2006",
    title: "Italy 1–1 France (5–3 pens)",
    sub: "Berlin · 9 July",
    color: "#003399",
  },
  {
    year: "1986",
    title: "Maradona’s solo, England 0–2 Argentina",
    sub: "Mexico City · 22 June",
    color: "#75AADB",
  },
  {
    year: "2002",
    title: "Senegal 1–0 France",
    sub: "Seoul · debut shock",
    color: "#00853F",
  },
  {
    year: "2014",
    title: "Brazil 1–7 Germany",
    sub: "Belo Horizonte · Mineirazo",
    color: "#000000",
  },
  {
    year: "1998",
    title: "Zidane double in the final",
    sub: "Paris · 12 July",
    color: "#0055A4",
  },
  {
    year: "2022",
    title: "Argentina 3–3 France",
    sub: "Lusail · Messi crowned",
    color: "#75AADB",
  },
];

export function TributeStrip() {
  return (
    <section className="relative border-y border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_94%,black)] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]">
            Iconic moments
          </p>
          <h2 className="display mt-2 text-5xl text-[var(--fg)] sm:text-6xl">
            A time to make
            <br />
            <span className="text-[var(--accent)]">friends.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-[var(--fg)]/70">
            Every World Cup leaves a freeze-frame. Switch the theme to{" "}
            <span className="font-semibold text-[var(--fg)]">Berlin ’06</span> in
            the top right to see the site in its tribute skin.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOMENTS.map((m, i) => (
            <motion.article
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6"
            >
              <span
                aria-hidden
                className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-25 blur-2xl transition-opacity group-hover:opacity-50"
                style={{ background: m.color }}
              />
              <div className="relative">
                <span className="display text-6xl text-[var(--fg)]/30 sm:text-7xl">
                  {m.year}
                </span>
                <h3 className="mt-2 text-lg font-bold text-[var(--fg)]">
                  {m.title}
                </h3>
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--fg)]/55">
                  {m.sub}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/history/2006"
            className="inline-flex items-center gap-3 rounded-full border border-[var(--accent)]/40 bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent)] transition hover:bg-[color-mix(in_oklab,var(--accent)_18%,transparent)]"
          >
            Open Berlin ’06 tribute →
          </Link>
        </div>
      </div>
    </section>
  );
}
