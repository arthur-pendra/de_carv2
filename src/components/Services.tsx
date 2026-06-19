import Image from 'next/image';
import styles from './Services.module.css';
import TransitionLink from './TransitionLink';
import { categories } from '../data/packages';

export default function Services() {
  return (
    <section id="diensten" className={styles.services}>
      <div className={styles.header}>
        <h2 className={styles.title}>Onze Pakketten</h2>
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
              <span className={styles.choiceTitle}>{cat.label}</span>
              <span className={styles.choiceDesc}>{cat.description}</span>
            </span>
          </TransitionLink>
        ))}
      </div>
    </section>
  );
}
