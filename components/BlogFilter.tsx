'use client'

import { useState } from 'react'

const posts = [
  {
    category: 'management',
    icon: '📊',
    badge: 'Management',
    readTime: '6 min read',
    title: 'How to Reduce Staff Turnover in Your Restaurant',
    excerpt: "Turnover doesn't start on a person's last day — it starts in the first week. Here are the retention strategies that actually move the needle.",
  },
  {
    category: 'training',
    icon: '✅',
    badge: 'Training',
    readTime: '8 min read',
    title: "New Hire Onboarding: A Complete Manager's Checklist",
    excerpt: "The first 30 days determine whether someone stays or goes. This checklist covers everything you should be doing — and most managers aren't.",
  },
  {
    category: 'management',
    icon: '🤝',
    badge: 'Management',
    readTime: '5 min read',
    title: "How to Handle Difficult Guests Without Losing Your Cool",
    excerpt: "Every manager has a story. The ones who handle it best aren't born with thicker skin — they have a framework. Here's the one that works.",
  },
  {
    category: 'operations',
    icon: '💸',
    badge: 'Operations',
    readTime: '7 min read',
    title: 'The Real Cost of Employee Turnover in Hospitality',
    excerpt: 'Most operators underestimate it by half. When you factor in recruiting, training, lost productivity, and guest experience impact, the number is staggering.',
  },
  {
    category: 'training',
    icon: '🎓',
    badge: 'Training',
    readTime: '9 min read',
    title: 'Building a Training Culture That Actually Sticks',
    excerpt: "One-time orientation isn't training — it's paperwork. A real training culture requires buy-in from leadership, consistency, and the right tools. Here's how to build it.",
  },
  {
    category: 'culture',
    icon: '⭐',
    badge: 'Culture',
    readTime: '6 min read',
    title: 'What Great Hospitality Managers Do Differently',
    excerpt: "After studying hundreds of top operators, the patterns are clear. The best managers aren't the most experienced — they share a specific set of habits and mindsets.",
  },
]

const filterLabels: Record<string, string> = {
  all: 'All',
  training: 'Training',
  management: 'Management',
  operations: 'Operations',
  culture: 'Culture',
}

export default function BlogFilter() {
  const [active, setActive] = useState('all')

  const visible = posts.filter(p => active === 'all' || p.category === active)

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
        {visible.map((post, i) => (
          <article key={i} className="blog-card" data-category={post.category}>
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
              <a href="#" className="blog-card__link">Read More &rarr;</a>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
