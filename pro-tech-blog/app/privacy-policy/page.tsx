import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-2xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Last updated: {new Date().toLocaleDateString("en-US", { dateStyle: "long" })}
      </p>
      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert prose-p:text-[var(--muted)] prose-headings:text-[var(--foreground)] prose-li:text-[var(--muted)]">
        <h2>Overview</h2>
        <p>
          {siteConfig.name} (“we”, “us”) respects your privacy. This policy
          describes what information may be collected when you use{" "}
          <strong className="text-[var(--foreground)]">{siteConfig.url}</strong>{" "}
          and how it is used.
        </p>
        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong className="text-[var(--foreground)]">Usage data:</strong>{" "}
            When you browse the site, standard server or analytics logs may
            include IP address, browser type, and pages viewed. If you enable
            third-party analytics in the future, this section will list the
            provider and retention.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Cookies:</strong>{" "}
            We may use essential cookies for site operation. If advertising or
            analytics cookies are added (for example, after enabling Google
            AdSense), we will update this policy and, where required, request
            consent before non-essential cookies are set.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Contact:</strong> If
            you email us, we retain your message only as long as needed to
            respond.
          </li>
        </ul>
        <h2>Advertising</h2>
        <p>
          This site may display ads via Google AdSense or similar networks.
          Those partners may use cookies or similar technologies to show
          relevant ads and measure performance. You can review Google’s policy
          at{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Advertising Policies
          </a>
          .
        </p>
        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct,
          or delete personal data. Contact us using the details on the Contact
          page.
        </p>
        <h2>Changes</h2>
        <p>
          We may update this policy. The “Last updated” date at the top will
          change when we do.
        </p>
      </div>
    </main>
  );
}
