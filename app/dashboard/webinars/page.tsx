import type { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getEffectiveTier, tierCanAccess } from '@/lib/subscriptions'
import Link from 'next/link'
import type { EffectiveTier } from '@/lib/subscriptions'

export const metadata: Metadata = { title: 'Webinars' }

interface Webinar {
  id: string
  title: string
  host: string
  date: Date
  duration: string
  description: string
  requiredTier: EffectiveTier
  status: 'upcoming' | 'past'
  registerUrl?: string
  replayUrl?: string
}

const WEBINARS: Webinar[] = [
  {
    id: 'w1',
    title: 'Managing Seasonal Staffing Surges',
    host: 'Guild Team',
    date: new Date('2026-07-15T18:00:00Z'),
    duration: '60 min',
    description: 'Learn tested strategies for handling peak-season staffing without burning out your core team. We\'ll cover ramp-up timelines, onboarding shortcuts, and how to retain seasonal hires.',
    requiredTier: 'MEMBER',
    status: 'upcoming',
    registerUrl: '#',
  },
  {
    id: 'w2',
    title: 'Food Cost Control: Advanced Strategies',
    host: 'Guild Team',
    date: new Date('2026-08-05T18:00:00Z'),
    duration: '60 min',
    description: 'Deep dive into the gap between theoretical and actual food cost — and how to close it permanently. Menu engineering, portion control systems, and waste accountability frameworks.',
    requiredTier: 'MEMBER',
    status: 'upcoming',
    registerUrl: '#',
  },
  {
    id: 'w3',
    title: 'Business Plan Intensive for Multi-Manager Teams',
    host: 'Guild Team',
    date: new Date('2026-09-10T18:00:00Z'),
    duration: '90 min',
    description: 'Exclusively for Business subscribers — a working session to build your team training calendar and manager development roadmap with our team.',
    requiredTier: 'BUSINESS',
    status: 'upcoming',
    registerUrl: '#',
  },
  {
    id: 'w4',
    title: 'Building Your Service Standards Playbook',
    host: 'Guild Team',
    date: new Date('2026-06-10T18:00:00Z'),
    duration: '55 min',
    description: 'How to document, train, and enforce service standards that actually stick. Covers the 5-step standards framework used by top-performing operations.',
    requiredTier: 'MEMBER',
    status: 'past',
    replayUrl: '#',
  },
  {
    id: 'w5',
    title: 'The Manager Mindset: Leading Without Micromanaging',
    host: 'Guild Team',
    date: new Date('2026-05-14T18:00:00Z'),
    duration: '60 min',
    description: 'How to give your team ownership while maintaining accountability. Practical delegation frameworks and how to handle underperformance without creating resentment.',
    requiredTier: 'MEMBER',
    status: 'past',
    replayUrl: '#',
  },
]

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })
}

export default async function WebinarsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const tier = await getEffectiveTier(session.user.id)

  const upcoming = WEBINARS.filter(w => w.status === 'upcoming')
  const past = WEBINARS.filter(w => w.status === 'past')

  return (
    <>
      <div className="dash-page-header">
        <h1>Webinars &amp; Live Sessions</h1>
        <p>Monthly live sessions with industry experts — join live or watch the replay.</p>
      </div>

      {tier === 'EXPLORER' && (
        <div className="upgrade-prompt" style={{ marginBottom: '32px' }}>
          <div className="upgrade-prompt__content">
            <h3>Member Access Required</h3>
            <p>Upgrade to Member to attend live webinars and access all replays.</p>
          </div>
          <Link href="/join" className="btn btn--upgrade">Upgrade — $29/mo</Link>
        </div>
      )}

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '20px' }}>
          Upcoming Sessions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {upcoming.map(w => {
            const canAccess = tierCanAccess(tier, w.requiredTier)
            return (
              <div key={w.id} className={`webinar-card${!canAccess ? ' webinar-card--locked' : ''}`}>
                <div className="webinar-card__date-block">
                  <div className="webinar-card__month">{w.date.toLocaleDateString('en-US', { month: 'short' })}</div>
                  <div className="webinar-card__day">{w.date.getDate()}</div>
                </div>
                <div className="webinar-card__content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    <h3 className="webinar-card__title">{w.title}</h3>
                    {w.requiredTier === 'BUSINESS' && (
                      <span className="webinar-card__badge webinar-card__badge--business">Business Only</span>
                    )}
                  </div>
                  <div className="webinar-card__meta">
                    {formatDate(w.date)} · {formatTime(w.date)} · {w.duration}
                  </div>
                  <p className="webinar-card__desc">{w.description}</p>
                </div>
                <div className="webinar-card__action">
                  {canAccess ? (
                    <a href={w.registerUrl ?? '#'} className="btn btn--primary" style={{ fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                      Register →
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                      🔒 {w.requiredTier === 'BUSINESS' ? 'Business' : 'Member'}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '20px' }}>
          Past Recordings
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {past.map(w => {
            const canAccess = tierCanAccess(tier, w.requiredTier)
            return (
              <div key={w.id} className="webinar-card webinar-card--past">
                <div className="webinar-card__date-block webinar-card__date-block--past">
                  <div className="webinar-card__month">{w.date.toLocaleDateString('en-US', { month: 'short' })}</div>
                  <div className="webinar-card__day">{w.date.getDate()}</div>
                </div>
                <div className="webinar-card__content">
                  <h3 className="webinar-card__title" style={{ fontSize: '0.95rem' }}>{w.title}</h3>
                  <div className="webinar-card__meta">{formatDate(w.date)} · {w.duration}</div>
                </div>
                <div className="webinar-card__action">
                  {canAccess ? (
                    <a href={w.replayUrl ?? '#'} className="btn btn--outline-navy" style={{ fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                      Watch Replay →
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>🔒 Member</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
