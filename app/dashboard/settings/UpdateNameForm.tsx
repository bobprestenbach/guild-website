'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UpdateNameForm({ currentName }: { currentName: string }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(currentName)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSave() {
    const trimmed = name.trim()
    if (!trimmed || trimmed === currentName) { setEditing(false); return }
    setSaving(true)
    setError('')
    const res = await fetch('/api/profile/update-name', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: trimmed }),
    })
    if (res.ok) {
      setEditing(false)
      router.refresh()
    } else {
      const d = await res.json()
      setError(d.error ?? 'Failed to update name.')
    }
    setSaving(false)
  }

  if (!editing) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span className="settings-row__value">{currentName || '—'}</span>
        <button
          onClick={() => setEditing(true)}
          style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
        >
          Edit
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          className="form-input"
          style={{ maxWidth: '260px', padding: '8px 12px', fontSize: '0.9rem' }}
          autoFocus
          maxLength={80}
        />
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn--primary"
          style={{ fontSize: '0.82rem', padding: '8px 14px' }}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          onClick={() => { setEditing(false); setName(currentName) }}
          style={{ background: 'none', border: 'none', color: 'var(--text-light)', fontSize: '0.82rem', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>
      {error && <p style={{ fontSize: '0.82rem', color: 'var(--primary)', margin: 0 }}>{error}</p>}
    </div>
  )
}
