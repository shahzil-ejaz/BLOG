export const siteConfig = {
  name: "Blogs",
  description:
    "Skimmable React and Next.js articles, patterns, and copy-paste snippets for modern frontend work.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  authorDefault: "Pro Tech Blog",
  email: "hello@protechblog.example",
} as const;
