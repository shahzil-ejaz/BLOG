"use client";

import { Check, Copy } from "lucide-react";
import {
  useCallback,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

export function PreWithCopy({
  children,
  ...props
}: ComponentPropsWithoutRef<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    const text = preRef.current?.textContent ?? "";
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="group relative my-6 rounded-lg border border-[var(--border)] bg-[var(--code-bg)]">
      <button
        type="button"
        onClick={copy}
        className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background)]/80 text-[var(--foreground)] opacity-0 shadow-sm backdrop-blur transition hover:bg-[var(--muted-bg)] focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
      <pre
        ref={preRef}
        {...props}
        className={`overflow-x-auto p-4 text-sm leading-relaxed ${props.className ?? ""}`}
      >
        {children}
      </pre>
    </div>
  );
}
