# Design: pakketten, voertuiggrootte & add-ons verwerken

Datum: 2026-06-19

## Doel
De accurate pakket- en prijsinformatie van de klant (GD Carcare) verwerken in de site:
- Prijs per voertuiggrootte (Klein / Middel / Groot) i.p.v. één vaste prijs
- Add-ons per pakket, aanklikbaar in de boekingsflow met live totaal
- Feature-lijsten bijwerken naar de accurate data
- Combo's verwijzen naar de echte exterieur-/interieurnamen

## Beslissingen (afgestemd met gebruiker)
1. Add-ons: volledig selecteerbaar in de boeking, optellen bij pakketprijs, meesturen naar de booking-API.
2. Combo-pakketten: aligneren naar de echte namen (Care / Premium Care / Excellence).
3. Voertuiggrootte: site toont "Vanaf €X" (Klein-prijs); grootte wordt gekozen in de boekingsflow en bepaalt de pakketprijs waar add-ons bovenop komen.

## 1. Datamodel — `src/data/packages.ts`

```ts
export type Category = 'exterieur' | 'interieur' | 'combi'
export type Size = 'klein' | 'middel' | 'groot'

export const sizes: { key: Size; label: string; description: string }[] = [
  { key: 'klein',  label: 'Klein',  description: 'Hatchback of kleine auto' },        // ter controle
  { key: 'middel', label: 'Middel', description: 'Sedan, station of compacte SUV' },  // ter controle
  { key: 'groot',  label: 'Groot',  description: 'Grote SUV, MPV of bus' },           // ter controle
]

export type AddOn = { id: string; label: string; price: number }

// Gedeelde catalogus: add-ons herhalen met vaste prijzen over pakketten heen
export const addOns: Record<string, AddOn> = { /* zie sectie 3 */ }

export type Package = {
  id: string
  title: string
  subtitle: string
  prices: Record<Size, number>   // { klein, middel, groot }
  features: string[]
  addOnIds: string[]
  featured?: boolean
}

export const formatPrice = (n: number) => `€${n},-`
```

Bestaande consumers (`Services.tsx`, `BookingForm.tsx`, `api/booking`) importeren uit dit bestand. `Package.price: string` vervalt en wordt `prices: Record<Size, number>`.

## 2. Pakketten — prijzen & features

Prijzen (Klein / Middel / Groot):

| Pakket | Klein | Middel | Groot |
|---|---|---|---|
| Exterieur Care Detail | 79 | 99 | 119 |
| Exterieur Premium Care Detail | 119 | 139 | 159 |
| Exterieur Excellence Detail | 179 | 199 | 219 |
| Interieur Care Detail | 79 | 99 | 119 |
| Interieur Premium Care Detail | 159 | 179 | 199 |
| Interieur Excellence Detail | 199 | 219 | 239 |
| Complete Care Detail | 139 | 179 | 219 |
| Complete Premium Care Detail | 239 | 279 | 319 |
| Complete Excellence Detail | 339 | 379 | 419 |

Features (accurate data, kaartstijl, overerf-patroon "Voordelen van [lagere tier]" + nieuwe items, geen em-dashes):

**Exterieur Care**
- Reiniging van velgen, banden, wielkasten & sponningen
- Handwas volgens de 2-bucket methode
- Afspoelen met osmosewater
- Drogen met warme lucht & microvezeltechniek
- Streepvrije reiniging van ramen en spiegels
- Aanbrengen van bandenzwart

**Exterieur Premium Care** (featured)
- Voordelen van exterieur care detail
- Motorruimte reiniging & bescherming
- Vliegroest, insecten, teer, lijm & hars verwijdering
- Aanbrengen 3 maanden beschermende spray sealant

**Exterieur Excellence**
- Voordelen van exterieur premium care detail
- Aanbrengen 6 maanden beschermende wet coat
- Behandeling & dressing van alle kunststofdelen
- Aanbrengen 6 maanden beschermende voorruit coating

**Interieur Care**
- Uitblazen van het volledige interieur
- Stofzuigen van vloeren, matten, bekleding & kofferruimte
- Reinigen van dashboard, middenconsole, deurpanelen & instaplijsten
- Lichte oppervlakkige vlekverwijdering
- Streepvrije reiniging van ramen en spiegels
- Aanbrengen van een subtiele auto parfum

**Interieur Premium Care** (featured)
- Voordelen van interieur care detail
- Dieptereiniging van bekleding (stof, textiel, alcantara & leder)
- Intensieve reiniging van vloer & automatten

**Interieur Excellence**
- Voordelen van interieur premium care detail
- Lederbehandeling voor voeding & verzorging
- Impregnatie van stof, textiel & alcantara
- Impregnatie van vloermatten
- Behandeling van alle kunststofdelen

**Complete Care**
- Voordelen van exterieur care detail
- Voordelen van interieur care detail
- Profiteer van voordeel met onze combodeal

**Complete Premium Care** (featured)
- Voordelen van exterieur premium care detail
- Voordelen van interieur premium care detail
- Profiteer van voordeel met onze combodeal

**Complete Excellence**
- Voordelen van exterieur excellence detail
- Voordelen van interieur excellence detail
- Profiteer van voordeel met onze combodeal

Subtitles blijven zoals nu (passend per tier).

## 3. Add-on catalogus

| id | label | prijs |
|---|---|---|
| bodemreiniging | Bodemreiniging | 35 |
| motorruimte | Motorruimte reiniging & bescherming | 40 |
| kunststof-dressing-ext | Behandeling & dressing kunststof delen | 25 |
| spray-sealant-3m | Aanbrengen 3 maanden beschermende spray sealant | 20 |
| wetcoat-6m | Aanbrengen 6 maanden beschermende wet coat | 30 |
| voorruit-coating-6m | Aanbrengen 6 maanden beschermende voorruit coating | 50 |
| ruiten-coaten | Het coaten van alle ruiten | 50 |
| hondenhaar | Hondenhaar verwijdering | 50 |
| hemel | Hemel reiniging | 50 |
| ozon | Ozon behandeling / geurverwijdering | 75 |
| stoombehandeling | Stoombehandeling voor hygiënische reiniging | 75 |
| dieptereiniging-zitplaats | Dieptereiniging per zitplaats | 30 |
| kunststof-behandeling-int | Behandeling van alle kunststofdelen | 25 |
| lederbehandeling | Lederbehandeling voor voeding & verzorging | 25 |
| impregnatie-stof | Impregnatie van stof, textiel & alcantara | 25 |
| impregnatie-vloermatten | Impregnatie van vloermatten | 25 |

Let op: `kunststof-dressing-ext` (exterieur) en `kunststof-behandeling-int` (interieur) zijn aparte items (beide €25). `ruiten-coaten` en `voorruit-coating-6m` zijn ook verschillend (beide €50).

Add-ons per pakket (`addOnIds`):

- **Exterieur Care**: bodemreiniging, motorruimte, kunststof-dressing-ext, spray-sealant-3m
- **Exterieur Premium**: bodemreiniging, kunststof-dressing-ext, wetcoat-6m, voorruit-coating-6m
- **Exterieur Excellence**: bodemreiniging, ruiten-coaten
- **Interieur Care**: hondenhaar, hemel, ozon, stoombehandeling, dieptereiniging-zitplaats, kunststof-behandeling-int
- **Interieur Premium**: hondenhaar, hemel, ozon, stoombehandeling, kunststof-behandeling-int, lederbehandeling, impregnatie-stof, impregnatie-vloermatten
- **Interieur Excellence**: hondenhaar, hemel, ozon, stoombehandeling
- **Complete Care**: bodemreiniging, motorruimte, kunststof-dressing-ext, spray-sealant-3m, hondenhaar, hemel, ozon, stoombehandeling, dieptereiniging-zitplaats, kunststof-behandeling-int
- **Complete Premium**: bodemreiniging, kunststof-dressing-ext, wetcoat-6m, voorruit-coating-6m, hondenhaar, hemel, ozon, stoombehandeling, kunststof-behandeling-int, lederbehandeling, impregnatie-stof, impregnatie-vloermatten
- **Complete Excellence**: bodemreiniging, ruiten-coaten, hondenhaar, hemel, ozon, stoombehandeling

## 4. Weergave op de site — `PackageCard.tsx` / `Services.tsx`
- `PackageCard` toont "Vanaf {formatPrice(pkg.prices.klein)}". Geen layoutwijziging; alleen de prijsbron verandert.
- `Services.tsx`: geen functionele wijziging behalve het nieuwe datatype. CTA blijft `/start?dienst=<title>`.
- Add-ons worden NIET op de homepage-kaart getoond (alleen in de boeking), conform afspraak.

## 5. Boekingsflow — `BookingForm.tsx`
Nieuwe stap "Opties" tussen Pakket en Auto. Stappen: `Pakket → Opties → Auto → Contact → Datum` (stepLabels uitbreiden; step-indices schuiven op).

State-uitbreiding:
- `selectedSize: Size | null`
- `selectedAddOns: string[]` (add-on id's)

Opties-stap (`step === 1`):
- Voertuiggrootte: 3 keuzekaarten (Klein/Middel/Groot) met prijs per grootte voor het gekozen pakket. Verplicht.
- Add-ons: checkboxes, alleen `pkg.addOnIds`. Optioneel. Elk toont label + prijs.
- Live totaal: `prices[selectedSize] + som(selectedAddOns)`, via `formatPrice`.

Afgeleide helpers:
- `basePrice = selectedSize ? pkg.prices[selectedSize] : null`
- `addOnsTotal = selectedAddOns.reduce(...)`
- `total = basePrice + addOnsTotal`

Aanpassingen aan bestaande logica:
- `canNext()`: stap 1 (Opties) vereist `selectedSize !== null`. Overige stappen schuiven één index op (Auto=2, Contact=3, Datum=4); submit op step 4.
- `handleBack()`: bij terug vanaf Opties naar pakketkeuze.
- Deep-link `?dienst=`: zet `step` naar 1 (Opties) i.p.v. de auto-stap, zodat grootte alsnog gekozen wordt.
- "Gekozen pakket"-banner (zichtbaar na stap 1): toont pakket + grootte + totaal.
- Bevestigingsscherm: extra regels Grootte, Add-ons (lijst), Totaal.
- `handleSubmit` payload uitbreiden (zie sectie 6).

## 6. Booking-API — `api/booking/route.ts`
`BookingPayload` uitbreiden:
```ts
package: { title: string }
size: { key: string; label: string }
basePrice: number
addOns: { label: string; price: number }[]
total: number
```
(`price`-string op package vervalt; we sturen `basePrice` + `total` als getallen, geformatteerd in de mail.)

`detailRows` krijgt: Grootte, per add-on een regel of een samengevatte lijst, en Totaal. Validatie uitbreiden met `size` en `total`.

## Open punt ter controle bij klant
De definities van Klein/Middel/Groot staan niet in de aangeleverde data. Voorlopige omschrijvingen zijn ingevuld met `// ter controle`. Te bevestigen door de klant.

## Niet in scope
- Geen wijziging aan andere secties (Hero, WhyUs, Reviews, FAQ, Footer).
- Geen CMS; data blijft hardcoded in `packages.ts`.
- Add-ons niet tonen op de homepage-kaart.
