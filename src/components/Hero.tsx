import styles from './Hero.module.css';
import Button from './Button';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.frame}>
        <img
          src="/img/hero.png"
          alt="GD Carcare detailing"
          className={styles.image}
        />
        <div className={styles.overlay} />

        <div className={styles.content}>
          <div className={styles.titleGroup}>
            <span className={styles.eyebrow}>Professionele autoreiniging</span>
            <h1 className={styles.title}>Excellence in every detail.</h1>
          </div>
          <p className={styles.subtitle}>
            Van grondige interieur- en exterieurreiniging tot lakcorrectie en keramische coatings. Wij brengen jouw auto terug naar absolute perfectie.
          </p>
          <div className={styles.buttons}>
            <Button href="/#diensten">Bekijk onze pakketten</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
