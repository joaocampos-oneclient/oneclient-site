// src/components/analytics/scroll-depth-tracker.tsx
'use client'

import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'

/** Section IDs to track for scroll depth analytics */
const TRACKED_SECTIONS = ['model', 'solutions', 'about', 'signal', 'final_cta'] as const

/**
 * Invisible component that observes landing page sections and fires
 * a 'scroll_depth' analytics event when each section enters the viewport.
 *
 * Each section is tracked only once — re-scrolling does not re-fire.
 *
 * Requires sections to have matching `id` attributes:
 * - id="model"
 * - id="solutions"
 * - id="about"
 * - id="signal"
 * - id="final_cta"
 */
export function ScrollDepthTracker() {
  const trackedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            // Only track each section once
            if (sectionId && !trackedRef.current.has(sectionId)) {
              trackedRef.current.add(sectionId)
              trackEvent('scroll_depth', { section: sectionId })
            }
          }
        })
      },
      {
        threshold: 0.2, // Fire when 20% of the section is visible
      }
    )

    // Observe all tracked sections
    TRACKED_SECTIONS.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  // This component renders nothing — it only observes
  return null
}
