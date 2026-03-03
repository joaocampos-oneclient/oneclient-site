// src/hooks/use-scroll-position.ts
'use client'

import { useState, useEffect } from 'react'

/**
 * Returns true when the page has been scrolled past the given threshold.
 * Uses a passive scroll listener so it never blocks the main thread.
 *
 * @param threshold - Scroll distance in px before returning true (default: 64)
 */
export function useScrollPosition(threshold: number = 64): boolean {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    handler() // Check initial position on mount
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return isScrolled
}
