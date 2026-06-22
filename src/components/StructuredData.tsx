import { business } from '@/config/business'

// LocalBusiness + WebSite structured data (JSON-LD) voor Google rich results, Maps en AI search.
export default function StructuredData() {
  const businessId = `${business.url}/#business`

  const localBusiness = {
    '@type': 'AutoWash',
    '@id': businessId,
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    image: [`${business.url}/img/hero-audi.webp`],
    url: business.url,
    email: business.email,
    telephone: business.phone,
    priceRange: business.priceRange,
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Pin, iDEAL',
    knowsLanguage: 'nl',
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    areaServed: business.areaServed.map((name) => ({ '@type': 'City', name })),
    openingHoursSpecification: business.openingHoursSpec.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Car detailing diensten',
      itemListElement: business.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service },
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.reviews.rating,
      reviewCount: business.reviews.count,
    },
    sameAs: [business.social.instagram, business.social.facebook],
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${business.url}/#website`,
    url: business.url,
    name: business.name,
    inLanguage: 'nl',
    publisher: { '@id': businessId },
  }

  const data = {
    '@context': 'https://schema.org',
    '@graph': [localBusiness, website],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
