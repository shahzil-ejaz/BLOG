import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Last updated: {new Date().toLocaleDateString("en-US", { dateStyle: "long" })}
      </p>
      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert prose-p:text-[var(--muted)] prose-headings:text-[var(--foreground)] prose-li:text-[var(--muted)]">
        <h2>Agreement</h2>
        <p>
          By accessing {siteConfig.name} at {siteConfig.url}, you agree to
          these terms. If you disagree, please do not use the site.
        </p>
        <h2>Content</h2>
        <p>
          Articles, code samples, and opinions are provided for educational
          purposes. You are responsible for how you use them in production
          systems. We do not guarantee fitness for a particular purpose.
        </p>
        <h2>Intellectual property</h2>
        <p>
          Unless otherwise noted, site content is owned by the publisher. Short
          quotations with attribution are welcome; wholesale copying is not.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {siteConfig.name} and its
          operators are not liable for indirect or consequential damages arising
          from use of the site or reliance on its content.
        </p>
        <h2>Changes</h2>
        <p>
          We may change these terms. Continued use after changes constitutes
          acceptance of the updated terms.
        </p>
      </div>
    </main>
  );
}
