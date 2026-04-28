'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  {
    question: 'Waarom kiezen voor een detailer in plaats van een wasstraat?',
    answer: 'Een wasstraat reinigt oppervlakkig en kan op termijn kleine krasjes (swirls) veroorzaken in de lak. Een detailer pakt de auto handmatig en zorgvuldig aan, waardoor vuil écht wordt verwijderd en de lak in betere staat blijft of zelfs wordt hersteld. Het resultaat is een schonere, gladdere en beter beschermde auto.',
  },
  {
    question: 'Hoe lang duurt een detailing behandeling?',
    answer: 'Dit hangt af van de staat van de auto en de gekozen behandeling. Een standaard interieur- of exterieurbehandeling duurt enkele uren, terwijl polijsten of een keramische coating vaak één of meerdere dagen in beslag neemt.',
  },
  {
    question: 'Is detailing geschikt voor elke auto?',
    answer: 'Ja. Elke auto kan baat hebben bij detailing, of het nu gaat om een dagelijkse auto of een liefhebbersauto. De behandeling wordt altijd aangepast aan de staat van het voertuig.',
  },
  {
    question: 'Wat is polijsten?',
    answer: 'Polijsten is een proces waarbij een dun laagje van de blanke lak gecontroleerd wordt bewerkt om oneffenheden, krassen en waas te verwijderen. Dit zorgt voor een gladdere en glanzendere lak.',
  },
  {
    question: 'Wat is een keramische coating?',
    answer: 'Een keramische coating is een beschermlaag die zich hecht aan de lak. Deze laag beschermt tegen vuil, UV-straling, chemicaliën en weersinvloeden, en zorgt ervoor dat de auto langer schoon blijft en makkelijker te onderhouden is.',
  },
  {
    question: 'Hoelang gaat een keramische coating mee?',
    answer: 'Afhankelijk van het type coating en het onderhoud kan een coating meerdere jaren meegaan. Regelmatig en correct onderhoud verlengt de levensduur aanzienlijk.',
  },
  {
    question: 'Waarom kost detailing meer dan een wasstraat?',
    answer: 'Detailing is volledig handwerk en veel intensiever. Er wordt dieper gereinigd, lak hersteld en langdurige bescherming aangebracht. Je betaalt niet alleen voor schoonmaak, maar voor tijd, expertise en een blijvend resultaat.',
  },
  {
    question: 'Hoe vaak moet ik mijn auto laten reinigen of detailen?',
    answer: 'Voor optimaal onderhoud is een reiniging (interieur en exterieur) elke 2 weken aan te raden, en een grondigere detailingbeurt ongeveer elk kwartaal. Polijsten en een keramische coating zijn een periodieke upgrade die langdurige bescherming biedt, mits goed onderhouden.',
  },
  {
    question: 'Wat is chemische decontaminatie en een klei behandeling?',
    answer: 'Chemische decontaminatie verwijdert vastzittende vervuiling zoals remstof, vliegroest en industriële neerslag veilig van de lak met speciale producten. Een klei behandeling (clay bar) verwijdert vervolgens de laatste ingesleten vervuiling, zodat de lak volledig schoon en vrij van contaminatie is. Dit type vervuiling kan niet worden verwijderd met een normale handwas.',
  },
  {
    question: 'Hoe kan ik een afspraak maken?',
    answer: 'Je kunt eenvoudig een afspraak maken via telefoon, WhatsApp of het contactformulier op de website. We bespreken kort de staat van je auto en welke behandeling het beste past, waarna we samen een geschikt moment inplannen.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Vragen?<br />
            Wij hebben antwoorden.
          </h2>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.item} ${activeIndex === index ? styles.active : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className={styles.icon}>
                  <span className={styles.iconLine}></span>
                  <span className={styles.iconLine}></span>
                </span>
              </button>
              <div className={styles.answerWrap}>
                <div className={styles.answer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
