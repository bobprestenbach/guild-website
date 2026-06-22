import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import SectionHeader from '@/components/SectionHeader'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hospitality Job Board',
  description: 'Browse hospitality management jobs posted by Guild members.',
}

const roleColors: Record<string, string> = {
  'FOH Manager': '#2563eb',
  'BOH Manager': '#7c3aed',
  'General Manager': '#059669',
  'Executive Chef': '#d97706',
  'Event Manager': '#db2777',
  'Other': '#6b7280',
}

function daysAgo(date: Date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  return `${diff} days ago`
}

export default async function JobsPage() {
  const jobs = await prisma.jobPost.findMany({
    where: { status: 'active', expiresAt: { gt: new Date() } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main>
      <section className="page-hero" aria-label="Job Board">
        <div className="container">
          <h1>Hospitality Job Board</h1>
          <div className="hero__rule" aria-hidden="true"></div>
          <p>Roles posted by Guild members — operations that invest in their people.</p>
        </div>
      </section>

      <section className="jobs-section" aria-labelledby="jobs-heading">
        <div className="container">
          <SectionHeader
            id="jobs-heading"
            title="Open Positions"
            subtitle="Every listing comes from a Guild member operation. Quality over quantity."
          />

          {jobs.length === 0 ? (
            <div className="jobs-empty">
              <div className="jobs-empty__icon" aria-hidden="true">📋</div>
              <h3>No open positions right now</h3>
              <p>Check back soon — new roles are posted regularly by Guild members.</p>
              <Link href="/join" className="btn btn--primary">Join the Guild to Post a Job</Link>
            </div>
          ) : (
            <div className="jobs-grid">
              {jobs.map(job => (
                <article key={job.id} className="job-card">
                  <div className="job-card__header">
                    <div>
                      <span
                        className="job-card__role-badge"
                        style={{ background: roleColors[job.role] ?? roleColors['Other'] }}
                      >
                        {job.role}
                      </span>
                      <span className="job-card__type">{job.type}</span>
                    </div>
                    <span className="job-card__date">{daysAgo(job.createdAt)}</span>
                  </div>
                  <h2 className="job-card__title">{job.title}</h2>
                  <div className="job-card__meta">
                    <span className="job-card__company">{job.company}</span>
                    <span className="job-card__separator" aria-hidden="true">·</span>
                    <span>{job.location}</span>
                    {job.salary && (
                      <>
                        <span className="job-card__separator" aria-hidden="true">·</span>
                        <span className="job-card__salary">{job.salary}</span>
                      </>
                    )}
                  </div>
                  <p className="job-card__description">{job.description}</p>
                  <div className="job-card__footer">
                    <a
                      href={`mailto:${job.applyEmail}?subject=Application: ${encodeURIComponent(job.title)}`}
                      className="btn btn--primary"
                      style={{ fontSize: '0.875rem' }}
                    >
                      Apply Now
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="jobs-cta-banner">
            <div className="jobs-cta-banner__text">
              <h3>Hiring? Post a Role for Free</h3>
              <p>Guild Member and Business subscribers can post unlimited job listings — included with your membership.</p>
            </div>
            <Link href="/dashboard/jobs/new" className="btn btn--outline-navy">Post a Job →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
