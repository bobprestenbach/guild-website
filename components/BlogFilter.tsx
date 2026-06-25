'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog'

const filterLabels: Record<string, string> = {
  all: 'All',
  training: 'Training',
  management: 'Management',
  operations: 'Operations',
  culture: 'Culture',
}

export default function BlogFilter() {
  const [active, setActive] = useState('all')

  const visible = BLOG_POSTS.filter(p => active === 'all' || p.category === active)

  return (
    <>
      <div className="blog-filters" role="group" aria-label="Filter articles by category">
        {Object.entries(filterLabels).map(([value, label]) => (
          <button
            key={value}
            className={`filter-btn${active === value ? ' active' : ''}`}
            data-filter={value}
            onClick={() => setActive(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="blog-grid">
        {visible.map(post => (
          <article key={post.slug} className="blog-card" data-category={post.category}>
            <div className="blog-card__image" aria-hidden="true">
              <div className="blog-card__image-icon">{post.icon}</div>
              <div className="blog-card__image-overlay"></div>
            </div>
            <div className="blog-card__content">
              <div className="blog-card__meta">
                <span className="badge badge--navy">{post.badge}</span>
                <span className="blog-card__read-time">{post.readTime}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="blog-card__link">Read More &rarr;</Link>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
