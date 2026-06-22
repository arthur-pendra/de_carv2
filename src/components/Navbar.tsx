'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Navbar.module.css';
import TransitionLink from './TransitionLink';
import { usePageTransition } from './PageTransition';

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Over ons', href: '/about' },
  { label: 'Diensten', href: '/#diensten' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

const NAV_IMAGES = [
  '/img/cars/car-01.webp',
  '/img/cars/car-03.webp',
  '/img/cars/car-06.webp',
  '/img/cars/car-07.webp',
  '/img/cars/car-09.webp',
  '/img/cars/car-12.webp',
];

export default function Navbar() {
  const pathname = usePathname();
  const { isTransitioning } = usePageTransition();
  const [isActive, setIsActive] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const openNav = () => {
    setIsActive(true);
  };

  const closeNav = () => {
    setIsActive(false);
  };

  const toggleNav = () => {
    isActive ? closeNav() : openNav();
  };

  // Close nav on route change
  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  // Invert the navbar (white pill, dark logo/buttons) while it overlaps a
  // dark section. Rebuilt per route, after the page transition settles so the
  // section positions are measured correctly.
  useEffect(() => {
    if (isTransitioning) return;
    const nav = navRef.current;
    const bar = barRef.current;
    if (!nav || !bar) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav-invert]')
    );
    if (!sections.length) {
      nav.removeAttribute('data-nav-theme');
      return;
    }

    // Vertical centre of the navbar pill (nav is fixed, so this is stable)
    const navCenter = () => {
      const r = bar.getBoundingClientRect();
      return r.top + r.height / 2;
    };

    const activeSections = new Set<Element>();
    const sync = () => {
      if (activeSections.size > 0) nav.setAttribute('data-nav-theme', 'dark');
      else nav.removeAttribute('data-nav-theme');
    };

    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: () => `top top+=${navCenter()}`,
        end: () => `bottom top+=${navCenter()}`,
        onToggle: (self) => {
          if (self.isActive) activeSections.add(section);
          else activeSections.delete(section);
          sync();
        },
      })
    );

    ScrollTrigger.refresh();
    // Sync initial state in case a dark section already sits under the navbar
    triggers.forEach((t) => {
      if (t.isActive) activeSections.add(t.trigger as Element);
    });
    sync();

    return () => {
      triggers.forEach((t) => t.kill());
      activeSections.clear();
      nav.removeAttribute('data-nav-theme');
    };
  }, [pathname, isTransitioning]);

  // ESC key closes nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        closeNav();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return (
    <nav
      ref={navRef}
      className={styles.nav}
      data-nav-status={isActive ? 'active' : 'not-active'}
    >
      {/* Dark overlay */}
      <div
        className={styles.bg}
        onClick={closeNav}
      />

      <div className={styles.wrap}>
        <div className={styles.width}>
          <div className={styles.bar} ref={barRef}>
            {/* Background */}
            <div className={styles.back}>
              <div className={styles.backBg} />
            </div>

            {/* Top bar */}
            <div className={styles.top}>
              {/* Left - Hamburger */}
              <button
                className={styles.toggle}
                onClick={toggleNav}
                aria-label="Toggle navigation"
              >
                <div className={styles.toggleBar} />
                <div className={styles.toggleBar} />
              </button>

              {/* Center - Logo */}
              <TransitionLink href="/" className={styles.logo} aria-label="GD Carcare home">
                <svg
                  className={styles.logoSvg}
                  viewBox="0 0 61 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M36.7908 15.2469L23.0135 36.9629L18.265 37C6.26546 36.5468 -2.67899 25.1359 0.733173 13.3978C2.90461 5.92923 9.84353 0.54061 17.6358 0.0713348H34.4703L30.3228 6.60972L18.5455 6.64189C10.6161 6.88037 4.95866 14.5049 7.40566 22.1371C8.95709 26.9767 13.9158 30.6155 19.0769 30.3196L24.2774 22.0308H14.928L17.8095 17.473C18.6853 16.0875 20.2143 15.2469 21.8592 15.2469H36.7908Z" fill="currentColor" />
                  <path d="M30.3939 12.3089C32.9829 8.22945 35.5719 4.15004 38.1609 0.0713358L38.369 0.0671396C43.7241 -0.210509 48.5056 0.281146 52.9814 3.37095C67.8764 13.653 60.6183 36.2859 42.7343 37.0007L26.7392 36.9972L30.9562 30.3882L43.0155 30.3567C50.469 29.7818 55.7025 22.7413 53.7827 15.442C52.4914 10.5332 47.7851 6.78246 42.6626 6.64119C42.4567 6.63559 42.3477 6.64818 42.2669 6.69504C42.0848 6.80064 42.0089 6.98667 41.9913 7.02794C41.8894 7.27062 41.166 8.40849 40.0392 10.1261C39.1605 11.4654 37.6632 12.276 36.0555 12.2837C34.1688 12.2921 32.2813 12.3005 30.3946 12.3096L30.3939 12.3089Z" fill="currentColor" />
                </svg>
              </TransitionLink>

              {/* Right - Button */}
              <TransitionLink href="/start" className={styles.cta}>
                Boek een afspraak
              </TransitionLink>

              <div className={styles.topLine} />
            </div>

            {/* Bottom content */}
            <div className={styles.bottom}>
              <div className={styles.bottomOverflow}>
                <div className={styles.bottomInner}>
                  <div className={styles.bottomRow}>
                    {/* Navigation links */}
                    <div className={styles.bottomCol}>
                      <div className={styles.info}>
                        <ul className={styles.ul}>
                          {NAV_ITEMS.map((item, i) => (
                            <li key={item.label} className={styles.li}>
                              <TransitionLink
                                href={item.href}
                                className={styles.link}
                                onClick={closeNav}
                              >
                                <span
                                  className={styles.linkSpan}
                                  onMouseEnter={() => setHoveredIndex(i)}
                                >
                                  {item.label}
                                </span>
                              </TransitionLink>
                            </li>
                          ))}
                        </ul>

                        <ul className={`${styles.ul} ${styles.ulSmall}`}>
                          <li className={styles.li}>
                            <a href="https://www.instagram.com/gdcarcare/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                              <span className={styles.linkEyebrow}>Instagram</span>
                            </a>
                          </li>
                          <li className={styles.li}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                              <span className={styles.linkEyebrow}>Facebook</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Visual */}
                    <div className={`${styles.bottomCol} ${styles.bottomColVisual}`}>
                      <div className={styles.visual}>
                        {NAV_IMAGES.map((src, i) => (
                          <img
                            key={src}
                            src={src}
                            alt={NAV_ITEMS[i]?.label || 'GD Carcare'}
                            className={`${styles.visualImg} ${hoveredIndex === i ? styles.visualImgActive : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
