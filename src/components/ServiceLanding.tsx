import TransitionLink from './TransitionLink';
import styles from './ServiceLanding.module.css';
import { business } from '@/config/business';
import type { ServiceContent } from '@/data/services';

const CheckIcon = () => (
  <svg className={styles.check} viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="10" cy="10" r="10" fill="currentColor" />
    <path d="M5.8 10.3l2.6 2.6 5-5.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export default function ServiceLanding({ service }: { service: ServiceContent }) {
  const pageUrl = `${business.url}/diensten/${service.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.h1,
        description: service.metaDescription,
        url: pageUrl,
        provider: { '@id': `${business.url}/#business` },
        areaServed: business.areaServed.map((name) => ({ '@type': 'City', name })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: business.url },
          { '@type': 'ListItem', position: 2, name: 'Diensten', item: `${business.url}/#diensten` },
          { '@type': 'ListItem', position: 3, name: service.h1, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className={styles.hero}>
        <div className={styles.inner}>
          <span className={styles.eyebrow}>{service.eyebrow}</span>
          <h1 className={styles.title}>{service.h1}</h1>
          <p className={styles.intro}>{service.intro}</p>
          <div className={styles.buttons}>
            <TransitionLink href="/start" className={`${styles.btn} ${styles.btnPrimary}`}>
              Boek een afspraak
            </TransitionLink>
            <TransitionLink href="/#diensten" className={styles.btn}>
              Bekijk alle diensten
            </TransitionLink>
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.inner}>
          <ul className={styles.benefits}>
            {service.benefits.map((b, i) => (
              <li key={i}>
                <CheckIcon />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className={styles.sections}>
            {service.sections.map((s, i) => (
              <article key={i} className={styles.section}>
                <h2 className={styles.sectionHeading}>{s.heading}</h2>
                <p className={styles.sectionBody}>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
