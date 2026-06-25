import type { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getEffectiveTier, tierLabel } from '@/lib/subscriptions'
import TierBadge from '@/components/TierBadge'
import BillingButton from './BillingButton'
import UpdateNameForm from './UpdateNameForm'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Account Settings' }

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const [tier, membership] = await Promise.all([
    getEffectiveTier(session.user.id),
    prisma.membership.findUnique({ where: { userId: session.user.id } }),
  ])

  const periodEnd = membership?.stripeCurrentPeriodEnd
  const cancelAtEnd = membership?.cancelAtPeriodEnd ?? false

  return (
    <>
      <div className="dash-page-header">
        <h1>Account &amp; Settings</h1>
        <p>Manage your profile, membership, and billing.</p>
      </div>

      <div className="settings-grid">

        {/* Profile */}
        <div className="settings-card">
          <div className="settings-card__header">
            <h2 className="settings-card__title">Profile</h2>
          </div>
          <div className="settings-card__body">
            <div className="settings-row">
              <span className="settings-row__label">Name</span>
              <UpdateNameForm currentName={session.user.name ?? ''} />
            </div>
            <div className="settings-row">
              <span className="settings-row__label">Email</span>
              <span className="settings-row__value">{session.user.email ?? '—'}</span>
            </div>
            <div className="settings-row">
              <span className="settings-row__label">Sign-in method</span>
              <span className="settings-row__value">Google</span>
            </div>
          </div>
        </div>

        {/* Membership */}
        <div className="settings-card">
          <div className="settings-card__header">
            <h2 className="settings-card__title">Membership</h2>
          </div>
          <div className="settings-card__body">
            <div className="settings-row">
              <span className="settings-row__label">Current plan</span>
              <span className="settings-row__value">
                <TierBadge tier={tier} />
              </span>
            </div>
            {tier === 'MEMBER' || tier === 'BUSINESS' ? (
              <>
                <div className="settings-row">
                  <span className="settings-row__label">Status</span>
                  <span className="settings-row__value" style={{ color: cancelAtEnd ? 'var(--primary)' : 'inherit' }}>
                    {cancelAtEnd ? 'Cancels at period end' : 'Active'}
                  </span>
                </div>
                {periodEnd && (
                  <div className="settings-row">
                    <span className="settings-row__label">{cancelAtEnd ? 'Access until' : 'Renews'}</span>
                    <span className="settings-row__value">
                      {periodEnd.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                )}
                <div className="settings-row" style={{ borderBottom: 'none', paddingTop: '20px' }}>
                  <BillingButton />
                </div>
              </>
            ) : (
              <div className="settings-row" style={{ borderBottom: 'none', paddingTop: '8px' }}>
                <div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', marginBottom: '12px' }}>
                    You&apos;re on the free Explorer plan. Upgrade to unlock full training, resources, and community access.
                  </p>
                  <Link href="/join" className="btn btn--primary" style={{ fontSize: '0.875rem' }}>
                    View Plans &amp; Upgrade
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Danger zone */}
        <div className="settings-card">
          <div className="settings-card__header">
            <h2 className="settings-card__title" style={{ color: 'var(--primary)' }}>Account Actions</h2>
          </div>
          <div className="settings-card__body">
            <div className="settings-row">
              <div>
                <div className="settings-row__label" style={{ marginBottom: '4px' }}>Sign out of all devices</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>This will end all active sessions.</div>
              </div>
              <form action={async () => {
                'use server'
                // handled client-side via DashboardNav signOut
              }}>
                <a href="/api/auth/signout" className="btn btn--outline-navy" style={{ fontSize: '0.82rem', padding: '8px 14px' }}>
                  Sign Out
                </a>
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
