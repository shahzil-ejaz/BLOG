"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";

interface CompareRowProps {
  label: string;
  server: ReactNode;
  client: ReactNode;
}

interface CompareTableProps {
  rows?: CompareRowProps[] | null;
  /** One-line JSON: `[{ "label", "server", "client" }, ...]` when `rows` is lost in MDX. */
  rowsJson?: string;
}

function normalizeRows(
  rows: CompareRowProps[] | null | undefined,
  rowsJson: string | undefined,
): CompareRowProps[] {
  if (Array.isArray(rows) && rows.length > 0) {
    return rows;
  }
  if (typeof rowsJson === "string" && rowsJson.trim()) {
    try {
      const parsed = JSON.parse(rowsJson) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (row): row is CompareRowProps =>
            row !== null &&
            typeof row === "object" &&
            "label" in row &&
            "server" in row &&
            "client" in row &&
            typeof (row as CompareRowProps).label === "string" &&
            typeof (row as CompareRowProps).server === "string" &&
            typeof (row as CompareRowProps).client === "string",
        );
      }
    } catch {
      /* ignore */
    }
  }
  return [];
}

export function CompareTable({ rows, rowsJson }: CompareTableProps) {
  const safeRows = useMemo(
    () => normalizeRows(rows, rowsJson),
    [rows, rowsJson],
  );

  return (
    <div className="not-prose my-8 w-full overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: "28%" }} />
          <col style={{ width: "36%" }} />
          <col style={{ width: "36%" }} />
        </colgroup>
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--muted-bg)]">
            <th className="px-4 py-3 text-left font-semibold text-[var(--foreground)]">
              Concern
            </th>
            <th className="px-4 py-3 text-left font-semibold text-[var(--accent)]">
              Server Component
            </th>
            <th className="px-4 py-3 text-left font-semibold text-[var(--foreground)]">
              Client Component
            </th>
          </tr>
        </thead>
        <tbody>
          {safeRows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[var(--border)] last:border-0 odd:bg-[var(--card)] even:bg-[var(--muted-bg)]"
            >
              <td className="break-words px-4 py-3 font-medium text-[var(--foreground)]">
                {row.label}
              </td>
              <td className="break-words px-4 py-3 text-[var(--muted)]">{row.server}</td>
              <td className="break-words px-4 py-3 text-[var(--muted)]">{row.client}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
