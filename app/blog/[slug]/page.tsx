import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BLOG_POSTS, getBlogPost } from '@/lib/blog'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <main>
      <article>
        {/* Post Hero */}
        <section className="page-hero" aria-label={post.title}>
          <div className="container" style={{ maxWidth: '760px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span className="badge badge--navy">{post.badge}</span>
              <span style={{ fontSize: '0.82rem', color: 'rgba(232,223,192,0.7)' }}>{post.publishedAt}</span>
              <span style={{ fontSize: '0.82rem', color: 'rgba(232,223,192,0.7)' }}>· {post.readTime}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', lineHeight: 1.25, marginBottom: '16px' }}>{post.title}</h1>
            <div className="hero__rule" aria-hidden="true" />
            <p style={{ fontSize: '1.05rem', color: 'rgba(232,223,192,0.85)', lineHeight: 1.65 }}>{post.excerpt}</p>
          </div>
        </section>

        {/* Post Body */}
        <section className="section section--white">
          <div className="container" style={{ maxWidth: '720px' }}>
            <div className="blog-post-body">
              {post.content.map((section, i) => {
                if (section.type === 'heading') {
                  return <h2 key={i} className="blog-post-body__heading">{section.text}</h2>
                }
                if (section.type === 'list') {
                  return (
                    <ul key={i} className="blog-post-body__list">
                      {section.items?.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  )
                }
                return <p key={i} className="blog-post-body__p">{section.text}</p>
              })}
            </div>

            {/* CTA */}
            <div className="blog-post-cta">
              <div className="blog-post-cta__icon">⚜</div>
              <div>
                <h3>Want more than articles?</h3>
                <p>Join the Guild and access courses, downloadable SOPs, live webinars, and a community of managers who get it.</p>
              </div>
              <Link href="/join" className="btn btn--primary" style={{ flexShrink: 0 }}>Join the Guild</Link>
            </div>

            {/* Back */}
            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
              <Link href="/blog" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                ← Back to All Articles
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  )
}
