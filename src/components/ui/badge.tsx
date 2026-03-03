// src/components/ui/badge.tsx

interface BadgeProps {
  children: React.ReactNode
}

/**
 * Small tag badge used in solution cards (e.g., "Enterprise AI", "Healthcare").
 *
 * Renders with elevated background, muted text, micro font size, and rounded corners.
 */
export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-block bg-background-elevated text-text-muted text-micro px-2.5 py-1 rounded-badge">
      {children}
    </span>
  )
}
