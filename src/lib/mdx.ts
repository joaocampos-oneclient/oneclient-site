import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/blog/mdx-components'

// ---------- Types ----------

export interface PostFrontmatter {
  title: string
  slug: string
  excerpt: string
  publishedAt: string          // ISO date string "2026-03-03"
  author: string
  locale: 'en' | 'pt'
  tags: string[]
}

export interface PostMeta extends PostFrontmatter {
  readingTime?: number         // Future: estimated reading time
}

export interface Post extends PostMeta {
  content: React.ReactElement  // Compiled MDX content
}

// ---------- Constants ----------

const CONTENT_DIR = path.join(process.cwd(), 'content', 'signal')

// ---------- Functions ----------

/**
 * Get all post slugs for a locale.
 * Used by generateStaticParams to pre-render all blog posts.
 */
export function getPostSlugs(locale: string): string[] {
  const dir = path.join(CONTENT_DIR, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}

/**
 * Get post metadata only (for index pages and previews).
 * Does NOT compile the MDX — just reads frontmatter.
 */
export function getPostMeta(slug: string, locale: string): PostMeta | null {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)
  return data as PostMeta
}

/**
 * Get all posts metadata, sorted by publishedAt descending.
 * Used by the blog index page.
 */
export function getAllPostsMeta(locale: string): PostMeta[] {
  return getPostSlugs(locale)
    .map((slug) => getPostMeta(slug, locale))
    .filter((p): p is PostMeta => p !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
}

/**
 * Get latest N posts (for Signal Preview section on landing page).
 */
export function getLatestPosts(
  locale: string,
  limit: number = 3
): PostMeta[] {
  return getAllPostsMeta(locale).slice(0, limit)
}

/**
 * Compile and return full post (for individual post pages).
 * This is the only async function — compileMDX is async.
 */
export async function getPost(
  slug: string,
  locale: string
): Promise<Post | null> {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source: raw,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
    },
  })

  return {
    ...frontmatter,
    content,
  }
}
