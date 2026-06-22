import styles from './Hero.module.css';
import Button from './Button';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.frame}>
        <img
          src="/img/hero-audi.png"
          alt="Grijze Audi in GD Carcare detailgarage met hexagon-verlichting"
          className={styles.image}
        />
        <div className={styles.overlay} />

        <div className={styles.content}>
          <div className={styles.titleGroup}>
            <span className={styles.eyebrow}>Professionele autoreiniging in Heerlen</span>
            <h1 className={styles.title}>Excellence in every detail.</h1>
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
