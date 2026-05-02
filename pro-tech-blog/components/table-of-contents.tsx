"use client";

import type { TocItem } from "@/lib/rehype-extract-headings";
import { useEffect, useState } from "react";

export function TableOfContents({ headings }: { headings: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visible[0];
        if (first?.target?.id) setActiveId(first.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 1] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden lg:block"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
        On this page
      </p>
      <ul className="mt-3 space-y-2 border-l border-[var(--border)] pl-3 text-sm">
        {headings.map((h) => (
          <li
            key={h.id}
            style={{ paddingLeft: h.depth === 3 ? "0.5rem" : 0 }}
          >
            <a
              href={`#${h.id}`}
              className={
                activeId === h.id
                  ? "font-medium text-[var(--accent)]"
                  : "text-[var(--muted)] transition hover:text-[var(--foreground)]"
              }
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
