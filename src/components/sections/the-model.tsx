// src/components/sections/the-model.tsx
'use client'

import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'

/**
 * Section 02 — The Model
 *
 * Three-line value proposition with scroll-triggered stagger animation.
 * Each line uses useInView for independent intersection observation.
 */
export function TheModel() {
  const t = useTranslations('model')

  const line1 = useInView({ delay: 0 })
  const line2 = useInView({ delay: 150 })
  const line3 = useInView({ delay: 300 })

  return (
    <section className="py-24 lg:py-40">
      <div className="mx-auto max-w-model px-6 lg:px-12 space-y-12">
        <h2
          ref={line1.ref}
          style={line1.style}
          className={`
            text-heading-1-mobile lg:text-heading-1 text-text-primary font-medium
            animate-on-scroll ${line1.isInView ? 'in-view' : ''}
          `}
        >
          {t('line1')}
        </h2>

        <h2
          ref={line2.ref}
          style={line2.style}
          className={`
            text-heading-1-mobile lg:text-heading-1 text-text-primary font-medium
            animate-on-scroll ${line2.isInView ? 'in-view' : ''}
          `}
        >
          {t('line2')}
        </h2>

        <h2
          ref={line3.ref}
          style={line3.style}
          className={`
            text-heading-1-mobile lg:text-heading-1 text-text-primary font-medium
            animate-on-scroll ${line3.isInView ? 'in-view' : ''}
          `}
        >
          {t('line3')}
        </h2>
      </div>
    </section>
  )
}
