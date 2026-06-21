import type { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getEffectiveTier } from '@/lib/subscriptions'
import Link from 'next/link'
import InviteForm from './InviteForm'
import RemoveMemberButton from './RemoveMemberButton'

export const metadata: Metadata = { title: 'Team Management' }

export default async function TeamPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const tier = await getEffectiveTier(session.user.id)

  if (tier !== 'BUSINESS') {
    return (
      <>
        <div className="dash-page-header">
          <h1>Team Management</h1>
          <p>Manage your team seat members.</p>
        </div>
        <div className="upgrade-prompt">
          <div className="upgrade-prompt__content">
            <h3>Business Plan Required</h3>
            <p>Team management is available on the Business plan — includes up to 5 total seats, a manager dashboard, and team progress tracking.</p>
          </div>
          <Link href="/join" className="btn btn--upgrade">View Business Plan</Link>
        </div>
      </>
    )
  }

  const [seats, pendingInvites] = await Promise.all([
    prisma.businessSeat.findMany({
      where: { ownerId: session.user.id },
      include: { member: { select: { id: true, name: true, email: true, image: true, createdAt: true } } },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.teamInvite.findMany({
      where: { ownerId: session.user.id, accepted: false, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  const totalSeats = 5
  const usedSeats = seats.length + 1
  const availableSeats = totalSeats - usedSeats

  return (
    <>
      <div className="dash-page-header">
        <h1>Team Management</h1>
        <p>Manage your team and invite colleagues to join.</p>
      </div>

      <div className="team-seats-bar">
        <div className="team-seats-bar__label">
          <strong>{usedSeats}</strong> of <strong>{totalSeats}</strong> seats used
        </div>
        <div className="team-seats-bar__track">
          {Array.from({ length: totalSeats }).map((_, i) => (
            <div
              key={i}
              className={`team-seats-bar__slot${i < usedSeats ? ' team-seats-bar__slot--used' : ''}`}
            />
          ))}
        </div>
        <div className="team-seats-bar__remaining">
          {availableSeats > 0 ? `${availableSeats} seat${availableSeats !== 1 ? 's' : ''} available` : 'All seats filled'}
        </div>
      </div>

      <div className="settings-card" style={{ marginBottom: '24px' }}>
        <div className="settings-card__header">
          <h2 className="settings-card__title">Team Members</h2>
        </div>
        <div className="settings-card__body" style={{ padding: 0 }}>

          {/* Owner row */}
          <div className="team-member-row">
            <div className="team-member-row__avatar">
              {session.user.image ? (
                <img src={session.user.image} alt={session.user.name ?? 'You'} />
              ) : (
                (session.user.name ?? 'Y').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
              )}
            </div>
            <div className="team-member-row__info">
              <span className="team-member-row__name">{session.user.name ?? 'You'}</span>
              <span className="team-member-row__email">{session.user.email}</span>
            </div>
            <span className="team-member-row__badge">Owner</span>
          </div>

          {seats.map(seat => {
            const m = seat.member
            const initials = (m.name ?? 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
            return (
              <div key={seat.id} className="team-member-row">
                <div className="team-member-row__avatar">
                  {m.image ? <img src={m.image} alt={m.name ?? ''} /> : initials}
                </div>
                <div className="team-member-row__info">
                  <span className="team-member-row__name">{m.name ?? '—'}</span>
                  <span className="team-member-row__email">{m.email}</span>
                </div>
                <RemoveMemberButton memberId={m.id} name={m.name ?? m.email} />
              </div>
            )
          })}

          {seats.length === 0 && (
            <div style={{ padding: '24px', color: 'var(--text-light)', fontSize: '0.875rem', textAlign: 'center' }}>
              No team members yet. Invite colleagues below.
            </div>
          )}
        </div>
      </div>

      {pendingInvites.length > 0 && (
        <div className="settings-card" style={{ marginBottom: '24px' }}>
          <div className="settings-card__header">
            <h2 className="settings-card__title">Pending Invitations</h2>
          </div>
          <div className="settings-card__body" style={{ padding: 0 }}>
            {pendingInvites.map(invite => (
              <div key={invite.id} className="team-member-row">
                <div className="team-member-row__avatar" style={{ background: 'var(--parchment)', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                  ?
                </div>
                <div className="team-member-row__info">
                  <span className="team-member-row__name">{invite.email}</span>
                  <span className="team-member-row__email">
                    Expires {invite.expiresAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', background: 'var(--cream)', padding: '4px 10px', borderRadius: '20px', border: '1px solid var(--parchment)' }}>
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {availableSeats > 0 && (
        <div className="settings-card">
          <div className="settings-card__header">
            <h2 className="settings-card__title">Invite a Team Member</h2>
          </div>
          <div className="settings-card__body">
            <InviteForm />
          </div>
        </div>
      )}
    </>
  )
}
