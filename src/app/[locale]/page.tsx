// src/app/[locale]/page.tsx
import type { Metadata } from 'next'
import { Hero } from '@/components/sections/hero'
import { TheModel } from '@/components/sections/the-model'
import { SolutionsWork } from '@/components/sections/solutions-work'
import { About } from '@/components/sections/about'
import { SignalPreview } from '@/components/sections/signal-preview'
import { FinalCTA } from '@/components/sections/final-cta'
import { ScrollDepthTracker } from '@/components/analytics/scroll-depth-tracker'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params

  if (locale === 'pt') {
    return {
      title: 'OneClient — Infraestrutura de IA',
      description:
        'Construimos infraestrutura de IA para empresas com grandes mercados e problemas dificeis.',
      openGraph: {
        title: 'OneClient — Infraestrutura de IA',
        description:
          'Construimos infraestrutura de IA para empresas com grandes mercados e problemas dificeis.',
      },
    }
  }

  return {
    title: 'OneClient — AI Infrastructure',
    description:
      'We build AI infrastructure for companies with big markets and hard problems.',
    openGraph: {
      title: 'OneClient — AI Infrastructure',
      description:
        'We build AI infrastructure for companies with big markets and hard problems.',
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  return (
    <>
      {/* Analytics: track scroll depth for each section */}
      <ScrollDepthTracker />

      <Hero />

      <div id="model">
        <TheModel />
      </div>

      <div id="solutions">
        <SolutionsWork />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="signal">
        <SignalPreview locale={locale} />
      </div>

      <div id="final_cta">
        <FinalCTA />
      </div>
    </>
  )
}
