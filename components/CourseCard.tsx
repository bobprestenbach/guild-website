import Link from 'next/link'
import type { Course } from '@/lib/courses'
import type { EffectiveTier } from '@/lib/subscriptions'
import { tierCanAccess } from '@/lib/subscriptions'

interface Props {
  course: Course
  userTier: EffectiveTier
  completedCount?: number
}

export default function CourseCard({ course, userTier, completedCount = 0 }: Props) {
  const canAccess = course.status === 'available' && tierCanAccess(userTier, course.requiredTier)
  const isLocked = !tierCanAccess(userTier, course.requiredTier)
  const isComingSoon = course.status === 'coming-soon'
  const total = course.lessons.length
  const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0

  const cardClass = `course-card${isLocked ? ' course-card--locked' : ''}${isComingSoon ? ' course-card--coming-soon' : ''}`

  const content = (
    <>
      <div className="course-card__header">
        <span className="course-card__icon" aria-hidden="true">{course.icon}</span>
        {isComingSoon ? (
          <span className="course-card__badge">Coming Soon</span>
        ) : isLocked ? (
          <span className="course-card__lock" aria-label="Locked">🔒</span>
        ) : (
          <span className="course-card__badge">Available</span>
        )}
      </div>
      <div className="course-card__body">
        <div className="course-card__tagline">{course.tagline}</div>
        <h3 className="course-card__title">{course.title}</h3>
        <p className="course-card__desc">{course.description}</p>
        {!isComingSoon && (
          <div className="course-card__meta">{total} lesson{total !== 1 ? 's' : ''}</div>
        )}
        {canAccess && total > 0 && (
          <>
            <div className="course-card__progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <div className="course-card__progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="dash-card__link">
              {completedCount > 0 ? `Continue (${completedCount}/${total})` : 'Start Course'} →
            </span>
          </>
        )}
        {isLocked && (
          <span style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
            Requires Member plan to unlock
          </span>
        )}
      </div>
    </>
  )

  if (canAccess && total > 0) {
    return (
      <Link href={`/dashboard/training/${course.id}`} className={cardClass} style={{ textDecoration: 'none', display: 'block' }}>
        {content}
      </Link>
    )
  }

  return <div className={cardClass}>{content}</div>
}
