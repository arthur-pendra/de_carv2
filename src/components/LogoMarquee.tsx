import styles from './LogoMarquee.module.css';

const brands = [
  'Gyeon',
  'Koch Chemie',
  'Sonax',
  'Meguiars',
  'Auto Finesse',
  'Gtechniq',
  'CarPro',
  'Soft99',
];

export default function LogoMarquee() {
  return (
    <section className={styles.logoMarquee}>
      <div className={styles.divider}>
        <div className={styles.line}></div>
        <div className={styles.tag}>
          <span>Premium</span>
          <span>Producten</span>
        </div>
        <div className={styles.line}></div>
      </div>

      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div key={index} className={styles.brand}>
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
