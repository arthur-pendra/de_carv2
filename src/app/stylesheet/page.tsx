import styles from './stylesheet.module.css';
import Button from '@/components/Button';

export default function StylesheetPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Stylesheet</h1>

        {/* Colors */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Colors</h2>
          <div className={styles.colorGrid}>
            <div className={styles.colorCard}>
              <div className={styles.colorSwatch} style={{ background: 'var(--color-black)' }} />
              <span className={styles.colorName}>--color-black</span>
              <span className={styles.colorValue}>#070707</span>
            </div>
            <div className={styles.colorCard}>
              <div className={styles.colorSwatch} style={{ background: 'var(--color-white)', border: '1px solid var(--color-black)' }} />
              <span className={styles.colorName}>--color-white</span>
              <span className={styles.colorValue}>#FFFFFF</span>
            </div>
            <div className={styles.colorCard}>
              <div className={styles.colorSwatch} style={{ background: 'var(--color-cream)', border: '1px solid var(--color-black)' }} />
              <span className={styles.colorName}>--color-cream</span>
              <span className={styles.colorValue}>#F7F6F3</span>
            </div>
            <div className={styles.colorCard}>
              <div className={styles.colorSwatch} style={{ background: 'var(--color-accent)' }} />
              <span className={styles.colorName}>--color-accent</span>
              <span className={styles.colorValue}>#012296</span>
            </div>
          </div>
        </section>

        {/* White Transparency */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>White Transparency</h2>
          <div className={styles.transparencyGrid}>
            <div className={styles.transparencyCard}>
              <div className={styles.transparencySwatch} style={{ background: 'var(--white-subtle)' }} />
              <span className={styles.colorName}>--white-subtle</span>
              <span className={styles.colorValue}>rgba(255,255,255,0.05)</span>
            </div>
            <div className={styles.transparencyCard}>
              <div className={styles.transparencySwatch} style={{ background: 'var(--white-light)' }} />
              <span className={styles.colorName}>--white-light</span>
              <span className={styles.colorValue}>rgba(255,255,255,0.15)</span>
            </div>
            <div className={styles.transparencyCard}>
              <div className={styles.transparencySwatch} style={{ background: 'var(--white-medium)' }} />
              <span className={styles.colorName}>--white-medium</span>
              <span className={styles.colorValue}>rgba(255,255,255,0.2)</span>
            </div>
            <div className={styles.transparencyCard}>
              <div className={styles.transparencySwatch} style={{ background: 'var(--white-strong)' }} />
              <span className={styles.colorName}>--white-strong</span>
              <span className={styles.colorValue}>rgba(255,255,255,0.5)</span>
            </div>
            <div className={styles.transparencyCard}>
              <div className={styles.transparencySwatch} style={{ background: 'var(--white-bright)' }} />
              <span className={styles.colorName}>--white-bright</span>
              <span className={styles.colorValue}>rgba(255,255,255,0.7)</span>
            </div>
            <div className={styles.transparencyCard}>
              <div className={styles.transparencySwatch} style={{ background: 'var(--white-solid)' }} />
              <span className={styles.colorName}>--white-solid</span>
              <span className={styles.colorValue}>rgba(255,255,255,0.9)</span>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Typography</h2>
          <div className={styles.typeGrid}>
            <div className={styles.typeItem}>
              <span className={styles.typeLabel}>--font-h1 (3em)</span>
              <p className={styles.fontH1}>Heading 1</p>
            </div>
            <div className={styles.typeItem}>
              <span className={styles.typeLabel}>--font-h2 (2em)</span>
              <p className={styles.fontH2}>Heading 2</p>
            </div>
            <div className={styles.typeItem}>
              <span className={styles.typeLabel}>--font-h3 (1.5em)</span>
              <p className={styles.fontH3}>Heading 3</p>
            </div>
            <div className={styles.typeItem}>
              <span className={styles.typeLabel}>--font-h4 (1.25em)</span>
              <p className={styles.fontH4}>Heading 4</p>
            </div>
            <div className={styles.typeItem}>
              <span className={styles.typeLabel}>--font-par (1em)</span>
              <p className={styles.fontPar}>Paragraph text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className={styles.typeItem}>
              <span className={styles.typeLabel}>--font-small (0.875em)</span>
              <p className={styles.fontSmall}>Small text - Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </section>

        {/* Fonts */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Fonts</h2>
          <div className={styles.fontGrid}>
            <div className={styles.fontItem}>
              <span className={styles.typeLabel}>--font-primary (Gd Car)</span>
              <p className={styles.fontPrimary}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className={styles.fontPrimary}>abcdefghijklmnopqrstuvwxyz</p>
              <p className={styles.fontPrimary}>0123456789</p>
            </div>
            <div className={styles.fontItem}>
              <span className={styles.typeLabel}>--font-secondary (Inter)</span>
              <p className={styles.fontSecondary}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className={styles.fontSecondary}>abcdefghijklmnopqrstuvwxyz</p>
              <p className={styles.fontSecondary}>0123456789</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Buttons</h2>
          <div className={styles.buttonGrid}>
            <div className={styles.buttonItem}>
              <span className={styles.typeLabel}>Primary (Mail)</span>
              <Button theme="primary">Contact</Button>
            </div>
            <div className={styles.buttonItem}>
              <span className={styles.typeLabel}>Primary + Icon</span>
              <Button theme="primary" icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"></path></svg>}>Mail ons</Button>
            </div>
            <div className={styles.buttonItem}>
              <span className={styles.typeLabel}>Dark</span>
              <Button theme="dark">Learn More</Button>
            </div>
            <div className={styles.buttonItem}>
              <span className={styles.typeLabel}>Dark + Icon</span>
              <Button theme="dark" icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8L7.00372 8V6H18.0037V17H16.0037V9.41421Z"></path></svg>}>Bekijk</Button>
            </div>
            <div className={styles.buttonItem}>
              <span className={styles.typeLabel}>Light</span>
              <Button theme="light">View All</Button>
            </div>
            <div className={styles.buttonItem}>
              <span className={styles.typeLabel}>Light + Icon</span>
              <Button theme="light" icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8L7.00372 8V6H18.0037V17H16.0037V9.41421Z"></path></svg>}>Meer info</Button>
            </div>
          </div>
        </section>

        {/* Containers */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Containers</h2>
          <div className={styles.containerDemo}>
            <span className={styles.typeLabel}>.container (100%)</span>
            <div className={styles.containerFull} />
          </div>
          <div className={styles.containerDemo}>
            <span className={styles.typeLabel}>.container.medium (85%)</span>
            <div className={styles.containerMedium} />
          </div>
          <div className={styles.containerDemo}>
            <span className={styles.typeLabel}>.container.small (70%)</span>
            <div className={styles.containerSmall} />
          </div>
        </section>

      </div>
    </div>
  );
}
