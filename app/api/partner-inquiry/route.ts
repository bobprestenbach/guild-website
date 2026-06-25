import { NextResponse } from 'next/server'
import { sendPartnerInquiryEmail } from '@/lib/email'

export async function POST(req: Request) {
  const { company, contactName, contactEmail, category, message } = await req.json()

  if (!company || !contactName || !contactEmail || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  if (!contactEmail.includes('@')) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }

  await sendPartnerInquiryEmail(
    company.trim(),
    contactName.trim(),
    contactEmail.trim(),
    category ?? 'Other',
    message.trim(),
  ).catch(() => {})

  return NextResponse.json({ ok: true })
}
