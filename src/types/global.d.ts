// src/types/global.d.ts

interface OneClientWidgetAPI {
  open: () => void
  close: () => void
}

declare global {
  interface Window {
    OneClientWidget?: OneClientWidgetAPI
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
  }
}

export {}
