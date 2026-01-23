interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export default function Button({ children, href, onClick }: ButtonProps) {
  if (href) {
    return (
      <a href={href} className="btn">
        {children}
      </a>
    );
  }

  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}
