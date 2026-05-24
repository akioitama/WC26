import dynamic from "next/dynamic";

const AnalyticsClient = dynamic(
  () => import("@/components/analytics/AnalyticsClient"),
  {
    loading: () => (
      <div className="surface grid h-64 place-items-center rounded-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/55">
          Loading analytics…
        </p>
      </div>
    ),
  },
);

export const metadata = {
  title: "Analytics · WC26",
  description:
    "Live Monte Carlo predictions, Elo radar, head-to-head, and stage progression for the FIFA World Cup 26.",
};

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <AnalyticsClient />
    </div>
  );
}
