import type { MetadataRoute } from 'next'
import { getPostSlugs } from '@/lib/mdx'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://1-client.com'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/pt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/signal`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pt/signal`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Blog post pages — both locales
  const enSlugs = getPostSlugs('en')
  const ptSlugs = getPostSlugs('pt')

  const enPostPages: MetadataRoute.Sitemap = enSlugs.map((slug) => ({
    url: `${BASE_URL}/signal/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const ptPostPages: MetadataRoute.Sitemap = ptSlugs.map((slug) => ({
    url: `${BASE_URL}/pt/signal/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...enPostPages, ...ptPostPages]
}
