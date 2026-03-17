'use client';

import TransitionLink from './TransitionLink';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export default function Button({ children, href, onClick }: ButtonProps) {
  if (href) {
    return (
      <TransitionLink href={href} className="btn" onClick={onClick}>
        {children}
      </TransitionLink>
    );
  }

  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}
