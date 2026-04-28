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
              src="/img/cars/car-09.jpg"
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
                Bij GD Carcare draait alles om kwaliteit, precisie en aandacht voor detail. Met ruim 5 jaar ervaring richten wij ons op het verfijnen, herstellen en beschermen van voertuigen op hoog niveau.
              </p>
              <p>
                Wij zijn gespecialiseerd in interieur- en exterieur detailing, lakcorrectie en keramische coatings. Elke auto wordt zorgvuldig behandeld, afgestemd op de staat van het voertuig en het gewenste eindresultaat.
              </p>
              <p>
                Het doel is altijd hetzelfde: een strak, verzorgd en duurzaam resultaat dat direct zichtbaar én voelbaar is.
              </p>
            </div>
            <div className={styles.buttons}>
              <Button href="/#contact">Neem contact op</Button>
            </div>
          </div>
        </div>

        <div className={`${styles.grid} ${styles.gridReverse}`}>
          {/* Content */}
          <div className={styles.content}>
            <span className={styles.eyebrow}>Over de detailer</span>
            <h2 className={styles.title}>Guyliamo</h2>
            <div className={styles.text}>
              <p>
                Mijn naam is Guyliamo, oprichter van GD Carcare. Ik ben al ruim 5 jaar actief in auto detailing en werk als gecertificeerd detailer aan het professioneel reinigen, herstellen en beschermen van voertuigen.
              </p>
              <p>
                In die jaren heb ik mij gespecialiseerd in interieur- en exterieur detailing, lakcorrectie en het aanbrengen van keramische coatings, van het grondig reinigen van interieurs tot het wegpolijsten van krassen en swirls en het opbouwen van duurzame lakbescherming.
              </p>
              <p>
                Wat mij onderscheidt is een gestructureerde en zorgvuldige werkwijze. Elke auto wordt stap voor stap behandeld, met aandacht voor de staat van het voertuig en het gewenste eindresultaat. Het doel blijft altijd hetzelfde: een strak, schoon en goed beschermd voertuig waar de klant direct verschil in ziet.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className={styles.imageWrap}>
            <img
              src="/img/cars/car-12.jpg"
              alt="Guyliamo aan het werk"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
