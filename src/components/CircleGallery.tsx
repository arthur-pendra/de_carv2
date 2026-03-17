'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CircleGallery.module.css';
import WheelRim from './WheelRim';

const allImages = [
  'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=400&auto=format&fit=crop',
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
  const images = isMobile ? allImages.slice(0, 12) : allImages;

  const containerRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<SVGSVGElement>(null);
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
