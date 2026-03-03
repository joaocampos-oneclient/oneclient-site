// src/app/[locale]/signal/page.tsx
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getAllPostsMeta } from '@/lib/mdx'
import { PostCard } from '@/components/ui/post-card'

export const revalidate = 3600

interface SignalPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: SignalPageProps): Promise<Metadata> {
  const { locale } = await params

  if (locale === 'pt') {
    return {
      title: 'Signal — No que vale prestar atencao',
      description: 'Ideias e analises sobre IA, tecnologia e negocios.',
    }
  }

  return {
    title: "Signal — What's worth paying attention to",
    description: 'Ideas and analysis on AI, technology, and business.',
  }
}

export default async function SignalPage({ params }: SignalPageProps) {
  const { locale } = await params
  const t = await getTranslations('signal')
  const posts = getAllPostsMeta(locale)

  return (
    <main className="pt-32 pb-24 lg:pb-40">
      <div className="mx-auto max-w-page px-6 lg:px-12">
        {/* Page header */}
        <div className="mb-16">
          <h1 className="text-display-mobile lg:text-display text-text-primary">
            {t('title')}
          </h1>
          <p className="mt-4 text-body-lg text-text-muted">
            {t('tagline')}
          </p>
        </div>

        {/* Post list */}
        <div className="space-y-6">
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

        {posts.length === 0 && (
          <p className="text-body text-text-muted">
            No posts yet.
          </p>
        )}
      </div>
    </main>
  )
}
