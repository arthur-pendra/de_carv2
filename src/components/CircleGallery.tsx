'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CircleGallery.module.css';
import WheelRim from './WheelRim';

const allImages = [
  '/img/cars/car-01.webp',
  '/img/cars/car-02.webp',
  '/img/cars/car-03.webp',
  '/img/cars/car-04.webp',
  '/img/cars/car-05.webp',
  '/img/cars/car-06.webp',
  '/img/cars/car-07.webp',
  '/img/cars/car-08.webp',
  '/img/cars/car-09.webp',
  '/img/cars/car-12.webp',
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function CircleGallery() {
  const isMobile = useIsMobile();
  const images = isMobile ? allImages.slice(0, 8) : allImages;

  const containerRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<number | null>(null);
  const angleRef = useRef(0);
  const radiusRef = useRef(1250);
  const yOffsetRef = useRef(250);

  // Calculate responsive radius based on viewport
  const getRadius = () => {
    if (typeof window === 'undefined') return 1250;
    const width = window.innerWidth;
    if (width <= 480) return 550;
    if (width <= 767) return 750;
    if (width <= 991) return 800;
    return 1250;
  };

  // Calculate responsive y-offset based on viewport
  const getYOffset = () => {
    if (typeof window === 'undefined') return 250;
    const width = window.innerWidth;
    if (width <= 480) return 100;
    if (width <= 767) return 150;
    if (width <= 991) return 180;
    return 250;
  };

  useEffect(() => {
    const container = containerRef.current;
    const rim = rimRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(`.${styles.card}`) as NodeListOf<HTMLElement>;
    const totalCards = cards.length;
    radiusRef.current = getRadius();
    yOffsetRef.current = getYOffset();
    const angleStep = 360 / totalCards;

    // Update radius and y-offset on resize
    const handleResize = () => {
      radiusRef.current = getRadius();
      yOffsetRef.current = getYOffset();
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      angleRef.current += 0.05; // Speed of rotation

      // Rotate the rim
      if (rim) {
        rim.style.transform = `rotate(${angleRef.current}deg)`;
      }

      cards.forEach((card, index) => {
        const angle = (angleRef.current + index * angleStep) * (Math.PI / 180);
        const radius = radiusRef.current;
        const yOffset = yOffsetRef.current;

        // Calculate position on the arc (showing top arc - like a rainbow)
        const x = Math.sin(angle) * radius;
        const y = (1 - Math.cos(angle)) * radius + yOffset; // Top arc visible

        // Calculate rotation for each card to follow the curve (flipped)
        const rotation = angle * (180 / Math.PI);

        // Z-index based on position (cards at front/top of arc are in front)
        const zIndex = Math.round((Math.cos(angle) + 1) * 50);

        card.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        card.style.zIndex = `${zIndex}`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [images.length]);

  return (
    <div className={styles.circleWrap}>
      <div className={styles.circle} ref={containerRef}>
        <WheelRim className={styles.rim} ref={rimRef} />
        {images.map((src, index) => (
          <div key={index} className={styles.card}>
            <img src={src} alt={`Car detailing ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
