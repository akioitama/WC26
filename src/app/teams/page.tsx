import { TeamsExplorer } from "@/components/teams/TeamsExplorer";

export const metadata = {
  title: "Teams · WC26",
  description: "All 48 nations of the FIFA World Cup 26 — colors, stories, key players, and 2026 group placement.",
};

export default function TeamsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]">
          The 48
        </p>
        <h1 className="display mt-2 text-6xl text-[var(--fg)] sm:text-7xl">
          Every nation,
          <br />
          <span className="text-[var(--accent)]">every story.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--fg)]/70">
          Filter by confederation or group, hover a card to see the kit, click to
          read the full World Cup history and 2026 squad picks.
        </p>
      </header>
      <TeamsExplorer />
    </div>
  );
}
