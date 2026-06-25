'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', fontFamily: 'system-ui, sans-serif', background: '#F2ECD8' }}>
          <div style={{ textAlign: 'center', maxWidth: '440px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⚜</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#4A0F1C', marginBottom: '12px' }}>
              Something Went Wrong
            </h1>
            <p style={{ color: '#6B5B5B', lineHeight: 1.6, marginBottom: '28px' }}>
              An unexpected error occurred. Please try again, or contact support if the problem persists.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={reset}
                style={{ padding: '10px 22px', background: '#6B1528', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}
              >
                Try Again
              </button>
              <a
                href="/"
                style={{ padding: '10px 22px', background: 'transparent', color: '#6B1528', border: '1px solid #6B1528', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}
              >
                Go Home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
