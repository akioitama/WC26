import dynamic from "next/dynamic";
import { MatchdayHero } from "@/components/site/MatchdayHero";

const BallScrollPath = dynamic(
  () =>
    import("@/components/motion/BallScrollPath").then((m) => ({
      default: m.BallScrollPath,
    })),
  { loading: () => null },
);

const IconicMoments = dynamic(
  () =>
    import("@/components/site/IconicMoments").then((m) => ({
      default: m.IconicMoments,
    })),
  { loading: () => null },
);

const TacticsBoard = dynamic(
  () =>
    import("@/components/site/TacticsBoard").then((m) => ({
      default: m.TacticsBoard,
    })),
  { loading: () => null },
);

const LegendsLeaderboard = dynamic(
  () =>
    import("@/components/site/LegendsLeaderboard").then((m) => ({
      default: m.LegendsLeaderboard,
    })),
  { loading: () => null },
);

const FeaturedTeams = dynamic(
  () =>
    import("@/components/site/FeaturedTeams").then((m) => ({
      default: m.FeaturedTeams,
    })),
  { loading: () => null },
);

const LiveSimulatorPreview = dynamic(
  () =>
    import("@/components/site/LiveSimulatorPreview").then((m) => ({
      default: m.LiveSimulatorPreview,
    })),
  { loading: () => null },
);

const TributeStrip = dynamic(
  () =>
    import("@/components/site/TributeStrip").then((m) => ({
      default: m.TributeStrip,
    })),
  { loading: () => null },
);

export default function Home() {
  return (
    <>
      <MatchdayHero />
      <BallScrollPath />
      <IconicMoments />
      <TacticsBoard />
      <LegendsLeaderboard />
      <FeaturedTeams />
      <LiveSimulatorPreview />
      <TributeStrip />
    </>
  );
}
