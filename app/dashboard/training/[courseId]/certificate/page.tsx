import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { getEffectiveTier, tierCanAccess } from '@/lib/subscriptions'
import { getCourse } from '@/lib/courses'
import { prisma } from '@/lib/prisma'
import PrintButton from '@/components/PrintButton'

interface Props {
  params: Promise<{ courseId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId } = await params
  const course = getCourse(courseId)
  return { title: course ? `${course.title} — Certificate` : 'Certificate' }
}

export default async function CertificatePage({ params }: Props) {
  const { courseId } = await params
  const course = getCourse(courseId)
  if (!course || course.status !== 'available') notFound()

  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const tier = await getEffectiveTier(session.user.id)
  if (!tierCanAccess(tier, course.requiredTier)) redirect(`/dashboard/training/${courseId}`)

  const progress = await prisma.courseProgress.findMany({
    where: { userId: session.user.id, courseId: course.id },
    orderBy: { createdAt: 'desc' },
  })

  const completedSet = new Set(progress.map(r => r.lessonId))
  const allComplete = course.lessons.every(l => completedSet.has(l.id))

  if (!allComplete) redirect(`/dashboard/training/${courseId}`)

  const completionDate = progress[0]?.createdAt ?? new Date()
  const formattedDate = completionDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="certificate-page">
      <div className="certificate-actions no-print">
        <Link href={`/dashboard/training/${courseId}`} className="btn btn--outline-navy" style={{ fontSize: '0.875rem' }}>
          ← Back to Course
        </Link>
        <PrintButton label="Print Certificate" />
      </div>

      <div className="certificate">
        <div className="certificate__border" aria-hidden="true" />

        <div className="certificate__header">
          <div className="certificate__guild-name">The Hospitality Guild</div>
          <div className="certificate__motto">Fide et Hospitalitate</div>
        </div>

        <div className="certificate__seal" aria-hidden="true">◆</div>

        <h1 className="certificate__heading">Certificate of Completion</h1>

        <p className="certificate__presents">This is to certify that</p>

        <div className="certificate__recipient">{session.user.name ?? 'Guild Member'}</div>

        <p className="certificate__body">
          has successfully completed all lessons of
        </p>

        <div className="certificate__course">
          {course.icon} {course.title}
        </div>

        <p className="certificate__body" style={{ marginTop: '8px' }}>
          a course in professional hospitality operations and management
        </p>

        <div className="certificate__footer">
          <div className="certificate__date-block">
            <div className="certificate__date">{formattedDate}</div>
            <div className="certificate__date-label">Date of Completion</div>
          </div>
          <div className="certificate__divider-v" aria-hidden="true" />
          <div className="certificate__verified-block">
            <div className="certificate__verified-icon" aria-hidden="true">🏅</div>
            <div className="certificate__verified-text">Guild Certified</div>
          </div>
        </div>
      </div>
    </div>
  )
}
