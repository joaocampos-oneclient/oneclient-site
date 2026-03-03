import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

interface PostLayoutProps {
  title: string
  date: string
  locale: string
  children: React.ReactNode
}

export async function PostLayout({ title, date, locale, children }: PostLayoutProps) {
  const t = await getTranslations('signal')
  const dateLocale = locale === 'pt' ? 'pt-BR' : 'en-US'

  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString(dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="mx-auto max-w-text px-6 pb-24 pt-32 lg:pb-40 lg:pt-40">
      {/* Back link */}
      <Link
        href="/signal"
        className="inline-block text-text-accent hover:underline text-body mb-8"
      >
        {t('backToSignal')}
      </Link>

      {/* Date */}
      <time
        dateTime={date}
        className="block text-caption text-text-muted mb-4"
      >
        {formattedDate}
      </time>

      {/* Title */}
      <h1 className="text-post-title-mobile lg:text-post-title text-text-primary mb-12">
        {title}
      </h1>

      {/* MDX body */}
      {children}
    </article>
  )
}
