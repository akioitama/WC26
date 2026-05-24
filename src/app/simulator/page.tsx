import SimulatorClient from "@/components/sim/SimulatorClient";

export const metadata = {
  title: "Simulator · WC26",
  description:
    "Predict every match of the FIFA World Cup 26 — group rankings, Annex C third-place routing, knockout bracket, and trophy lift.",
};

export default function SimulatorPage() {
  return <SimulatorClient />;
}
