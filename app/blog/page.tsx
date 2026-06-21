import type { Metadata } from 'next'
import Link from 'next/link'
import BlogFilter from '@/components/BlogFilter'

export const metadata: Metadata = {
  title: 'Blog & Resources',
  description: 'Articles, guides, and resources for hospitality managers and operators. Practical insight you can use today.',
}

export default function BlogPage() {
  return (
    <main>

      {/* Page Hero */}
      <section className="page-hero" aria-label="Blog and resources">
        <div className="container">
          <h1>Resources for Hospitality Leaders</h1>
          <div className="hero__rule" aria-hidden="true"></div>
          <p>Practical articles, guides, and insights for the managers and operators who take this industry seriously.</p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section" aria-labelledby="blog-heading">
        <div className="container">
          <h2 id="blog-heading" className="sr-only">Blog Articles</h2>
          <BlogFilter />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner" aria-labelledby="blog-cta-heading">
        <div className="container">
          <h2 id="blog-cta-heading">Want More Than Blog Posts?</h2>
          <p>Join the Guild and get access to courses, templates, live workshops, and a community of managers who get it.</p>
          <Link href="/join" className="btn btn--primary btn--lg">Join the Guild</Link>
        </div>
      </section>

    </main>
  )
}
