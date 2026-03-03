// src/components/sections/hero.tsx
'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ScrollIndicator } from '@/components/ui/scroll-indicator'
import { ChatWidgetTrigger } from '@/components/widget/chat-widget-trigger'

/**
 * Section 01 — Hero
 *
 * Full-viewport height, centered content, staggered page load animation.
 * Headline + subline + CTA button + scroll indicator.
 *
 * CTA onClick is a placeholder. Widget trigger wiring happens in S010.
 */
export function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 lg:px-12">
      <div className="max-w-text text-center">
        {/* Headline */}
        <h1 className="animate-hero-headline text-display-mobile lg:text-display text-text-primary font-semibold">
          {t('headline')}
        </h1>

        {/* Subline */}
        <p className="animate-hero-subline mt-6 text-body-lg-mobile lg:text-body-lg text-text-muted">
          {t('subline')}
        </p>

        {/* CTA */}
        <div className="animate-hero-cta mt-10">
          <ChatWidgetTrigger location="hero" pulse={true}>
            <Button variant="primary" pulse>
              {t('cta')}
            </Button>
          </ChatWidgetTrigger>
        </div>
      </div>

      {/* Scroll indicator — bottom of hero */}
      <div className="absolute bottom-8">
        <ScrollIndicator />
      </div>
    </section>
  )
}
