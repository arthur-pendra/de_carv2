'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from './TransitionLink';
import Button from './Button';
import styles from './Footer.module.css';
import WheelRim from './WheelRim';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [agreed, setAgreed] = useState(false);
  const wheelRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wheel = wheelRef.current;
    const section = sectionRef.current;
    if (!wheel || !section) return;

    // Scroll-driven rotation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    tl.fromTo(wheel, { rotation: 0 }, { rotation: 360, ease: 'none' });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <footer id="contact" className={styles.footer}>
      {/* CTA Section */}
      <div className={styles.ctaSection} ref={sectionRef}>
        {/* Wheel SVG */}
        <div className={styles.wheelWrap}>
          <WheelRim className={styles.wheel} ref={wheelRef} />
        </div>

        <div className={styles.ctaContent}>
          <div className={styles.ctaSocial}>
            <div className={styles.avatars}>
              <span className={styles.avatar}>T</span>
              <span className={styles.avatar}>L</span>
              <span className={styles.avatar}>M</span>
            </div>
            <span className={styles.socialText}>50+ tevreden klanten</span>
          </div>
          <h2 className={styles.ctaTitle}>
            Klaar voor een<br />showroom finish?
          </h2>
          <p className={styles.ctaText}>
            Boek vandaag nog een afspraak en geef je auto de behandeling die het verdient.
          </p>
          <div className={styles.ctaButtons}>
            <Button href="/start">Afspraak maken</Button>
            <Button href="/#diensten">Bekijk prijzen</Button>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className={styles.footerContent}>
        <div className={styles.container}>
          {/* Newsletter */}
          <div className={styles.newsletter}>
            <h3 className={styles.newsletterTitle}>Schrijf je in voor updates</h3>
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Naam"
                  className={styles.input}
                />
                <input
                  type="email"
                  placeholder="jouw@email.nl"
                  className={styles.input}
                />
              </div>
              <div className={styles.formBottom}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.checkboxText}>
                    Ik ga akkoord met het <a href="#">privacybeleid</a>
                  </span>
                </label>
                <button type="submit" className={styles.submitBtn}>
                  Aanmelden
                </button>
              </div>
            </form>
          </div>

          {/* Links */}
          <div className={styles.linksGrid}>
            <div className={styles.links}>
              <h4 className={styles.heading}>Diensten</h4>
              <ul className={styles.list}>
                <li><a href="#diensten">Premium Wasbeurt</a></li>
                <li><a href="#diensten">Interieur Reiniging</a></li>
                <li><a href="#diensten">Polijsten</a></li>
                <li><a href="#diensten">Keramische Coating</a></li>
              </ul>
            </div>

            <div className={styles.links}>
              <h4 className={styles.heading}>Bedrijf</h4>
              <ul className={styles.list}>
                <li><a href="#waarom-ons">Waarom GD?</a></li>
                <li><a href="#reviews">Reviews</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className={styles.links}>
              <h4 className={styles.heading}>Contact</h4>
              <ul className={styles.list}>
                <li><a href="tel:+31612345678">+31 6 12345678</a></li>
                <li><a href="mailto:info@gdcarcosmetics.nl">info@gdcarcosmetics.nl</a></li>
                <li><a href="https://www.instagram.com/gdcarcosmetics/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <div className={styles.container}>
            <p className={styles.copyright}>
              © {currentYear} GD Carcosmetics. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
