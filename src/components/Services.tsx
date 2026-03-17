'use client';

import { useState } from 'react';
import styles from './Services.module.css';
import Button from './Button';

type Category = 'exterieur' | 'interieur' | 'combi';

const categories: { key: Category; label: string }[] = [
  { key: 'exterieur', label: 'Exterieur' },
  { key: 'interieur', label: 'Interieur' },
  { key: 'combi', label: 'Combi' },
];

const packages: Record<Category, {
  tag: string;
  title: string;
  price: string;
  features: string[];
  featured?: boolean;
}[]> = {
  exterieur: [
    {
      tag: 'BRONZE',
      title: 'Exterior Detail',
      price: '€120,-',
      features: [
        'Diepte reiniging velgen, banden & wielkasten',
        'Reiniging deurstijlen',
        'Voorwassen (krasloze reiniging)',
        'Volledig foambad & handwas',
        'Streep vrij glas',
        'Bandenglans aangebracht (3 maanden protectie)',
      ],
    },
    {
      tag: 'SILVER',
      title: 'Exterior Detail',
      price: '€180,-',
      features: [
        'Diepte reiniging velgen, banden & wielkasten',
        'Reiniging deurstijlen',
        'Voorwassen (krasloze reiniging)',
        'Volledig foambad & handwas',
        'Streep vrij glas',
        'Bandenglans aangebracht (3 maanden protectie)',
        'Keramische sealant (1-3 maanden lakprotectie)',
        'IJzer & tar verwijdering (verbeterd de lak en langdurigheid van de coating)',
      ],
      featured: true,
    },
    {
      tag: 'GOLD',
      title: 'Exterior Detail',
      price: '€200,-',
      features: [
        'Diepte reiniging velgen, banden & wielkasten',
        'Reiniging deurstijlen',
        'Voorwassen (krasloze reiniging)',
        'Volledig foambad & handwas',
        'Streep vrij glas',
        'Bandenglans aangebracht (3 maanden protectie)',
        'Keramische sealant (3-6 maanden lakprotectie)',
        'Volledige kleibehandeling (verbeterd de lak en langdurigheid van de coating)',
        'Dressing & protectie van alle kunststof oppervlakten',
        'Glascoating (1 jaar protectie, waterafstotend & zichtverbeterend)',
      ],
    },
  ],
  interieur: [
    {
      tag: 'BRONZE',
      title: 'Interior Detail',
      price: '€120,-',
      features: [
        'Volledige stofzuigen en stofvrij maken',
        'Dashboard, middenconsole & deurpanelen reinigen',
        'Reinigen kofferruimte',
        'Stomen interieur oppervlaktes',
        'Streep vrij glas',
      ],
    },
    {
      tag: 'SILVER',
      title: 'Interior Detail',
      price: '€200,-',
      features: [
        'Volledige stofzuigen en stofvrij maken',
        'Dashboard, middenconsole & deurpanelen reinigen',
        'Reinigen kofferruimte',
        'Stomen interieur oppervlaktes',
        'Streep vrij glas',
        'Lederen stoelen reinigen',
        'Stoffen & alcantara stoelen reinigen (shampoo-extractie)',
        'Automatten en tapijt reinigen (shampoo-extractie)',
      ],
      featured: true,
    },
    {
      tag: 'GOLD',
      title: 'Interior Detail',
      price: '€250,-',
      features: [
        'Volledige stofzuigen en stofvrij maken',
        'Dashboard, middenconsole & deurpanelen reinigen',
        'Reinigen kofferruimte',
        'Stomen interieur oppervlaktes',
        'Streep vrij glas',
        'Lederen stoelen reinigen',
        'Stoffen & alcantara stoelen reinigen (shampoo-extractie)',
        'Automatten en tapijt reinigen (shampoo-extractie)',
        'Behandelen kunststof onderdelen (UV-bescherming & nieuwe uitstraling)',
        'Reinigen dakhemel',
        '100% geur en bacterie vrij',
      ],
    },
  ],
  combi: [
    {
      tag: 'BRONZE',
      title: 'Ultimate Detail',
      price: '€200,-',
      features: [
        'Bronze exterior detail',
        'Bronze interior detail',
        'Bespaar €40 door onze combi deal',
      ],
    },
    {
      tag: 'SILVER',
      title: 'Ultimate Detail',
      price: '€320,-',
      features: [
        'Silver exterior detail',
        'Silver interior detail',
        'Bespaar €60 door onze combi deal',
      ],
      featured: true,
    },
    {
      tag: 'GOLD',
      title: 'Ultimate Detail',
      price: '€380,-',
      features: [
        'Gold exterior detail',
        'Gold interior detail',
        'Bespaar €70 door onze combi deal',
      ],
    },
  ],
};

export default function Services() {
  const [active, setActive] = useState<Category>('exterieur');

  return (
    <section id="diensten" className={styles.services}>
      <div className={styles.header}>
        <h2 className={styles.title}>Onze Pakketten</h2>
        <div className={styles.lines}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </div>

      <div className={styles.tabs}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`${styles.tab} ${active === cat.key ? styles.tabActive : ''}`}
            onClick={() => setActive(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {packages[active].map((pkg, index) => (
          <div
            key={index}
            className={`${styles.card} ${pkg.featured ? styles.featured : ''}`}
          >
            {pkg.featured && <span className={styles.badge}>Meest gekozen</span>}
            <span className={styles.tag}>{pkg.tag}</span>
            <h3 className={styles.cardTitle}>{pkg.title}</h3>
            <p className={styles.price}>{pkg.price}</p>

            <ul className={styles.features}>
              {pkg.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <Button href={`/start?dienst=${encodeURIComponent(pkg.tag + ' ' + pkg.title)}`}>Kies pakket</Button>
          </div>
        ))}
      </div>

      <p className={styles.disclaimer}>Prijs kan variëren afhankelijk van staat en grootte van voertuig</p>
    </section>
  );
}
