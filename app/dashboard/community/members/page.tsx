import type { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getEffectiveTier, tierCanAccess } from '@/lib/subscriptions'

export const metadata: Metadata = { title: 'Guild Members' }

function initials(name: string | null) {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function memberSince(date: Date) {
  const months = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 30))
  if (months < 1) return 'This month'
  if (months === 1) return '1 month ago'
  if (months < 12) return `${months} months ago`
  const years = Math.floor(months / 12)
  return years === 1 ? '1 year ago' : `${years} years ago`
}

export default async function MembersPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const tier = await getEffectiveTier(session.user.id)
  const isMember = tierCanAccess(tier, 'MEMBER')

  const members = await prisma.user.findMany({
    where: { name: { not: null } },
    select: {
      id: true,
      name: true,
      createdAt: true,
      membership: { select: { tier: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: isMember ? 100 : 6,
  })

  const totalCount = await prisma.user.count()

  return (
    <>
      <div className="dash-page-header">
        <div style={{ marginBottom: '8px' }}>
          <Link href="/dashboard/community" style={{ fontSize: '0.85rem', color: 'var(--text-light)', textDecoration: 'none' }}>
            ← Community
          </Link>
        </div>
        <h1>Guild Members</h1>
        <p>
          {totalCount} hospitality professionals in the Guild and growing.
        </p>
      </div>

      {!isMember && (
        <div className="upgrade-prompt" style={{ marginBottom: '32px' }}>
          <div className="upgrade-prompt__content">
            <h3>See the Full Member Directory</h3>
            <p>Upgrade to Member to browse all Guild members, connect with peers, and grow your network.</p>
          </div>
          <Link href="/join" className="btn btn--upgrade">Upgrade — $29/mo</Link>
        </div>
      )}

      <div className="member-grid">
        {members.map(member => {
          const memberTier = member.membership?.tier ?? 'EXPLORER'
          return (
            <div key={member.id} className="member-card">
              <div className="member-card__avatar">{initials(member.name)}</div>
              <div className="member-card__info">
                <div className="member-card__name">{member.name}</div>
                <div className="member-card__meta">Joined {memberSince(member.createdAt)}</div>
              </div>
              <span className={`tier-badge tier-badge--${memberTier.toLowerCase()}`}>
                {memberTier === 'EXPLORER' ? '⬡' : memberTier === 'MEMBER' ? '⬡' : '★'}{' '}
                {memberTier.charAt(0) + memberTier.slice(1).toLowerCase()}
              </span>
            </div>
          )
        })}
      </div>

      {!isMember && totalCount > 6 && (
        <div style={{ textAlign: 'center', padding: '32px 20px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px dashed rgba(107,21,40,0.2)', marginTop: '16px' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🔒</div>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '16px' }}>
            {totalCount - 6} more members visible to Member and Business subscribers.
          </p>
          <Link href="/join" className="btn btn--primary" style={{ fontSize: '0.875rem' }}>
            Upgrade to See Everyone
          </Link>
        </div>
      )}

      {members.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-light)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>👥</div>
          <p>No members yet. You might be the first!</p>
        </div>
      )}
    </>
  )
}
