import styles from './Hero.module.css';
import Button from './Button';
import CopyEmailButton from './CopyEmailButton';
import CircleGallery from './CircleGallery';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Excellence in every detail.</h1>
        <p className={styles.subtitle}>
          Van grondige interieur- en exterieurreiniging tot lakcorrectie en keramische coatings. Wij brengen jouw auto terug naar absolute perfectie.
        </p>
        <div className={styles.buttons}>
          <Button href="/#contact">Plan jouw detailing</Button>
          <CopyEmailButton />
        </div>
      </div>

      <div className={styles.circleContainer}>
        <CircleGallery />
        <div className={styles.centerText}>
          <p>
            Bij GD Carcare draait alles om kwaliteit, precisie en aandacht voor detail. Met ruim 5 jaar ervaring als gecertificeerd detailer brengen wij elk voertuig terug naar topconditie.
          </p>
          <a href="/#diensten" className={styles.ctaBtn}>Bekijk onze diensten</a>
        </div>
        <div className={styles.fadeBottom} />
      </div>
    </section>
  );
}
