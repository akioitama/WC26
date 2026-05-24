"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline" | "danger";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-[#1a1208] hover:brightness-110 shadow-[0_8px_24px_rgba(212,175,55,0.25)]",
  ghost:
    "border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:bg-[color-mix(in_oklab,var(--surface)_60%,white)]",
  outline:
    "border border-[var(--accent)]/40 bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--accent)] hover:bg-[color-mix(in_oklab,var(--accent)_18%,transparent)]",
  danger:
    "border border-red-400/30 text-red-200 hover:bg-red-500/10",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const sizing =
    size === "sm"
      ? "px-4 py-1.5 text-sm"
      : size === "lg"
        ? "px-6 py-3 text-base"
        : "px-5 py-2.5 text-sm";

  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.18em] transition-all",
    "active:scale-[0.97]",
    VARIANTS[variant],
    sizing,
    disabled && "cursor-not-allowed opacity-50",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
