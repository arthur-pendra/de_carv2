import { business } from '@/config/business'

// LocalBusiness structured data (JSON-LD) voor Google rich results & Maps.
export default function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'AutoWash',
    name: business.name,
    image: `${business.url}/img/hero.png`,
    url: business.url,
    email: business.email,
    telephone: business.phone,
    priceRange: business.priceRange,
    areaServed: business.areaServed,
    openingHoursSpecification: business.openingHoursSpec.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.reviews.rating,
      reviewCount: business.reviews.count,
    },
    sameAs: [business.social.instagram, business.social.facebook],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
