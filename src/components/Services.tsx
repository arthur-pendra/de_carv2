import Image from 'next/image';
import styles from './Services.module.css';
import TransitionLink from './TransitionLink';
import { categories } from '../data/packages';

export default function Services() {
  return (
    <section id="diensten" className={styles.services}>
      <div className={styles.header}>
        <h2 className={styles.title}>Onze Diensten</h2>
        <div className={styles.lines}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </div>

      <div className={styles.choiceGrid}>
        {categories.map((cat) => (
          <TransitionLink
            key={cat.key}
            href={`/start?categorie=${cat.key}`}
            className={styles.choiceCard}
          >
            <Image
              src={cat.image}
              alt={cat.label}
              fill
              sizes="(max-width: 767px) 100vw, 23em"
              className={styles.choiceImage}
            />
            <span className={styles.choiceOverlay} />
            <span className={styles.choiceContent}>
              <span className={styles.choiceTop}>
                <span className={styles.choiceTag}>Detailing</span>
              </span>
              <span className={styles.choiceBottom}>
                <span className={styles.choiceLogo} aria-hidden="true">
                  <svg viewBox="0 0 61 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.7908 15.2469L23.0135 36.9629L18.265 37C6.26546 36.5468 -2.67899 25.1359 0.733173 13.3978C2.90461 5.92923 9.84353 0.54061 17.6358 0.0713348H34.4703L30.3228 6.60972L18.5455 6.64189C10.6161 6.88037 4.95866 14.5049 7.40566 22.1371C8.95709 26.9767 13.9158 30.6155 19.0769 30.3196L24.2774 22.0308H14.928L17.8095 17.473C18.6853 16.0875 20.2143 15.2469 21.8592 15.2469H36.7908Z" fill="currentColor" />
                    <path d="M30.3939 12.3089C32.9829 8.22945 35.5719 4.15004 38.1609 0.0713358L38.369 0.0671396C43.7241 -0.210509 48.5056 0.281146 52.9814 3.37095C67.8764 13.653 60.6183 36.2859 42.7343 37.0007L26.7392 36.9972L30.9562 30.3882L43.0155 30.3567C50.469 29.7818 55.7025 22.7413 53.7827 15.442C52.4914 10.5332 47.7851 6.78246 42.6626 6.64119C42.4567 6.63559 42.3477 6.64818 42.2669 6.69504C42.0848 6.80064 42.0089 6.98667 41.9913 7.02794C41.8894 7.27062 41.166 8.40849 40.0392 10.1261C39.1605 11.4654 37.6632 12.276 36.0555 12.2837C34.1688 12.2921 32.2813 12.3005 30.3946 12.3096L30.3939 12.3089Z" fill="currentColor" />
                  </svg>
                </span>
                <span className={styles.choiceTitle}>{cat.label}</span>
                <span className={styles.choiceDesc}>{cat.description}</span>
              </span>
            </span>
          </TransitionLink>
        ))}
      </div>
    </section>
  );
}
