import type { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getEffectiveTier, tierCanAccess } from '@/lib/subscriptions'
import Link from 'next/link'
import type { EffectiveTier } from '@/lib/subscriptions'

export const metadata: Metadata = { title: 'Partner Discounts' }

interface Partner {
  id: string
  name: string
  category: string
  icon: string
  tagline: string
  description: string
  discount: string
  code?: string
  url: string
  requiredTier: EffectiveTier
}

const PARTNERS: Partner[] = [
  {
    id: 'toast',
    name: 'Toast POS',
    category: 'Point of Sale',
    icon: '🍞',
    tagline: 'Restaurant-grade POS built for hospitality',
    description: 'The leading restaurant POS platform. Guild members get 2 months free on any plan plus a dedicated onboarding specialist.',
    discount: '2 Months Free',
    code: 'GUILD2024',
    url: '#',
    requiredTier: 'MEMBER',
  },
  {
    id: '7shifts',
    name: '7shifts',
    category: 'Scheduling',
    icon: '📅',
    tagline: 'Staff scheduling built for restaurants',
    description: 'The scheduling, time-tracking, and tip-pooling platform built for restaurants. Guild members receive 30% off their first 6 months.',
    discount: '30% Off — 6 Months',
    code: 'HOSPITGUILD',
    url: '#',
    requiredTier: 'MEMBER',
  },
  {
    id: 'harri',
    name: 'Harri',
    category: 'Hiring & HR',
    icon: '💼',
    tagline: 'Hospitality-specific hiring platform',
    description: 'Hire, onboard, and manage your hospitality workforce from one platform. Guild members get the Starter plan free for 60 days.',
    discount: '60 Days Free',
    code: 'GUILD60',
    url: '#',
    requiredTier: 'MEMBER',
  },
  {
    id: 'meez',
    name: 'Meez',
    category: 'Recipe & Menu Costing',
    icon: '🍳',
    tagline: 'Recipe costing and menu engineering',
    description: 'Calculate your actual food cost on every dish, scale recipes, and engineer your menu for maximum profitability.',
    discount: '20% Off Annual Plan',
    code: 'GUILDMEEZ',
    url: '#',
    requiredTier: 'MEMBER',
  },
  {
    id: 'lightspeed',
    name: 'Lightspeed Restaurant',
    category: 'POS & Analytics',
    icon: '⚡',
    tagline: 'Advanced POS with built-in analytics',
    description: 'A full restaurant management suite with advanced reporting and multi-location support. Business subscribers get priority implementation.',
    discount: 'Priority Onboarding + 15% Off',
    code: 'GUILDPRO',
    url: '#',
    requiredTier: 'BUSINESS',
  },
  {
    id: 'notchpay',
    name: 'Notch',
    category: 'Accounts Payable',
    icon: '🧾',
    tagline: 'AP automation for restaurants',
    description: 'Automate your accounts payable, supplier payments, and invoice matching. Business members get 3 months free on Pro.',
    discount: '3 Months Free (Pro)',
    code: 'GUILDBIZ',
    url: '#',
    requiredTier: 'BUSINESS',
  },
]

export default async function PartnersPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const tier = await getEffectiveTier(session.user.id)

  const memberPartners = PARTNERS.filter(p => p.requiredTier === 'MEMBER')
  const businessPartners = PARTNERS.filter(p => p.requiredTier === 'BUSINESS')

  return (
    <>
      <div className="dash-page-header">
        <h1>Partner Discounts</h1>
        <p>Exclusive deals on tools our members actually use — negotiated for the Guild.</p>
      </div>

      {tier === 'EXPLORER' && (
        <div className="upgrade-prompt" style={{ marginBottom: '32px' }}>
          <div className="upgrade-prompt__content">
            <h3>Unlock Partner Discounts</h3>
            <p>Member subscribers get exclusive discount codes on POS, scheduling, hiring, and more.</p>
          </div>
          <Link href="/join" className="btn btn--upgrade">Upgrade — $29/mo</Link>
        </div>
      )}

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '20px' }}>
          Member Partners
        </h2>
        <div className="partner-grid">
          {memberPartners.map(p => {
            const canAccess = tierCanAccess(tier, p.requiredTier)
            return (
              <div key={p.id} className={`partner-card${!canAccess ? ' partner-card--locked' : ''}`}>
                <div className="partner-card__header">
                  <span className="partner-card__icon" aria-hidden="true">{p.icon}</span>
                  <div>
                    <div className="partner-card__name">{p.name}</div>
                    <div className="partner-card__category">{p.category}</div>
                  </div>
                </div>
                <div className="partner-card__discount">{p.discount}</div>
                <p className="partner-card__desc">{p.description}</p>
                {canAccess && p.code && (
                  <div className="partner-card__code-row">
                    <span className="partner-card__code-label">Code:</span>
                    <code className="partner-card__code">{p.code}</code>
                  </div>
                )}
                <a
                  href={canAccess ? p.url : '/join'}
                  target={canAccess ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`btn ${canAccess ? 'btn--outline-navy' : 'btn--primary'}`}
                  style={{ fontSize: '0.82rem', marginTop: '16px', display: 'inline-block' }}
                >
                  {canAccess ? `Visit ${p.name} →` : 'Upgrade to Unlock'}
                </a>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '20px' }}>
          Business Exclusives
        </h2>
        <div className="partner-grid">
          {businessPartners.map(p => {
            const canAccess = tierCanAccess(tier, p.requiredTier)
            return (
              <div key={p.id} className={`partner-card${!canAccess ? ' partner-card--locked' : ''}`}>
                <div className="partner-card__header">
                  <span className="partner-card__icon" aria-hidden="true">{p.icon}</span>
                  <div>
                    <div className="partner-card__name">{p.name}</div>
                    <div className="partner-card__category">{p.category}</div>
                  </div>
                </div>
                <div className="partner-card__discount">{p.discount}</div>
                <p className="partner-card__desc">{p.description}</p>
                {canAccess && p.code && (
                  <div className="partner-card__code-row">
                    <span className="partner-card__code-label">Code:</span>
                    <code className="partner-card__code">{p.code}</code>
                  </div>
                )}
                {!canAccess && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '12px' }}>
                    🔒 Business plan required
                  </div>
                )}
                {canAccess && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline-navy"
                    style={{ fontSize: '0.82rem', marginTop: '16px', display: 'inline-block' }}
                  >
                    Visit {p.name} →
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
