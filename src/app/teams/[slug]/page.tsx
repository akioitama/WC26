import { notFound } from "next/navigation";
import { TEAMS, TEAMS_BY_SLUG } from "@/data/teams";
import { TeamProfile } from "@/components/teams/TeamProfile";

type Params = { slug: string };

export function generateStaticParams() {
  return TEAMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const team = TEAMS_BY_SLUG[slug];
  if (!team) return { title: "Not found" };
  return {
    title: `${team.name} · WC26`,
    description: `${team.name} at the FIFA World Cup — history, key players, and the 2026 path.`,
  };
}

export default async function TeamPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const team = TEAMS_BY_SLUG[slug];
  if (!team) notFound();
  return <TeamProfile team={team} />;
}
