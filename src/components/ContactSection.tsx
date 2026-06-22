'use client';

import { useState } from 'react';
import styles from './ContactSection.module.css';

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === 'sending' || state === 'done') return;
    if (!name.trim() || !isValidEmail(email) || !phone.trim()) {
      setError('Vul je naam, een geldig e-mailadres en je telefoonnummer in.');
      setState('error');
      return;
    }
    setError(null);
    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Versturen mislukt');
      }
      setState('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Versturen mislukt');
      setState('error');
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>Contact</span>
          <h2 className={styles.title}>Persoonlijk advies op maat</h2>
          <p className={styles.text}>
            Elke wagen heeft andere behoeften. Daarom nemen wij de tijd om samen te kijken welke
            behandeling het beste aansluit bij jouw voertuig. Neem vrijblijvend contact op voor
            persoonlijk advies of kom langs voor een inspectie en een kop koffie.
          </p>
        </div>

        {state === 'done' ? (
          <div className={styles.done}>
            <h3 className={styles.doneTitle}>Bedankt voor je bericht!</h3>
            <p className={styles.doneText}>We nemen zo snel mogelijk contact met je op.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Naam *</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Je volledige naam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Telefoonnummer *</label>
                <input
                  type="tel"
                  className={styles.input}
                  placeholder="+31 6 12345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>E-mailadres *</label>
              <input
                type="email"
                className={styles.input}
                placeholder="jouw@email.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Opmerking</label>
              <textarea
                className={styles.textarea}
                placeholder="Waar kunnen we je mee helpen?"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submit} disabled={state === 'sending'}>
              {state === 'sending' ? 'Versturen...' : 'Verstuur bericht'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
