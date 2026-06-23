import type { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getEffectiveTier } from '@/lib/subscriptions'

export const metadata: Metadata = { title: 'Community' }

export default async function CommunityPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const tier = await getEffectiveTier(session.user.id)

  return (
    <>
      <div className="dash-page-header">
        <h1>Guild Community</h1>
        <p>Connect with hundreds of hospitality professionals, share knowledge, and grow together.</p>
      </div>

      <div className="dash-grid">
        <div className="dash-card" style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', color: 'white', border: 'none' }}>
          <div className="dash-card__icon">💬</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gold-bright)', marginBottom: '8px' }}>
            Your Guild Community Hub
          </h3>
          <p style={{ color: 'rgba(232,223,192,0.85)', marginBottom: '20px', lineHeight: 1.6 }}>
            Discussion forums, resource sharing, regional groups, and monthly live calls — all built into your membership. Connect with fellow managers, post questions, and share what&apos;s working.
          </p>
          <Link href="/dashboard/community/discussions" className="btn btn--upgrade">
            Browse Discussions →
          </Link>
        </div>

        <div className="dash-card">
          <div className="dash-card__icon">📅</div>
          <h3 className="dash-card__title">Monthly Live Calls</h3>
          <p className="dash-card__text">
            Join our next live session with industry experts. Open Q&amp;A format — bring your real challenges.
          </p>
          <Link href="/dashboard/webinars" className="dash-card__link">View Schedule →</Link>
        </div>

        <div className="dash-card">
          <div className="dash-card__icon">📍</div>
          <h3 className="dash-card__title">Regional Groups</h3>
          <p className="dash-card__text">
            Connect with Guild members in your area for locally relevant conversations and referrals.
          </p>
          <Link href="/dashboard/community/regional" className="dash-card__link">Find Your Region →</Link>
        </div>

        <div className="dash-card">
          <div className="dash-card__icon">🏆</div>
          <h3 className="dash-card__title">Active Members</h3>
          <p className="dash-card__text">
            See the most active contributors this month — share more, help others, and build your reputation in the Guild.
          </p>
          <Link href="/dashboard/community/members" className="dash-card__link">View Members →</Link>
        </div>

        {tier === 'EXPLORER' && (
          <div className="dash-card" style={{ background: 'var(--parchment)', borderStyle: 'dashed' }}>
            <div className="dash-card__icon">🔒</div>
            <h3 className="dash-card__title">Full Community Access</h3>
            <p className="dash-card__text">
              Upgrade to Member to unlock all community channels, discussion forums, regional groups, and priority support.
            </p>
            <a href="/join" className="dash-card__link">Upgrade to Member →</a>
          </div>
        )}
      </div>
    </>
  )
}
