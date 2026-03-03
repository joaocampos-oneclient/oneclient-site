import type { Metadata } from 'next'
import Script from 'next/script'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://1-client.com'),
  title: {
    default: 'OneClient — AI Infrastructure',
    template: '%s | OneClient',
  },
  description: 'We build AI infrastructure for companies with big markets and hard problems.',
  openGraph: {
    type: 'website',
    siteName: 'OneClient',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OneClient — AI Infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const widgetUrl = process.env.NEXT_PUBLIC_WIDGET_URL
  const widgetTenant = process.env.NEXT_PUBLIC_WIDGET_TENANT
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">
        {children}

        {/* Plausible Analytics — privacy-first, no cookie banner required */}
        {plausibleDomain && (
          <Script
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
            data-domain={plausibleDomain}
          />
        )}

        {/* OneClient Chat Widget — loads lazily, never blocks rendering */}
        {widgetUrl && (
          <Script
            src={widgetUrl}
            strategy="lazyOnload"
            data-tenant={widgetTenant}
            data-position="bottom-right"
          />
        )}
      </body>
    </html>
  )
}
