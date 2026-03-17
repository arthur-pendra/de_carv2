'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import TransitionLink from './TransitionLink';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Over ons', href: '/about' },
  { label: 'Diensten', href: '/#diensten' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

const NAV_IMAGES = [
  'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2071&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2071&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?q=80&w=2071&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2071&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2071&auto=format&fit=crop',
];

export default function Navbar() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);

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
          <div className={styles.bar}>
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
              <TransitionLink href="/" className={styles.logo}>
                <span className={styles.logoText}>GD Carcare</span>
              </TransitionLink>

              {/* Right - Button */}
              <TransitionLink href="/start" className={styles.cta}>
                Start nu
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
