'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  courseId: string
  lessonId: string
  completed: boolean
}

export default function LessonCompleteButton({ courseId, lessonId, completed: initialCompleted }: Props) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function toggle() {
    const res = await fetch('/api/progress', {
      method: completed ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, lessonId }),
    })
    if (res.ok) {
      setCompleted(!completed)
      startTransition(() => router.refresh())
    }
  }

  return (
    <button
      className={`btn ${completed ? 'btn--outline-navy' : 'btn--primary'}`}
      onClick={toggle}
      disabled={isPending}
      style={{ fontSize: '0.875rem' }}
    >
      {isPending ? 'Saving...' : completed ? '✓ Completed — Mark Incomplete' : 'Mark as Complete'}
    </button>
  )
}
