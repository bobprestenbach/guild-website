import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn why The Hospitality Guild was founded, our mission, and who we serve.',
}

export default function AboutPage() {
  return (
    <main>

      {/* Page Hero */}
      <section className="page-hero" aria-label="About the Guild">
        <div className="container">
          <h1>About the Guild</h1>
          <div className="hero__rule" aria-hidden="true"></div>
          <p>We built The Hospitality Guild because we know that great hospitality doesn&apos;t happen by accident — it&apos;s built by dedicated people who deserve better tools and better support.</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section" aria-labelledby="story-heading">
        <div className="container">
          <div className="story-section__inner">
            <div>
              <h2 id="story-heading">Our Story</h2>
              <p className="lead">The Hospitality Guild was born out of frustration — and a deep belief that it doesn&apos;t have to be this hard.</p>
              <p>After years working inside restaurants, hotels, and hospitality groups, we kept seeing the same problems repeat themselves. Talented managers burning out. New team members undertrained and overwhelmed. Operators reinventing the wheel on their own because there was no central place to learn, connect, and grow.</p>
              <p>The industry is full of passionate people who genuinely love what they do. But passion alone doesn&apos;t prevent turnover, fix inconsistent service, or replace the mentorship most managers never received.</p>
              <p>We created the Guild to change that. To give hospitality professionals the training, the tools, and the community they&apos;ve always deserved — all in one place, built specifically for how this industry actually operates.</p>
            </div>
            <div className="story-section__visual" aria-hidden="true">
              <div className="story-section__visual-icon">🏨</div>
              <div className="story-section__visual-text">Founded by hospitality people</div>
              <div className="story-section__visual-sub">for hospitality people</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section" aria-labelledby="mission-heading">
        <div className="container">
          <p
            id="mission-heading"
            style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}
          >
            Our Mission
          </p>
          <blockquote className="mission-section__quote">
            &quot;To equip hospitality businesses with the training, community, and tools they need to build <span className="gold-text">exceptional teams</span> and deliver <span className="gold-text">world-class guest experiences.</span>&quot;
          </blockquote>
        </div>
      </section>

      {/* Who It's For */}
      <section className="who-for-section section" aria-labelledby="who-heading">
        <div className="container">
          <SectionHeader
            id="who-heading"
            title="Who It's For"
            subtitle="The Guild is designed for the people on the front lines of hospitality — the managers, operators, and business owners who set the standard for their teams."
          />
          <div className="grid-3">
            <div className="card who-card">
              <span className="who-card__icon" aria-hidden="true">🍽️</span>
              <h3 className="card__title">Restaurant Managers</h3>
              <p className="card__text">From quick-service to fine dining, restaurant managers face unique staffing and training challenges. The Guild gives you the systems to build a team that thrives, not just survives.</p>
            </div>
            <div className="card who-card">
              <span className="who-card__icon" aria-hidden="true">🏩</span>
              <h3 className="card__title">Hotel Operations Teams</h3>
              <p className="card__text">Consistency across departments is everything in a hotel. We give operations teams the shared training and SOPs to deliver a seamless guest experience at every touchpoint.</p>
            </div>
            <div className="card who-card">
              <span className="who-card__icon" aria-hidden="true">🏪</span>
              <h3 className="card__title">Independent Hospitality Businesses</h3>
              <p className="card__text">Independent operators often wear every hat. The Guild levels the playing field — giving you the resources and support that were previously only available to the big chains.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--white" aria-labelledby="values-heading">
        <div className="container">
          <SectionHeader id="values-heading" title="What We Stand For" />
          <div className="grid-3">
            <div className="card">
              <div className="card__icon" aria-hidden="true">⭐</div>
              <h3 className="card__title">Excellence Over Shortcuts</h3>
              <p className="card__text">We believe in doing things right. Every course, template, and resource we publish is built to the standard we&apos;d want for our own operation.</p>
            </div>
            <div className="card">
              <div className="card__icon" aria-hidden="true">🤝</div>
              <h3 className="card__title">Community First</h3>
              <p className="card__text">The best ideas in this industry come from the people inside it. We create space for genuine knowledge-sharing and peer support.</p>
            </div>
            <div className="card">
              <div className="card__icon" aria-hidden="true">📈</div>
              <h3 className="card__title">Practical Over Theoretical</h3>
              <p className="card__text">We&apos;re not interested in training that looks good on paper. Everything we offer is built for real-world hospitality operations, tested in the field.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" aria-labelledby="about-cta-heading">
        <div className="container">
          <h2 id="about-cta-heading">Ready to Join the Guild?</h2>
          <p>Become part of a community that takes hospitality as seriously as you do.</p>
          <Link href="/join" className="btn btn--primary btn--lg">Join the Guild Today</Link>
        </div>
      </section>

    </main>
  )
}
