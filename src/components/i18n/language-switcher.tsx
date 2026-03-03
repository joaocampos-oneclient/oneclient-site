'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { trackEvent } from '@/lib/analytics'

interface LanguageSwitcherProps {
  locale: string
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  function switchTo(target: string) {
    // Track language switch BEFORE navigation
    trackEvent('language_switch', { from: locale, to: target })
    router.replace(pathname, { locale: target })
  }

  return (
    <div className="flex items-center gap-1 text-caption">
      <button
        type="button"
        onClick={() => switchTo('en')}
        className={
          locale === 'en'
            ? 'text-text-primary font-medium'
            : 'text-text-muted hover:text-text-primary transition-colors duration-150'
        }
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-text-muted">/</span>
      <button
        type="button"
        onClick={() => switchTo('pt')}
        className={
          locale === 'pt'
            ? 'text-text-primary font-medium'
            : 'text-text-muted hover:text-text-primary transition-colors duration-150'
        }
        aria-label="Mudar para Portugues"
      >
        PT
      </button>
    </div>
  )
}
