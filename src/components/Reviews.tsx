'use client';

import { useEffect, useRef } from 'react';
import styles from './Reviews.module.css';
import DragCursor from './DragCursor';

const reviews = [
  {
    text: 'Mijn auto echt terug naar showroomstaat. Vakwerk tot in elk detail.',
    name: 'Thomas van den Berg',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    text: 'Keramische coating laten doen, het water parelt er maanden later nog vanaf.',
    name: 'Lisa de Vries',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    text: 'Het interieur is na de gold detail volledig getransformeerd. Voelt als nieuw.',
    name: 'Mark Jansen',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    text: 'Persoonlijke aanpak, eerlijk advies en een zichtbaar verschil in resultaat.',
    name: 'Sophie Bakker',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    text: 'Swirls en lichte krassen zijn na het polijsten compleet verdwenen. Vakwerk.',
    name: 'Dennis Visser',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    text: 'De combi exterieur en interieur was de moeite meer dan waard.',
    name: 'Emma Mulder',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    text: 'Duidelijke uitleg vooraf en een resultaat dat de verwachtingen overtrof.',
    name: 'Pieter de Groot',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
  {
    text: 'Mijn Mercedes glimt weer alsof hij van de zaak komt. Top service.',
    name: 'Anna Smit',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
  {
    text: 'BMW na de silver exterior detail laten doen. Volledig getransformeerd.',
    name: 'Ruben Hendriks',
    avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
  },
  {
    text: 'Geen standaard werk maar échte aandacht voor elk detail. Vakmanschap.',
    name: 'Julia van Dijk',
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    text: 'Velgen, banden en wielkasten zien er weer uit als nieuw. Echt schoon.',
    name: 'Kevin Bos',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    text: 'Na de klei behandeling voelt de lak echt glad als glas. Top resultaat.',
    name: 'Nathalie Prins',
    avatar: 'https://randomuser.me/api/portraits/women/57.jpg',
  },
  {
    text: 'Audi laten doen voor de gold exterior. Prijs-kwaliteit is sterk.',
    name: 'Bas Vermeulen',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
  },
  {
    text: 'Glascoating laten aanbrengen, regen parelt er prachtig vanaf. Aanrader.',
    name: 'Iris van Leeuwen',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
  },
  {
    text: 'Het interieur was aan een beurt toe en is nu weer helemaal als nieuw.',
    name: 'Stefan de Wit',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    text: 'Premium producten, hoogwaardig werk en een resultaat om trots op te zijn.',
    name: 'Fleur Janssen',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
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
  const radiusRef = useRef(1600);

  const yOffsetRef = useRef(250);

  // Calculate responsive radius based on viewport
  const getRadius = () => {
    if (typeof window === 'undefined') return 1600;
    const width = window.innerWidth;
    if (width <= 480) return 660;
    if (width <= 767) return 850;
    if (width <= 991) return 1000;
    return 1600;
  };

  // Vertical offset of the arc, decoupled from radius
  const getYOffset = () => {
    if (typeof window === 'undefined') return 250;
    const width = window.innerWidth;
    if (width <= 767) return 100;
    return 250;
  };

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!container || !section || !wrap) return;

    const cards = container.querySelectorAll(`.${styles.card}`) as NodeListOf<HTMLElement>;
    const totalCards = cards.length;
    radiusRef.current = getRadius();
    yOffsetRef.current = getYOffset();
    const angleStep = 360 / totalCards;

    // Update radius on resize
    const handleResize = () => {
      radiusRef.current = getRadius();
      yOffsetRef.current = getYOffset();
    };
    window.addEventListener('resize', handleResize);

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
        const radius = radiusRef.current;

        // Vertical offset of the arc (decoupled from radius)
        const yOffset = yOffsetRef.current;

        // Position on arc (bottom arc - smile shape)
        const x = Math.sin(angle) * radius;
        const y = (1 - Math.cos(angle)) * radius - yOffset;

        // Rotation follows curve
        const rotation = angle * (180 / Math.PI);

        // Z-index based on position (front cards on top)
        const zIndex = Math.round((1 - Math.cos(angle)) * 50);

        // Opacity fade: cards at top of arc (cos ≈ 1) are fully visible,
        // cards further down the arc fade out
        const cosVal = Math.cos(angle);
        const opacity = Math.max(0, Math.min(1, cosVal * 2 - 0.5));

        card.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        card.style.zIndex = `${zIndex}`;
        card.style.opacity = `${opacity}`;
        card.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible';
      });

      animationId = requestAnimationFrame(updatePositions);
    };

    updatePositions();

    // Drag handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastX.current = e.clientX;
      velocityRef.current = 0;
      wrap.style.cursor = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - lastX.current;
      angleRef.current += deltaX * 0.06;
      velocityRef.current = deltaX * 0.03;
      lastX.current = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      wrap.style.cursor = 'none';
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      lastX.current = e.touches[0].clientX;
      velocityRef.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.touches[0].clientX - lastX.current;
      angleRef.current += deltaX * 0.06;
      velocityRef.current = deltaX * 0.03;
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
      window.removeEventListener('resize', handleResize);
      wrap.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      wrap.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section id="reviews" className={styles.reviews} ref={sectionRef} data-nav-theme="dark">
      <DragCursor />
      <div className={styles.stickyWrap}>
        <div className={styles.header}>
          <span className={styles.label}>Ervaringen</span>
          <h2 className={styles.title}>Wat klanten zeggen</h2>
        </div>

        <div
          className={styles.circleWrap}
          ref={wrapRef}
          data-cursor-hover
          data-cursor-text="Sleep"
        >
          <div className={styles.circle} ref={containerRef}>
            {reviews.map((review, index) => (
              <div key={index} className={styles.card}>
                <p className={styles.cardText}>{review.text}</p>
                <div className={styles.cardAuthor}>
                  <img className={styles.cardAvatar} src={review.avatar} alt={review.name} draggable={false} />
                  <span className={styles.cardName}>{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>Ben jij ook klant geweest bij GD Carcare?</p>
          <a href="#" className={styles.googleBtn}>
            <svg className={styles.googleIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Laat een review achter
          </a>
        </div>
      </div>
    </section>
  );
}
