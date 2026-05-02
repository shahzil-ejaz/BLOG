"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { useMemo, useState } from "react";

interface Option {
  label: string;
  correct: boolean;
}

interface QuizProps {
  question?: string;
  /** Prefer this when MDX array props serialize reliably. */
  options?: Option[] | null;
  /**
   * One-line JSON array of `{ label, correct }` — use when `options={[]}` from MDX
   * arrives undefined on the client (RSC / MDX edge case).
   */
  optionsJson?: string;
  explanation?: string;
}

function normalizeOptions(
  options: Option[] | null | undefined,
  optionsJson: string | undefined,
): Option[] {
  if (Array.isArray(options) && options.length > 0) {
    return options;
  }
  if (typeof optionsJson === "string" && optionsJson.trim()) {
    try {
      const parsed = JSON.parse(optionsJson) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (row): row is Option =>
            row !== null &&
            typeof row === "object" &&
            "label" in row &&
            typeof (row as Option).label === "string" &&
            "correct" in row &&
            typeof (row as Option).correct === "boolean",
        );
      }
    } catch {
      /* ignore invalid JSON */
    }
  }
  return [];
}

export function Quiz({
  question = "",
  options,
  optionsJson,
  explanation = "",
}: QuizProps) {
  const safeOptions = useMemo(
    () => normalizeOptions(options, optionsJson),
    [options, optionsJson],
  );

  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <div className="my-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
        Quick Check
      </div>
      {question ? (
        <div className="mb-4 font-medium text-[var(--foreground)]">{question}</div>
      ) : null}
      <div className="flex flex-col gap-2">
        {safeOptions.map((opt, i) => {
          let base =
            "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all ";
          if (!answered) {
            base +=
              "border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--muted-bg)]";
          } else if (opt.correct) {
            base +=
              "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
          } else if (i === selected) {
            base += "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400";
          } else {
            base += "border-[var(--border)] opacity-50";
          }
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => setSelected(i)}
              className={base}
            >
              {answered && opt.correct && (
                <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
              )}
              {answered && !opt.correct && i === selected && (
                <XCircle className="size-4 shrink-0 text-red-500" />
              )}
              {(!answered || (!opt.correct && i !== selected)) && (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current text-xs">
                  {String.fromCharCode(65 + i)}
                </span>
              )}
              {opt.label}
            </button>
          );
        })}
      </div>
      {safeOptions.length === 0 ? (
        <div className="mt-3 text-sm text-[var(--muted)]">
          Quiz options are missing. Add an{" "}
          <code className="rounded bg-[var(--muted-bg)] px-1">optionsJson</code>{" "}
          prop (JSON array) or fix the{" "}
          <code className="rounded bg-[var(--muted-bg)] px-1">options</code> prop
          in MDX.
        </div>
      ) : null}
      {answered && explanation ? (
        <div className="mt-4 rounded-lg bg-[var(--muted-bg)] px-4 py-3 text-sm leading-relaxed text-[var(--muted)]">
          {explanation}
        </div>
      ) : null}
    </div>
  );
}
