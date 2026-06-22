import type { MetadataRoute } from 'next'
import { business } from '@/config/business'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/stylesheet'],
    },
    sitemap: `${business.url}/sitemap.xml`,
    host: business.url,
  }
}
