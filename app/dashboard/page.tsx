import type { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getEffectiveTier } from '@/lib/subscriptions'
import { COURSES } from '@/lib/courses'
import { prisma } from '@/lib/prisma'
import TierBadge from '@/components/TierBadge'
import UpgradePrompt from '@/components/UpgradePrompt'
import OnboardingChecklist from '@/components/OnboardingChecklist'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const [tier, progressRecords, userRecord] = await Promise.all([
    getEffectiveTier(session.user.id),
    prisma.courseProgress.findMany({
      where: { userId: session.user.id },
      select: { courseId: true, lessonId: true },
    }),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { createdAt: true },
    }),
  ])

  const accountAgeDays = userRecord
    ? Math.floor((Date.now() - userRecord.createdAt.getTime()) / 86400000)
    : 999
  const isNewMember = accountAgeDays <= 14

  const params = await searchParams
  const showSuccess = params.checkout === 'success'

  const firstName = session.user.name?.split(' ')[0] ?? 'there'

  const completedByCourse = progressRecords.reduce<Record<string, number>>((acc, r) => {
    acc[r.courseId] = (acc[r.courseId] ?? 0) + 1
    return acc
  }, {})

  const availableCourses = COURSES.filter(
    c => c.status === 'available' && (tier === 'MEMBER' || tier === 'BUSINESS' || c.requiredTier === 'EXPLORER')
  )

  const totalLessons = availableCourses.reduce((acc, c) => acc + c.lessons.length, 0)
  const completedLessons = progressRecords.length

  return (
    <>
      {showSuccess && (
        <div className="checkout-success-banner">
          <div className="checkout-success-banner__icon">🎉</div>
          <div>
            <h3>Welcome to the Guild!</h3>
            <p>Your membership is now active. Explore your training courses and connect with the community.</p>
          </div>
        </div>
      )}

      <div className="dash-header">
        <div className="dash-header__greeting">Welcome back</div>
        <h1 className="dash-header__title">Hello, {firstName} <TierBadge tier={tier} /></h1>
      </div>

      <UpgradePrompt currentTier={tier} />

      {isNewMember && <OnboardingChecklist />}

      <div className="dash-grid">
        <div className="dash-card">
          <div className="dash-card__icon">🎓</div>
          <h3 className="dash-card__title">Training Progress</h3>
          <p className="dash-card__text">
            {completedLessons} of {totalLessons} lessons completed across {availableCourses.length} course{availableCourses.length !== 1 ? 's' : ''}.
          </p>
          <Link href="/dashboard/training" className="dash-card__link">Continue Training →</Link>
        </div>

        <div className="dash-card">
          <div className="dash-card__icon">📁</div>
          <h3 className="dash-card__title">Resource Library</h3>
          <p className="dash-card__text">
            Templates, SOPs, checklists, and tools ready to download and use today.
          </p>
          <Link href="/dashboard/resources" className="dash-card__link">Browse Resources →</Link>
        </div>

        <div className="dash-card">
          <div className="dash-card__icon">💬</div>
          <h3 className="dash-card__title">Community</h3>
          <p className="dash-card__text">
            Connect with fellow hospitality managers, share wins, and get answers fast.
          </p>
          <Link href="/dashboard/community" className="dash-card__link">Go to Community →</Link>
        </div>

        {(tier === 'MEMBER' || tier === 'BUSINESS') && (
          <div className="dash-card">
            <div className="dash-card__icon">📅</div>
            <h3 className="dash-card__title">Upcoming Webinar</h3>
            <p className="dash-card__text">
              <strong>Next session:</strong> Managing Seasonal Staffing Surges — join live or catch the replay.
            </p>
            <a href="#" className="dash-card__link">View Schedule →</a>
          </div>
        )}

        <div className="dash-card">
          <div className="dash-card__icon">🏷️</div>
          <h3 className="dash-card__title">Partner Discounts</h3>
          <p className="dash-card__text">
            Exclusive deals on POS systems, staffing, scheduling software, and more.
          </p>
          <Link href="/partners" className="dash-card__link">View Partners →</Link>
        </div>

        <div className="dash-card">
          <div className="dash-card__icon">⚙️</div>
          <h3 className="dash-card__title">Account &amp; Billing</h3>
          <p className="dash-card__text">
            Manage your subscription, update billing details, or upgrade your plan.
          </p>
          <Link href="/dashboard/settings" className="dash-card__link">Account Settings →</Link>
        </div>
      </div>

      {/* Recently started courses */}
      {Object.keys(completedByCourse).length > 0 && (
        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '16px' }}>
            Continue Where You Left Off
          </h2>
          <div className="dash-grid">
            {COURSES.filter(c => completedByCourse[c.id] !== undefined).slice(0, 2).map(course => (
              <div key={course.id} className="dash-card">
                <div className="dash-card__icon">{course.icon}</div>
                <h3 className="dash-card__title">{course.title}</h3>
                <p className="dash-card__text">
                  {completedByCourse[course.id]} of {course.lessons.length} lessons completed
                </p>
                <Link href={`/dashboard/training/${course.id}`} className="dash-card__link">Continue →</Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
