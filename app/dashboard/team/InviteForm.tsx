'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function InviteForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('idle')

    startTransition(async () => {
      const res = await fetch('/api/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const json = await res.json()

      if (!res.ok) {
        setStatus('error')
        setMessage(json.error ?? 'Something went wrong.')
        return
      }

      setStatus('success')
      setMessage(`Invitation sent to ${email}`)
      setEmail('')
      router.refresh()
    })
  }

  return (
    <div>
      {status === 'success' && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '12px 16px', borderRadius: '6px', fontSize: '0.875rem', marginBottom: '16px' }}>
          ✓ {message}
        </div>
      )}
      {status === 'error' && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '6px', fontSize: '0.875rem', marginBottom: '16px' }}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="colleague@theirrestaurant.com"
          className="form-input"
          style={{ flex: '1', minWidth: '260px' }}
        />
        <button type="submit" disabled={isPending} className="btn btn--primary" style={{ fontSize: '0.875rem' }}>
          {isPending ? 'Sending…' : 'Send Invite'}
        </button>
      </form>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '8px' }}>
        They&apos;ll receive an email with a link to join your team. Invitations expire in 7 days.
      </p>
    </div>
  )
}
