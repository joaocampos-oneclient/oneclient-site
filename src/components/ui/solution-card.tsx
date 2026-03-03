// src/components/ui/solution-card.tsx
'use client'

import { useRef, useCallback } from 'react'
import { Badge } from '@/components/ui/badge'
import { StatusIndicator } from '@/components/ui/status-indicator'
import { trackEvent } from '@/lib/analytics'

interface SolutionCardProps {
  /** Client/vertical display name */
  name: string
  /** One-line description */
  description: string
  /** Category tag for the badge */
  tag: string
  /** Card status: live or in-development */
  status: 'live' | 'in-development'
  /** Index in the grid — used for stagger animation delay (set by parent) */
  index: number
}

/**
 * Solution/case card used in the Solutions & Work section.
 *
 * Live cards have solid borders. In-development cards have dashed borders
 * and reduced opacity.
 *
 * Fires a 'case_hover' analytics event when hovered for more than 1 second.
 */
export function SolutionCard({ name, description, tag, status, index }: SolutionCardProps) {
  const isInDev = status === 'in-development'
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = useCallback(() => {
    // Start a 1-second timer — if the user is still hovering after 1s, track the event
    hoverTimerRef.current = setTimeout(() => {
      trackEvent('case_hover', { case: name })
    }, 1000)
  }, [name])

  const handleMouseLeave = useCallback(() => {
    // Cancel the timer if the user leaves before 1 second
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }, [])

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        bg-background-surface
        border rounded-card p-8
        transition-all duration-300 ease-out-expo
        ${
          isInDev
            ? 'border-dashed border-border opacity-70 hover:opacity-85 hover:border-border-hover'
            : 'border-border hover:border-border-hover'
        }
        hover:-translate-y-0.5
      `}
    >
      {/* Badge — top */}
      <div className="mb-4">
        <Badge>{tag}</Badge>
      </div>

      {/* Name */}
      <h3 className="text-heading-3-mobile lg:text-heading-3 text-text-primary font-medium mb-2">
        {name}
      </h3>

      {/* Description */}
      <p className="text-body text-text-muted mb-6">
        {description}
      </p>

      {/* Status indicator — bottom */}
      <StatusIndicator status={status} />
    </div>
  )
}
