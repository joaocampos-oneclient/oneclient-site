// src/components/ui/status-indicator.tsx
'use client'

import { useTranslations } from 'next-intl'

interface StatusIndicatorProps {
  status: 'live' | 'in-development'
}

/**
 * Status dot + label for solution cards.
 *
 * - Live: green dot with pulse animation + "Live" / "Ativo" label
 * - In-development: amber dot (static) + "In development" / "Em desenvolvimento" label
 */
export function StatusIndicator({ status }: StatusIndicatorProps) {
  const t = useTranslations('solutions')
  const isLive = status === 'live'

  return (
    <div className="flex items-center gap-2">
      <span
        className={`
          w-2 h-2 rounded-full
          ${isLive ? 'bg-status-live animate-live-pulse' : 'bg-status-dev'}
        `}
      />
      <span className="text-caption text-text-muted">
        {isLive ? t('live') : t('inDev')}
      </span>
    </div>
  )
}
