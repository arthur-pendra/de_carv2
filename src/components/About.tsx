import styles from './About.module.css';
import Button from './Button';

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Image */}
          <div className={styles.imageWrap}>
            <img
              src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop"
              alt="Auto detailing"
              className={styles.image}
            />
          </div>

          {/* Content */}
          <div className={styles.content}>
            <span className={styles.eyebrow}>Over ons</span>
            <h2 className={styles.title}>GD Carcare</h2>
            <div className={styles.text}>
              <p>
                Bij GD Carcare bieden we een totaalpakket aan professionele auto detailing diensten. Van interieur en exterieur reiniging tot keramische sealants en kleibehandelingen.
              </p>
              <p>
                Ons doel? Jouw auto terug in absolute showroomstaat brengen. Met oog voor detail en passie voor perfectie zorgen wij voor een resultaat dat je verwachtingen overtreft.
              </p>
              <p>
                Benieuwd wat ons team voor jouw wagen kan betekenen? Neem contact op voor vrijblijvend advies of kom langs in onze studio in Limburg.
              </p>
            </div>
            <div className={styles.buttons}>
              <Button href="/#contact">Neem contact op</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
