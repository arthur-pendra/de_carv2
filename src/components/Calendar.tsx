'use client';

import { useState } from 'react';
import styles from './Calendar.module.css';

type Props = {
  selected: string[];
  onToggle: (date: string) => void;
};

const weekdays = ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'];
const months = [
  'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December',
];

const toKey = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export default function Calendar({ selected, onToggle }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7; // maandag-eerst
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const prevMonth = () => {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.nav}
          onClick={prevMonth}
          disabled={!canGoPrev}
          aria-label="Vorige maand"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className={styles.monthLabel}>{months[viewMonth]} {viewYear}</span>
        <button
          type="button"
          className={styles.nav}
          onClick={nextMonth}
          aria-label="Volgende maand"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className={styles.weekdays}>
        {weekdays.map((w) => (
          <span key={w} className={styles.weekday}>{w}</span>
        ))}
      </div>

      <div className={styles.grid}>
        {cells.map((d, i) => {
          if (d === null) return <span key={`e-${i}`} className={styles.empty} />;

          const date = new Date(viewYear, viewMonth, d);
          const key = toKey(date);
          const isPast = date < today;
          const isSelected = selected.includes(key);

          return (
            <button
              key={key}
              type="button"
              className={`${styles.day} ${isPast ? styles.dayPast : styles.dayAvailable} ${isSelected ? styles.daySelected : ''}`}
              disabled={isPast}
              onClick={() => onToggle(key)}
              aria-pressed={isSelected}
            >
              {d}
            </button>
          );
        })}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendAvailable}`} />
          beschikbaar
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendSelected}`} />
          geselecteerd
        </span>
      </div>
    </div>
  );
}
