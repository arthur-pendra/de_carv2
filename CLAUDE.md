# Project Rules

## CSS Architecture

### globals.css
Bevat alle gedeelde styles:
- CSS variabelen (colors, fonts, spacing)
- Button classes (.btn, .btn-social, .btn-icon)
- Container classes (.container, .container.medium, .container.small)
- Reset styles
- Lenis smooth scroll styles

### Component CSS (*.module.css)
Bevat alleen component-specifieke styling:
- Layout voor die specifieke component
- Positionering
- Component-unieke aanpassingen

## Units

**Gebruik altijd `em` voor:**
- padding
- margin
- width/height
- gap
- letter-spacing
- font-sizes (via variabelen)

**Uitzondering:** borders mogen `px` zijn voor scherpe lijnen.

## Git

**NOOIT zelfstandig pushen naar GitHub.**
Alleen pushen wanneer expliciet gevraagd door de gebruiker.

## Variabelen

### Colors
- `--color-white` (#FFFFFF)
- `--color-black` (#070707)
- `--color-cream` (#F7F6F3)
- `--color-accent` (#012296)

### Font
- `--font` (Gd Car) — één font voor alles, wordt geërfd via body

### Typography (3 headings, 3 paragraphs)
- `--font-h1` (4em) — sectie titels
- `--font-h2` (2.5em) — sub-titels
- `--font-h3` (1.5em) — card titels
- `--font-par-lg` (1.125em) — grote paragraaf
- `--font-par` (1em) — standaard tekst
- `--font-par-sm` (0.875em) — kleine tekst

### Scaling
- `--size-container`
- `--size-font`

## Typography regels
- Geen `font-family` in component CSS — body erft `--font` al
- Alle font-sizes in `em`
- Gebruik de variabelen waar mogelijk
