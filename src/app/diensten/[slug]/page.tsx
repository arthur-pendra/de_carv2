import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceLanding from '@/components/ServiceLanding';
import Footer from '@/components/Footer';
import { services, getService } from '@/data/services';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/diensten/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://gdcarcare.nl/diensten/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <ServiceLanding service={service} />
      <Footer />
    </>
  );
}
