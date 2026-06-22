import type { MetadataRoute } from 'next'
import { business } from '@/config/business'
import { services } from '@/data/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.url
  const now = new Date()

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/diensten/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/start`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...servicePages,
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/privacybeleid`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
