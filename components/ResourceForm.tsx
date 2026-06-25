'use client'

import { useState } from 'react'

export default function ResourceForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed')
      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success visible" role="alert">
        <p>&#10003; &nbsp;You&apos;re all set! Check your inbox — your checklist is on its way.</p>
      </div>
    )
  }

  return (
    <form className="resource-teaser__form resource-form" noValidate onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-input"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        aria-label="Your name"
        disabled={status === 'loading'}
      />
      <input
        type="email"
        className="form-input"
        placeholder="Your email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        aria-label="Your email address"
        disabled={status === 'loading'}
      />
      <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send Me the Checklist'}
      </button>
      {status === 'error' && (
        <p style={{ color: 'var(--primary)', fontSize: '0.82rem', marginTop: '8px' }}>{errorMsg}</p>
      )}
    </form>
  )
}
