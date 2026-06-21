import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getEffectiveTier } from '@/lib/subscriptions'
import DashboardNav from '@/components/DashboardNav'
import './dashboard.css'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const tier = await getEffectiveTier(session.user.id)

  return (
    <div className="dash-layout">
      <DashboardNav
        userName={session.user.name}
        userImage={session.user.image}
        tier={tier}
      />
      <main className="dash-main">
        {children}
      </main>
    </div>
  )
}
