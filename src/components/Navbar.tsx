'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';

interface NavbarProps {
  logo?: React.ReactNode;
}

export default function Navbar({ logo }: NavbarProps) {
  const [isActive, setIsActive] = useState(false);

  const openNav = () => {
    setIsActive(true);
  };

  const closeNav = () => {
    setIsActive(false);
  };

  const toggleNav = () => {
    isActive ? closeNav() : openNav();
  };

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
              <Link href="/" className={styles.logo}>
                {logo || (
                  <span className={styles.logoText}>GD CARCARE</span>
                )}
              </Link>

              <button
                className={styles.toggle}
                onClick={toggleNav}
                aria-label="Toggle navigation"
              >
                <div className={styles.toggleBar} />
                <div className={styles.toggleBar} />
              </button>

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
                          <li className={styles.li}>
                            <Link href="/" className={styles.link} onClick={closeNav}>
                              <span className={styles.linkSpan}>Home</span>
                            </Link>
                          </li>
                          <li className={styles.li}>
                            <Link href="/portfolio" className={styles.link} onClick={closeNav}>
                              <span className={styles.linkSpan}>Portfolio</span>
                            </Link>
                          </li>
                          <li className={styles.li}>
                            <Link href="/about" className={styles.link} onClick={closeNav}>
                              <span className={styles.linkSpan}>Over ons</span>
                            </Link>
                          </li>
                          <li className={styles.li}>
                            <Link href="/services" className={styles.link} onClick={closeNav}>
                              <span className={styles.linkSpan}>Diensten</span>
                            </Link>
                          </li>
                        </ul>

                        <ul className={`${styles.ul} ${styles.ulSmall}`}>
                          <li className={styles.li}>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
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
                        <img
                          src="/img/nav-visual.jpg"
                          alt="GD Carcare"
                          className={styles.visualImg}
                        />
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
