import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getEffectiveTier } from '@/lib/subscriptions'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const tier = await getEffectiveTier(session.user.id)
  if (tier !== 'BUSINESS') {
    return NextResponse.json({ error: 'Business plan required' }, { status: 403 })
  }

  const { memberId } = await req.json()
  if (!memberId) return NextResponse.json({ error: 'memberId required' }, { status: 400 })

  const seat = await prisma.businessSeat.findFirst({
    where: { ownerId: session.user.id, memberId },
  })
  if (!seat) return NextResponse.json({ error: 'Seat not found' }, { status: 404 })

  await prisma.businessSeat.delete({ where: { id: seat.id } })
  return NextResponse.json({ ok: true })
}
