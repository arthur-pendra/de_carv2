'use client';

import { useCallback, useRef } from 'react';
import styles from './CopyEmailButton.module.css';

const EMAIL = 'info@gdcarcosmetics.nl';

export default function CopyEmailButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCopy = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    navigator.clipboard.writeText(EMAIL).then(() => {
      button.setAttribute('data-copy-button', 'copied');
      button.setAttribute('aria-label', 'Email copied to clipboard!');
    });
  }, []);

  const handleInteraction = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      if (
        e.type === 'click' ||
        (e.type === 'keydown' &&
          ((e as React.KeyboardEvent).key === 'Enter' ||
            (e as React.KeyboardEvent).key === ' '))
      ) {
        e.preventDefault();
        handleCopy();
      }
    },
    [handleCopy]
  );

  const resetState = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;
    button.removeAttribute('data-copy-button');
    button.setAttribute('aria-label', 'Copy email to clipboard');
  }, []);

  return (
    <button
      ref={buttonRef}
      aria-label="Copy email to clipboard"
      className={styles.button}
      onClick={handleInteraction}
      onKeyDown={handleInteraction}
      onMouseLeave={(e) => {
        resetState();
        (e.currentTarget as HTMLButtonElement).blur();
      }}
      onBlur={resetState}
    >
      <div className={styles.iconWrap}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16 2H8V5H16V2Z"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3H17.5L19 4.5V19.5L17.5 21H6.5L5 19.5V4.5L6.5 3H8"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={styles.textWrap}>
        <span className={styles.textEl}>{EMAIL}</span>
        <span className={styles.textEl}>Click to copy email</span>
        <span className={styles.textEl}>Copied to clipboard!</span>
      </div>
    </button>
  );
}
