"use client";

import { Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { PostCard } from "@/components/post-card";
import type { PostListItem } from "@/lib/posts";

export function PostSearch({ posts }: { posts: PostListItem[] }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(() => {
    if (!deferred) return posts;
    return posts.filter((p) => {
      const hay = [
        p.title,
        p.description,
        ...p.tags,
        p.slug.replace(/-/g, " "),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(deferred);
    });
  }, [posts, deferred]);

  return (
    <div className="space-y-6">
      <label className="relative block">
        <span className="sr-only">Search posts</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by title, tag, or topic…"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] py-2.5 pl-10 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-sm text-[var(--muted)]">
          No posts match that search.
        </p>
      ) : null}
    </div>
  );
}
