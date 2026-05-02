import { PostCard } from "@/components/post-card";
import { PostSearch } from "@/components/post-search";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  const featured =
    posts.find((p) => p.featured) ?? posts[0] ?? null;
  const gridPosts = featured
    ? posts.filter((p) => p.slug !== featured.slug)
    : posts;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <section className="max-w-2xl space-y-4">
        <p className="text-sm font-medium tracking-wide text-[var(--accent)]">
          React · Next.js · Architecture
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Master Next.js architecture, one skimmable article at a time.
        </h1>
        <p className="text-lg leading-relaxed text-[var(--muted)]">
          {siteConfig.description}
        </p>
      </section>

      {featured ? (
        <section className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Featured
          </h2>
          <div className="mt-4 max-w-xl">
            <PostCard post={featured} />
          </div>
        </section>
      ) : null}

      <section className="mt-16 space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            All articles
          </h2>
        </div>
        <PostSearch posts={gridPosts.length > 0 ? gridPosts : posts} />
      </section>
    </main>
  );
}
