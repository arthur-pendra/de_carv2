import type { Metadata } from 'next';
import { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';

export const metadata: Metadata = {
  title: 'Boek een afspraak',
  description:
    'Boek direct online je car detailing afspraak bij GD Carcare in Heerlen. Kies je dienst en pakket, met vaste prijzen voor interieur, exterieur en combi.',
  alternates: { canonical: '/start' },
  openGraph: {
    title: 'Boek een afspraak | GD Carcare',
    description:
      'Plan online je detailing afspraak in Heerlen. Vaste pakketprijzen voor interieur, exterieur en combi.',
    url: 'https://gdcarcare.nl/start',
  },
};

export default function StartPage() {
  return (
    <Suspense>
      <BookingForm />
    </Suspense>
  );
}
