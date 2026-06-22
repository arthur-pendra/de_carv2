import styles from './Hero.module.css';
import Button from './Button';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.frame}>
        <img
          src="/img/hero-audi.webp"
          alt="Grijze Audi in GD Carcare detailgarage met hexagon-verlichting"
          className={styles.image}
        />
        <div className={styles.overlay} />

        <div className={styles.content}>
          <div className={styles.titleGroup}>
            <h1 className={styles.eyebrow}>Car detailing in Heerlen, Parkstad &amp; Limburg</h1>
            <p className={styles.title}>Excellence in every detail.</p>
          </div>
          <p className={styles.subtitle}>
            Detailing, Lakcorrectie &amp; Keramische coatings
          </p>
          <div className={styles.buttons}>
            <Button href="/#diensten">Onze Diensten</Button>
            <Button href="/start">Boek een afspraak</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
