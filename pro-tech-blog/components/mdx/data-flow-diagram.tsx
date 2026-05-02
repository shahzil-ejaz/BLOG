"use client";

import { useState, useEffect } from "react";

const tabs = ["Server", "Parallel", "Sequential", "Streaming"] as const;
type Tab = (typeof tabs)[number];

const diagrams: Record<Tab, { label: string; color: string; delay: number }[][]> = {
  Server: [
    [{ label: "Request", color: "#2dd4bf", delay: 0 }],
    [{ label: "Server Component", color: "#6366f1", delay: 0.1 }],
    [{ label: "fetch() DB / API", color: "#f59e0b", delay: 0.2 }],
    [{ label: "HTML streamed to browser", color: "#10b981", delay: 0.3 }],
  ],
  Parallel: [
    [{ label: "Server Component starts", color: "#2dd4bf", delay: 0 }],
    [
      { label: "fetch user", color: "#6366f1", delay: 0.1 },
      { label: "fetch posts", color: "#ec4899", delay: 0.1 },
      { label: "fetch ads", color: "#f59e0b", delay: 0.1 },
    ],
    [{ label: "Promise.all resolves", color: "#10b981", delay: 0.3 }],
    [{ label: "Render once ✓", color: "#2dd4bf", delay: 0.4 }],
  ],
  Sequential: [
    [{ label: "Server Component", color: "#2dd4bf", delay: 0 }],
    [{ label: "await fetch user", color: "#6366f1", delay: 0.1 }],
    [{ label: "await fetch posts (uses userId)", color: "#ec4899", delay: 0.2 }],
    [{ label: "Render (slower but correct order)", color: "#f59e0b", delay: 0.3 }],
  ],
  Streaming: [
    [{ label: "Request hits server", color: "#2dd4bf", delay: 0 }],
    [{ label: "<Suspense> shell streamed", color: "#6366f1", delay: 0.1 }],
    [{ label: "Slow data resolves...", color: "#f59e0b", delay: 0.2 }],
    [{ label: "Streamed into the page", color: "#10b981", delay: 0.35 }],
  ],
};

export function DataFlowDiagram() {
  const [active, setActive] = useState<Tab>("Server");
  const [key, setKey] = useState(0); // force re-mount on tab change to re-trigger animation

  useEffect(() => {
    // Inject keyframes into document head once
    const styleId = "data-flow-keyframes";
    if (!document.getElementById(styleId)) {
      const el = document.createElement("style");
      el.id = styleId;
      el.textContent = `
        @keyframes dfdFadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(el);
    }
  }, []);

  function switchTab(tab: Tab) {
    setActive(tab);
    setKey((k) => k + 1);
  }

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]">
      <div className="flex flex-wrap gap-1 border-b border-[var(--border)] p-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => switchTab(tab)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              active === tab
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--muted)] hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div key={key} className="flex flex-col items-center gap-0 p-6">
        {diagrams[active].map((row, ri) => (
          <div key={ri} className="w-full">
            <div className="flex w-full flex-wrap justify-center gap-2">
              {row.map((node, ni) => (
                <div
                  key={ni}
                  className="rounded-lg px-4 py-2 text-xs font-medium text-white shadow-md"
                  style={{
                    backgroundColor: node.color,
                    animation: `dfdFadeSlideIn 0.4s ease forwards ${node.delay}s`,
                    opacity: 0,
                  }}
                >
                  {node.label}
                </div>
              ))}
            </div>
            {ri < diagrams[active].length - 1 && (
              <div className="my-1 flex w-full justify-center text-base text-[var(--muted)]">
                ↓
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
