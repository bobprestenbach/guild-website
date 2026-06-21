import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getEffectiveTier } from '@/lib/subscriptions'
import { sendTeamInviteEmail } from '@/lib/email'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const tier = await getEffectiveTier(session.user.id)
  if (tier !== 'BUSINESS') {
    return NextResponse.json({ error: 'Business plan required' }, { status: 403 })
  }

  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const existingSeats = await prisma.businessSeat.count({ where: { ownerId: session.user.id } })
  if (existingSeats >= 4) {
    return NextResponse.json({ error: 'Maximum of 4 additional seats reached' }, { status: 400 })
  }

  const alreadyMember = await prisma.user.findUnique({
    where: { email },
    include: { seatOf: true },
  })
  if (alreadyMember?.seatOf) {
    return NextResponse.json({ error: 'This person is already on a team' }, { status: 400 })
  }

  const existingInvite = await prisma.teamInvite.findFirst({
    where: { ownerId: session.user.id, email, accepted: false, expiresAt: { gt: new Date() } },
  })
  if (existingInvite) {
    return NextResponse.json({ error: 'An invitation is already pending for this email' }, { status: 400 })
  }

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)

  const invite = await prisma.teamInvite.create({
    data: { ownerId: session.user.id, email, expiresAt },
  })

  await sendTeamInviteEmail(email, session.user.name ?? 'Your manager', invite.token).catch(() => {})

  return NextResponse.json({ ok: true })
}
