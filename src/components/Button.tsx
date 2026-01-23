'use client';

import { useRef } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  theme?: 'primary' | 'dark' | 'light';
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export default function Button({ children, theme = 'primary', icon, href, onClick }: ButtonProps) {
  const circleRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    updateCirclePosition(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    updateCirclePosition(e);
  };

  const updateCirclePosition = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (circleRef.current) {
      circleRef.current.style.left = `${x}%`;
      circleRef.current.style.top = `${y}%`;
    }
  };

  const content = (
    <>
      <div className="btn__bg" />
      <div className="btn__circle-wrap">
        <div className="btn__circle" ref={circleRef} />
      </div>
      {icon && (
        <div className="btn__icon">
          {icon}
        </div>
      )}
      <span className="btn__text">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="btn"
        data-theme={theme}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className="btn"
      data-theme={theme}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </button>
  );
}
