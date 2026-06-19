export type Category = 'exterieur' | 'interieur' | 'combi'
export type Size = 'klein' | 'middel' | 'groot'

export const categories: { key: Category; label: string; image: string; description: string }[] = [
  { key: 'exterieur', label: 'Exterieur', image: '/img/diensten/exterieur.webp', description: 'Velgen, lak en glas volledig gereinigd en beschermd' },
  { key: 'interieur', label: 'Interieur', image: '/img/diensten/interieur.webp', description: 'Bekleding, dashboard en stoelen grondig gereinigd' },
  { key: 'combi', label: 'Combi', image: '/img/diensten/combi.webp', description: 'Exterieur en interieur compleet met combivoordeel' },
]

export const sizes: { key: Size; label: string; description: string }[] = [
  { key: 'klein', label: 'Klein', description: 'Hatchback of kleine auto' }, // ter controle bij klant
  { key: 'middel', label: 'Middel', description: 'Sedan, station of compacte SUV' }, // ter controle bij klant
  { key: 'groot', label: 'Groot', description: 'Grote SUV, MPV of bus' }, // ter controle bij klant
]

export const formatPrice = (n: number) => `€${n},-`

export type AddOn = { id: string; label: string; price: number }

// Gedeelde catalogus - add-ons herhalen met vaste prijzen over pakketten heen
export const addOns: Record<string, AddOn> = {
  'bodemreiniging': { id: 'bodemreiniging', label: 'Bodemreiniging', price: 35 },
  'motorruimte': { id: 'motorruimte', label: 'Motorruimte reiniging & bescherming', price: 40 },
  'kunststof-dressing-ext': { id: 'kunststof-dressing-ext', label: 'Behandeling & dressing kunststof delen', price: 25 },
  'spray-sealant-3m': { id: 'spray-sealant-3m', label: 'Aanbrengen 3 maanden beschermende spray sealant', price: 20 },
  'wetcoat-6m': { id: 'wetcoat-6m', label: 'Aanbrengen 6 maanden beschermende wet coat', price: 30 },
  'voorruit-coating-6m': { id: 'voorruit-coating-6m', label: 'Aanbrengen 6 maanden beschermende voorruit coating', price: 50 },
  'ruiten-coaten': { id: 'ruiten-coaten', label: 'Het coaten van alle ruiten', price: 50 },
  'hondenhaar': { id: 'hondenhaar', label: 'Hondenhaar verwijdering', price: 50 },
  'hemel': { id: 'hemel', label: 'Hemel reiniging', price: 50 },
  'ozon': { id: 'ozon', label: 'Ozon behandeling / geurverwijdering', price: 75 },
  'stoombehandeling': { id: 'stoombehandeling', label: 'Stoombehandeling voor hygiënische reiniging', price: 75 },
  'dieptereiniging-zitplaats': { id: 'dieptereiniging-zitplaats', label: 'Dieptereiniging per zitplaats', price: 30 },
  'kunststof-behandeling-int': { id: 'kunststof-behandeling-int', label: 'Behandeling van alle kunststofdelen', price: 25 },
  'lederbehandeling': { id: 'lederbehandeling', label: 'Lederbehandeling voor voeding & verzorging', price: 25 },
  'impregnatie-stof': { id: 'impregnatie-stof', label: 'Impregnatie van stof, textiel & alcantara', price: 25 },
  'impregnatie-vloermatten': { id: 'impregnatie-vloermatten', label: 'Impregnatie van vloermatten', price: 25 },
}

export type PackageDetails = { heading: string; items: string[] }

export type Package = {
  id: string
  title: string
  subtitle: string
  prices: Record<Size, number>
  features: string[] // inbegrepen / overgenomen van lagere tier
  extras: string[] // nieuw in deze tier, op de card met een plusje gemarkeerd
  addOnIds: string[]
  featured?: boolean
  details?: PackageDetails[] // volledige diensten uitgeschreven (combo's), uitklapbaar op de card
}

export const packages: Record<Category, Package[]> = {
  exterieur: [
    {
      id: 'exterieur-care',
      title: 'Exterieur Care Detail',
      subtitle: 'Opfrisbeurt van het exterieur',
      prices: { klein: 79, middel: 99, groot: 119 },
      features: [
        'Reiniging van velgen, banden, wielkasten & sponningen',
        'Handwas volgens de 2-bucket methode',
        'Afspoelen met osmosewater',
        'Drogen met warme lucht & microvezeltechniek',
        'Streepvrije reiniging van ramen en spiegels',
        'Aanbrengen van bandenzwart',
      ],
      extras: [],
      addOnIds: ['bodemreiniging', 'motorruimte', 'kunststof-dressing-ext', 'spray-sealant-3m'],
    },
    {
      id: 'exterieur-premium',
      title: 'Exterieur Premium Care Detail',
      subtitle: 'Dieptereiniging van het exterieur',
      prices: { klein: 119, middel: 139, groot: 159 },
      features: [
        'Voordelen van exterieur care detail',
      ],
      extras: [
        'Motorruimte reiniging & bescherming',
        'Vliegroest, insecten, teer, lijm & hars verwijdering',
        'Aanbrengen 3 maanden beschermende spray sealant',
      ],
      addOnIds: ['bodemreiniging', 'kunststof-dressing-ext', 'wetcoat-6m', 'voorruit-coating-6m'],
      featured: true,
    },
    {
      id: 'exterieur-excellence',
      title: 'Exterieur Excellence Detail',
      subtitle: 'Dieptereiniging & bescherming van het exterieur',
      prices: { klein: 179, middel: 199, groot: 219 },
      features: [
        'Voordelen van exterieur premium care detail',
      ],
      extras: [
        'Aanbrengen 6 maanden beschermende wet coat',
        'Behandeling & dressing van alle kunststofdelen',
        'Aanbrengen 6 maanden beschermende voorruit coating',
      ],
      addOnIds: ['bodemreiniging', 'ruiten-coaten'],
    },
  ],
  interieur: [
    {
      id: 'interieur-care',
      title: 'Interieur Care Detail',
      subtitle: 'Opfrisbeurt van het interieur',
      prices: { klein: 79, middel: 99, groot: 119 },
      features: [
        'Uitblazen van het volledige interieur',
        'Stofzuigen van vloeren, matten, bekleding & kofferruimte',
        'Reinigen van dashboard, middenconsole, deurpanelen & instaplijsten',
        'Lichte oppervlakkige vlekverwijdering',
        'Streepvrije reiniging van ramen en spiegels',
        'Aanbrengen van een subtiele auto parfum',
      ],
      extras: [],
      addOnIds: ['hondenhaar', 'hemel', 'ozon', 'stoombehandeling', 'dieptereiniging-zitplaats', 'kunststof-behandeling-int'],
    },
    {
      id: 'interieur-premium',
      title: 'Interieur Premium Care Detail',
      subtitle: 'Dieptereiniging van het interieur',
      prices: { klein: 159, middel: 179, groot: 199 },
      features: [
        'Voordelen van interieur care detail',
      ],
      extras: [
        'Dieptereiniging van bekleding (stof, textiel, alcantara & leder)',
        'Intensieve reiniging van vloer & automatten',
      ],
      addOnIds: ['hondenhaar', 'hemel', 'ozon', 'stoombehandeling', 'kunststof-behandeling-int', 'lederbehandeling', 'impregnatie-stof', 'impregnatie-vloermatten'],
      featured: true,
    },
    {
      id: 'interieur-excellence',
      title: 'Interieur Excellence Detail',
      subtitle: 'Dieptereiniging & bescherming van het interieur',
      prices: { klein: 199, middel: 219, groot: 239 },
      features: [
        'Voordelen van interieur premium care detail',
      ],
      extras: [
        'Lederbehandeling voor voeding & verzorging',
        'Impregnatie van stof, textiel & alcantara',
        'Impregnatie van vloermatten',
        'Behandeling van alle kunststofdelen',
      ],
      addOnIds: ['hondenhaar', 'hemel', 'ozon', 'stoombehandeling'],
    },
  ],
  combi: [
    {
      id: 'combi-care',
      title: 'Complete Care Detail',
      subtitle: 'Opfrisbeurt van het volledige voertuig',
      prices: { klein: 139, middel: 179, groot: 219 },
      features: [
        'Voordelen van exterieur care detail',
        'Voordelen van interieur care detail',
      ],
      extras: [
        'Voordeel met onze combodeal',
      ],
      addOnIds: ['bodemreiniging', 'motorruimte', 'kunststof-dressing-ext', 'spray-sealant-3m', 'hondenhaar', 'hemel', 'ozon', 'stoombehandeling', 'dieptereiniging-zitplaats', 'kunststof-behandeling-int'],
    },
    {
      id: 'combi-premium',
      title: 'Complete Premium Care Detail',
      subtitle: 'Dieptereiniging van het volledige voertuig',
      prices: { klein: 239, middel: 279, groot: 319 },
      features: [
        'Voordelen van exterieur premium care detail',
        'Voordelen van interieur premium care detail',
      ],
      extras: [
        'Voordeel met onze combodeal',
      ],
      addOnIds: ['bodemreiniging', 'kunststof-dressing-ext', 'wetcoat-6m', 'voorruit-coating-6m', 'hondenhaar', 'hemel', 'ozon', 'stoombehandeling', 'kunststof-behandeling-int', 'lederbehandeling', 'impregnatie-stof', 'impregnatie-vloermatten'],
      featured: true,
    },
    {
      id: 'combi-excellence',
      title: 'Complete Excellence Detail',
      subtitle: 'Dieptereiniging & bescherming van het volledige voertuig',
      prices: { klein: 339, middel: 379, groot: 419 },
      features: [
        'Voordelen van exterieur excellence detail',
        'Voordelen van interieur excellence detail',
      ],
      extras: [
        'Voordeel met onze combodeal',
      ],
      addOnIds: ['bodemreiniging', 'ruiten-coaten', 'hondenhaar', 'hemel', 'ozon', 'stoombehandeling'],
    },
  ],
}

// Volledige dienstenlijst van een tier: basis + alle extra's t/m die tier
const fullServices = (tiers: Package[], tierIndex: number): string[] => [
  ...tiers[0].features,
  ...tiers.slice(1, tierIndex + 1).flatMap((t) => t.extras),
]

// Combo's krijgen uitklapbare details zodat duidelijk is wat er echt inbegrepen zit
packages.combi.forEach((combo, i) => {
  combo.details = [
    { heading: 'Exterieur', items: fullServices(packages.exterieur, i) },
    { heading: 'Interieur', items: fullServices(packages.interieur, i) },
  ]
})
