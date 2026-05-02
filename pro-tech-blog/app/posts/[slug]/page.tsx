import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";
import { PostCard } from "@/components/post-card";
import { TableOfContents } from "@/components/table-of-contents";
import {
  compilePost,
  getAllPosts,
  getPostMetaBySlug,
  getRelatedPosts,
  PostNotFoundError,
} from "@/lib/posts";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostMetaBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url: `${siteConfig.url}/posts/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  let data: Awaited<ReturnType<typeof compilePost>>;
  try {
    data = await compilePost(slug);
  } catch (err) {
    if (err instanceof PostNotFoundError) notFound();
    throw err;
  }

  const { meta, content, headings } = data;
  const related = getRelatedPosts(slug, 3);

  return (
    <article className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0">
          <header className="max-w-2xl border-b border-[var(--border)] pb-8">
            <p className="text-sm text-[var(--accent)]">
              {meta.tags.join(" · ")}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {meta.title}
            </h1>
            <p className="mt-3 text-lg text-[var(--muted)]">{meta.description}</p>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-[var(--muted)]">
              <time dateTime={meta.date}>
                {new Date(meta.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden>·</span>
              <span>{meta.readTime}</span>
              <span aria-hidden>·</span>
              <span>{meta.author}</span>
            </div>
          </header>

          <AdSlot />

          <div className="article-mdx mx-auto max-w-2xl py-10">{content}</div>

          <AdSlot label="End of article ad region" />

          {related.length > 0 ? (
            <section className="mx-auto max-w-2xl border-t border-[var(--border)] pt-10">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Related posts
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {related.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ) : null}

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-[var(--muted)]">
            <Link
              href="/"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              ← Back to all posts
            </Link>
          </p>
        </div>

        <aside className="relative mt-10 lg:mt-0">
          <div className="lg:sticky lg:top-20">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>
    </article>
  );
}
