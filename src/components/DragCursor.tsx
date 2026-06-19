'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './DragCursor.module.css';

export default function DragCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const textTarget = textRef.current;
    if (!cursor) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let mouseX = 0;
    let mouseY = 0;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3.out' });

    const updateCursor = () => {
      const hoverItem = document
        .elementFromPoint(mouseX, mouseY)
        ?.closest('[data-cursor-hover]');
      const rect = cursor.getBoundingClientRect();

      const isHovering = !!hoverItem;
      const isEdge = rect.right >= window.innerWidth;

      cursor.setAttribute('data-cursor', isHovering ? (isEdge ? 'active-edge' : 'active') : '');

      if (hoverItem && textTarget) {
        const text = hoverItem.getAttribute('data-cursor-text');
        if (text) textTarget.textContent = text;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      xTo(mouseX);
      yTo(mouseY);
      requestAnimationFrame(updateCursor);
    };

    const handleScroll = () => {
      requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      gsap.killTweensOf(cursor);
    };
  }, []);

  return (
    <div ref={cursorRef} data-cursor="" className={styles.cursor} aria-hidden="true">
      <div className={styles.bubble}>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="8 7 4 12 8 17" />
          <polyline points="16 7 20 12 16 17" />
          <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
        <span ref={textRef} className={styles.text}>Sleep</span>
      </div>
    </div>
  );
}
