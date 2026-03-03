// src/components/analytics/signal-read-tracker.tsx
'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

interface SignalReadTrackerProps {
  /** The blog post slug */
  slug: string
  /** The current locale */
  locale: string
}

/**
 * Invisible component that fires a 'signal_read' analytics event
 * when a blog post page mounts.
 *
 * Place this component inside the blog post page (Server Component)
 * as a Client Component island.
 */
export function SignalReadTracker({ slug, locale }: SignalReadTrackerProps) {
  useEffect(() => {
    trackEvent('signal_read', { slug, locale })
  }, [slug, locale])

  // Renders nothing — tracking only
  return null
}
