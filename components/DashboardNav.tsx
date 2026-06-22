'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import TierBadge from '@/components/TierBadge'
import type { EffectiveTier } from '@/lib/subscriptions'

interface NavLink {
  href: string
  label: string
  icon: string
  tiersOnly?: EffectiveTier[]
}

const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Home', icon: '🏠' },
  { href: '/dashboard/training', label: 'Training', icon: '🎓' },
  { href: '/dashboard/webinars', label: 'Webinars', icon: '📅' },
  { href: '/dashboard/resources', label: 'Resources', icon: '📁' },
  { href: '/dashboard/jobs', label: 'Jobs', icon: '💼' },
  { href: '/dashboard/partners', label: 'Discounts', icon: '🏷️' },
  { href: '/dashboard/community', label: 'Community', icon: '💬' },
  { href: '/dashboard/team', label: 'Team', icon: '👥', tiersOnly: ['BUSINESS'] },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
]

interface Props {
  userName: string | null | undefined
  userImage: string | null | undefined
  tier: EffectiveTier
}

export default function DashboardNav({ userName, userImage, tier }: Props) {
  const pathname = usePathname()

  const initials = userName
    ? userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U'

  return (
    <aside className="dash-sidebar">
      <div className="dash-sidebar__brand">
        <Link href="/" className="dash-sidebar__logo">The Hospitality Guild</Link>
        <div className="dash-sidebar__tagline">Fide et Hospitalitate</div>
      </div>

      <div className="dash-sidebar__user">
        <div className="dash-sidebar__avatar">
          {userImage ? (
            <img src={userImage} alt={userName ?? 'User'} />
          ) : (
            initials
          )}
        </div>
        <div>
          <div className="dash-sidebar__user-name">{userName ?? 'Member'}</div>
          <TierBadge tier={tier} />
        </div>
      </div>

      <nav className="dash-sidebar__nav" aria-label="Dashboard navigation">
        {navLinks
          .filter(({ tiersOnly }) => !tiersOnly || tiersOnly.includes(tier))
          .map(({ href, label, icon }) => {
            const isActive = href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`dash-sidebar__nav-link${isActive ? ' dash-sidebar__nav-link--active' : ''}`}
              >
                <span className="dash-sidebar__nav-icon" aria-hidden="true">{icon}</span>
                {label}
              </Link>
            )
          })}
      </nav>

      <div className="dash-sidebar__footer">
        <button
          className="dash-sidebar__signout"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          ← Sign out
        </button>
      </div>
    </aside>
  )
}
