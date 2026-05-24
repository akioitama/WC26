"use client";



import Link from "next/link";

import { teamFromName, TEAMS_BY_NAME, type Team } from "@/data/teams";

import { cn } from "@/lib/cn";

import { OfficialFlag } from "@/components/ui/OfficialFlag";



type Size = "xs" | "sm" | "md" | "lg";



const SIZES: Record<Size, string> = {

  xs: "h-5 px-2 text-[10px] gap-1.5",

  sm: "h-6 px-2.5 text-[11px] gap-2",

  md: "h-8 px-3 text-sm gap-2",

  lg: "h-10 px-4 text-base gap-2.5",

};



const FLAG_PX: Record<Size, number> = {

  xs: 12,

  sm: 14,

  md: 16,

  lg: 20,

};



export function FlagPill({

  team,

  name,

  size = "md",

  href,

  className,

  reverse = false,

}: {

  team?: Team;

  name?: string;

  size?: Size;

  href?: string;

  className?: string;

  reverse?: boolean;

}) {

  const t: Team | undefined =

    team ?? (name ? teamFromName(name) ?? TEAMS_BY_NAME[name] : undefined);



  const display = t?.name ?? name ?? "—";

  const primary = t?.colors.primary ?? "#888";

  const secondary = t?.colors.secondary ?? "#444";

  const flagPx = FLAG_PX[size];



  const inner = (

    <span

      className={cn(

        "inline-flex items-center rounded-full border border-[var(--line)] font-medium",

        "bg-[color-mix(in_oklab,var(--surface-strong)_85%,transparent)] text-[var(--fg)]",

        "transition hover:border-[var(--accent)]/60",

        SIZES[size],

        reverse && "flex-row-reverse",

        className,

      )}

    >

      {t ? (

        <OfficialFlag

          code={t.fifaCode}

          primary={t.colors.primary}

          secondary={t.colors.secondary}

          size={flagPx}

          variant="circle"

        />

      ) : (

        <span

          className="inline-block shrink-0 rounded-full ring-1 ring-black/30"

          style={{

            width: flagPx,

            height: flagPx,

            background: `linear-gradient(135deg, ${primary} 0 50%, ${secondary} 50% 100%)`,

          }}

          aria-hidden

        />

      )}

      <span className="truncate">{display}</span>

    </span>

  );



  if (href || t?.slug) {

    return (

      <Link

        href={href ?? `/teams/${t!.slug}`}

        className="inline-block"

      >

        {inner}

      </Link>

    );

  }

  return inner;

}


