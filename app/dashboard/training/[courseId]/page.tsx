import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/auth'
import { getEffectiveTier, tierCanAccess } from '@/lib/subscriptions'
import { getCourse } from '@/lib/courses'
import { prisma } from '@/lib/prisma'
import LessonCompleteButton from './LessonCompleteButton'
import LessonVideo from '@/components/LessonVideo'

interface Props {
  params: Promise<{ courseId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId } = await params
  const course = getCourse(courseId)
  return { title: course?.title ?? 'Course' }
}

export default async function CoursePage({ params }: Props) {
  const { courseId } = await params
  const course = getCourse(courseId)
  if (!course) notFound()

  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const tier = await getEffectiveTier(session.user.id)
  const canAccess = course.status === 'available' && tierCanAccess(tier, course.requiredTier)

  const completedLessons = canAccess
    ? await prisma.courseProgress.findMany({
        where: { userId: session.user.id, courseId: course.id },
        select: { lessonId: true },
      })
    : []

  const completedSet = new Set(completedLessons.map(r => r.lessonId))

  if (course.status === 'coming-soon') {
    return (
      <>
        <div className="dash-breadcrumb">
          <Link href="/dashboard/training">Training</Link>
          <span className="dash-breadcrumb__sep">/</span>
          <span>{course.title}</span>
        </div>
        <div className="dash-page-header">
          <h1>{course.icon} {course.title}</h1>
          <p>{course.description}</p>
        </div>
        <div className="dash-card" style={{ maxWidth: 560 }}>
          <div className="dash-card__icon">🚧</div>
          <h3 className="dash-card__title">Coming Soon</h3>
          <p className="dash-card__text">
            This course is in development. Guild members will be notified as soon as it launches.
            Live workshops on this topic are available monthly — check the Webinars section.
          </p>
          <Link href="/dashboard/training" className="dash-card__link">← Back to Training</Link>
        </div>
      </>
    )
  }

  if (!canAccess) {
    return (
      <>
        <div className="dash-breadcrumb">
          <Link href="/dashboard/training">Training</Link>
          <span className="dash-breadcrumb__sep">/</span>
          <span>{course.title}</span>
        </div>
        <div className="upgrade-prompt" style={{ marginBottom: 0 }}>
          <div className="upgrade-prompt__content">
            <h3>🔒 Member Course</h3>
            <p>Upgrade to Member to unlock {course.title} and {course.lessons.length} lessons.</p>
          </div>
          <Link href="/join" className="btn btn--upgrade">Upgrade — $29/mo</Link>
        </div>
      </>
    )
  }

  const completed = completedSet.size
  const total = course.lessons.length
  const progress = Math.round((completed / total) * 100)
  const isCourseComplete = completed === total && total > 0

  return (
    <>
      <div className="dash-breadcrumb">
        <Link href="/dashboard/training">Training</Link>
        <span className="dash-breadcrumb__sep">/</span>
        <span>{course.title}</span>
      </div>

      <div className="dash-page-header">
        <h1>{course.icon} {course.title}</h1>
        <p>{course.description}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>

        {/* Lesson content */}
        <div>
          {course.lessons.map((lesson, idx) => (
            <div key={lesson.id} className="lesson-viewer__section" style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-dark)' }}>
                  Lesson {idx + 1}: {lesson.title}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', flexShrink: 0 }}>{lesson.duration}</span>
              </div>

              <LessonVideo
                videoId={lesson.videoId}
                courseId={course.id}
                lessonId={lesson.id}
                completed={completedSet.has(lesson.id)}
              />

              <p style={{ fontSize: '0.92rem', color: 'var(--text)', marginBottom: '20px', lineHeight: 1.65 }}>{lesson.description}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '10px' }}>
                    Learning Objectives
                  </h4>
                  <ul className="lesson-viewer__list">
                    {lesson.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '10px' }}>
                    Key Takeaways
                  </h4>
                  <ul className="lesson-viewer__list">
                    {lesson.keyPoints.map((kp, i) => <li key={i}>{kp}</li>)}
                  </ul>
                </div>
              </div>

              <LessonCompleteButton
                courseId={course.id}
                lessonId={lesson.id}
                completed={completedSet.has(lesson.id)}
              />
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div>
          <div className="dash-card" style={{ position: 'sticky', top: '24px' }}>
            <h3 className="dash-card__title">Course Progress</h3>
            <div className="course-card__progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} style={{ marginBottom: '8px' }}>
              <div className="course-card__progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: isCourseComplete ? '16px' : '20px' }}>
              {completed} of {total} lessons complete
            </p>

            {isCourseComplete && (
              <Link
                href={`/dashboard/training/${course.id}/certificate`}
                className="btn btn--primary"
                style={{ width: '100%', textAlign: 'center', marginBottom: '20px', fontSize: '0.875rem' }}
              >
                🏅 View Certificate
              </Link>
            )}

            <ul className="lesson-list">
              {course.lessons.map((lesson, idx) => (
                <li key={lesson.id} className="lesson-item">
                  <div className={`lesson-item__status ${completedSet.has(lesson.id) ? 'lesson-item__status--complete' : 'lesson-item__status--available'}`}>
                    {completedSet.has(lesson.id) ? '✓' : idx + 1}
                  </div>
                  <div className="lesson-item__content">
                    <span className="lesson-item__title">{lesson.title}</span>
                    <div className="lesson-item__duration">{lesson.duration}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </>
  )
}
