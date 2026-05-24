"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Player, Team } from "@/data/teams";
import { PlayerFacePortrait } from "@/components/ui/PlayerFacePortrait";
import { KitSwatch } from "@/components/ui/KitSwatch";
import { hasPlayerPhoto } from "@/data/playerPhotos";

const ROLE_COLOR: Record<Player["role"], string> = {
  GK: "#3affd9",
  DF: "#2bd2ff",
  MF: "#f5c451",
  FW: "#ff5cd0",
};

export function PlayerCard3D({
  team,
  player,
}: {
  team: Team;
  player: Player;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 220,
    damping: 16,
  });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 220,
    damping: 16,
  });

  const sheen = useMotionTemplate`linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.18) ${
    useTransform(x, [-0.5, 0.5], [40, 60]) as unknown as string
  }%, transparent 70%)`;

  const roleColor = ROLE_COLOR[player.role] ?? "var(--electric)";
  const hasPhoto = hasPlayerPhoto(player.name);

  function onMove(e: React.PointerEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
    >
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${team.colors.primary}55, transparent 60%), linear-gradient(160deg, ${team.colors.primary} 0%, color-mix(in oklab, ${team.colors.primary} 50%, black) 100%)`,
        }}
      />
      <span aria-hidden className="absolute inset-0 grid-fade opacity-60" />

      <span
        aria-hidden
        className="absolute inset-x-1/2 top-[28%] -translate-x-1/2 rounded-full"
        style={{
          width: 160,
          height: 160,
          background: `radial-gradient(circle, ${roleColor}55 0%, transparent 60%)`,
          filter: "blur(20px)",
          transform: "translateX(-50%)",
        }}
      />

      <span
        className="display absolute inset-x-0 top-[8%] text-center text-white/10"
        style={{ fontSize: "9rem" }}
      >
        {player.number ?? "—"}
      </span>

      {/* Player portrait */}
      <div
        className="absolute inset-x-0 top-[12%] flex justify-center"
        style={{ transform: "translateZ(50px)" }}
      >
        <PlayerFacePortrait
          playerName={player.name}
          primary={team.colors.primary}
          secondary={team.colors.secondary}
          size={hasPhoto ? "lg" : "md"}
          className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Official kit below portrait */}
      <div
        className="absolute inset-x-0 top-[52%] flex justify-center opacity-90"
        style={{ transform: "translateZ(30px)" }}
      >
        <KitSwatch team={team} variant="home" size={72} number={player.number} />
      </div>

      <div
        className="absolute inset-x-3 bottom-3 text-white"
        style={{ transform: "translateZ(60px)" }}
      >
        <div className="flex items-center justify-between">
          <span
            className="rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.3em] text-black"
            style={{ background: roleColor }}
          >
            {player.role}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/65">
            {player.club ?? "—"}
          </span>
        </div>
        <p className="mt-2 text-lg font-bold leading-tight">{player.name}</p>
        <p className="mt-0.5 text-[11px] uppercase tracking-[0.25em] text-white/70">
          {team.name}
          {player.number != null && (
            <span className="ml-2 text-white/45">#{player.number}</span>
          )}
        </p>
      </div>

      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: sheen, mixBlendMode: "overlay", opacity: 0.6 }}
      />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset transition group-hover:ring-2"
        style={{ boxShadow: `0 0 0 1px ${roleColor}55, 0 0 30px ${roleColor}33` }}
      />
    </motion.div>
  );
}
