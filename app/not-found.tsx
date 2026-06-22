import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: '404 — Page Not Found' }

export default function NotFound() {
  return (
    <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚜</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 700, color: 'var(--primary)', lineHeight: 1, marginBottom: '8px' }}>
          404
        </div>
        <div style={{ width: '60px', height: '2px', background: 'var(--gold)', margin: '0 auto 24px' }} />
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '12px' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-light)', lineHeight: 1.6, marginBottom: '32px' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn--primary">Back to Home</Link>
          <Link href="/dashboard" className="btn btn--outline-navy">Go to Dashboard</Link>
        </div>
      </div>
    </main>
  )
}
