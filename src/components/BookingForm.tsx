'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './BookingForm.module.css';

type Category = 'exterieur' | 'interieur' | 'combi';

const categoryLabels: { key: Category; label: string }[] = [
  { key: 'exterieur', label: 'Exterieur' },
  { key: 'interieur', label: 'Interieur' },
  { key: 'combi', label: 'Combi' },
];

const packages: Record<Category, {
  tag: string;
  title: string;
  price: string;
  features: string[];
}[]> = {
  exterieur: [
    {
      tag: 'BRONZE',
      title: 'Exterior Detail',
      price: '€120,-',
      features: [
        'Diepte reiniging velgen, banden & wielkasten',
        'Reiniging deurstijlen',
        'Voorwassen (krasloze reiniging)',
        'Volledig foambad & handwas',
        'Streep vrij glas',
        'Bandenglans aangebracht (3 maanden protectie)',
      ],
    },
    {
      tag: 'SILVER',
      title: 'Exterior Detail',
      price: '€180,-',
      features: [
        'Diepte reiniging velgen, banden & wielkasten',
        'Reiniging deurstijlen',
        'Voorwassen (krasloze reiniging)',
        'Volledig foambad & handwas',
        'Streep vrij glas',
        'Bandenglans aangebracht (3 maanden protectie)',
        'Keramische sealant (1-3 maanden lakprotectie)',
        'IJzer & tar verwijdering',
      ],
    },
    {
      tag: 'GOLD',
      title: 'Exterior Detail',
      price: '€200,-',
      features: [
        'Diepte reiniging velgen, banden & wielkasten',
        'Reiniging deurstijlen',
        'Voorwassen (krasloze reiniging)',
        'Volledig foambad & handwas',
        'Streep vrij glas',
        'Bandenglans aangebracht (3 maanden protectie)',
        'Keramische sealant (3-6 maanden lakprotectie)',
        'Volledige kleibehandeling',
        'Dressing & protectie kunststof oppervlakten',
        'Glascoating (1 jaar protectie)',
      ],
    },
  ],
  interieur: [
    {
      tag: 'BRONZE',
      title: 'Interior Detail',
      price: '€120,-',
      features: [
        'Volledige stofzuigen en stofvrij maken',
        'Dashboard, middenconsole & deurpanelen reinigen',
        'Reinigen kofferruimte',
        'Stomen interieur oppervlaktes',
        'Streep vrij glas',
      ],
    },
    {
      tag: 'SILVER',
      title: 'Interior Detail',
      price: '€200,-',
      features: [
        'Volledige stofzuigen en stofvrij maken',
        'Dashboard, middenconsole & deurpanelen reinigen',
        'Reinigen kofferruimte',
        'Stomen interieur oppervlaktes',
        'Streep vrij glas',
        'Lederen stoelen reinigen',
        'Stoffen & alcantara stoelen reinigen',
        'Automatten en tapijt reinigen',
      ],
    },
    {
      tag: 'GOLD',
      title: 'Interior Detail',
      price: '€250,-',
      features: [
        'Volledige stofzuigen en stofvrij maken',
        'Dashboard, middenconsole & deurpanelen reinigen',
        'Reinigen kofferruimte',
        'Stomen interieur oppervlaktes',
        'Streep vrij glas',
        'Lederen stoelen reinigen',
        'Stoffen & alcantara stoelen reinigen',
        'Automatten en tapijt reinigen',
        'Behandelen kunststof onderdelen',
        'Reinigen dakhemel',
        '100% geur en bacterie vrij',
      ],
    },
  ],
  combi: [
    {
      tag: 'BRONZE',
      title: 'Ultimate Detail',
      price: '€200,-',
      features: [
        'Bronze exterior detail',
        'Bronze interior detail',
        'Bespaar €40 door onze combi deal',
      ],
    },
    {
      tag: 'SILVER',
      title: 'Ultimate Detail',
      price: '€320,-',
      features: [
        'Silver exterior detail',
        'Silver interior detail',
        'Bespaar €60 door onze combi deal',
      ],
    },
    {
      tag: 'GOLD',
      title: 'Ultimate Detail',
      price: '€380,-',
      features: [
        'Gold exterior detail',
        'Gold interior detail',
        'Bespaar €70 door onze combi deal',
      ],
    },
  ],
};

const stepLabels = ['Pakket', 'Auto', 'Contact', 'Datum'];

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [activeCategory, setActiveCategory] = useState<Category>('exterieur');
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dienst = searchParams.get('dienst');
    if (dienst) {
      const lower = dienst.toLowerCase();
      for (const cat of categoryLabels) {
        const idx = packages[cat.key].findIndex(
          (p) => `${p.tag} ${p.title}`.toLowerCase() === lower
        );
        if (idx !== -1) {
          setActiveCategory(cat.key);
          setSelectedTier(idx);
          setStep(1);
          break;
        }
      }
    }
  }, [searchParams]);

  const [carBrand, setCarBrand] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [carColor, setCarColor] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [dates, setDates] = useState<string[]>([]);
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const toggleDate = (d: string) => {
    setDates((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d].sort()
    );
  };

  const formatDate = (d: string) => {
    const date = new Date(d + 'T00:00:00');
    return date.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'long' });
  };

  const timeLabels: Record<string, string> = {
    ochtend: 'Ochtend',
    middag: 'Middag',
    avond: 'Avond',
  };

  const canNext = () => {
    if (step === 0) return selectedTier !== null;
    if (step === 1) return carBrand.trim() !== '';
    if (step === 2) return name.trim() !== '' && phone.trim() !== '' && email.trim() !== '';
    if (step === 3) return dates.length > 0 && time !== '' && privacy;
    return false;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    const chosenPackage = selectedTier !== null ? packages[activeCategory][selectedTier] : null;

    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.confirmation}>
            <div className={styles.checkIcon}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="var(--color-accent)" />
                <path d="M15 24.5L21 30.5L33 18.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className={styles.confirmTitle}>Bedankt!</h2>
            <p className={styles.confirmText}>
              We nemen binnen 24 uur contact met je op om de afspraak te bevestigen.
            </p>

            <div className={styles.summary}>
              <h3 className={styles.summaryTitle}>Jouw aanvraag</h3>

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Pakket</span>
                <span className={styles.summaryValue}>
                  {chosenPackage ? `${chosenPackage.tag} ${chosenPackage.title} (${chosenPackage.price})` : '-'}
                </span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Auto</span>
                <span className={styles.summaryValue}>
                  {carBrand}{carColor ? ` - ${carColor}` : ''}{carPlate ? ` (${carPlate})` : ''}
                </span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Naam</span>
                <span className={styles.summaryValue}>{name}</span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Telefoon</span>
                <span className={styles.summaryValue}>{phone}</span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>E-mail</span>
                <span className={styles.summaryValue}>{email}</span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Voorkeursdagen</span>
                <span className={styles.summaryValue}>
                  {dates.map((d) => formatDate(d)).join(', ')}
                </span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Tijdstip</span>
                <span className={styles.summaryValue}>{timeLabels[time] || time}</span>
              </div>

              {notes && (
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Opmerkingen</span>
                  <span className={styles.summaryValue}>{notes}</span>
                </div>
              )}
            </div>

            <a href="/" className={styles.btnPrimary}>
              Terug naar home
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Boek je afspraak</h1>

        {/* Step indicator */}
        <div className={styles.steps}>
          {stepLabels.map((label, i) => (
            <div key={i} className={styles.stepItem}>
              <div className={`${styles.stepCircle} ${i <= step ? styles.stepActive : ''}`}>
                {i + 1}
              </div>
              <span className={`${styles.stepLabel} ${i <= step ? styles.stepLabelActive : ''}`}>
                {label}
              </span>
              {i < stepLabels.length - 1 && (
                <div className={`${styles.stepLine} ${i < step ? styles.stepLineActive : ''}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Kies je pakket */}
        {step === 0 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Kies je pakket</h2>

            <div className={styles.categoryTabs}>
              {categoryLabels.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  className={`${styles.categoryTab} ${activeCategory === cat.key ? styles.categoryTabActive : ''}`}
                  onClick={() => { setActiveCategory(cat.key); setSelectedTier(null); }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className={styles.serviceGrid}>
              {packages[activeCategory].map((pkg, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.serviceCard} ${selectedTier === i ? styles.serviceSelected : ''}`}
                  onClick={() => setSelectedTier(i)}
                >
                  <span className={styles.serviceTag}>{pkg.tag}</span>
                  <h3 className={styles.serviceTitle}>{pkg.title}</h3>
                  <p className={styles.servicePrice}>{pkg.price}</p>
                  <ul className={styles.serviceFeatures}>
                    {pkg.features.map((f, fi) => (
                      <li key={fi}>{f}</li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Auto gegevens */}
        {step === 1 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Auto gegevens</h2>
            <div className={styles.formFields}>
              <div className={styles.field}>
                <label className={styles.label}>Merk & Model *</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Bijv. BMW 3 Serie"
                  value={carBrand}
                  onChange={(e) => setCarBrand(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Kenteken</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Bijv. AB-123-CD"
                  value={carPlate}
                  onChange={(e) => setCarPlate(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Kleur</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Bijv. Zwart metallic"
                  value={carColor}
                  onChange={(e) => setCarColor(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contactgegevens */}
        {step === 2 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Contactgegevens</h2>
            <div className={styles.formFields}>
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
            </div>
          </div>
        )}

        {/* Step 4: Datum & opmerkingen */}
        {step === 3 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Datum & opmerkingen</h2>
            <div className={styles.formFields}>
              <div className={styles.field}>
                <label className={styles.label}>Voorkeursdagen * (selecteer meerdere)</label>
                <div className={styles.datePickerWrap}>
                  <input
                    type="date"
                    className={styles.input}
                    onChange={(e) => {
                      if (e.target.value) {
                        toggleDate(e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  {dates.length > 0 && (
                    <div className={styles.dateTags}>
                      {dates.map((d) => (
                        <span key={d} className={styles.dateTag}>
                          {formatDate(d)}
                          <button
                            type="button"
                            className={styles.dateTagRemove}
                            onClick={() => toggleDate(d)}
                            aria-label={`Verwijder ${formatDate(d)}`}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Gewenst tijdstip *</label>
                <select
                  className={styles.input}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="">Kies een tijdstip</option>
                  <option value="ochtend">Ochtend</option>
                  <option value="middag">Middag</option>
                  <option value="avond">Avond</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Opmerkingen</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Extra wensen of opmerkingen..."
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={privacy}
                  onChange={(e) => setPrivacy(e.target.checked)}
                />
                <span className={styles.checkmark} />
                <span className={styles.checkboxText}>
                  Ik ga akkoord met het privacybeleid *
                </span>
              </label>
            </div>
          </div>
        )}

      </div>

      {/* Sticky bottom nav bar */}
      <div className={styles.navBar}>
        <div className={styles.navBarInner}>
          <button
            type="button"
            className={`${styles.btnOutline} ${step === 0 ? styles.btnDisabled : ''}`}
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            Vorige
          </button>
          {step < 3 ? (
            <button
              type="button"
              className={styles.btnPrimary}
              disabled={!canNext()}
              onClick={() => setStep(step + 1)}
            >
              Volgende
            </button>
          ) : (
            <button
              type="button"
              className={styles.btnPrimary}
              disabled={!canNext()}
              onClick={handleSubmit}
            >
              Verstuur
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
