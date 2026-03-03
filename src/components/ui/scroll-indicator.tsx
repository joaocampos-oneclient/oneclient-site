// src/components/ui/scroll-indicator.tsx
'use client'

import { useScrollPosition } from '@/hooks/use-scroll-position'

/**
 * Minimal scroll-down hint shown at the bottom of the Hero section.
 * Fades out when the user scrolls past 100px.
 */
export function ScrollIndicator() {
  const isScrolled = useScrollPosition(100)

  return (
    <div
      className={`
        animate-hero-scroll
        transition-opacity duration-500
        ${isScrolled ? 'opacity-0' : 'opacity-100'}
      `}
      aria-hidden="true"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-text-muted animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        <path
          d="M7 10L12 15L17 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
