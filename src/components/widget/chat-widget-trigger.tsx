// src/components/widget/chat-widget-trigger.tsx
'use client'

import { useCallback } from 'react'
import { trackEvent } from '@/lib/analytics'
import { FALLBACK_EMAIL } from '@/lib/constants'

interface ChatWidgetTriggerProps {
  /** Which CTA location triggered the click — used for analytics */
  location: 'hero' | 'nav' | 'final_cta'
  /** The button or element to render inside the trigger wrapper */
  children: React.ReactNode
  /** Enable idle glow pulse animation on the wrapper (passed through for styling) */
  pulse?: boolean
}

/**
 * Wraps a CTA button with chat widget trigger logic.
 *
 * On click:
 * 1. Tracks 'cta_click' with the location property
 * 2. Checks if window.OneClientWidget is available
 * 3. If available: calls .open() and tracks 'widget_open'
 * 4. If unavailable: redirects to mailto fallback and tracks 'widget_fallback'
 *
 * Handles all edge cases: script not loaded, script failed, API undefined.
 */
export function ChatWidgetTrigger({
  location,
  children,
}: ChatWidgetTriggerProps) {
  const handleClick = useCallback(() => {
    // 1. Always track the CTA click regardless of widget availability
    trackEvent('cta_click', { location })

    // 2. Attempt to open the widget
    try {
      if (
        typeof window !== 'undefined' &&
        window.OneClientWidget &&
        typeof window.OneClientWidget.open === 'function'
      ) {
        window.OneClientWidget.open()
        trackEvent('widget_open', { location })
      } else {
        // 3. Widget not available — fall back to email
        window.location.href = `mailto:${FALLBACK_EMAIL}?subject=Partnership%20Inquiry`
        trackEvent('widget_fallback')
      }
    } catch {
      // 4. Something went wrong with the widget API — fall back to email
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=Partnership%20Inquiry`
      trackEvent('widget_fallback')
    }
  }, [location])

  return (
    <div onClick={handleClick} role="button" tabIndex={0} onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    }}>
      {children}
    </div>
  )
}
