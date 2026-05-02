import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name}.`,
};

export default function ContactPage() {
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    `Hello from ${siteConfig.name}`,
  )}`;

  return (
    <main className="mx-auto max-w-2xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        Contact
      </h1>
      <p className="mt-4 text-[var(--muted)]">
        For collaborations, corrections, or topic suggestions, send an email.
      </p>
      <a
        href={mailto}
        className="mt-8 inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        <Mail className="size-4" aria-hidden />
        {siteConfig.email}
      </a>
    </main>
  );
}
