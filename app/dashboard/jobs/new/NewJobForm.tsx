'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Seasonal']
const JOB_ROLES = ['FOH Manager', 'BOH Manager', 'General Manager', 'Executive Chef', 'Event Manager', 'Other']

export default function NewJobForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    startTransition(async () => {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json()
        setError(json.error ?? 'Something went wrong. Please try again.')
        return
      }

      router.push('/dashboard/jobs?posted=1')
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '6px', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Job Title *</label>
          <input name="title" required className="form-input" placeholder="e.g. Front of House Manager" />
        </div>
        <div className="form-group">
          <label className="form-label">Company / Venue *</label>
          <input name="company" required className="form-input" placeholder="e.g. The Grand Hotel" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Location *</label>
          <input name="location" required className="form-input" placeholder="e.g. Chicago, IL" />
        </div>
        <div className="form-group">
          <label className="form-label">Salary / Compensation</label>
          <input name="salary" className="form-input" placeholder="e.g. $60,000–$70,000 or DOE" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Job Type *</label>
          <select name="type" required className="form-input">
            <option value="">Select type…</option>
            {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Role Category *</label>
          <select name="role" required className="form-input">
            <option value="">Select role…</option>
            {JOB_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Job Description *</label>
        <textarea
          name="description"
          required
          className="form-input"
          rows={6}
          placeholder="Describe the role, responsibilities, team, and what makes your operation worth joining..."
          style={{ resize: 'vertical' }}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Application Email *</label>
        <input name="applyEmail" type="email" required className="form-input" placeholder="hiring@yourrestaurant.com" />
        <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '6px' }}>
          Candidates will apply directly to this email. It will be visible on the listing.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
        <button type="submit" disabled={isPending} className="btn btn--primary">
          {isPending ? 'Posting…' : 'Post Job Listing'}
        </button>
        <button type="button" className="btn btn--outline-navy" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  )
}
