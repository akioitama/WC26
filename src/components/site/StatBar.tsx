"use client";

import { StatCounter } from "@/components/ui/Stat";

export function StatBar() {
  return (
    <section className="relative border-y border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_92%,black)]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8">
        <StatCounter to={48} label="Nations" />
        <StatCounter to={104} label="Matches" />
        <StatCounter to={16} label="Host cities" />
        <StatCounter to={495} label="Annex C combos" />
      </div>
    </section>
  );
}
