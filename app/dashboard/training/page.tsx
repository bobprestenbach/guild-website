import type { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getEffectiveTier } from '@/lib/subscriptions'
import { COURSES } from '@/lib/courses'
import { prisma } from '@/lib/prisma'
import CourseCard from '@/components/CourseCard'
import UpgradePrompt from '@/components/UpgradePrompt'

export const metadata: Metadata = { title: 'Training' }

export default async function TrainingPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const [tier, progressRecords] = await Promise.all([
    getEffectiveTier(session.user.id),
    prisma.courseProgress.findMany({
      where: { userId: session.user.id },
      select: { courseId: true },
    }),
  ])

  const completedByCourse = progressRecords.reduce<Record<string, number>>((acc, r) => {
    acc[r.courseId] = (acc[r.courseId] ?? 0) + 1
    return acc
  }, {})

  return (
    <>
      <div className="dash-page-header">
        <h1>Training Library</h1>
        <p>Self-paced courses built by hospitality practitioners for real-world operations.</p>
      </div>

      <UpgradePrompt currentTier={tier} />

      <div className="course-grid">
        {COURSES.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            userTier={tier}
            completedCount={completedByCourse[course.id] ?? 0}
          />
        ))}
      </div>
    </>
  )
}
