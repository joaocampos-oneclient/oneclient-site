// src/components/layout/footer.tsx
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { LINKEDIN_URL } from '@/lib/constants'

interface FooterProps {
  locale: string
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations('footer')

  return (
    <footer className="border-t border-border py-12 lg:py-12">
      <div className="mx-auto max-w-page px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo/oneclient-wordmark.svg"
            alt="OneClient"
            width={120}
            height={20}
          />
        </Link>

        {/* Right side: links + copyright */}
        <div className="flex items-center gap-4 text-caption text-text-muted">
          <Link
            href="/signal"
            className="hover:text-text-primary transition-colors duration-150"
          >
            Signal
          </Link>

          <span className="text-border">&middot;</span>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors duration-150"
          >
            LinkedIn
          </a>

          <span className="text-border">&middot;</span>

          <span>{t('copyright')}</span>
        </div>
      </div>
    </footer>
  )
}
