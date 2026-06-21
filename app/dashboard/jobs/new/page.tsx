import type { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getEffectiveTier, tierCanAccess } from '@/lib/subscriptions'
import Link from 'next/link'
import NewJobForm from './NewJobForm'

export const metadata: Metadata = { title: 'Post a Job' }

export default async function PostJobPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const tier = await getEffectiveTier(session.user.id)
  if (!tierCanAccess(tier, 'MEMBER')) redirect('/join')

  return (
    <>
      <div className="dash-page-header dash-page-header--flex">
        <div>
          <h1>Post a Job</h1>
          <p>Your listing will appear on the public job board for 30 days.</p>
        </div>
        <Link href="/dashboard/jobs" className="btn btn--outline-navy" style={{ fontSize: '0.875rem', alignSelf: 'flex-start' }}>
          ← Back to Jobs
        </Link>
      </div>

      <div className="settings-card" style={{ maxWidth: '720px' }}>
        <div className="settings-card__body" style={{ paddingTop: '24px' }}>
          <NewJobForm />
        </div>
      </div>
    </>
  )
}
