"use client";

import { useState } from "react";

export function Counter() {
  const [n, setN] = useState(0);
  return (
    <div className="my-6 flex flex-wrap items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--muted-bg)] px-4 py-3 text-sm">
      <span className="text-[var(--muted)]">Interactive demo</span>
      <span className="tabular-nums font-medium">{n}</span>
      <button
        type="button"
        onClick={() => setN((c) => c + 1)}
        className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 font-medium transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        Increment
      </button>
    </div>
  );
}
