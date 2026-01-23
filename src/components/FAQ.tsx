'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  {
    question: 'Hoe lang duurt een detailing behandeling?',
    answer: 'Dit hangt af van de gekozen behandeling en de staat van je auto. Een premium wasbeurt duurt ongeveer 1-2 uur, terwijl een volledige detailing met polijsten en coating een hele dag in beslag kan nemen.',
  },
  {
    question: 'Moet ik een afspraak maken?',
    answer: 'Ja, we werken uitsluitend op afspraak om voldoende tijd en aandacht aan elke auto te kunnen besteden. Je kunt eenvoudig online of telefonisch een afspraak inplannen.',
  },
  {
    question: 'Wat is het verschil tussen waxen en een keramische coating?',
    answer: 'Wax biedt tijdelijke bescherming (enkele weken tot maanden) en een mooie glans. Een keramische coating is een semi-permanente bescherming die 3-5 jaar meegaat, beter beschermt tegen krassen en chemicaliën, en je auto makkelijker te reinigen maakt.',
  },
  {
    question: 'Kunnen jullie diepe krassen verwijderen?',
    answer: 'Met professioneel polijsten kunnen we de meeste lichte tot matige krassen en swirls verwijderen. Zeer diepe krassen die door de lak heen gaan, vereisen mogelijk een spuitwerk reparatie.',
  },
  {
    question: 'Bieden jullie een ophaal- en brengservice?',
    answer: 'Ja, binnen een straal van 15 kilometer bieden we een gratis ophaal- en brengservice aan. Voor grotere afstanden kunnen we een maatwerkoplossing bespreken.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faq}>
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
