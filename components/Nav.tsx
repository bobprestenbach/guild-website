'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/training', label: 'Training' },
  { href: '/community', label: 'Community' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/partners', label: 'Partners' },
  { href: '/blog', label: 'Blog' },
  { href: '/join', label: 'Join' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

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
          <Link href="/join" className="btn btn--primary nav__cta">Join the Guild</Link>
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
        <Link href="/join" className="btn btn--primary nav__mobile-cta" onClick={() => setOpen(false)}>
          Join the Guild
        </Link>
      </div>
    </nav>
  )
}
