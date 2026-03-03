// src/components/ui/post-card.tsx
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

interface PostCardProps {
  title: string
  excerpt: string
  date: string
  slug: string
  locale: string
}

export async function PostCard({ title, excerpt, date, slug, locale }: PostCardProps) {
  const t = await getTranslations('signal')

  const dateLocale = locale === 'pt' ? 'pt-BR' : 'en-US'

  return (
    <Link
      href={`/signal/${slug}`}
      className="
        block
        bg-background-surface border border-border rounded-card p-8
        hover:border-border-hover hover:-translate-y-0.5
        transition-all duration-300 ease-out-expo
        group
      "
    >
      {/* Date */}
      <time
        dateTime={date}
        className="text-caption text-text-muted"
      >
        {new Date(date).toLocaleDateString(dateLocale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>

      {/* Title */}
      <h3 className="mt-3 text-heading-3-mobile lg:text-heading-3 text-text-primary">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="mt-2 text-body text-text-muted line-clamp-2">
        {excerpt}
      </p>

      {/* Read link */}
      <span className="mt-4 inline-block text-body text-text-accent group-hover:underline">
        {t('readPost')}
      </span>
    </Link>
  )
}
