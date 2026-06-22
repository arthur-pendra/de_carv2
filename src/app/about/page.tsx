import type { Metadata } from 'next';
import About from '@/components/About';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Over ons',
  description:
    'Maak kennis met GD Carcare uit Heerlen. Gecertificeerd detailer met ruim 5 jaar ervaring in interieur- en exterieurdetailing, lakcorrectie en keramische coatings.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'Over ons | GD Carcare',
    description:
      'Gecertificeerd car detailing in Heerlen. Vakmanschap, premium producten en passie voor elk voertuig.',
    url: 'https://gdcarcare.nl/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <main>
        <About />
      </main>
      <Footer />
    </>
  );
}
