import Link from "next/link";
import type { PostListItem } from "@/lib/posts";

export function PostCard({ post }: { post: PostListItem }) {
  return (
    <article className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:shadow-md">
      <Link href={`/posts/${post.slug}`} className="block">
        <h2 className="text-base font-semibold tracking-tight text-[var(--foreground)] transition group-hover:text-[var(--accent)]">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">
          {post.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span>{post.readTime}</span>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[var(--border)] bg-[var(--muted-bg)] px-2.5 py-0.5 text-xs text-[var(--muted)]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
}
