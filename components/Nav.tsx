'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/training', label: 'Training' },
  { href: '/community', label: 'Community' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/partners', label: 'Partners' },
  { href: '/blog', label: 'Blog' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const { data: session } = useSession()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const ctaHref = session ? '/dashboard' : '/join'
  const ctaLabel = session ? 'Dashboard' : 'Join the Guild'

  return (
    <nav className="nav" ref={navRef} role="navigation" aria-label="Main navigation">
      <div className="container">
        <div className="nav__inner">
          <Link href="/" className="nav__logo">The Hospitality Guild</Link>
          <ul className="nav__links" role="list">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`nav__link${pathname === href ? ' active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={ctaHref} className={`btn ${session ? 'btn--outline-navy' : 'btn--primary'} nav__cta`}>
            {ctaLabel}
          </Link>
          <button
            className={`nav__hamburger${open ? ' open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div className={`nav__mobile${open ? ' open' : ''}`} role="menu">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="nav__mobile-link"
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          href={ctaHref}
          className={`btn ${session ? 'btn--outline-navy' : 'btn--primary'} nav__mobile-cta`}
          onClick={() => setOpen(false)}
        >
          {ctaLabel}
        </Link>
      </div>
    </nav>
  )
}
