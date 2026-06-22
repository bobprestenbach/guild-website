import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = { title: 'Admin — The Hospitality Guild' }

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{
      background: 'var(--cream)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      boxShadow: 'var(--card-shadow)',
    }}>
      <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-light)', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)', color: 'var(--primary-dark)', fontWeight: 700 }}>{value}</div>
      {sub && <div style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginTop: '4px' }}>{sub}</div>}
    </div>
  )
}

export default async function AdminPage() {
  const now = new Date()

  const [
    totalUsers,
    memberCount,
    businessCount,
    activeJobs,
    newsletterCount,
    recentUsers,
    recentJobs,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.membership.count({ where: { tier: 'MEMBER', stripeCurrentPeriodEnd: { gt: now } } }),
    prisma.membership.count({ where: { tier: 'BUSINESS', stripeCurrentPeriodEnd: { gt: now } } }),
    prisma.jobPost.count({ where: { status: 'active', expiresAt: { gt: now } } }),
    prisma.newsletterSubscriber.count(),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: { id: true, name: true, email: true, createdAt: true },
    }),
    prisma.jobPost.findMany({
      where: { status: 'active', expiresAt: { gt: now } },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, title: true, company: true, location: true, createdAt: true },
    }),
  ])

  const explorerCount = totalUsers - memberCount - businessCount
  const estimatedMRR = memberCount * 29 + businessCount * 99

  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '32px' }}>
        Dashboard Overview
      </h1>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        <StatCard label="Total Members" value={totalUsers} />
        <StatCard label="Explorer (Free)" value={explorerCount} />
        <StatCard label="Member ($29/mo)" value={memberCount} />
        <StatCard label="Business ($99/mo)" value={businessCount} />
        <StatCard label="Active Job Posts" value={activeJobs} />
        <StatCard label="Newsletter Subs" value={newsletterCount} />
        <StatCard label="Est. MRR" value={`$${estimatedMRR.toLocaleString()}`} sub={`${memberCount + businessCount} paid seats`} />
      </div>

      {/* Recent signups */}
      <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', marginBottom: '24px', boxShadow: 'var(--card-shadow)' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-dark)' }}>Recent Sign-ups</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Name', 'Email', 'Joined'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 24px', color: 'var(--text-light)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid rgba(184,148,42,0.1)' }}>
                  <td style={{ padding: '12px 24px', color: 'var(--text)' }}>{u.name ?? '—'}</td>
                  <td style={{ padding: '12px 24px', color: 'var(--text-light)' }}>{u.email}</td>
                  <td style={{ padding: '12px 24px', color: 'var(--text-light)' }}>{u.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                </tr>
              ))}
              {recentUsers.length === 0 && (
                <tr><td colSpan={3} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-light)' }}>No users yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active job posts */}
      <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--card-shadow)' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-dark)' }}>Active Job Posts</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Title', 'Company', 'Location', 'Posted'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 24px', color: 'var(--text-light)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentJobs.map(j => (
                <tr key={j.id} style={{ borderBottom: '1px solid rgba(184,148,42,0.1)' }}>
                  <td style={{ padding: '12px 24px', color: 'var(--text)', fontWeight: 500 }}>{j.title}</td>
                  <td style={{ padding: '12px 24px', color: 'var(--text-light)' }}>{j.company}</td>
                  <td style={{ padding: '12px 24px', color: 'var(--text-light)' }}>{j.location}</td>
                  <td style={{ padding: '12px 24px', color: 'var(--text-light)' }}>{j.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                </tr>
              ))}
              {recentJobs.length === 0 && (
                <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-light)' }}>No active job posts.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
