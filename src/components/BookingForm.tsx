'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import TransitionLink from './TransitionLink';
import Button from './Button';
import PackageCard from './PackageCard';
import Calendar from './Calendar';
import styles from './BookingForm.module.css';
import {
  packages,
  categories as categoryLabels,
  sizes,
  addOns,
  formatPrice,
  type Category,
  type Size,
} from '../data/packages';

const stepLabels = ['Pakket', 'Opties', 'Auto', 'Contact', 'Datum'];
const lastStep = stepLabels.length - 1;

const sizeLabel = (key: Size) => sizes.find((s) => s.key === key)?.label ?? key;

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [activeCategory, setActiveCategory] = useState<Category>('exterieur');
  const [categorySelected, setCategorySelected] = useState(false);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const dienst = searchParams.get('dienst');
    if (dienst) {
      const lower = dienst.toLowerCase();
      for (const cat of categoryLabels) {
        const idx = packages[cat.key].findIndex(
          (p) => p.title.toLowerCase() === lower
        );
        if (idx !== -1) {
          setActiveCategory(cat.key);
          setCategorySelected(true);
          setSelectedTier(idx);
          setSelectedSize(null);
          setSelectedAddOns([]);
          setStep(1);
          return;
        }
      }
    }

    const categorie = searchParams.get('categorie');
    if (categorie === 'exterieur' || categorie === 'interieur' || categorie === 'combi') {
      setActiveCategory(categorie);
      setCategorySelected(true);
      setStep(0);
    }
  }, [searchParams]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Bij elke stap- of dienstkeuze terug naar boven scrollen
  useEffect(() => {
    const lenis = (window as Window & { lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [step, categorySelected]);

  const [carBrand, setCarBrand] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [carColor, setCarColor] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const emailError = emailTouched && email.trim() !== '' && !isValidEmail(email);

  const [dates, setDates] = useState<string[]>([]);
  const [dayTimes, setDayTimes] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const selectedPkg = selectedTier !== null ? packages[activeCategory][selectedTier] : null;
  const basePrice = selectedPkg && selectedSize ? selectedPkg.prices[selectedSize] : 0;
  const addOnsTotal = selectedAddOns.reduce((sum, id) => sum + (addOns[id]?.price ?? 0), 0);
  const total = basePrice + addOnsTotal;

  const pickTier = (i: number) => {
    setSelectedTier(i);
    setSelectedSize(null);
    setSelectedAddOns([]);
    setStep(1);
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleDate = (d: string) => {
    if (dates.includes(d)) {
      setDates(dates.filter((x) => x !== d));
      setDayTimes((prev) => {
        const next = { ...prev };
        delete next[d];
        return next;
      });
    } else {
      setDates([...dates, d].sort());
    }
  };

  const setDayTime = (d: string, value: string) => {
    setDayTimes((prev) => ({ ...prev, [d]: value }));
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

  const handleBack = () => {
    if (step === 0) {
      if (categorySelected) {
        setCategorySelected(false);
        setSelectedTier(null);
        setSelectedSize(null);
        setSelectedAddOns([]);
      }
      return;
    }
    setStep(step - 1);
  };

  const canNext = () => {
    if (step === 0) return selectedTier !== null;
    if (step === 1) return selectedSize !== null;
    if (step === 2) return carBrand.trim() !== '';
    if (step === 3) return name.trim() !== '' && phone.trim() !== '' && isValidEmail(email);
    if (step === 4) return dates.length > 0 && dates.every((d) => dayTimes[d]) && privacy;
    return false;
  };

  const handleSubmit = async () => {
    if (submitting || !selectedPkg || selectedSize === null) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package: { title: selectedPkg.title },
          size: { key: selectedSize, label: sizeLabel(selectedSize) },
          basePrice,
          addOns: selectedAddOns.map((id) => ({ label: addOns[id].label, price: addOns[id].price })),
          total,
          car: { brand: carBrand, plate: carPlate, color: carColor },
          contact: { name, phone, email },
          days: dates.map((d) => ({ date: d, time: dayTimes[d] })),
          notes,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Versturen mislukt');
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Versturen mislukt');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
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
                <span className={styles.summaryValue}>{selectedPkg ? selectedPkg.title : '-'}</span>
              </div>

              {selectedSize && (
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Voertuiggrootte</span>
                  <span className={styles.summaryValue}>
                    {sizeLabel(selectedSize)} ({formatPrice(basePrice)})
                  </span>
                </div>
              )}

              {selectedAddOns.length > 0 && (
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Add-ons</span>
                  <span className={styles.summaryValue}>
                    {selectedAddOns
                      .map((id) => `${addOns[id].label} (${formatPrice(addOns[id].price)})`)
                      .join(', ')}
                  </span>
                </div>
              )}

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
                <span className={styles.summaryLabel}>Voorkeursmomenten</span>
                <span className={styles.summaryValue}>
                  {dates
                    .map((d) => `${formatDate(d)} (${timeLabels[dayTimes[d]] || dayTimes[d]})`)
                    .join(', ')}
                </span>
              </div>

              {notes && (
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Opmerkingen</span>
                  <span className={styles.summaryValue}>{notes}</span>
                </div>
              )}

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Totaal</span>
                <span className={styles.summaryValue}>{formatPrice(total)}</span>
              </div>
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

        {/* Selected package banner (visible after step 0) */}
        {step > 0 && selectedPkg && (
          <div className={styles.selectedBanner}>
            <div className={styles.selectedInfo}>
              <span className={styles.selectedLabel}>Gekozen pakket</span>
              <span className={styles.selectedValue}>
                {selectedPkg.title}
                {selectedSize && <span className={styles.selectedSize}>{sizeLabel(selectedSize)}</span>}
                <span className={styles.selectedPrice}>
                  {selectedSize ? formatPrice(total) : `Vanaf ${formatPrice(selectedPkg.prices.klein)}`}
                </span>
              </span>
              {selectedAddOns.length > 0 && (
                <div className={styles.selectedAddOns}>
                  {selectedAddOns.map((id) => (
                    <span key={id} className={styles.selectedAddOn}>
                      {addOns[id].label}
                      <span className={styles.selectedAddOnPrice}>+ {formatPrice(addOns[id].price)}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              className={styles.selectedChange}
              onClick={() => setStep(0)}
            >
              Wijzig
            </button>
          </div>
        )}

        {/* Step 1a: Kies een dienst */}
        {step === 0 && !categorySelected && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Kies een dienst</h2>

            <div className={styles.choiceGrid}>
              {categoryLabels.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  className={styles.choiceCard}
                  onClick={() => {
                    setActiveCategory(cat.key);
                    setSelectedTier(null);
                    setSelectedSize(null);
                    setSelectedAddOns([]);
                    setCategorySelected(true);
                  }}
                >
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 767px) 100vw, 23em"
                    className={styles.choiceImage}
                  />
                  <span className={styles.choiceOverlay} />
                  <span className={styles.choiceContent}>
                    <span className={styles.choiceTop}>
                      <span className={styles.choiceTag}>Detailing</span>
                    </span>
                    <span className={styles.choiceBottom}>
                      <span className={styles.choiceLogo} aria-hidden="true">
                        <svg viewBox="0 0 61 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M36.7908 15.2469L23.0135 36.9629L18.265 37C6.26546 36.5468 -2.67899 25.1359 0.733173 13.3978C2.90461 5.92923 9.84353 0.54061 17.6358 0.0713348H34.4703L30.3228 6.60972L18.5455 6.64189C10.6161 6.88037 4.95866 14.5049 7.40566 22.1371C8.95709 26.9767 13.9158 30.6155 19.0769 30.3196L24.2774 22.0308H14.928L17.8095 17.473C18.6853 16.0875 20.2143 15.2469 21.8592 15.2469H36.7908Z" fill="currentColor" />
                          <path d="M30.3939 12.3089C32.9829 8.22945 35.5719 4.15004 38.1609 0.0713358L38.369 0.0671396C43.7241 -0.210509 48.5056 0.281146 52.9814 3.37095C67.8764 13.653 60.6183 36.2859 42.7343 37.0007L26.7392 36.9972L30.9562 30.3882L43.0155 30.3567C50.469 29.7818 55.7025 22.7413 53.7827 15.442C52.4914 10.5332 47.7851 6.78246 42.6626 6.64119C42.4567 6.63559 42.3477 6.64818 42.2669 6.69504C42.0848 6.80064 42.0089 6.98667 41.9913 7.02794C41.8894 7.27062 41.166 8.40849 40.0392 10.1261C39.1605 11.4654 37.6632 12.276 36.0555 12.2837C34.1688 12.2921 32.2813 12.3005 30.3946 12.3096L30.3939 12.3089Z" fill="currentColor" />
                        </svg>
                      </span>
                      <span className={styles.choiceTitle}>{cat.label}</span>
                      <span className={styles.choiceDesc}>{cat.description}</span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1b: Kies je pakket */}
        {step === 0 && categorySelected && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>
              {categoryLabels.find((c) => c.key === activeCategory)?.label} detailing
            </h2>
            <p className={styles.stepIntro}>
              {categoryLabels.find((c) => c.key === activeCategory)?.intro}
            </p>

            <div className={styles.serviceGrid}>
              {packages[activeCategory].map((pkg, i) => (
                <PackageCard
                  key={i}
                  pkg={pkg}
                  featured={pkg.featured}
                  detailsOpen={isMobile ? undefined : detailsOpen}
                  onToggleDetails={isMobile ? undefined : () => setDetailsOpen((o) => !o)}
                >
                  <Button onClick={() => pickTier(i)}>Kies pakket</Button>
                </PackageCard>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Voertuiggrootte & opties */}
        {step === 1 && selectedPkg && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Voertuiggrootte & opties</h2>
            <div className={styles.formFields}>
              <div className={styles.field}>
                <label className={styles.label}>Voertuiggrootte *</label>
                <div className={styles.sizeGrid}>
                  {sizes.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      className={`${styles.sizeCard} ${selectedSize === s.key ? styles.sizeCardActive : ''}`}
                      onClick={() => setSelectedSize(s.key)}
                    >
                      <span className={styles.sizeLabel}>{s.label}</span>
                      <span className={styles.sizeDesc}>{s.description}</span>
                      <span className={styles.sizePrice}>{formatPrice(selectedPkg.prices[s.key])}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedPkg.addOnIds.length > 0 && (
                <div className={styles.field}>
                  <label className={styles.label}>Add-ons (optioneel)</label>
                  <div className={styles.addOnList}>
                    {selectedPkg.addOnIds.map((id) => {
                      const addOn = addOns[id];
                      if (!addOn) return null;
                      return (
                        <label key={id} className={styles.addOnItem}>
                          <input
                            type="checkbox"
                            checked={selectedAddOns.includes(id)}
                            onChange={() => toggleAddOn(id)}
                          />
                          <span className={styles.checkmark} />
                          <span className={styles.addOnLabel}>{addOn.label}</span>
                          <span className={styles.addOnPrice}>+ {formatPrice(addOn.price)}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedSize && (
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Totaal</span>
                  <span className={styles.totalPrice}>{formatPrice(total)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Auto gegevens */}
        {step === 2 && (
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

        {/* Step 4: Contactgegevens */}
        {step === 3 && (
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
                  className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                  placeholder="jouw@email.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  aria-invalid={emailError}
                />
                {emailError && (
                  <p className={styles.fieldError}>
                    Vul een geldig e-mailadres in, bijvoorbeeld jouw@email.nl. Hierop ontvang je de bevestiging.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Datum & opmerkingen */}
        {step === 4 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Datum & opmerkingen</h2>
            <div className={styles.dateStep}>
              <div className={styles.dateColumn}>
                <div className={styles.field}>
                  <label className={styles.label}>Voorkeursdagen * (selecteer meerdere)</label>
                  <Calendar selected={dates} onToggle={toggleDate} />
                </div>
              </div>
              <div className={styles.dateColumn}>
                <div className={styles.field}>
                  <label className={styles.label}>Gewenst tijdstip per dag *</label>
                  {dates.length === 0 ? (
                    <p className={styles.dayTimeHint}>
                      Selecteer eerst een of meer dagen in de kalender.
                    </p>
                  ) : (
                    <div className={styles.dayTimeList}>
                      {dates.map((d) => (
                        <div key={d} className={styles.dayTimeRow}>
                          <span className={styles.dayTimeLabel}>{formatDate(d)}</span>
                          <select
                            className={styles.dayTimeSelect}
                            value={dayTimes[d] || ''}
                            onChange={(e) => setDayTime(d, e.target.value)}
                          >
                            <option value="">Kies tijdstip</option>
                            <option value="ochtend">Ochtend</option>
                            <option value="middag">Middag</option>
                            <option value="avond">Avond</option>
                          </select>
                          <button
                            type="button"
                            className={styles.dayTimeRemove}
                            onClick={() => toggleDate(d)}
                            aria-label={`Verwijder ${formatDate(d)}`}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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
              </div>
            </div>

            <div className={styles.dateFooter}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={privacy}
                  onChange={(e) => setPrivacy(e.target.checked)}
                />
                <span className={styles.checkmark} />
                <span className={styles.checkboxText}>
                  Ik ga akkoord met het <TransitionLink href="/privacybeleid">privacybeleid</TransitionLink> *
                </span>
              </label>
              {submitError && (
                <p className={styles.errorMessage}>
                  Er ging iets mis: {submitError}. Probeer het opnieuw of bel ons direct.
                </p>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Sticky bottom nav bar */}
      <div className={styles.navBar}>
        <div className={styles.navBarInner}>
          <button
            type="button"
            className={`${styles.btnOutline} ${step === 0 && !categorySelected ? styles.btnDisabled : ''}`}
            disabled={step === 0 && !categorySelected}
            onClick={handleBack}
          >
            Vorige
          </button>
          {step < lastStep ? (
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
              disabled={!canNext() || submitting}
              onClick={handleSubmit}
            >
              {submitting ? 'Versturen...' : 'Verstuur'}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
