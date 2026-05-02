# Product Requirements Document (PRD)
**Project Name:** Pro Tech Blog (React/Next.js Niche)
**Document Version:** 1.0
**Status:** In Development

---

## 1. Project Overview
### 1.1 Purpose
To build a high-performance, professional blog tailored for modern web developers (specifically React and Next.js). The platform will provide skimmable, highly valuable written content, code snippets, and architectural guides as a superior alternative to long-form YouTube tutorials. 

### 1.2 Target Audience
* Frontend Developers, React Developers, Full-Stack Engineers.
* Users seeking quick solutions, copy-paste code snippets, and deep-dive technical articles.

### 1.3 Monetization Goal
Generate revenue via Google AdSense. The site will be built from day one to comply with Google AdSense approval guidelines, ensuring non-intrusive, high-converting ad placements.

---

## 2. Technical Stack
Since the requirement strictly excludes a backend/database for the MVP (Minimum Viable Product), we will utilize a Jamstack architecture.

* **Framework:** Next.js (App Router)
* **Library:** React.js
* **Language:** TypeScript (Strict typing for fewer bugs and better DX)
* **Styling:** Tailwind CSS
* **Content Management:** MDX (Markdown + React components)
  * Allows writing articles in `.mdx` files.
  * Allows rendering interactive React components *inside* blog posts.
* **Code Syntax Highlighting:** `rehype-pretty-code` (Builds beautiful, VS Code-like code blocks).
* **Icons:** `lucide-react`
* **Deployment & Hosting:** Vercel (Free tier, seamless Next.js integration, lightning-fast edge network).

---

## 3. Design & UX System
The UI must be minimalist but sophisticated. "Uncluttered" does not mean "empty."

* **Aesthetic Style:** Modern developer aesthetic (similar to Vercel, Linear, or Stripe).
* **Textures:** Subtle dot-matrix or grid SVG backgrounds to provide depth without distraction.
* **Typography:**
  * Headings: `Geist` or `Inter` (Sans-serif, clean, tightly tracked).
  * Code Blocks: `Geist Mono` or `Fira Code`.
  * Reading width: Constrained to `max-w-2xl` or `650px` for optimal eye tracking.
* **Themes:** Full Dark/Light mode support via `next-themes`.
* **Interactions:** Glassmorphism on sticky headers, smooth hover states on cards, subtle fade-in animations on scroll.

---

## 4. Core Features (MVP)
Even without a backend, the site must feel fully featured.

### 4.1 The Homepage
* **Hero Section:** Clear value proposition (e.g., "Master Next.js Architecture").
* **Featured Post:** Highlight the most recent or highest-value article.
* **Post Grid:** A masonry or grid layout of articles categorized by tags (e.g., Hooks, Performance, Styling).
* **Search / Filter (Local):** A client-side search bar that filters MDX files by title/tag instantly.

### 4.2 The Article Page (The Money Maker)
* **Frontmatter Metadata:** Title, Date, Author, Estimated Reading Time, Tags.
* **Table of Contents (ToC):** Sticky sidebar ToC that highlights the active heading as the user scrolls.
* **Interactive Code Blocks:** Copy-to-clipboard buttons, line highlighting, and file-name headers.
* **Component Previews:** Live, interactive React components embedded in the text to demonstrate concepts.
* **Related Posts:** 3 suggested articles at the bottom to decrease bounce rate.

### 4.3 Essential Pages (For AdSense Approval)
* `/about`: Professional background, mission of the blog.
* `/contact`: Simple mailto link or integrated free form service (like Formspree).
* `/privacy-policy`: Required by Google.
* `/terms-of-service`: Required by Google.

---

## 5. Content Architecture (MDX Setup)
Articles will be stored locally in a `content/` directory.

**Standard Frontmatter Structure (Example):**
```yaml
---
title: "Advanced Next.js App Router Data Fetching"
date: "2024-05-20"
description: "Learn how to optimize your Next.js server components..."
tags: ["Next.js", "Performance"]
readTime: "6 min read"
---