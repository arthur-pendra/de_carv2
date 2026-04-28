'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from './TransitionLink';
import Button from './Button';
import styles from './Footer.module.css';
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [agreed, setAgreed] = useState(false);
  const [nlName, setNlName] = useState('');
  const [nlEmail, setNlEmail] = useState('');
  const [nlState, setNlState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [nlError, setNlError] = useState<string | null>(null);

  const handleNewsletter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nlState === 'sending' || nlState === 'done') return;
    if (!nlName.trim() || !nlEmail.trim() || !agreed) {
      setNlError('Vul je naam, e-mail in en ga akkoord met het privacybeleid.');
      setNlState('error');
      return;
    }
    setNlError(null);
    setNlState('sending');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nlName, email: nlEmail, agreed }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Aanmelden mislukt');
      }
      setNlState('done');
    } catch (err) {
      setNlError(err instanceof Error ? err.message : 'Aanmelden mislukt');
      setNlState('error');
    }
  };

  const wheelWrapRef = useRef<HTMLDivElement>(null);
  const dirtyRef = useRef<HTMLImageElement>(null);
  const cleanRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wheelWrap = wheelWrapRef.current;
    const dirty = dirtyRef.current;
    const clean = cleanRef.current;
    const section = sectionRef.current;
    if (!wheelWrap || !dirty || !clean || !section) return;

    // Rotation: full scroll range
    gsap.fromTo(wheelWrap, { rotation: 0 }, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    // Fade: dirty fades out when section enters viewport
    gsap.fromTo(dirty, { opacity: 1 }, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <footer id="contact" className={styles.footer}>
      {/* CTA Section */}
      <div className={styles.ctaSection} ref={sectionRef}>
        {/* Wheel before/after */}
        <div className={styles.wheelWrap}>
          <div className={styles.wheelSpin} ref={wheelWrapRef}>
            <img
              ref={dirtyRef}
              src="/Weel_Dirty_GD.webp"
              alt="Vies wiel"
              className={styles.wheelImg}
            />
            <img
              ref={cleanRef}
              src="/WEEL_GD.webp"
              alt="Schoon wiel"
              className={`${styles.wheelImg} ${styles.wheelClean}`}
            />
          </div>
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
            {nlState === 'done' ? (
              <p className={styles.newsletterDone}>
                Bedankt voor je inschrijving — je staat op de lijst.
              </p>
            ) : (
              <form className={styles.form} onSubmit={handleNewsletter}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Naam"
                    className={styles.input}
                    value={nlName}
                    onChange={(e) => setNlName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="jouw@email.nl"
                    className={styles.input}
                    value={nlEmail}
                    onChange={(e) => setNlEmail(e.target.value)}
                    required
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
                      Ik ga akkoord met het <TransitionLink href="/privacybeleid">privacybeleid</TransitionLink>
                    </span>
                  </label>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={nlState === 'sending'}
                  >
                    {nlState === 'sending' ? 'Aanmelden...' : 'Aanmelden'}
                  </button>
                </div>
                {nlError && <p className={styles.newsletterError}>{nlError}</p>}
              </form>
            )}
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
                <li><a href="mailto:info@gdcarcare.nl">info@gdcarcare.nl</a></li>
                <li><a href="https://www.instagram.com/gdcarcare/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
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
