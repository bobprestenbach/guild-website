import { prisma } from '@/lib/prisma'

export type EffectiveTier = 'EXPLORER' | 'MEMBER' | 'BUSINESS'

export async function getEffectiveTier(userId: string): Promise<EffectiveTier> {
  const seat = await prisma.businessSeat.findUnique({
    where: { memberId: userId },
    include: { owner: { include: { membership: true } } },
  })
  if (seat?.owner.membership?.tier === 'BUSINESS') {
    const exp = seat.owner.membership.stripeCurrentPeriodEnd
    if (!exp || exp > new Date()) return 'BUSINESS'
  }

  const membership = await prisma.membership.findUnique({ where: { userId } })
  if (!membership) return 'EXPLORER'

  if (membership.tier !== 'EXPLORER') {
    const exp = membership.stripeCurrentPeriodEnd
    if (!exp || exp > new Date()) return membership.tier as EffectiveTier
    return 'EXPLORER'
  }

  return 'EXPLORER'
}

export function tierLabel(tier: EffectiveTier) {
  return { EXPLORER: 'Explorer', MEMBER: 'Member', BUSINESS: 'Business' }[tier]
}

export function tierCanAccess(userTier: EffectiveTier, required: EffectiveTier): boolean {
  const rank: Record<EffectiveTier, number> = { EXPLORER: 0, MEMBER: 1, BUSINESS: 2 }
  return rank[userTier] >= rank[required]
}
