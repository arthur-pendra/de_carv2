// Centrale bedrijfsgegevens (NAP) — gebruikt voor SEO, structured data, contact en footer.
// TODO: vervang de placeholder-waarden hieronder door de echte gegevens vóór livegang.

export const business = {
  name: 'GD Carcare',
  legalName: 'GD Carcare',
  url: 'https://gdcarcare.nl',
  email: 'info@gdcarcare.nl',
  // TODO: echt telefoonnummer (internationaal formaat voor tel: en WhatsApp)
  phone: '+31 6 00000000',
  phoneHref: 'tel:+31600000000',
  whatsappHref: 'https://wa.me/31600000000',
  // Mobiele service zonder vaste locatie; we werken in onderstaand gebied.
  // Structured-data openingsuren (wanneer we bereikbaar zijn / werken)
  openingHoursSpec: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { days: ['Saturday'], opens: '09:00', closes: '16:00' },
  ],
  priceRange: '€€',
  areaServed: ['Heerlen', 'Limburg', 'Parkstad'],
  social: {
    instagram: 'https://www.instagram.com/gdcarcare/',
    facebook: 'https://facebook.com',
  },
  // TODO: link naar jullie Google Bedrijfsprofiel + echte cijfers
  reviews: {
    googleUrl: 'https://www.google.com/maps',
    rating: 4.9,
    count: 50,
  },
} as const
