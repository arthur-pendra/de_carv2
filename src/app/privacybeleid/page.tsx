import Footer from '@/components/Footer';
import styles from './privacy.module.css';

export const metadata = {
  title: 'Privacybeleid | GD Carcare',
  description: 'Privacybeleid van GD Carcare — hoe wij omgaan met je persoonsgegevens.',
};

export default function PrivacyPage() {
  return (
    <>
      <main className={styles.main}>
        <article className={styles.container}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>Privacy</span>
            <h1 className={styles.title}>Privacybeleid</h1>
            <p className={styles.lastUpdated}>Laatst bijgewerkt: 28 april 2026</p>
          </header>

          <section className={styles.section}>
            <p className={styles.lead}>
              GD Carcare hecht veel waarde aan de bescherming van jouw persoonsgegevens. In dit privacybeleid leggen we uit welke gegevens we verzamelen, waarom we dat doen, hoe we ze beveiligen en welke rechten je hebt.
            </p>
          </section>

          <section className={styles.section}>
            <h2>1. Verwerkingsverantwoordelijke</h2>
            <p>De verwerkingsverantwoordelijke van jouw persoonsgegevens is:</p>
            <ul>
              <li><strong>GD Carcare</strong></li>
              <li>Eigenaar: Guyliamo</li>
              <li>Adres: [vul straat + huisnummer in]</li>
              <li>Postcode &amp; plaats: [vul in]</li>
              <li>KvK-nummer: [vul in]</li>
              <li>BTW-nummer: [vul in]</li>
              <li>E-mail: <a href="mailto:info@gdcarcare.nl">info@gdcarcare.nl</a></li>
              <li>Telefoon: [vul in]</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>2. Welke gegevens verzamelen we</h2>
            <p>We verzamelen alleen gegevens die je zelf actief aan ons verstrekt via de website:</p>
            <h3>Bij een afspraakaanvraag</h3>
            <ul>
              <li>Voor- en achternaam</li>
              <li>E-mailadres</li>
              <li>Telefoonnummer</li>
              <li>Automerk en model</li>
              <li>Kenteken (optioneel)</li>
              <li>Kleur van het voertuig (optioneel)</li>
              <li>Gekozen pakket en voorkeursdatum/tijdstip</li>
              <li>Eventuele opmerkingen die je toevoegt</li>
            </ul>
            <h3>Bij inschrijving voor de nieuwsbrief</h3>
            <ul>
              <li>Voor- en achternaam</li>
              <li>E-mailadres</li>
            </ul>
            <h3>Automatisch verzamelde technische gegevens</h3>
            <ul>
              <li>IP-adres (via onze hostingprovider)</li>
              <li>Browsertype en apparaatinformatie</li>
              <li>Bezochte pagina&apos;s en tijdstip van bezoek</li>
            </ul>
            <p>Deze technische gegevens worden gebruikt om de website veilig en goed werkend te houden.</p>
          </section>

          <section className={styles.section}>
            <h2>3. Waarom verwerken we je gegevens</h2>
            <p>We gebruiken je gegevens uitsluitend voor de volgende doeleinden:</p>
            <ul>
              <li>Het in behandeling nemen en bevestigen van je afspraakaanvraag</li>
              <li>Telefonisch of per e-mail contact opnemen om de afspraak te bevestigen of bij te stellen</li>
              <li>Het uitvoeren van de gevraagde detailing-werkzaamheden</li>
              <li>Het versturen van facturen en het voldoen aan administratieve en fiscale verplichtingen</li>
              <li>Het verzenden van onze nieuwsbrief, alleen indien je je daarvoor hebt aangemeld</li>
              <li>Het verbeteren en beveiligen van onze website</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Op welke grondslag verwerken we je gegevens</h2>
            <p>Wij verwerken je persoonsgegevens op basis van de volgende grondslagen uit de AVG:</p>
            <ul>
              <li><strong>Uitvoering van een overeenkomst</strong> — voor het inplannen en uitvoeren van detailing-afspraken.</li>
              <li><strong>Wettelijke verplichting</strong> — voor het voeren van een correcte boekhouding en het bewaren van facturen.</li>
              <li><strong>Toestemming</strong> — voor het versturen van de nieuwsbrief. Je kunt deze toestemming op elk moment intrekken.</li>
              <li><strong>Gerechtvaardigd belang</strong> — voor het beveiligen en optimaliseren van onze website.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>5. Hoe lang bewaren we je gegevens</h2>
            <ul>
              <li>Gegevens van afspraakaanvragen die niet hebben geleid tot een afspraak: <strong>maximaal 6 maanden</strong>.</li>
              <li>Gegevens van uitgevoerde afspraken en bijbehorende facturen: <strong>7 jaar</strong>, op grond van de wettelijke fiscale bewaarplicht.</li>
              <li>Nieuwsbrief-inschrijvingen: zolang je ingeschreven blijft. Na uitschrijving worden je gegevens binnen <strong>30 dagen</strong> verwijderd.</li>
              <li>Technische logbestanden: <strong>maximaal 30 dagen</strong>.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Met wie delen we je gegevens</h2>
            <p>We delen je gegevens nooit zomaar met derden. Wel maken we gebruik van zorgvuldig geselecteerde verwerkers die ons helpen met de uitvoering van onze diensten. Met al deze partijen hebben we een verwerkersovereenkomst afgesloten:</p>
            <ul>
              <li><strong>Hostinger</strong> — domein, DNS en e-mailhosting (gevestigd in de EU).</li>
              <li><strong>Vercel</strong> — hosting van deze website (servers in de EU/VS, met EU-AVG waarborgen).</li>
              <li><strong>Resend</strong> — verzending van transactionele e-mails en nieuwsbrieven (regio EU-west-1).</li>
            </ul>
            <p>Daarnaast kan het zijn dat we gegevens moeten delen met onze boekhouder, of met overheidsinstanties als we daartoe wettelijk verplicht zijn.</p>
          </section>

          <section className={styles.section}>
            <h2>7. Cookies</h2>
            <p>Onze website gebruikt geen tracking-cookies en geen advertentie-cookies. We gebruiken uitsluitend functionele en technische cookies die nodig zijn voor het correct functioneren van de website. Voor deze cookies is volgens de AVG geen voorafgaande toestemming nodig.</p>
          </section>

          <section className={styles.section}>
            <h2>8. Beveiliging</h2>
            <p>We nemen passende technische en organisatorische maatregelen om je gegevens te beschermen tegen verlies, misbruik en ongeoorloofde toegang. Onder meer:</p>
            <ul>
              <li>Versleutelde verbindingen (HTTPS / TLS) op de hele website.</li>
              <li>Toegang tot persoonsgegevens is beperkt tot bevoegde personen.</li>
              <li>Wachtwoorden en API-sleutels worden veilig opgeslagen en geroteerd waar nodig.</li>
              <li>Regelmatige updates van software en infrastructuur.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>9. Jouw rechten</h2>
            <p>Op grond van de AVG heb je verschillende rechten met betrekking tot je persoonsgegevens:</p>
            <ul>
              <li><strong>Recht op inzage</strong> — je mag opvragen welke gegevens we van je hebben.</li>
              <li><strong>Recht op rectificatie</strong> — onjuiste gegevens laten corrigeren.</li>
              <li><strong>Recht op verwijdering</strong> — je gegevens laten verwijderen als ze niet meer nodig zijn.</li>
              <li><strong>Recht op beperking</strong> — je kunt vragen om de verwerking te beperken.</li>
              <li><strong>Recht op bezwaar</strong> — bezwaar maken tegen een bepaalde verwerking.</li>
              <li><strong>Recht op dataportabiliteit</strong> — je gegevens in een gangbaar formaat ontvangen.</li>
              <li><strong>Recht om je toestemming in te trekken</strong> — voor de nieuwsbrief, op elk moment.</li>
            </ul>
            <p>Stuur een e-mail naar <a href="mailto:info@gdcarcare.nl">info@gdcarcare.nl</a> om een van deze rechten uit te oefenen. We reageren binnen 30 dagen op je verzoek.</p>
          </section>

          <section className={styles.section}>
            <h2>10. Klacht indienen bij de Autoriteit Persoonsgegevens</h2>
            <p>
              Heb je een klacht over hoe we met je gegevens omgaan en kom je er met ons niet uit? Dan heb je het recht om een klacht in te dienen bij de Nederlandse Autoriteit Persoonsgegevens via{' '}
              <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">
                autoriteitpersoonsgegevens.nl
              </a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>11. Wijzigingen</h2>
            <p>Dit privacybeleid kan worden aangepast wanneer onze diensten of de wetgeving daarom vragen. De meest recente versie staat altijd op deze pagina. Bij ingrijpende wijzigingen informeren we ingeschreven gebruikers per e-mail.</p>
          </section>

          <section className={styles.section}>
            <h2>12. Contact</h2>
            <p>Vragen over dit privacybeleid? Neem gerust contact op via <a href="mailto:info@gdcarcare.nl">info@gdcarcare.nl</a>.</p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
