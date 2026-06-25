import type { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getEffectiveTier, tierCanAccess } from '@/lib/subscriptions'
import Link from 'next/link'
import CloseJobButton from './CloseJobButton'

export const metadata: Metadata = { title: 'Job Board' }

function daysAgo(date: Date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  return `${diff}d ago`
}

function daysRemaining(date: Date) {
  const diff = Math.ceil((date.getTime() - Date.now()) / 86400000)
  if (diff <= 0) return 'Expired'
  if (diff === 1) return '1d left'
  return `${diff}d left`
}

export default async function DashboardJobsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const tier = await getEffectiveTier(session.user.id)

  const [jobs, myJobs] = await Promise.all([
    prisma.jobPost.findMany({
      where: { status: 'active', expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.jobPost.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ])

  const canPost = tierCanAccess(tier, 'MEMBER')

  return (
    <>
      <div className="dash-page-header dash-page-header--flex">
        <div>
          <h1>Job Board</h1>
          <p>Hospitality roles posted by Guild members.</p>
        </div>
        {canPost && (
          <Link href="/dashboard/jobs/new" className="btn btn--primary" style={{ fontSize: '0.875rem', alignSelf: 'flex-start' }}>
            + Post a Job
          </Link>
        )}
      </div>

      {!canPost && (
        <div className="upgrade-prompt" style={{ marginBottom: '32px' }}>
          <div className="upgrade-prompt__content">
            <h3>Post Jobs with a Member Plan</h3>
            <p>Upgrade to Member to post unlimited job listings and reach the Guild network.</p>
          </div>
          <Link href="/join" className="btn btn--upgrade">Upgrade — $29/mo</Link>
        </div>
      )}

      {myJobs.length > 0 && (
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '16px' }}>
            Your Listings
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {myJobs.map(job => (
              <div key={job.id} className="dash-job-row">
                <div className="dash-job-row__info">
                  <span className="dash-job-row__title">{job.title}</span>
                  <span className="dash-job-row__meta">
                    {job.company} · {job.location} · Posted {daysAgo(job.createdAt)}
                    {job.status === 'active' && ` · ${daysRemaining(job.expiresAt)}`}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  {job.status === 'active' && <CloseJobButton jobId={job.id} />}
                  <span className={`dash-job-row__status dash-job-row__status--${job.status}`}>
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '16px' }}>
          All Open Positions {jobs.length > 0 && <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-body)', color: 'var(--text-light)', fontWeight: 400 }}>({jobs.length})</span>}
        </h2>

        {jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-light)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📋</div>
            <p style={{ marginBottom: '16px' }}>No open positions right now.</p>
            {canPost && (
              <Link href="/dashboard/jobs/new" className="btn btn--primary" style={{ fontSize: '0.875rem' }}>
                Be the First to Post
              </Link>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {jobs.map(job => (
              <article key={job.id} className="dash-card" style={{ display: 'block', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '1rem', color: 'var(--text-dark)' }}>{job.title}</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      {job.company} · {job.location} {job.salary && `· ${job.salary}`}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0, alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', background: 'var(--cream)', color: 'var(--text-light)', padding: '4px 10px', borderRadius: '20px', border: '1px solid var(--parchment)' }}>{job.role}</span>
                    <span style={{ fontSize: '0.75rem', background: 'var(--cream)', color: 'var(--text-light)', padding: '4px 10px', borderRadius: '20px', border: '1px solid var(--parchment)' }}>{job.type}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{daysAgo(job.createdAt)}</span>
                  </div>
                </div>
                <p style={{ margin: '12px 0 16px', fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: 1.6 }}>
                  {job.description.length > 200 ? `${job.description.slice(0, 200)}…` : job.description}
                </p>
                <a
                  href={`mailto:${job.applyEmail}?subject=Application: ${encodeURIComponent(job.title)}`}
                  className="btn btn--primary"
                  style={{ fontSize: '0.82rem', padding: '8px 16px' }}
                >
                  Apply →
                </a>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
