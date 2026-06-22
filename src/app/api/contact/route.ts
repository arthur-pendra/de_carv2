import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type ContactPayload = {
  name: string
  email: string
  phone: string
  message: string
}

const escape = (s: string) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const wrapEmail = (eyebrow: string, title: string, intro: string, rows: [string, string][], footer: string) => `<!doctype html>
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
                ${rows
                  .map(
                    ([label, value]) => `
                <tr>
                  <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#666;font-size:13px;width:32%;">${escape(label)}</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#070707;font-size:14px;">${escape(value)}</td>
                </tr>`,
                  )
                  .join('')}
              </table>
              <p style="margin:20px 0 0 0;font-size:13px;color:#888;line-height:1.5;">${footer}</p>
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

  let body: ContactPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const phone = (body.phone || '').trim()
  const message = (body.message || '').trim()

  if (!name || !isValidEmail(email) || !phone) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
  }

  const rows: [string, string][] = [
    ['Naam', name],
    ['E-mail', email],
    ['Telefoon', phone],
  ]
  if (message) rows.push(['Opmerking', message])

  const internalRes = await sendEmail(apiKey, {
    from,
    to: [internalTo],
    reply_to: email,
    subject: `Nieuw contactbericht — ${name}`,
    html: wrapEmail(
      'GD CARCARE',
      'Nieuw contactbericht',
      'Er is een nieuw contactbericht binnengekomen via de website.',
      rows,
      `Reageer direct op deze e-mail om met ${escape(name)} contact op te nemen.`,
    ),
  })

  if (!internalRes.ok) {
    const detail = await internalRes.text()
    console.error('Contact mail failed', internalRes.status, detail)
    return NextResponse.json({ error: 'Send failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
