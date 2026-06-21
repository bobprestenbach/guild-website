import type { EffectiveTier } from '@/lib/subscriptions'

const config: Record<EffectiveTier, { label: string; icon: string }> = {
  EXPLORER: { label: 'Explorer', icon: '🧭' },
  MEMBER: { label: 'Member', icon: '⭐' },
  BUSINESS: { label: 'Business', icon: '🏆' },
}

export default function TierBadge({ tier }: { tier: EffectiveTier }) {
  const { label, icon } = config[tier]
  return (
    <span className={`tier-badge tier-badge--${tier.toLowerCase()}`}>
      {icon} {label}
    </span>
  )
}
