'use client';

import { useState } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [agreed, setAgreed] = useState(false);

  return (
    <footer className={styles.footer}>
      {/* CTA Section */}
      <div className={styles.ctaSection}>
        {/* Wheel SVG */}
        <div className={styles.wheelWrap}>
          <svg className={styles.wheel} viewBox="-1450 -1450 2900 2900">
            {/* Outer tire edge */}
            <circle cx="0" cy="0" r={1300} fill="none" stroke="currentColor" strokeWidth="2" />
            {/* Inner tire edge */}
            <circle cx="0" cy="0" r={1250} fill="none" stroke="currentColor" strokeWidth="1" />
            {/* Tire tread/profile - lines */}
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i * 360 / 60) * (Math.PI / 180);
              const x1 = Math.cos(angle) * 1250;
              const y1 = Math.sin(angle) * 1250;
              const x2 = Math.cos(angle) * 1300;
              const y2 = Math.sin(angle) * 1300;
              return (
                <line
                  key={`tread-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="1"
                />
              );
            })}
            {/* Rim edge */}
            <circle cx="0" cy="0" r={1220} fill="none" stroke="currentColor" strokeWidth="1" />
            {/* Hub */}
            <circle cx="0" cy="0" r={150} fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="0" cy="0" r={80} fill="none" stroke="currentColor" strokeWidth="1" />
            {/* Spokes */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360 / 12) * (Math.PI / 180);
              const x1 = Math.cos(angle) * 150;
              const y1 = Math.sin(angle) * 150;
              const x2 = Math.cos(angle) * 1220;
              const y2 = Math.sin(angle) * 1220;
              return (
                <line
                  key={`spoke-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
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
            <a href="#" className={styles.ctaPrimary}>Afspraak maken</a>
            <a href="#" className={styles.ctaSecondary}>Bekijk prijzen</a>
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
                <li><a href="#">Uitgebreide wasbeurt</a></li>
                <li><a href="#">Interieur reiniging</a></li>
                <li><a href="#">Polijsten</a></li>
                <li><a href="#">Keramische coating</a></li>
              </ul>
            </div>

            <div className={styles.links}>
              <h4 className={styles.heading}>Bedrijf</h4>
              <ul className={styles.list}>
                <li><a href="#">Over ons</a></li>
                <li><a href="#">Reviews</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>

            <div className={styles.links}>
              <h4 className={styles.heading}>Contact</h4>
              <ul className={styles.list}>
                <li><a href="tel:+31612345678">+31 6 12345678</a></li>
                <li><a href="mailto:info@gdcarcare.nl">info@gdcarcare.nl</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <div className={styles.container}>
            <p className={styles.copyright}>
              © {currentYear} GD Carcare. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
