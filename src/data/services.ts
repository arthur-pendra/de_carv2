// Lokale SEO landingspagina's per dienst. Elke pagina richt zich op een
// zoekterm + plaats (Heerlen / Parkstad / Limburg) en linkt door naar /start.

export type ServiceContent = {
  slug: string
  eyebrow: string
  h1: string
  metaTitle: string
  metaDescription: string
  intro: string
  sections: { heading: string; body: string }[]
  benefits: string[]
}

export const services: ServiceContent[] = [
  {
    slug: 'keramische-coating',
    eyebrow: 'Keramische coating Heerlen',
    h1: 'Keramische coating in Heerlen',
    metaTitle: 'Keramische coating Heerlen | GD Carcare',
    metaDescription:
      'Keramische coating laten aanbrengen in Heerlen en Parkstad. Langdurige lakbescherming tegen vuil, UV en weersinvloeden. Vaste prijzen, online te boeken bij GD Carcare.',
    intro:
      'Wil je je auto in Heerlen of de rest van Limburg langdurig beschermen? Met een professionele keramische coating krijgt je lak een harde, vuilafstotende beschermlaag die jaren meegaat. Bij GD Carcare brengen we de coating aan na een grondige voorbereiding, zodat het resultaat diep glanst en optimaal beschermt.',
    sections: [
      {
        heading: 'Wat is een keramische coating?',
        body: 'Een keramische coating is een vloeibare beschermlaag die zich chemisch hecht aan de blanke lak van je auto. Eenmaal uitgehard vormt de coating een hydrofoob oppervlak: water en vuil parelen eraf en hechten veel minder. Daardoor blijft je auto langer schoon, is hij makkelijker te wassen en blijft de lak beschermd tegen UV-straling, vogelpoep, strooizout en industriele neerslag.',
      },
      {
        heading: 'Onze werkwijze',
        body: 'Een coating is zo goed als de voorbereiding. We reinigen eerst de complete auto, voeren een chemische decontaminatie en klei-behandeling uit en corrigeren waar nodig de lak met een polijstbeurt. Pas als het oppervlak perfect schoon en glad is, brengen we de keramische coating laag voor laag aan en laten we deze gecontroleerd uitharden.',
      },
      {
        heading: 'Voor wie in Heerlen en Parkstad?',
        body: 'Een keramische coating is ideaal voor zowel je dagelijkse auto als een liefhebbersauto. Rijd je veel in en rond Heerlen, Kerkrade, Landgraaf of Brunssum, dan bespaart de coating je veel waststraat-bezoeken en houdt hij je lak jarenlang in topconditie. We adviseren je vrijblijvend welke coating bij jouw voertuig en gebruik past.',
      },
    ],
    benefits: [
      'Jarenlange bescherming van de lak',
      'Vuil- en waterafstotend, minder vaak wassen',
      'Diepe glans en kleurintensiteit',
      'Bescherming tegen UV, strooizout en vogelpoep',
    ],
  },
  {
    slug: 'lakcorrectie-polijsten',
    eyebrow: 'Lakcorrectie & polijsten Heerlen',
    h1: 'Lakcorrectie en polijsten in Heerlen',
    metaTitle: 'Lakcorrectie & polijsten Heerlen | GD Carcare',
    metaDescription:
      'Krassen, swirls en waas uit je lak laten polijsten in Heerlen. Professionele lakcorrectie door GD Carcare voor een diepe, egale glans. Vrijblijvend advies en vaste prijzen.',
    intro:
      'Doffe lak, swirls of lichte krassen? Met professionele lakcorrectie en polijsten halen we de glans terug in je auto. GD Carcare werkt in Heerlen en heel Limburg en herstelt de lak gecontroleerd, zonder onnodig materiaal weg te nemen.',
    sections: [
      {
        heading: 'Wat is lakcorrectie?',
        body: 'Bij lakcorrectie bewerken we de blanke lak gecontroleerd met polijstmachines en verschillende pads en pasta. Zo verwijderen we swirls, wasstraatkrassen, houtnerf en oxidatie uit de toplaag. Het resultaat is een egale, diep glanzende lak die er weer als nieuw uitziet.',
      },
      {
        heading: 'Polijsten in combinatie met bescherming',
        body: 'Polijsten leg je het beste vast met bescherming. Daarom combineren we lakcorrectie vaak met een sealant of keramische coating, zodat het resultaat lang behouden blijft. Zonder bescherming komen swirls na verloop van tijd weer terug door verkeerd wassen.',
      },
      {
        heading: 'Eerlijk advies vooraf',
        body: 'Elke lak is anders. We beoordelen de staat van het voertuig en bepalen samen of een one-step of een meertraps correctie nodig is. Je krijgt vooraf een duidelijk beeld van het te verwachten resultaat en de prijs, zonder verrassingen achteraf.',
      },
    ],
    benefits: [
      'Verwijdert swirls, krassen en waas',
      'Diepe, egale glans terug in de lak',
      'Gecontroleerd werk, lakdikte gemeten',
      'Combineerbaar met coating voor blijvend resultaat',
    ],
  },
  {
    slug: 'interieur-detailing',
    eyebrow: 'Interieur detailing Heerlen',
    h1: 'Interieur detailing in Heerlen',
    metaTitle: 'Interieur detailing & reiniging Heerlen | GD Carcare',
    metaDescription:
      'Interieur van je auto professioneel laten reinigen in Heerlen. Diepgaande reiniging van bekleding, dashboard en stoelen voor een frisse rijervaring. Online te boeken bij GD Carcare.',
    intro:
      'Een schoon interieur maakt elke rit prettiger. GD Carcare verzorgt in Heerlen en omgeving een diepgaande interieurreiniging van bekleding, dashboard, vloer en ramen, afgestemd op de staat van je auto.',
    sections: [
      {
        heading: 'Wat valt er onder interieur detailing?',
        body: 'We blazen en stofzuigen het volledige interieur, reinigen dashboard, middenconsole, deurpanelen en instaplijsten en verwijderen vlekken uit de bekleding. Stof, textiel, alcantara en leder behandelen we elk met de juiste producten. Tot slot reinigen we de ramen streepvrij en brengen we een subtiele geur aan.',
      },
      {
        heading: 'Dieptereiniging en bescherming',
        body: 'Bij hardnekkige vervuiling gaan we een stap verder met dieptereiniging, stoombehandeling of een ozonbehandeling tegen geurtjes. Leder voeden en verzorgen we, en stof en vloermatten kunnen we impregneren zodat ze vuil en vocht beter afstoten.',
      },
      {
        heading: 'Honden, kinderen en dagelijks gebruik',
        body: 'Rijd je dagelijks rond Heerlen met kinderen of huisdieren, dan krijgt je interieur veel te verduren. Wij verwijderen hondenhaar, etensresten en ingesleten vuil, zodat je auto weer fris en hygienisch aanvoelt.',
      },
    ],
    benefits: [
      'Diepgaande reiniging van bekleding en dashboard',
      'Vlek-, geur- en hondenhaarverwijdering',
      'Leder- en textielverzorging op maat',
      'Frisse, hygienische rijervaring',
    ],
  },
  {
    slug: 'exterieur-detailing',
    eyebrow: 'Exterieur detailing Heerlen',
    h1: 'Exterieur detailing in Heerlen',
    metaTitle: 'Exterieur detailing & reiniging Heerlen | GD Carcare',
    metaDescription:
      'Buitenkant van je auto professioneel laten reinigen en beschermen in Heerlen. Velgen, lak en glas grondig gereinigd door GD Carcare. Vaste prijzen, online te boeken.',
    intro:
      'De buitenkant van je auto is je visitekaartje. GD Carcare reinigt en beschermt in Heerlen en heel Limburg de complete buitenkant: velgen, banden, lak en glas, volgens een veilige methode die de lak spaart.',
    sections: [
      {
        heading: 'Veilig wassen zonder swirls',
        body: 'Wij wassen handmatig volgens de 2-bucket methode en spoelen na met osmosewater, zodat er geen kalkvlekken achterblijven. Velgen, banden, wielkasten en sponningen reinigen we apart. Zo voorkomen we de krasjes die in een wasstraat ontstaan.',
      },
      {
        heading: 'Reiniging en bescherming',
        body: 'Na het wassen verwijderen we vliegroest, insecten, teer en industriele neerslag van de lak. Vervolgens brengen we bescherming aan, van een spray sealant tot een wet coat, zodat je lak weken tot maanden beschermd blijft en water er mooi vanaf parelt.',
      },
      {
        heading: 'Voor elke auto in Parkstad',
        body: 'Of je nu in Heerlen, Landgraaf, Kerkrade of Brunssum woont, een exterieurbehandeling houdt je auto langer mooi en beschermd tegen het Limburgse weer. Kies zelf je niveau, van een opfrisbeurt tot een complete dieptereiniging met langdurige bescherming.',
      },
    ],
    benefits: [
      'Handwas zonder swirls, veilig voor de lak',
      'Velgen, banden en glas grondig gereinigd',
      'Vliegroest, teer en insecten verwijderd',
      'Langdurige bescherming tegen weer en vuil',
    ],
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
