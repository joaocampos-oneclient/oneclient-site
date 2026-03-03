// src/components/sections/about.tsx
'use client'

import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'

/**
 * Section 04 — About
 *
 * Centered founder quote with thin horizontal rules above and below.
 * Single fade-in + translate-up on scroll for the quote block.
 */
export function About() {
  const t = useTranslations('about')
  const section = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section className="py-24 lg:py-40">
      <div className="mx-auto max-w-about px-6 lg:px-12 text-center">
        {/* Top rule */}
        <div className="mx-auto mb-12 max-w-[64px] border-t border-border-DEFAULT" />

        <div
          ref={section.ref}
          style={section.style}
          className={`animate-on-scroll ${section.isInView ? 'in-view' : ''}`}
        >
          <blockquote>
            <p className="text-heading-2-mobile lg:text-heading-2 text-text-primary font-normal">
              {t('quote')}
            </p>
          </blockquote>

          <p className="mt-8 text-body text-text-muted font-medium">
            {t('attribution')}
          </p>
        </div>

        {/* Bottom rule */}
        <div className="mx-auto mt-12 max-w-[64px] border-t border-border-DEFAULT" />
      </div>
    </section>
  )
}
