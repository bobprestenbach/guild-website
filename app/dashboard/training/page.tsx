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

  const completedCourseIds = COURSES
    .filter(c => c.status === 'available' && c.lessons.length > 0 && (completedByCourse[c.id] ?? 0) >= c.lessons.length)
    .map(c => c.id)

  return (
    <>
      <div className="dash-page-header">
        <h1>Training Library</h1>
        <p>Self-paced courses built by hospitality practitioners for real-world operations.</p>
      </div>

      <UpgradePrompt currentTier={tier} />

      {completedCourseIds.length > 0 && (
        <div className="completed-courses-banner">
          <span className="completed-courses-banner__icon" aria-hidden="true">🏅</span>
          <span className="completed-courses-banner__text">
            {completedCourseIds.length} course{completedCourseIds.length !== 1 ? 's' : ''} completed —
          </span>
          {completedCourseIds.map(id => {
            const c = COURSES.find(x => x.id === id)!
            return (
              <a key={id} href={`/dashboard/training/${id}/certificate`} className="completed-courses-banner__link">
                View {c.title} Certificate →
              </a>
            )
          })}
        </div>
      )}

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
