'use client'

import Link from 'next/link'
import { useState } from 'react'

interface ChecklistItem {
  id: string
  label: string
  href: string
  linkText: string
}

const ITEMS: ChecklistItem[] = [
  { id: 'training', label: 'Start your first training course', href: '/dashboard/training', linkText: 'Browse Courses' },
  { id: 'community', label: 'Introduce yourself in the community', href: '/dashboard/community', linkText: 'Go to Community' },
  { id: 'resources', label: 'Download a resource or template', href: '/dashboard/resources', linkText: 'Browse Resources' },
  { id: 'jobs', label: 'Check out the job board', href: '/dashboard/jobs', linkText: 'View Jobs' },
  { id: 'settings', label: 'Complete your account settings', href: '/dashboard/settings', linkText: 'Settings' },
]

const STORAGE_KEY = 'guild_onboarding_v1'

function loadDone(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function saveDone(done: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(done)))
  } catch {}
}

export default function OnboardingChecklist() {
  const [done, setDone] = useState<Set<string>>(() => loadDone())
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('guild_onboarding_dismissed') === '1'
  })

  if (dismissed) return null

  const allDone = ITEMS.every(i => done.has(i.id))

  function toggle(id: string) {
    setDone(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      saveDone(next)
      return next
    })
  }

  function dismiss() {
    localStorage.setItem('guild_onboarding_dismissed', '1')
    setDismissed(true)
  }

  return (
    <div className="onboarding-checklist">
      <div className="onboarding-checklist__header">
        <div>
          <h2 className="onboarding-checklist__title">Get Started with the Guild</h2>
          <p className="onboarding-checklist__sub">Complete these steps to make the most of your membership.</p>
        </div>
        <button className="onboarding-checklist__dismiss" onClick={dismiss} aria-label="Dismiss checklist">
          ✕
        </button>
      </div>

      <div className="onboarding-checklist__progress-bar">
        <div
          className="onboarding-checklist__progress-fill"
          style={{ width: `${(done.size / ITEMS.length) * 100}%` }}
        />
      </div>
      <div className="onboarding-checklist__progress-label">
        {done.size} of {ITEMS.length} completed
      </div>

      <ul className="onboarding-checklist__list">
        {ITEMS.map(item => (
          <li key={item.id} className={`onboarding-checklist__item${done.has(item.id) ? ' onboarding-checklist__item--done' : ''}`}>
            <button
              className="onboarding-checklist__check"
              onClick={() => toggle(item.id)}
              aria-pressed={done.has(item.id)}
              aria-label={`Mark "${item.label}" as ${done.has(item.id) ? 'incomplete' : 'complete'}`}
            >
              {done.has(item.id) ? '✓' : ''}
            </button>
            <span className="onboarding-checklist__label">{item.label}</span>
            <Link href={item.href} className="onboarding-checklist__link">{item.linkText} →</Link>
          </li>
        ))}
      </ul>

      {allDone && (
        <div className="onboarding-checklist__complete">
          🎉 You&apos;re all set! You know your way around the Guild.
          <button className="onboarding-checklist__dismiss-link" onClick={dismiss}>Dismiss</button>
        </div>
      )}
    </div>
  )
}
