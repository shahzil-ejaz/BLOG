"use client";

import type { ReactNode } from "react";

interface StepCardProps {
  step: number;
  title: string;
  children: ReactNode;
}

export function StepCard({ step, title, children }: StepCardProps) {
  return (
    <div className="my-6 flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
        {step}
      </div>
      <div className="min-w-0">
        <div className="mb-2 font-semibold text-[var(--foreground)]">{title}</div>
        <div className="text-sm leading-relaxed text-[var(--muted)]">
          {children}
        </div>
      </div>
    </div>
  );
}
