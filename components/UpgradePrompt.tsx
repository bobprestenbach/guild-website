'use client'

import type { EffectiveTier } from '@/lib/subscriptions'

interface Props {
  currentTier: EffectiveTier
}

export default function UpgradePrompt({ currentTier }: Props) {
  if (currentTier !== 'EXPLORER') return null

  async function handleUpgrade() {
    const res = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: 'MEMBER' }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  return (
    <div className="upgrade-prompt">
      <div className="upgrade-prompt__content">
        <h3>Upgrade to Member — $29/month</h3>
        <p>Unlock all training courses, the full resource library, live workshops, and partner discounts.</p>
      </div>
      <button className="btn btn--upgrade" onClick={handleUpgrade}>
        Upgrade Now
      </button>
    </div>
  )
}
