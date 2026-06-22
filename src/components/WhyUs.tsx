import styles from './WhyUs.module.css';

const CertificateIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const CheckIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3h12l4 6-10 13L2 9Z" />
    <path d="M11 3 8 9l4 13 4-13-3-6" />
    <path d="M2 9h20" />
  </svg>
);

const HeartIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const ShineIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
  </svg>
);

const reasons = [
  {
    icon: CertificateIcon,
    title: 'Ervaren vakmanschap',
    description: '5+ jaar ervaring in het professioneel behandelen van voertuigen.',
  },
  {
    icon: CheckIcon,
    title: 'Premium producten',
    description: 'Hoogwaardige producten voor optimale prestaties en bescherming.',
  },
  {
    icon: HeartIcon,
    title: 'Passie gedreven',
    description: "Gedetailleerd werk uitgevoerd door liefhebbers van auto's.",
  },
  {
    icon: ShineIcon,
    title: 'Showroomwaardige resultaten',
    description: 'Professionele bescherming en afwerking die lang zichtbaar blijven.',
  },
];

export default function WhyUs() {
  return (
    <section id="waarom-ons" className={styles.whyUs}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Waarom GD?</span>
          <h2 className={styles.title}>Waarom kiezen voor GD Carcare</h2>
        </div>

        <div className={styles.reasons}>
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className={styles.reason}>
                <div className={styles.reasonHead}>
                  <Icon />
                  <h3 className={styles.reasonTitle}>{reason.title}</h3>
                </div>
                <p className={styles.reasonDescription}>{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
