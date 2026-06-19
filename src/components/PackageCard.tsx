'use client';

import { useState, type ReactNode } from 'react';
import styles from './PackageCard.module.css';
import { formatPrice, type Package } from '../data/packages';

const CheckIcon = () => (
  <svg className={styles.featCheck} viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="10" cy="10" r="10" fill="currentColor" />
    <path d="M5.8 10.3l2.6 2.6 5-5.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const PlusIcon = () => (
  <svg className={styles.featIcon} viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="10" cy="10" r="10" fill="currentColor" />
    <path d="M10 5.5v9M5.5 10h9" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

type Props = {
  pkg: Package;
  featured?: boolean;
  children: ReactNode;
  detailsOpen?: boolean;
  onToggleDetails?: () => void;
};

export default function PackageCard({ pkg, featured, children, detailsOpen, onToggleDetails }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = detailsOpen ?? internalOpen;
  const toggleDetails = onToggleDetails ?? (() => setInternalOpen((o) => !o));

  return (
    <div className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <div className={styles.inner}>
        {featured && <span className={styles.badge}>Meest gekozen</span>}
        <h3 className={styles.title}>{pkg.title}</h3>
        <p className={styles.subtitle}>{pkg.subtitle}</p>

        <ul className={styles.features}>
          {pkg.features.map((f, i) => (
            <li key={`f-${i}`}>
              <CheckIcon />
              <span>{f}</span>
            </li>
          ))}
          {pkg.extras.map((f, i) => (
            <li key={`e-${i}`} className={styles.extra}>
              <PlusIcon />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {pkg.details && pkg.details.length > 0 && (
          <div className={styles.details}>
            <button
              type="button"
              className={styles.detailsToggle}
              onClick={toggleDetails}
              aria-expanded={open}
            >
              {open ? 'Verberg details' : 'Bekijk wat erbij zit'}
              <ChevronIcon open={open} />
            </button>

            {open && (
              <div className={styles.detailsContent}>
                {pkg.details.map((group) => (
                  <div key={group.heading} className={styles.detailsGroup}>
                    <span className={styles.detailsHeading}>{group.heading}</span>
                    <ul className={styles.detailsList}>
                      {group.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className={styles.priceWrap}>
          <span className={styles.priceLabel}>Vanaf</span>
          <span className={styles.price}>{formatPrice(pkg.prices.klein)}</span>
          <span className={styles.priceNote}>afhankelijk van voertuiggrootte</span>
        </div>

        {children}
      </div>
    </div>
  );
}
