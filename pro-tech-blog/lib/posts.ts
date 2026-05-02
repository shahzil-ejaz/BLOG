import fs from "node:fs";
import path from "node:path";
import type { ReactElement } from "react";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { getMDXComponents } from "@/components/mdx-components";
import { siteConfig } from "@/lib/site";
import {
  rehypeExtractHeadings,
  type TocItem,
} from "@/lib/rehype-extract-headings";

function resolvePostsDirectory(): string {
  const cwd = process.cwd();
  const direct = path.join(cwd, "content/posts");
  if (fs.existsSync(direct)) return direct;

  // If the app is run from a monorepo/root directory, fall back.
  const nested = path.join(cwd, "pro-tech-blog/content/posts");
  if (fs.existsSync(nested)) return nested;

  return direct;
}

const postsDirectory = resolvePostsDirectory();

const frontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  readTime: z.string().optional(),
  author: z.string().optional(),
  featured: z.boolean().optional(),
});

export type PostMeta = z.infer<typeof frontmatterSchema> & {
  slug: string;
  readTime: string;
  author: string;
};

export type PostListItem = PostMeta;

export class PostNotFoundError extends Error {
  override name = "PostNotFoundError";
}

function estimateReadTime(source: string): string {
  const words = source.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function parseFrontmatter(raw: string, slug: string): PostMeta {
  const { data, content } = matter(raw);
  const parsed = frontmatterSchema.parse(data);
  return {
    ...parsed,
    slug,
    author: parsed.author ?? siteConfig.authorDefault,
    readTime: parsed.readTime ?? estimateReadTime(content),
  };
}

function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(): PostListItem[] {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const raw = fs.readFileSync(fullPath, "utf8");
    return parseFrontmatter(raw, slug);
  });
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostMetaBySlug(slug: string): PostMeta | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const raw = fs.readFileSync(fullPath, "utf8");
    return parseFrontmatter(raw, slug);
  } catch {
    return undefined;
  }
}

export function getRelatedPosts(slug: string, limit = 3): PostListItem[] {
  const current = getPostMetaBySlug(slug);
  if (!current) return [];
  const others = getAllPosts().filter((p) => p.slug !== slug);
  const scored = others.map((p) => {
    const shared = p.tags.filter((t) => current.tags.includes(t)).length;
    return { post: p, score: shared };
  });
  scored.sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date));
  return scored.slice(0, limit).map((s) => s.post);
}

export async function compilePost(slug: string): Promise<{
  meta: PostMeta;
  content: ReactElement;
  headings: TocItem[];
}> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    throw new PostNotFoundError(`Post not found: ${slug}`);
  }
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content: source } = matter(raw);
  const meta = parseFrontmatter(raw, slug);

  const headings: TocItem[] = [];

  const { content } = await compileMDX({
    source,
    components: getMDXComponents(),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: {
                dark: "github-dark",
                light: "github-light",
              },
              keepBackground: true,
            },
          ],
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor-link"],
              },
            },
          ],
          rehypeExtractHeadings(headings),
        ],
      },
    },
  });

  return { meta, content, headings };
}
