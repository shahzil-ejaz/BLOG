"use client";

import { AlertTriangle, CheckCircle2, Lightbulb, Info } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "tip" | "warning" | "success" | "info";

const variantConfig: Record<
  Variant,
  { icon: typeof Info; color: string; bg: string; label: string }
> = {
  info: {
    icon: Info,
    color: "text-[var(--accent)]",
    bg: "bg-[var(--accent)]/10 border-[var(--accent)]/30",
    label: "Info",
  },
  tip: {
    icon: Lightbulb,
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-400/30",
    label: "Pro Tip",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-orange-500",
    bg: "bg-orange-500/10 border-orange-400/30",
    label: "Warning",
  },
  success: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-400/30",
    label: "Best Practice",
  },
};

export function Callout({
  children,
  variant = "info",
}: {
  children: ReactNode;
  variant?: Variant;
}) {
  const { icon: Icon, color, bg, label } = variantConfig[variant];
  return (
    <aside
      className={`my-6 flex gap-3 rounded-xl border p-4 ${bg}`}
    >
      <Icon className={`mt-0.5 size-5 shrink-0 ${color}`} aria-hidden />
      <div className="min-w-0 text-sm leading-relaxed [&_p]:my-1.5 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
        <p className={`mb-1 text-xs font-bold uppercase tracking-wider ${color}`}>
          {label}
        </p>
        {children}
      </div>
    </aside>
  );
}
