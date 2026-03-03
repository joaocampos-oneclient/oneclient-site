// src/lib/analytics.ts

/**
 * Track a custom event via Plausible Analytics.
 *
 * Safe to call even if the Plausible script has not loaded yet —
 * the function silently no-ops when window.plausible is undefined.
 *
 * @param name - Event name (e.g. 'cta_click', 'widget_open')
 * @param props - Optional key-value properties attached to the event
 */
export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(name, { props })
  }
}
