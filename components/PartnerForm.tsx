'use client'

import { useState } from 'react'

export default function PartnerForm() {
  const [company, setCompany] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, contactName, contactEmail, category, message }),
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
        <p>&#10003; &nbsp;Thanks for reaching out! Our partnerships team will review your inquiry and be in touch within 3 business days.</p>
      </div>
    )
  }

  return (
    <form className="partner-inquiry-form" noValidate onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="company-name">Company Name</label>
        <input type="text" id="company-name" className="form-input" placeholder="e.g. Acme Hospitality Solutions" required value={company} onChange={e => setCompany(e.target.value)} disabled={status === 'loading'} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-name">Contact Name</label>
        <input type="text" id="contact-name" className="form-input" placeholder="Your full name" required value={contactName} onChange={e => setContactName(e.target.value)} disabled={status === 'loading'} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-email">Email Address</label>
        <input type="email" id="contact-email" className="form-input" placeholder="you@company.com" required value={contactEmail} onChange={e => setContactEmail(e.target.value)} disabled={status === 'loading'} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="partner-category">Category</label>
        <select id="partner-category" className="form-select" value={category} onChange={e => setCategory(e.target.value)} disabled={status === 'loading'}>
          <option value="">Select a category</option>
          <option>POS &amp; Technology</option>
          <option>Staffing &amp; Recruitment</option>
          <option>Food &amp; Beverage Supply</option>
          <option>Linen &amp; Laundry</option>
          <option>Scheduling &amp; HR Software</option>
          <option>Training &amp; Consulting</option>
          <option>Marketing &amp; Reputation</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="partner-message">Tell Us About Your Product or Service</label>
        <textarea id="partner-message" className="form-textarea" placeholder="Briefly describe what you offer and why it would be valuable to Guild members..." value={message} onChange={e => setMessage(e.target.value)} disabled={status === 'loading'} />
      </div>
      <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Submit Partner Inquiry'}
      </button>
      {status === 'error' && (
        <p style={{ color: 'var(--primary)', fontSize: '0.82rem', marginTop: '8px' }}>{errorMsg}</p>
      )}
    </form>
  )
}
