import styles from './WhyUs.module.css';

const reasons = [
  {
    title: 'Ervaren vakmanschap',
    description: 'Ruim 5 jaar ervaring in het professioneel behandelen van uiteenlopende voertuigen, van dagelijks gebruik tot liefhebbersauto’s.',
  },
  {
    title: 'Gecertificeerd detailer',
    description: 'Werkend volgens professionele detailing standaarden, met diepgaande kennis van correctie- en beschermtechnieken.',
  },
  {
    title: 'Nauwkeurige afwerking',
    description: 'Geen standaard werk, maar gecontroleerde aandacht voor elk detail van het voertuig, binnen en buiten.',
  },
  {
    title: 'Premium producten & bescherming',
    description: 'Hoogwaardige producten en duurzame coatings voor een langdurig strak en beschermd resultaat.',
  },
  {
    title: 'Persoonlijke aanpak',
    description: 'Elke auto wordt individueel beoordeeld en behandeld op basis van conditie en jouw wensen.',
  },
];

export default function WhyUs() {
  return (
    <section id="waarom-ons" className={styles.whyUs}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Waarom GD?</span>
          <h2 className={styles.title}>
            Wij geloven dat jouw auto meer verdient dan een standaard wasbeurt.
          </h2>
        </div>

        <div className={styles.reasons}>
          {reasons.map((reason, index) => (
            <div key={index} className={styles.reason}>
              <h3 className={styles.reasonTitle}>{reason.title}</h3>
              <p className={styles.reasonDescription}>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
