'use client'

import { useState } from 'react'

export default function NewsletterForm() {
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
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed')
      setStatus('success')
      setEmail('')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="newsletter-success">
        <span className="newsletter-success__icon">✓</span>
        <p>You&apos;re on the list! We&apos;ll keep you in the loop.</p>
      </div>
    )
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        className="newsletter-form__input"
        placeholder="Your email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        disabled={status === 'loading'}
        aria-label="Email address"
      />
      <button
        type="submit"
        className="btn btn--gold"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Subscribing…' : 'Stay Updated'}
      </button>
      {status === 'error' && (
        <p className="newsletter-form__error">{errorMsg}</p>
      )}
    </form>
  )
}
