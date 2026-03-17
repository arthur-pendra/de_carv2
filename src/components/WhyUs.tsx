import styles from './WhyUs.module.css';

const reasons = [
  {
    title: 'Vakmanschap & Passie',
    description: 'Wij zijn geen doorsnee wasstraat. Elke auto wordt met de hand behandeld door gepassioneerde specialisten die oog hebben voor elk detail.',
  },
  {
    title: 'Persoonlijke Aanpak',
    description: 'Elke auto is uniek en verdient een behandeling op maat. We nemen de tijd om jouw wensen te begrijpen en het perfecte resultaat te leveren.',
  },
  {
    title: 'Premium Producten',
    description: 'We gebruiken alleen de beste producten van topmerken. Geen compromissen, alleen resultaten die je verwachtingen overtreffen.',
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
