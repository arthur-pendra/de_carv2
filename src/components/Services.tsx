import styles from './Services.module.css';
import Button from './Button';

const services = [
  {
    tag: 'POPULAIR',
    title: 'Interieur Reiniging',
    price: 'Vanaf €75',
    description: 'Complete reiniging van het interieur inclusief stoelen, dashboard, panelen en vloermatten.',
    features: [
      'Stofzuigen & uitkloppen',
      'Leer- of stofbehandeling',
      'Dashboard & panelen',
      'Ramen binnenzijde',
    ],
  },
  {
    tag: 'PREMIUM',
    title: 'Polijsten',
    price: 'Vanaf €150',
    description: 'Verwijder krassen, swirls en oxidatie voor een diep glanzende lak.',
    features: [
      'Lakdecontaminatie',
      'Machine polijsten',
      'Krasverwijdering',
      'Hoogglans finish',
    ],
    featured: true,
  },
  {
    tag: 'BESCHERMING',
    title: 'Keramische Coating',
    price: 'Vanaf €350',
    description: 'Langdurige bescherming met een professionele keramische coating.',
    features: [
      '3-5 jaar bescherming',
      'Waterafstotend effect',
      'UV-bescherming',
      'Makkelijker te reinigen',
    ],
  },
  {
    tag: 'BASIS',
    title: 'Premium Wasbeurt',
    price: 'Vanaf €45',
    description: 'Grondige handwas met premium producten voor een showroom resultaat.',
    features: [
      'Handwas methode',
      'Velgen & banden',
      'Ramen & spiegels',
      'Bandenzwart',
    ],
  },
];

export default function Services() {
  return (
    <section className={styles.services}>
      <div className={styles.header}>
        <h2 className={styles.title}>Onze Diensten</h2>
        <div className={styles.lines}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </div>

      <div className={styles.grid}>
        {services.map((service, index) => (
          <div
            key={index}
            className={`${styles.card} ${service.featured ? styles.featured : ''}`}
          >
            <span className={styles.tag}>{service.tag}</span>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.price}>{service.price}</p>
            <p className={styles.description}>{service.description}</p>

            <ul className={styles.features}>
              {service.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <Button>Meer info</Button>
          </div>
        ))}
      </div>
    </section>
  );
}
