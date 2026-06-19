import styles from './AboutCompany.module.css';
import Button from './Button';

export default function AboutCompany() {
  return (
    <section id="over-ons" className={styles.about}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Over het bedrijf</span>
        <h2 className={styles.title}>GD Carcare</h2>
        <div className={styles.text}>
          <p>
            Bij GD Carcare bieden we een totaalpakket aan professionele auto detailing diensten. Van een grondige reiniging en lakcorrectie tot het polijsten en beschermen van je wagen met een keramische coating. Altijd met hetzelfde doel: jouw auto terug in absolute showroomstaat brengen.
          </p>
          <p>
            Benieuwd wat ons team voor jouw wagen kan betekenen? Neem vrijblijvend contact op voor advies of een afspraak op maat. Samen kijken we naar de beste aanpak voor jouw voertuig.
          </p>
        </div>
        <div className={styles.buttons}>
          <Button href="/#contact">Neem contact op</Button>
        </div>
      </div>
    </section>
  );
}
