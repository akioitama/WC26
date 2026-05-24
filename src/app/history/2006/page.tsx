"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TEAMS_BY_NAME } from "@/data/teams";
import { TeamFlag } from "@/components/ui/OfficialFlag";

const ICONIC = [
  {
    title: "The final · Berlin · 9 July",
    body: "Italy 1–1 France, Italy win 5–3 on penalties. Materazzi cancels Zidane’s panenka; Trezeguet hits the bar; Grosso lifts the cup.",
    color: "#003399",
  },
  {
    title: "Klinsmann’s Sommermärchen",
    body: "The host nation reaches the semi-finals and changes German football forever. ‘A summer fairytale.’",
    color: "#FFCC00",
  },
  {
    title: "Lehmann’s penalty cheat sheet",
    body: "Tucked in his sock. Saves two against Argentina in the QF. The note is now in a Berlin museum.",
    color: "#000000",
  },
  {
    title: "Cannavaro’s 100th cap, 100% champion",
    body: "Italy concede only twice in seven matches: a Zidane penalty and a Cristian Zaccardo own-goal. Defensive perfection.",
    color: "#003399",
  },
  {
    title: "Zidane’s headbutt",
    body: "110’ in the final, Materazzi insults his sister. Red card. Iconic exit. France lose without him.",
    color: "#0055A4",
  },
  {
    title: "Maxi Rodríguez’s wonder volley",
    body: "Argentina 2–1 Mexico, R16 extra-time. The most beautiful goal of the tournament.",
    color: "#75AADB",
  },
];

export default function Berlin06Page() {
  const italy = TEAMS_BY_NAME["Italy"];
  const france = TEAMS_BY_NAME["France"];
  const germany = TEAMS_BY_NAME["Germany"];

  return (
    <div className="relative">
      {/* Hero — switches feel even on default theme */}
      <section className="relative isolate overflow-hidden border-b border-[var(--line)]">
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #ece6d6 0%, #f6efd8 35%, #d6cdb1 100%)",
          }}
        />
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[6px]"
          style={{
            background:
              "linear-gradient(90deg, #000 0 33.3%, #d52121 33.3% 66.6%, #FFCC00 66.6% 100%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.5em] text-[#7a3b27]">
            FIFA World Cup · Germany 2006
          </p>
          <h1
            className="display mt-3 text-[#1c180e]"
            style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)", lineHeight: 0.85 }}
          >
            A time to
            <br />
            <span className="text-[#d52121]">make friends.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-[#1c180e]/80">
            32 nations, 12 host cities, one of the warmest summers football has
            ever seen. This is the Berlin ’06 tribute — switch the site theme to{" "}
            <strong>Berlin ’06</strong> in the top-right to feel it everywhere.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/teams/italy" size="lg">
              Champions: Italy
            </Button>
            <Button href="/teams/france" variant="ghost" size="lg">
              Runners-up: France
            </Button>
            <Button href="/teams/germany" variant="outline" size="lg">
              Hosts: Germany
            </Button>
          </div>
        </div>
      </section>

      {/* Three-up: champions */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[italy, france, germany].filter(Boolean).map((t, i) => (
            <motion.div
              key={t!.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/teams/${t!.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--line)]"
                style={{
                  background: `linear-gradient(160deg, ${t!.colors.primary} 0%, color-mix(in oklab, ${t!.colors.primary} 60%, black) 100%)`,
                }}
              >
                <span
                  aria-hidden
                  className="absolute -left-10 top-1/2 h-12 w-[140%] -rotate-12 opacity-60"
                  style={{ background: t!.colors.secondary }}
                />
                <div className="absolute left-1/2 top-[18%] -translate-x-1/2">
                  <TeamFlag team={t!} size={72} variant="shield" stars={t!.worldCup.titles} />
                </div>
                <div className="absolute inset-x-3 bottom-3 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
                    {i === 0 ? "Champions" : i === 1 ? "Runners-up" : "Hosts · 3rd"}
                  </p>
                  <p className="display text-3xl">{t!.name}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Iconic moments */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]">
            Six freeze-frames
          </p>
          <h2 className="display mt-2 text-5xl text-[var(--fg)] sm:text-6xl">
            What we still talk about.
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ICONIC.map((m, i) => (
            <motion.li
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="surface relative overflow-hidden rounded-2xl p-6"
            >
              <span
                aria-hidden
                className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-2xl"
                style={{ background: m.color }}
              />
              <p className="relative text-lg font-bold text-[var(--fg)]">
                {m.title}
              </p>
              <p className="relative mt-2 text-sm text-[var(--fg)]/75">
                {m.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_92%,black)] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-[var(--accent)]">
              Berlin · 09 July 2006 · 90+30 minutes
            </p>
            <p className="display mt-4 text-5xl text-[var(--fg)] sm:text-6xl">
              “Italia! <span className="text-[var(--accent)]">Campione del Mondo!</span>”
            </p>
            <p className="mt-4 text-sm text-[var(--fg)]/65">
              Cannavaro lifts the cup in his 100th cap. The Olympiastadion
              roars. Football, for one night, is everything.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button href="/simulator">Run the 2026 simulator</Button>
              <Button href="/teams" variant="ghost">
                Explore the 48 of 2026
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
