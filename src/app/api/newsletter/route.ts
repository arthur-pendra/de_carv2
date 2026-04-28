import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type SignupPayload = {
  name: string
  email: string
  agreed: boolean
}

const escape = (s: string) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const wrapEmail = (eyebrow: string, title: string, intro: string, footer: string) => `<!doctype html>
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
              <p style="margin:0;font-size:13px;color:#888;line-height:1.5;">${footer}</p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`

const sendEmail = async (apiKey: string, payload: object) =>
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const internalTo = process.env.BOOKING_TO_EMAIL || 'info@gdcarcare.nl'
  const from = process.env.BOOKING_FROM_EMAIL || 'GD Carcare <bookings@gdcarcare.nl>'

  if (!apiKey) {
    return NextResponse.json({ error: 'Mail not configured' }, { status: 500 })
  }

  let body: SignupPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  if (!name || !isValidEmail(email) || !body.agreed) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
  }

  const firstName = escape(name.split(' ')[0])

  const [internalRes, welcomeRes] = await Promise.all([
    sendEmail(apiKey, {
      from,
      to: [internalTo],
      reply_to: email,
      subject: `Nieuwe nieuwsbrief inschrijving — ${name}`,
      html: wrapEmail(
        'GD CARCARE',
        'Nieuwe nieuwsbrief inschrijving',
        `<strong>${escape(name)}</strong> heeft zich ingeschreven voor de nieuwsbrief met het adres <strong>${escape(email)}</strong>.`,
        'Voeg deze persoon toe aan je verzendlijst.',
      ),
    }),
    sendEmail(apiKey, {
      from,
      to: [email],
      reply_to: internalTo,
      subject: 'Bedankt voor je inschrijving — GD Carcare',
      html: wrapEmail(
        'GD CARCARE',
        `Welkom, ${firstName}!`,
        'Je staat ingeschreven voor onze updates. Je hoort van ons zodra er nieuws is over detailing tips, aanbiedingen of nieuwe diensten.',
        'Klopt er iets niet? Antwoord direct op deze mail.',
      ),
    }),
  ])

  if (!internalRes.ok) {
    const detail = await internalRes.text()
    console.error('Newsletter internal mail failed', internalRes.status, detail)
    return NextResponse.json({ error: 'Send failed' }, { status: 502 })
  }

  if (!welcomeRes.ok) {
    const detail = await welcomeRes.text()
    console.error('Newsletter welcome mail failed', welcomeRes.status, detail)
  }

  return NextResponse.json({ ok: true })
}
