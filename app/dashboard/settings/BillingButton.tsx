'use client'

export default function BillingButton() {
  async function openPortal() {
    const res = await fetch('/api/stripe/create-portal-session', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  return (
    <button className="btn btn--outline-navy" onClick={openPortal} style={{ fontSize: '0.875rem' }}>
      Manage Billing &amp; Subscription
    </button>
  )
}
