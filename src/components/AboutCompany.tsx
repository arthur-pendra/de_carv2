import styles from './AboutCompany.module.css';
import Button from './Button';

export default function AboutCompany() {
  return (
    <section id="over-ons" className={styles.about}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Over ons</span>
        <h2 className={styles.title}>Ontstaan uit passie</h2>
        <div className={styles.text}>
          <p>
            Bij GD Carcare geloven we dat een auto meer is dan alleen een middel om van A naar B te komen. Het is een weerspiegeling van wie je bent. Daarom verdient jouw voertuig een verzorging die verder gaat dan een standaard wasbeurt. Met oog voor detail, hoogwaardige producten en passie voor het vak zorgen wij ervoor dat elke wagen de behandeling krijgt die hij verdient.
          </p>
          <p>
            GD Carcare is ontstaan uit een liefde voor auto&apos;s en een streven naar perfectie. Vandaag combineren we die passie met professioneel vakmanschap om voertuigen te reinigen, beschermen en verfijnen tot in het kleinste detail.
          </p>
          <p>
            Want perfectie zit niet in het grote geheel, maar in de details. Excellence in Every Detail.
          </p>
        </div>
        <div className={styles.buttons}>
          <Button href="/about">Leer ons Kennen</Button>
        </div>
      </div>
    </section>
  );
}
