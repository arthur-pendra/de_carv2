import type { MetadataRoute } from 'next'
import { business } from '@/config/business'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.url
  const now = new Date()

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/start`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/privacybeleid`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
