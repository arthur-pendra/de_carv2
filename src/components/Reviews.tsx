'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Reviews.module.css';
import DragCursor from './DragCursor';

const StarIcon = () => (
  <svg className={styles.star} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.9 6.26 6.1.53-4.6 4.02 1.38 6.19L12 16.9l-5.78 3.1 1.38-6.19L3 9.79l6.1-.53L12 2z" />
  </svg>
);

const GoogleMark = () => (
  <svg className={styles.cardGoogle} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Google review">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

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

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!container || !section || !wrap) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>(`.${styles.card}`)
    );
    const total = cards.length;
    if (!total) return;

    const angleStep = 360 / total;
    const DEG = Math.PI / 180;

    // Responsive arc radius + vertical offset
    const getRadius = () => {
      const w = window.innerWidth;
      if (w <= 480) return 620;
      if (w <= 767) return 780;
      if (w <= 991) return 900;
      return 1150;
    };
    const getYOffset = () => (window.innerWidth <= 767 ? 100 : 250);

    let radius = getRadius();
    let yOffset = getYOffset();

    // Carousel state (local — no re-renders needed)
    let angle = 0;
    let velocity = 0;
    let dragging = false;
    let lastX = 0;
    let pointerId: number | null = null;

    const render = () => {
      for (let i = 0; i < total; i++) {
        const deg = angle + i * angleStep;
        const a = deg * DEG;
        const cos = Math.cos(a);
        const x = Math.sin(a) * radius;
        const y = (1 - cos) * radius - yOffset;
        const opacity = Math.max(0, Math.min(1, cos * 2 - 0.5));

        const card = cards[i];
        card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`;
        card.style.opacity = `${opacity}`;
        card.style.zIndex = `${Math.round((1 - cos) * 50)}`;
        card.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible';
      }
    };

    // Single ticker step — shared with GSAP/Lenis instead of a rival rAF loop
    const tick = () => {
      if (!dragging) {
        angle += velocity;
        velocity *= 0.95;

        // Ease toward the nearest card once the throw settles
        if (Math.abs(velocity) < 0.15) {
          velocity = 0;
          const normalized = ((angle % 360) + 360) % 360;
          const target = Math.round(normalized / angleStep) * angleStep;
          const shortest = ((target - normalized + 180) % 360) - 180;
          if (Math.abs(shortest) > 0.01) angle += shortest * 0.12;
        }
      }
      render();
    };

    render();

    // Only spin while the section is on screen
    let running = false;
    const start = () => {
      if (running) return;
      gsap.ticker.add(tick);
      running = true;
    };
    const stop = () => {
      if (!running) return;
      gsap.ticker.remove(tick);
      running = false;
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(section);

    // Unified pointer dragging — mouse, pen and touch in one path.
    // touch-action: pan-y on the wrap keeps vertical page scroll smooth.
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      velocity = 0;
      lastX = e.clientX;
      pointerId = e.pointerId;
      wrap.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      angle += dx * 0.05;
      velocity = dx * 0.05;
    };

    const endDrag = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      dragging = false;
      pointerId = null;
      if (wrap.hasPointerCapture(e.pointerId)) wrap.releasePointerCapture(e.pointerId);
    };

    wrap.addEventListener('pointerdown', onPointerDown);
    wrap.addEventListener('pointermove', onPointerMove);
    wrap.addEventListener('pointerup', endDrag);
    wrap.addEventListener('pointercancel', endDrag);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        radius = getRadius();
        yOffset = getYOffset();
        render();
      }, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
      wrap.removeEventListener('pointerdown', onPointerDown);
      wrap.removeEventListener('pointermove', onPointerMove);
      wrap.removeEventListener('pointerup', endDrag);
      wrap.removeEventListener('pointercancel', endDrag);
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
                <div className={styles.cardHead}>
                  <div className={styles.stars} aria-label="5 van 5 sterren">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <GoogleMark />
                </div>
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
