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
];

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const cards = container.querySelectorAll(`.${styles.card}`) as NodeListOf<HTMLElement>;
    const totalCards = cards.length;
    const radius = 700;
    const angleStep = 360 / totalCards;

    let animationId: number;

    const updatePositions = () => {
      // Apply velocity with decay
      if (!isDragging.current) {
        angleRef.current += velocityRef.current;
        velocityRef.current *= 0.96;

        // Auto rotate when velocity is very low
        if (Math.abs(velocityRef.current) < 0.05) {
          angleRef.current += 0.04;
        }
      }

      cards.forEach((card, index) => {
        const angle = (angleRef.current + index * angleStep) * (Math.PI / 180);

        // Position on arc (bottom arc - smile shape)
        const x = Math.sin(angle) * radius;
        const y = (1 - Math.cos(angle)) * radius - 600;

        // Rotation follows curve
        const rotation = angle * (180 / Math.PI);

        // Z-index based on position (front cards on top)
        const zIndex = Math.round((1 - Math.cos(angle)) * 50);

        // Opacity based on position
        const opacity = 0.3 + (1 - Math.cos(angle)) * 0.35;

        card.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        card.style.zIndex = `${zIndex}`;
        card.style.opacity = `${opacity}`;
      });

      animationId = requestAnimationFrame(updatePositions);
    };

    updatePositions();

    // Drag handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastX.current = e.clientX;
      velocityRef.current = 0;
      container.style.cursor = 'grabbing';
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
      container.style.cursor = 'grab';
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

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
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

        <div className={styles.circleWrap}>
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
      </div>
    </section>
  );
}
