// src/hooks/use-in-view.ts
'use client'

import { useRef, useState, useEffect } from 'react'
import { useReducedMotion } from './use-reduced-motion'

interface UseInViewOptions {
  /** Intersection threshold 0.0-1.0 (default: 0.2) */
  threshold?: number
  /** Only trigger once — element stays visible after first intersection (default: true) */
  triggerOnce?: boolean
  /** Stagger delay in ms — applied as --animation-delay CSS variable (default: 0) */
  delay?: number
}

/**
 * Observes an element and returns whether it is in the viewport.
 *
 * Usage:
 * ```tsx
 * const { ref, isInView, style } = useInView({ delay: 150 })
 * <div ref={ref} style={style} className={`animate-on-scroll ${isInView ? 'in-view' : ''}`}>
 * ```
 */
export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.2, triggerOnce = true, delay = 0 } = options
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // If reduced motion is preferred, show everything immediately
    if (prefersReducedMotion) {
      setIsInView(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, triggerOnce, prefersReducedMotion])

  return {
    ref,
    isInView,
    style: { '--animation-delay': `${delay}ms` } as React.CSSProperties,
  }
}
