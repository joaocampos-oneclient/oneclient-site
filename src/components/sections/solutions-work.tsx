// src/components/sections/solutions-work.tsx
'use client'

import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/use-in-view'
import { SolutionCard } from '@/components/ui/solution-card'
import { solutions } from '@/lib/solutions-data'

/**
 * Section 03 — Solutions & Work
 *
 * Section header with title/subtitle, followed by a 6-card responsive grid.
 * Cards stagger into view on scroll using IntersectionObserver.
 */
export function SolutionsWork() {
  const t = useTranslations()
  const headerView = useInView({ delay: 0 })

  return (
    <section className="py-24 lg:py-40">
      <div className="mx-auto max-w-page px-6 lg:px-12">
        {/* Section header */}
        <div
          ref={headerView.ref}
          style={headerView.style}
          className={`mb-16 animate-on-scroll ${headerView.isInView ? 'in-view' : ''}`}
        >
          <h2 className="text-heading-2-mobile lg:text-heading-2 text-text-primary font-medium mb-4">
            {t('solutions.title')}
          </h2>
          <p className="text-body-lg-mobile lg:text-body-lg text-text-muted">
            {t('solutions.subtitle')}
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <SolutionCardWithAnimation
              key={solution.id}
              solution={solution}
              index={index}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Wrapper that adds scroll-triggered stagger animation to each card.
 * Each card gets its own IntersectionObserver with a staggered delay.
 */
function SolutionCardWithAnimation({
  solution,
  index,
  t,
}: {
  solution: (typeof solutions)[number]
  index: number
  t: ReturnType<typeof useTranslations>
}) {
  const cardView = useInView({ delay: index * 100, threshold: 0.15 })

  return (
    <div
      ref={cardView.ref}
      style={cardView.style}
      className={`animate-on-scroll ${cardView.isInView ? 'in-view' : ''}`}
    >
      <SolutionCard
        name={t(solution.nameKey)}
        description={t(solution.descriptionKey)}
        tag={t(solution.tag)}
        status={solution.status}
        index={index}
      />
    </div>
  )
}
