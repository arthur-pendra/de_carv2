import styles from './Hero.module.css';
import Button from './Button';
import CircleGallery from './CircleGallery';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Car Cleaning & Detailing</h1>
        <p className={styles.subtitle}>
          Professionele autoreiniging en detailing in Limburg. Wij zorgen voor een showroom-waardige afwerking.
        </p>
        <div className={styles.buttons}>
          <Button>Onze diensten</Button>
          <Button>Contact</Button>
        </div>
      </div>

      <div className={styles.circleContainer}>
        <CircleGallery />
        <div className={styles.centerText}>
          <p>
            GD Carcare is gespecialiseerd in professionele autodetailing.
            Van interieurreiniging tot complete polijstbehandelingen -
            wij brengen uw auto terug naar showroom conditie.
          </p>
          <a href="#diensten" className={styles.ctaBtn}>Bekijk onze diensten</a>
        </div>
        <div className={styles.fadeBottom} />
      </div>
    </section>
  );
}
