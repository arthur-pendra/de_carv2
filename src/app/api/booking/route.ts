import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type BookingPayload = {
  package: { tag: string; title: string; price: string }
  car: { brand: string; plate: string; color: string }
  contact: { name: string; phone: string; email: string }
  dates: string[]
  time: string
  notes: string
}

const escape = (s: string) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const formatDateNL = (d: string) => {
  const date = new Date(d + 'T00:00:00')
  return date.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })
}

const timeLabel = (t: string) =>
  ({ ochtend: 'Ochtend', middag: 'Middag', avond: 'Avond' }[t] ?? t)

const detailRows = (data: BookingPayload): [string, string][] => {
  const rows: [string, string][] = [
    ['Pakket', `${data.package.tag} ${data.package.title} (${data.package.price})`],
    ['Auto', [data.car.brand, data.car.color, data.car.plate].filter(Boolean).join(' — ')],
    ['Naam', data.contact.name],
    ['Telefoon', data.contact.phone],
    ['E-mail', data.contact.email],
    ['Voorkeursdagen', data.dates.map(formatDateNL).join(', ')],
    ['Tijdstip', timeLabel(data.time)],
  ]
  if (data.notes) rows.push(['Opmerkingen', data.notes])
  return rows
}

const renderTable = (rows: [string, string][]) =>
  rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#666;font-size:13px;width:35%;">${escape(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#070707;font-size:14px;">${escape(value)}</td>
        </tr>`,
    )
    .join('')

const wrapEmail = (eyebrow: string, title: string, intro: string, tableHtml: string, footer: string) => `<!doctype html>
<html lang="nl">
  <body style="margin:0;background:#f7f6f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#070707;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f6f3;padding:24px 0;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;max-width:600px;">
          <tr>
            <td style="background:#012296;color:#fff;padding:24px 28px;">
              <div style="font-size:13px;letter-spacing:0.08em;opacity:0.7;">${eyebrow}</div>
              <div style="font-size:22px;margin-top:4px;">${title}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px;">
              <p style="margin:0 0 16px 0;font-size:14px;color:#444;line-height:1.5;">${intro}</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:6px;border-collapse:separate;">
                ${tableHtml}
              </table>
              <p style="margin:20px 0 0 0;font-size:13px;color:#888;line-height:1.5;">${footer}</p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`

const renderInternalEmail = (data: BookingPayload) =>
  wrapEmail(
    'GD CARCARE',
    'Nieuwe afspraakaanvraag',
    'Er is een nieuwe afspraakaanvraag binnengekomen via de website.',
    renderTable(detailRows(data)),
    `Reageer direct op deze e-mail om met ${escape(data.contact.name)} contact op te nemen.`,
  )

const renderCustomerEmail = (data: BookingPayload) =>
  wrapEmail(
    'GD CARCARE',
    `Bedankt, ${escape(data.contact.name.split(' ')[0])}!`,
    'We hebben je aanvraag goed ontvangen. We nemen binnen 24 uur contact met je op om de afspraak te bevestigen.',
    renderTable(detailRows(data)),
    'Klopt er iets niet? Antwoord direct op deze mail of bel ons. Tot snel!',
  )

const sendEmail = async (apiKey: string, payload: object) =>
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const internalTo = process.env.BOOKING_TO_EMAIL || 'info@gdcarcare.nl'
  const from = process.env.BOOKING_FROM_EMAIL || 'GD Carcare <bookings@gdcarcare.nl>'

  if (!apiKey) {
    return NextResponse.json({ error: 'Mail not configured' }, { status: 500 })
  }

  let body: BookingPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { package: pkg, car, contact, dates, time } = body
  if (!pkg?.title || !car?.brand || !contact?.name || !contact?.email || !contact?.phone || !dates?.length || !time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const [internalRes, customerRes] = await Promise.all([
    sendEmail(apiKey, {
      from,
      to: [internalTo],
      reply_to: contact.email,
      subject: `Nieuwe afspraak — ${contact.name} (${pkg.tag} ${pkg.title})`,
      html: renderInternalEmail(body),
    }),
    sendEmail(apiKey, {
      from,
      to: [contact.email],
      reply_to: internalTo,
      subject: 'Bevestiging afspraakaanvraag — GD Carcare',
      html: renderCustomerEmail(body),
    }),
  ])

  if (!internalRes.ok) {
    const detail = await internalRes.text()
    console.error('Internal mail failed', internalRes.status, detail)
    return NextResponse.json({ error: 'Send failed' }, { status: 502 })
  }

  if (!customerRes.ok) {
    // Internal mail did succeed; log but don't fail the request
    const detail = await customerRes.text()
    console.error('Customer confirmation failed', customerRes.status, detail)
  }

  return NextResponse.json({ ok: true })
}
