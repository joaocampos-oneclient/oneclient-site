// src/app/[locale]/signal/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPost, getPostSlugs } from '@/lib/mdx'
import { PostBody } from '@/components/blog/post-body'
import { SignalReadTracker } from '@/components/analytics/signal-read-tracker'
import { locales } from '@/i18n/config'
import type { Metadata } from 'next'

export const revalidate = 3600

interface PostPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []

  for (const locale of locales) {
    const slugs = getPostSlugs(locale)
    for (const slug of slugs) {
      params.push({ locale, slug })
    }
  }

  return params
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const post = await getPost(slug, locale)

  if (!post) {
    // Try fallback to EN for metadata
    if (locale !== 'en') {
      const enPost = await getPost(slug, 'en')
      if (enPost) {
        return {
          title: enPost.title,
          description: enPost.excerpt,
          openGraph: {
            title: enPost.title,
            description: enPost.excerpt,
            type: 'article',
            publishedTime: enPost.publishedAt,
            authors: [enPost.author],
          },
        }
      }
    }

    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = await params
  const t = await getTranslations('signal')

  let post = await getPost(slug, locale)
  let isFallback = false

  // If post doesn't exist in requested locale, try EN fallback
  if (!post && locale !== 'en') {
    post = await getPost(slug, 'en')
    isFallback = true
  }

  if (!post) {
    return notFound()
  }

  return (
    <main className="pt-32 pb-24 lg:pb-40">
      {/* Analytics: track blog post read */}
      <SignalReadTracker slug={slug} locale={locale} />

      <div className="mx-auto max-w-text px-6 lg:px-12">
        {/* Back link */}
        <Link
          href="/signal"
          className="inline-block text-text-accent hover:underline text-body mb-8"
        >
          {t('backToSignal')}
        </Link>

        {/* Fallback banner */}
        {isFallback && (
          <div className="mb-6 rounded-card border border-border-hover bg-background-elevated px-6 py-4">
            <p className="text-caption text-text-muted">
              This post is not yet available in Portuguese. Showing the English version.
            </p>
          </div>
        )}

        {/* Post header */}
        <div className="mb-12">
          <time
            dateTime={post.publishedAt}
            className="block text-caption text-text-muted mb-4"
          >
            {new Date(post.publishedAt).toLocaleDateString(
              locale === 'pt' ? 'pt-BR' : 'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            )}
          </time>
          <h1 className="text-post-title-mobile lg:text-post-title text-text-primary">
            {post.title}
          </h1>
        </div>

        {/* Post body */}
        <PostBody>{post.content}</PostBody>
      </div>
    </main>
  )
}
