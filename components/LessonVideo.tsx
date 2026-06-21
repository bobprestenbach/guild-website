'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import VideoPlayer from '@/components/VideoPlayer'

interface Props {
  videoId?: string
  courseId: string
  lessonId: string
  completed: boolean
}

export default function LessonVideo({ videoId, courseId, lessonId, completed }: Props) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleComplete() {
    if (completed) return
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, lessonId }),
    })
    startTransition(() => router.refresh())
  }

  if (!videoId) {
    return (
      <div className="lesson-viewer__video" style={{ marginBottom: '24px' }}>
        <div className="lesson-viewer__video-icon" aria-hidden="true">▶️</div>
        <div className="lesson-viewer__video-text">Video content coming soon</div>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: '24px' }}>
      <VideoPlayer videoId={videoId} onComplete={handleComplete} />
      {isPending && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '8px', textAlign: 'center' }}>
          Saving progress…
        </p>
      )}
    </div>
  )
}
