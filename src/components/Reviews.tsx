'use client';

import { useEffect, useRef } from 'react';
import styles from './Reviews.module.css';

const reviews = [
  {
    text: 'Mijn auto zag eruit alsof hij net van de showroom kwam. Ongelooflijk resultaat!',
    name: 'Thomas van den Berg',
    avatar: 'T',
  },
  {
    text: 'De keramische coating is het meer dan waard. Na 6 maanden ziet mijn auto er nog steeds fantastisch uit.',
    name: 'Lisa de Vries',
    avatar: 'L',
  },
  {
    text: 'Eindelijk iemand die weet hoe je een auto echt schoon krijgt. Het interieur ruikt weer als nieuw!',
    name: 'Mark Jansen',
    avatar: 'M',
  },
  {
    text: 'Top service, flexibele tijden en een prachtig eindresultaat. Ik kom zeker terug!',
    name: 'Sophie Bakker',
    avatar: 'S',
  },
  {
    text: 'De swirls in mijn lak zijn volledig verdwenen na het polijsten. Echt vakwerk!',
    name: 'Dennis Visser',
    avatar: 'D',
  },
  {
    text: 'Zeer tevreden met de ophaalservice. Makkelijk en het resultaat was perfect.',
    name: 'Emma Mulder',
    avatar: 'E',
  },
  {
    text: 'Professionele aanpak en perfecte communicatie. Aanrader!',
    name: 'Pieter de Groot',
    avatar: 'P',
  },
  {
    text: 'Beste detailer in de regio. Mijn Mercedes ziet er weer als nieuw uit.',
    name: 'Anna Smit',
    avatar: 'A',
  },
  {
    text: 'Super blij met het resultaat. Mijn BMW glimt als nooit tevoren!',
    name: 'Ruben Hendriks',
    avatar: 'R',
  },
  {
    text: 'Snelle service en oog voor detail. Zeker een aanrader voor iedereen.',
    name: 'Julia van Dijk',
    avatar: 'J',
  },
  {
    text: 'Mijn velgen zien er weer uit als nieuw. Geweldig werk!',
    name: 'Kevin Bos',
    avatar: 'K',
  },
  {
    text: 'Na de behandeling reed ik weg met een glimlach. Fantastische service!',
    name: 'Nathalie Prins',
    avatar: 'N',
  },
  {
    text: 'Uitstekende prijs-kwaliteit verhouding. Mijn Audi ziet er perfect uit!',
    name: 'Bas Vermeulen',
    avatar: 'B',
  },
  {
    text: 'De glascoating is echt een aanrader. Regen parelt er zo vanaf!',
    name: 'Iris van Leeuwen',
    avatar: 'I',
  },
  {
    text: 'Heel tevreden met de interieurreiniging. Voelt weer als nieuw!',
    name: 'Stefan de Wit',
    avatar: 'S',
  },
  {
    text: 'Perfecte service van begin tot eind. Absolute vakman!',
    name: 'Fleur Janssen',
    avatar: 'F',
  },
];

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!container || !section || !wrap) return;

    const cards = container.querySelectorAll(`.${styles.card}`) as NodeListOf<HTMLElement>;
    const totalCards = cards.length;
    const radius = 1600;
    const angleStep = 360 / totalCards;

    let animationId: number;

    const updatePositions = () => {
      // Apply velocity with decay
      if (!isDragging.current) {
        angleRef.current += velocityRef.current;
        velocityRef.current *= 0.96;

        // Snap to nearest card when velocity is low
        if (Math.abs(velocityRef.current) < 0.2) {
          const normalizedAngle = ((angleRef.current % 360) + 360) % 360;
          const nearestCardIndex = Math.round(normalizedAngle / angleStep);
          const targetAngle = nearestCardIndex * angleStep;

          // Smooth snap with easing
          const diff = targetAngle - normalizedAngle;
          const shortestDiff = ((diff + 180) % 360) - 180;
          angleRef.current += shortestDiff * 0.04;
        }
      }

      cards.forEach((card, index) => {
        const angle = (angleRef.current + index * angleStep) * (Math.PI / 180);

        // Position on arc (bottom arc - smile shape)
        const x = Math.sin(angle) * radius;
        const y = (1 - Math.cos(angle)) * radius - 250;

        // Rotation follows curve
        const rotation = angle * (180 / Math.PI);

        // Z-index based on position (front cards on top)
        const zIndex = Math.round((1 - Math.cos(angle)) * 50);

        card.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        card.style.zIndex = `${zIndex}`;
      });

      animationId = requestAnimationFrame(updatePositions);
    };

    updatePositions();

    // Drag handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastX.current = e.clientX;
      velocityRef.current = 0;
      wrap.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - lastX.current;
      angleRef.current += deltaX * 0.15;
      velocityRef.current = deltaX * 0.08;
      lastX.current = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      wrap.style.cursor = 'grab';
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      lastX.current = e.touches[0].clientX;
      velocityRef.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.touches[0].clientX - lastX.current;
      angleRef.current += deltaX * 0.15;
      velocityRef.current = deltaX * 0.08;
      lastX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    wrap.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    wrap.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationId);
      wrap.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      wrap.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section className={styles.reviews} ref={sectionRef}>
      <div className={styles.stickyWrap}>
        <div className={styles.header}>
          <span className={styles.label}>Ervaringen</span>
          <h2 className={styles.title}>Wat klanten zeggen</h2>
        </div>

        <div className={styles.circleWrap} ref={wrapRef}>
          <div className={styles.circle} ref={containerRef}>
            {reviews.map((review, index) => (
              <div key={index} className={styles.card}>
                <p className={styles.cardText}>{review.text}</p>
                <div className={styles.cardAuthor}>
                  <span className={styles.cardAvatar}>{review.avatar}</span>
                  <span className={styles.cardName}>{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>Ben jij ook klant geweest bij GD Carcare?</p>
          <a href="#" className="btn">Laat een review achter</a>
        </div>
      </div>
    </section>
  );
}
