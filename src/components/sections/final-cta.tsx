// src/components/sections/final-cta.tsx
'use client'

import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'
import { Button } from '@/components/ui/button'
import { ChatWidgetTrigger } from '@/components/widget/chat-widget-trigger'

/**
 * Section 06 — Final CTA
 *
 * Display-size closing headline with a primary CTA button.
 * Headline and button animate independently with staggered scroll-reveal.
 *
 * CTA onClick is a placeholder. ChatWidgetTrigger wiring happens in S010.
 */
export function FinalCTA() {
  const t = useTranslations('finalCta')
  const headline = useInView({ threshold: 0.2, triggerOnce: true, delay: 0 })
  const cta = useInView({ threshold: 0.2, triggerOnce: true, delay: 200 })

  return (
    <section className="py-24 lg:py-40">
      <div className="mx-auto max-w-text px-6 lg:px-12 text-center">
        <h2
          ref={headline.ref}
          style={headline.style}
          className={`text-display-mobile lg:text-display text-text-primary font-semibold animate-on-scroll ${headline.isInView ? 'in-view' : ''}`}
        >
          {t('headline')}
        </h2>

        <div
          ref={cta.ref}
          style={cta.style}
          className={`mt-10 animate-on-scroll ${cta.isInView ? 'in-view' : ''}`}
        >
          <ChatWidgetTrigger location="final_cta" pulse={true}>
            <Button variant="primary" pulse={true}>
              {t('cta')}
            </Button>
          </ChatWidgetTrigger>
        </div>
      </div>
    </section>
  )
}
