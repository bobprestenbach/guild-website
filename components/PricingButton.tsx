'use client'

import { useRouter } from 'next/navigation'

interface Props {
  tier: 'EXPLORER' | 'MEMBER' | 'BUSINESS'
  label: string
  className?: string
}

export default function PricingButton({ tier, label, className = '' }: Props) {
  const router = useRouter()

  async function handleClick() {
    if (tier === 'EXPLORER') {
      router.push('/signin?callbackUrl=/dashboard')
      return
    }

    const res = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier }),
    })

    if (res.status === 401) {
      router.push(`/signin?callbackUrl=/join`)
      return
    }

    const { url } = await res.json()
    if (url) window.location.href = url
  }

  return (
    <button className={`btn ${className}`} onClick={handleClick}>
      {label}
    </button>
  )
}
