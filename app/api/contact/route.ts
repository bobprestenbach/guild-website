import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM = 'The Hospitality Guild <no-reply@thehospitaityguild.com>'

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }
  if (!email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }

  const adminEmail = process.env.ADMIN_EMAIL
  if (adminEmail && resend) {
    await resend.emails.send({
      from: FROM,
      to: adminEmail,
      replyTo: email,
      subject: `Contact form: ${subject || 'General Inquiry'} — ${name}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
<p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
<hr>
<p>${message.replace(/\n/g, '<br>')}</p>`,
    }).catch(() => {})
  }

  return NextResponse.json({ ok: true })
}
