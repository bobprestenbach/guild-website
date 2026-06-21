'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function RemoveMemberButton({ memberId, name }: { memberId: string; name: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleRemove() {
    if (!confirm(`Remove ${name} from your team? They will lose access immediately.`)) return

    startTransition(async () => {
      await fetch('/api/team/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId }),
      })
      router.refresh()
    })
  }

  return (
    <button
      onClick={handleRemove}
      disabled={isPending}
      className="btn btn--outline-navy"
      style={{ fontSize: '0.78rem', padding: '6px 12px', color: 'var(--primary)', borderColor: 'var(--primary)' }}
    >
      {isPending ? 'Removing…' : 'Remove'}
    </button>
  )
}
