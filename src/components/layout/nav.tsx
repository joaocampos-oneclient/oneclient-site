// src/components/layout/nav.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useScrollPosition } from '@/hooks/use-scroll-position'
import { LanguageSwitcher } from '@/components/i18n/language-switcher'
import { ChatWidgetTrigger } from '@/components/widget/chat-widget-trigger'
import { NAV_SCROLL_THRESHOLD } from '@/lib/constants'

interface NavProps {
  locale: string
}

export function Nav({ locale }: NavProps) {
  const t = useTranslations('nav')
  const isScrolled = useScrollPosition(NAV_SCROLL_THRESHOLD)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev)
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 h-16
          transition-all duration-300 ease-out-smooth
          ${
            isScrolled
              ? 'bg-background-surface/80 backdrop-blur-nav border-b border-border'
              : 'bg-transparent border-b border-transparent'
          }
        `}
      >
        <nav className="mx-auto flex h-full max-w-page items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" onClick={closeMobileMenu} className="relative z-50">
            <Image
              src="/logo/oneclient-wordmark.svg"
              alt="OneClient"
              width={140}
              height={24}
              priority
            />
          </Link>

          {/* Desktop nav items */}
          <div className="hidden md:flex items-center gap-8">
            {/* Signal link */}
            <Link
              href="/signal"
              className="text-body text-text-muted hover:text-text-primary transition-colors duration-150"
            >
              {t('signal')}
            </Link>

            {/* About link (scrolls to #about section on landing page) */}
            <Link
              href="/#about"
              className="text-body text-text-muted hover:text-text-primary transition-colors duration-150"
            >
              {t('about')}
            </Link>

            {/* Real LanguageSwitcher — replaces S002 placeholder */}
            <LanguageSwitcher locale={locale} />

            {/* CTA button — triggers chat widget */}
            <ChatWidgetTrigger location="nav">
              <button
                type="button"
                className="
                  text-body font-medium text-text-primary
                  border border-accent bg-transparent
                  px-6 py-3 rounded-button
                  hover:bg-accent-glow hover:border-accent-hover
                  active:scale-[0.98]
                  transition-all duration-200 ease-out-expo
                "
              >
                {t('cta')}
              </button>
            </ChatWidgetTrigger>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="relative z-50 flex md:hidden flex-col items-center justify-center w-10 h-10 gap-1.5"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`
                block h-0.5 w-6 bg-text-primary rounded-full
                transition-all duration-300 ease-out-expo
                ${isMobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}
              `}
            />
            <span
              className={`
                block h-0.5 w-6 bg-text-primary rounded-full
                transition-all duration-300 ease-out-expo
                ${isMobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}
              `}
            />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay menu */}
      <div
        className={`
          fixed inset-0 z-40 bg-background-base
          flex flex-col items-center justify-center gap-8
          transition-all duration-300 ease-out-expo
          md:hidden
          ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
      >
        <Link
          href="/signal"
          onClick={closeMobileMenu}
          className="text-heading-2-mobile text-text-primary hover:text-text-accent transition-colors duration-150"
        >
          {t('signal')}
        </Link>

        <Link
          href="/#about"
          onClick={closeMobileMenu}
          className="text-heading-2-mobile text-text-primary hover:text-text-accent transition-colors duration-150"
        >
          {t('about')}
        </Link>

        {/* Real LanguageSwitcher — mobile version */}
        <LanguageSwitcher locale={locale} />

        {/* CTA button — triggers chat widget (mobile) */}
        <ChatWidgetTrigger location="nav">
          <button
            type="button"
            className="
              text-body font-medium text-text-primary
              border border-accent bg-transparent
              px-6 py-3 rounded-button
              hover:bg-accent-glow hover:border-accent-hover
              active:scale-[0.98]
              transition-all duration-200 ease-out-expo
            "
          >
            {t('cta')}
          </button>
        </ChatWidgetTrigger>
      </div>
    </>
  )
}
