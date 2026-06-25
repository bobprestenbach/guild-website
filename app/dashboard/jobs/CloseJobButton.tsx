'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CloseJobButton({ jobId }: { jobId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleClose() {
    if (!confirm('Close this job posting? It will be removed from the public board.')) return
    setLoading(true)
    const res = await fetch(`/api/jobs/${jobId}`, { method: 'DELETE' })
    if (res.ok) {
      setDone(true)
      router.refresh()
    }
    setLoading(false)
  }

  if (done) return <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Closed</span>

  return (
    <button
      onClick={handleClose}
      disabled={loading}
      style={{
        background: 'none',
        border: '1px solid var(--primary)',
        color: 'var(--primary)',
        borderRadius: 'var(--radius)',
        padding: '4px 10px',
        fontSize: '0.75rem',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        transition: 'all 0.2s',
      }}
    >
      {loading ? '…' : 'Close'}
    </button>
  )
}
