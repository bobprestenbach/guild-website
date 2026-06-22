'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
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
      <div className="form-success visible" role="alert" style={{ padding: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✓</div>
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-dark)', marginBottom: '8px' }}>Message Sent!</h3>
        <p style={{ color: 'var(--text-light)' }}>Thanks for reaching out. We&apos;ll get back to you within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-name">Your Name</label>
          <input id="contact-name" type="text" className="form-input" placeholder="Jane Smith" required value={name} onChange={e => setName(e.target.value)} disabled={status === 'loading'} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">Email Address</label>
          <input id="contact-email" type="email" className="form-input" placeholder="jane@example.com" required value={email} onChange={e => setEmail(e.target.value)} disabled={status === 'loading'} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-subject">Subject</label>
        <input id="contact-subject" type="text" className="form-input" placeholder="How can we help?" value={subject} onChange={e => setSubject(e.target.value)} disabled={status === 'loading'} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-message">Message</label>
        <textarea id="contact-message" className="form-textarea" placeholder="Tell us what's on your mind..." required rows={6} value={message} onChange={e => setMessage(e.target.value)} disabled={status === 'loading'} style={{ resize: 'vertical' }} />
      </div>
      <button type="submit" className="btn btn--primary" disabled={status === 'loading'} style={{ alignSelf: 'flex-start', minWidth: '160px' }}>
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>{errorMsg}</p>
      )}
    </form>
  )
}
