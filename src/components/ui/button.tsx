// src/components/ui/button.tsx
'use client'

import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  /** Button visual variant (default: 'primary') */
  variant?: 'primary' | 'text'
  /** Click handler — used when no href is provided */
  onClick?: () => void
  /** If provided, renders as a Link instead of a button */
  href?: string
  /** Additional CSS classes */
  className?: string
  /** Enable idle glow pulse animation (hero/final CTA only) */
  pulse?: boolean
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
  pulse = false,
}: ButtonProps) {
  const primaryClasses = `
    inline-flex items-center justify-center
    text-body font-medium text-text-primary
    border border-accent bg-transparent
    px-6 py-3 rounded-button
    hover:bg-accent-glow hover:border-accent-hover
    active:scale-[0.98]
    transition-all duration-200 ease-out-expo
    ${pulse ? 'animate-cta-pulse' : ''}
  `

  const textClasses = `
    inline-flex items-center
    text-body text-text-accent
    hover:underline hover:underline-offset-4
    transition-colors duration-150
  `

  const classes = `${variant === 'primary' ? primaryClasses : textClasses} ${className}`.trim()

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
