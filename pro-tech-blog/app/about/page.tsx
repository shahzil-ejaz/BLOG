import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Mission and background for ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        About
      </h1>
      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert prose-p:text-[var(--muted)] prose-headings:text-[var(--foreground)] prose-a:text-[var(--accent)]">
        <p>
          {siteConfig.name} exists for developers who want{" "}
          <strong className="text-[var(--foreground)]">
            fast answers and durable patterns
          </strong>{" "}
          in React and Next.js — without sitting through long videos.
        </p>
        <p>
          Every article is written to be skimmable: clear headings, copy-ready
          snippets, and opinionated notes on architecture and performance when it
          matters.
        </p>
        <p>
          The site is built as static Jamstack content (MDX on disk) for speed,
          reliability, and a great reading experience on slow networks.
        </p>
      </div>
    </main>
  );
}
