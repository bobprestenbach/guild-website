import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'

export default function HomePage() {
  return (
    <main>

      {/* Hero */}
      <section className="hero" aria-label="Hero">
        <div className="hero__bg-pattern" aria-hidden="true"></div>
        <div className="hero__glow" aria-hidden="true"></div>
        <div className="hero__content">
          <span className="hero__eyebrow">The Membership Community for Hospitality Professionals</span>
          <h1 className="hero__headline">Stop Losing Great Staff.<br />Start Building Great Teams.</h1>
          <div className="hero__rule" aria-hidden="true"></div>
          <p className="hero__sub">The Hospitality Guild is the community, training, and resource hub built exclusively for hospitality managers and businesses.</p>
          <div className="hero__buttons">
            <Link href="/join" className="btn btn--primary btn--lg">Join the Guild</Link>
            <Link href="/community" className="btn btn--secondary btn--lg">See What&apos;s Inside</Link>
          </div>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll</span>
          <div className="hero__scroll-arrow"></div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="pain-points section" aria-labelledby="pain-heading">
        <div className="container">
          <SectionHeader
            id="pain-heading"
            title="We Know What You're Dealing With"
            subtitle="The hospitality industry is one of the most demanding in the world. We built the Guild for the challenges you face every single day."
          />
          <div className="grid-3">
            <div className="card">
              <div className="card__icon" aria-hidden="true">🔄</div>
              <h3 className="card__title">High Staff Turnover</h3>
              <p className="card__text">The hospitality industry loses more employees than almost any other. It&apos;s costing you time, money, and morale — and it doesn&apos;t have to.</p>
            </div>
            <div className="card">
              <div className="card__icon" aria-hidden="true">📋</div>
              <h3 className="card__title">Inconsistent Training</h3>
              <p className="card__text">Without a system, every manager trains differently. Your guest experience suffers every time someone new steps onto the floor.</p>
            </div>
            <div className="card">
              <div className="card__icon" aria-hidden="true">🧭</div>
              <h3 className="card__title">No Support Network</h3>
              <p className="card__text">Most managers figure it out alone. There&apos;s nowhere to turn when you need real answers from people who truly get it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="solution section" aria-labelledby="solution-heading">
        <div className="container">
          <SectionHeader
            id="solution-heading"
            title="Everything You Need. One Guild."
            subtitle="We've combined professional training, a thriving community, and a library of ready-to-use resources into one membership built for hospitality."
          />
          <div className="solution__grid">
            <div className="solution__item">
              <span className="solution__icon" aria-hidden="true">🎓</span>
              <h3>Training</h3>
              <p>Courses and certifications built for real hospitality operations — not generic business fluff.</p>
            </div>
            <div className="solution__item">
              <span className="solution__icon" aria-hidden="true">🤝</span>
              <h3>Community</h3>
              <p>A private network of managers sharing knowledge, best practices, and genuine support.</p>
            </div>
            <div className="solution__item">
              <span className="solution__icon" aria-hidden="true">📁</span>
              <h3>Resources</h3>
              <p>Templates, SOPs, checklists, and tools ready to download and put to work immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Stack */}
      <section className="value-stack section" aria-labelledby="value-heading">
        <div className="container">
          <SectionHeader
            id="value-heading"
            title="Your Membership Includes"
            subtitle="Everything you need to lead with confidence and build a team that actually stays."
          />
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">🎓</div>
              <div className="feature-card__content">
                <h4>Online Training Courses</h4>
                <p>Self-paced courses covering every area of hospitality operations, built by industry veterans.</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">💬</div>
              <div className="feature-card__content">
                <h4>Private Manager Community</h4>
                <p>A members-only Skool community where you can ask questions and get answers from peers.</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">📄</div>
              <div className="feature-card__content">
                <h4>Downloadable Templates &amp; SOPs</h4>
                <p>Ready-to-use documents you can customize for your operation — stop building from scratch.</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">📅</div>
              <div className="feature-card__content">
                <h4>Live Workshops &amp; Webinars</h4>
                <p>Monthly live sessions with industry experts, Q&amp;As, and interactive workshops.</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">🏷️</div>
              <div className="feature-card__content">
                <h4>Exclusive Partner Discounts</h4>
                <p>Member-only deals on tools, supplies, and services from our vetted industry partners.</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">💼</div>
              <div className="feature-card__content">
                <h4>Job Board Access</h4>
                <p>Find and post hospitality positions within a community that values quality and culture.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section" aria-labelledby="testimonials-heading">
        <div className="container">
          <SectionHeader
            id="testimonials-heading"
            title="Trusted by Hospitality Leaders"
            subtitle="Managers and operators across the industry are already seeing the difference."
          />
          <div className="grid-3">
            <div className="testimonial-card">
              <div className="testimonial-card__quote-mark" aria-hidden="true">&quot;</div>
              <p className="testimonial-card__text">The Guild changed how I onboard new hires. The templates alone saved me hours, and the community helped me solve problems I&apos;d been struggling with for months.</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true">SM</div>
                <div>
                  <div className="testimonial-card__name">Sarah M.</div>
                  <div className="testimonial-card__role">General Manager, Full-Service Restaurant</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-card__quote-mark" aria-hidden="true">&quot;</div>
              <p className="testimonial-card__text">I&apos;ve tried other training platforms and nothing came close to the real-world relevance here. The F&amp;B operations course is exactly what my team needed.</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true">JR</div>
                <div>
                  <div className="testimonial-card__name">James R.</div>
                  <div className="testimonial-card__role">F&amp;B Director, Boutique Hotel Group</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-card__quote-mark" aria-hidden="true">&quot;</div>
              <p className="testimonial-card__text">As an independent operator, I always felt isolated. The Guild community gave me a network of people who actually understand what I&apos;m dealing with every day.</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true">PK</div>
                <div>
                  <div className="testimonial-card__name">Priya K.</div>
                  <div className="testimonial-card__role">Hotel Operations Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="cta-banner" aria-labelledby="cta-heading">
        <div className="container">
          <h2 id="cta-heading">Ready to Build a Better Team?</h2>
          <p>Join hundreds of hospitality managers already inside the guild — and start seeing the difference this week.</p>
          <Link href="/join" className="btn btn--primary btn--lg">Join the Guild Today</Link>
        </div>
      </section>

    </main>
  )
}
