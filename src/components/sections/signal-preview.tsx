// src/components/sections/signal-preview.tsx
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getLatestPosts } from '@/lib/mdx'
import { PostCard } from '@/components/ui/post-card'

interface SignalPreviewProps {
  locale: string
}

export async function SignalPreview({ locale }: SignalPreviewProps) {
  const t = await getTranslations('signal')
  const posts = getLatestPosts(locale, 3)

  if (posts.length === 0) {
    return null
  }

  return (
    <section id="signal" className="py-24 lg:py-40">
      <div className="mx-auto max-w-page px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-heading-2-mobile lg:text-heading-2 text-text-primary">
            {t('title')}
          </h2>
          <p className="mt-2 text-body-lg text-text-muted">
            {t('tagline')}
          </p>
          <Link
            href="/signal"
            className="mt-3 inline-block text-body text-text-accent hover:underline"
          >
            {t('readAll')}
          </Link>
        </div>

        {/* Post cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.publishedAt}
              slug={post.slug}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
