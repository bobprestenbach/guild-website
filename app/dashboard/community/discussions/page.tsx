import type { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getEffectiveTier, tierCanAccess } from '@/lib/subscriptions'

export const metadata: Metadata = { title: 'Community Discussions' }

const CATEGORIES = [
  { id: 'introductions', icon: '👋', label: 'Introductions', desc: 'New to the Guild? Say hello and tell us where you work.', tier: 'EXPLORER', threads: 47 },
  { id: 'staffing', icon: '👥', label: 'Staffing & Hiring', desc: 'Recruiting, retention, no-shows, and building the right team.', tier: 'MEMBER', threads: 124 },
  { id: 'training', icon: '🎓', label: 'Training & Development', desc: 'Building training systems and programs that actually stick.', tier: 'MEMBER', threads: 89 },
  { id: 'operations', icon: '⚙️', label: 'Operations', desc: 'SOPs, systems, cost control, and day-to-day efficiency.', tier: 'MEMBER', threads: 96 },
  { id: 'leadership', icon: '🧭', label: 'Leadership', desc: 'Managing people, culture, and difficult situations.', tier: 'MEMBER', threads: 73 },
  { id: 'success-stories', icon: '🏆', label: 'Success Stories', desc: 'Share what\'s working. Celebrate wins. Inspire the room.', tier: 'MEMBER', threads: 38 },
]

const RECENT_THREADS = [
  {
    id: 't1', category: 'Staffing & Hiring', initials: 'SM', author: 'Sarah M.',
    title: 'Best new hire onboarding tip I\'ve used this year',
    excerpt: 'Started using the buddy system from last month\'s webinar. Turnover in the first 30 days dropped noticeably — highly recommend.',
    replies: 14, postedAt: '42 min ago', tier: 'MEMBER',
  },
  {
    id: 't2', category: 'Operations', initials: 'JR', author: 'James R.',
    title: 'How do you handle back-to-back double shifts during holidays?',
    excerpt: 'Heading into summer and I need a better rotation system that doesn\'t burn people out. What\'s working for your team?',
    replies: 9, postedAt: '1h ago', tier: 'MEMBER',
  },
  {
    id: 't3', category: 'Success Stories', initials: 'PK', author: 'Priya K.',
    title: 'Just earned my Front of House Excellence certification 🎓',
    excerpt: 'The upselling module changed how my team approaches every table. 12% increase in average check size this month.',
    replies: 22, postedAt: '2h ago', tier: 'MEMBER',
  },
  {
    id: 't4', category: 'Leadership', initials: 'DL', author: 'David L.',
    title: 'Dealing with a high-performing but toxic team member — advice?',
    excerpt: 'Great with guests, creates constant drama with staff. How do you handle this without losing their guest-facing value?',
    replies: 31, postedAt: '3h ago', tier: 'MEMBER',
  },
  {
    id: 't5', category: 'Training & Development', initials: 'MO', author: 'Maria O.',
    title: 'Building a server training manual from scratch — where to start?',
    excerpt: 'Just opened our second location. Need to document everything properly this time. Has anyone used the Guild templates as a base?',
    replies: 7, postedAt: '5h ago', tier: 'MEMBER',
  },
  {
    id: 't6', category: 'Introductions', initials: 'TC', author: 'Tom C.',
    title: 'New here — GM at a 180-cover bistro in Nashville',
    excerpt: 'Excited to find a community built for operators. Been managing for 8 years and always felt like there was no home base for people like us.',
    replies: 18, postedAt: '6h ago', tier: 'EXPLORER',
  },
]

export default async function DiscussionsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const tier = await getEffectiveTier(session.user.id)
  const isMember = tierCanAccess(tier, 'MEMBER')

  const visibleThreads = isMember
    ? RECENT_THREADS
    : RECENT_THREADS.filter(t => t.tier === 'EXPLORER')

  return (
    <>
      <div className="dash-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Link href="/dashboard/community" style={{ fontSize: '0.85rem', color: 'var(--text-light)', textDecoration: 'none' }}>
            ← Community
          </Link>
        </div>
        <h1>Discussions</h1>
        <p>Ask questions, share insights, and connect with peers across the industry.</p>
      </div>

      {!isMember && (
        <div className="upgrade-prompt" style={{ marginBottom: '32px' }}>
          <div className="upgrade-prompt__content">
            <h3>Unlock All Discussion Channels</h3>
            <p>Upgrade to Member to access staffing, training, operations, and leadership forums.</p>
          </div>
          <Link href="/join" className="btn btn--upgrade">Upgrade — $29/mo</Link>
        </div>
      )}

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '20px' }}>
          Channels
        </h2>
        <div className="forum-categories">
          {CATEGORIES.map(cat => {
            const canAccess = tierCanAccess(tier, cat.tier as 'EXPLORER' | 'MEMBER')
            return (
              <div key={cat.id} className={`forum-category${!canAccess ? ' forum-category--locked' : ''}`}>
                <div className="forum-category__icon">{cat.icon}</div>
                <div className="forum-category__content">
                  <div className="forum-category__label">
                    {cat.label}
                    {!canAccess && <span className="forum-category__lock">🔒</span>}
                  </div>
                  <div className="forum-category__desc">{cat.desc}</div>
                </div>
                <div className="forum-category__count">{cat.threads} posts</div>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-dark)', margin: 0 }}>
            Recent Discussions
          </h2>
          {isMember && (
            <Link href="/dashboard/community/discussions/new" className="btn btn--primary" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
              + New Post
            </Link>
          )}
        </div>
        <div className="forum-threads">
          {visibleThreads.map(thread => (
            <div key={thread.id} className="forum-thread">
              <div className="forum-thread__avatar">{thread.initials}</div>
              <div className="forum-thread__content">
                <div className="forum-thread__category">{thread.category}</div>
                <div className="forum-thread__title">{thread.title}</div>
                <div className="forum-thread__excerpt">{thread.excerpt}</div>
                <div className="forum-thread__meta">
                  {thread.author} · {thread.postedAt}
                </div>
              </div>
              <div className="forum-thread__replies">
                <div className="forum-thread__reply-count">{thread.replies}</div>
                <div className="forum-thread__reply-label">replies</div>
              </div>
            </div>
          ))}
          {!isMember && (
            <div style={{ textAlign: 'center', padding: '32px 20px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px dashed rgba(107,21,40,0.2)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🔒</div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '16px' }}>
                {RECENT_THREADS.length - visibleThreads.length} more discussions are visible to Member and Business subscribers.
              </p>
              <Link href="/join" className="btn btn--primary" style={{ fontSize: '0.875rem' }}>
                Upgrade to Read &amp; Post
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
