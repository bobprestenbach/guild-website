import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const adminEmail = process.env.ADMIN_EMAIL

  if (!session?.user?.email || !adminEmail || session.user.email !== adminEmail) {
    redirect('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--parchment)', fontFamily: 'var(--font-body)' }}>
      <header style={{ background: 'var(--primary-dark)', color: 'var(--cream)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>The Hospitality Guild</span>
          <span style={{ marginLeft: '12px', fontSize: '0.75rem', background: 'rgba(184,148,42,0.25)', color: 'var(--gold)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--gold)' }}>
            Admin
          </span>
        </div>
        <a href="/" style={{ color: 'var(--parchment)', fontSize: '0.85rem', textDecoration: 'none' }}>← Back to Site</a>
      </header>
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        {children}
      </main>
    </div>
  )
}
