import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'
import FAQAccordion from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'Join the Guild',
  description: 'Choose your Guild membership and join hundreds of hospitality managers building better teams.',
}

const faqItems = [
  {
    question: 'What is The Hospitality Guild?',
    answer: 'The Hospitality Guild is a membership community and professional development platform built exclusively for hospitality managers and business owners. We provide online training courses, a private community on Skool, downloadable templates and SOPs, live workshops, and access to exclusive partner discounts — all in one place.',
  },
  {
    question: 'Who is this for?',
    answer: "The Guild is built for hospitality professionals at every level — from front-line managers stepping into leadership for the first time to experienced operators looking for a better support network and more structured training programs. If you work in restaurants, hotels, or any hospitality operation and want to build better teams, the Guild is for you.",
  },
  {
    question: 'Can I cancel anytime?',
    answer: "Yes, absolutely. There are no contracts or lock-in periods. You can cancel your paid membership at any time from your account settings. You'll retain access through the end of your current billing period. We'd rather earn your membership every month than trap you in a contract.",
  },
  {
    question: "What's included in the free plan?",
    answer: "The free Explorer plan gives you access to the community basics, including introduction channels and the ability to post and read discussions. You also get access to one free training course (Front of House Essentials), our monthly newsletter, and a selection of free downloadable templates. It's a great way to experience the Guild before committing to a paid plan.",
  },
  {
    question: 'How is this different from other training programs?',
    answer: "Most hospitality training programs are either built for giant chains, or they're generic business content with a hospitality label slapped on it. The Guild is different because it's built by hospitality operators, for hospitality operators. The content is specific, practical, and immediately applicable. And critically, the community aspect means you get peer support alongside your training — something no other platform offers in the same way.",
  },
  {
    question: 'Do you offer team or business plans?',
    answer: "Yes — our Business plan at $99/month includes up to 5 team seat accounts, a manager dashboard to track team progress, priority support, and a personal onboarding call with our team. If you have a larger organization with more than 5 managers, contact us directly and we'll build you a custom plan.",
  },
]

export default function JoinPage() {
  return (
    <main>

      {/* Page Hero */}
      <section className="page-hero" aria-label="Join the Guild">
        <div className="container">
          <h1>Choose Your Membership</h1>
          <div className="hero__rule" aria-hidden="true"></div>
          <p>Whether you&apos;re just getting started or ready to go all in, there&apos;s a tier built for where you are right now.</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section" aria-labelledby="pricing-heading">
        <div className="container">
          <SectionHeader
            id="pricing-heading"
            title="Simple, Transparent Pricing"
            subtitle="No contracts, no hidden fees. Cancel or change your plan anytime."
          />
          <div className="pricing-grid">

            {/* Free Tier */}
            <div className="pricing-card">
              <div className="pricing-card__tier">Free</div>
              <h3>Explorer</h3>
              <div className="pricing-card__price">
                <span className="pricing-card__amount">$0</span>
                <span className="pricing-card__period">/ forever</span>
              </div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '20px' }}>Get a feel for the Guild with no commitment required.</p>
              <div className="pricing-card__divider"></div>
              <ul className="pricing-card__features">
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Access to community basics &amp; introductions
                </li>
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  1 free training course (Front of House Essentials)
                </li>
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Monthly newsletter with tips &amp; resources
                </li>
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Access to free downloadable templates
                </li>
              </ul>
              <a href="https://www.skool.com/hospitality-guild" className="btn btn--outline-navy" target="_blank" rel="noopener noreferrer">Join Free</a>
            </div>

            {/* Member Tier */}
            <div className="pricing-card pricing-card--featured">
              <div className="pricing-card__badge" aria-label="Most popular plan">⭐ Most Popular</div>
              <div className="pricing-card__tier">Paid</div>
              <h3>Member</h3>
              <div className="pricing-card__price">
                <span className="pricing-card__amount">$29</span>
                <span className="pricing-card__period">/ month</span>
              </div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '20px' }}>Everything you need to lead better and build a stronger team.</p>
              <div className="pricing-card__divider"></div>
              <ul className="pricing-card__features">
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Full access to all training tracks &amp; courses
                </li>
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Full community access — all channels &amp; forums
                </li>
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Complete template &amp; SOP library
                </li>
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Live monthly webinars &amp; workshops
                </li>
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Exclusive partner discounts
                </li>
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Job board access
                </li>
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Guild certifications on course completion
                </li>
              </ul>
              <a href="https://www.skool.com/hospitality-guild" className="btn btn--primary" target="_blank" rel="noopener noreferrer">Join Now</a>
            </div>

            {/* Business Tier */}
            <div className="pricing-card">
              <div className="pricing-card__tier">Teams</div>
              <h3>Business</h3>
              <div className="pricing-card__price">
                <span className="pricing-card__amount">$99</span>
                <span className="pricing-card__period">/ month</span>
              </div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '20px' }}>For multi-manager operations that want to build training into their culture.</p>
              <div className="pricing-card__divider"></div>
              <ul className="pricing-card__features">
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Everything in Member, plus:
                </li>
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Up to 5 team seat accounts
                </li>
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Manager dashboard &amp; team progress tracking
                </li>
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Priority community support
                </li>
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  1-on-1 onboarding call with Guild team
                </li>
                <li className="pricing-card__feature">
                  <span className="pricing-card__check">✓</span>
                  Early access to new courses &amp; features
                </li>
              </ul>
              <a href="https://www.skool.com/hospitality-guild" className="btn btn--outline-navy" target="_blank" rel="noopener noreferrer">Get Started</a>
            </div>

          </div>

          {/* Guarantee */}
          <div className="guarantee-banner" role="note">
            <div className="guarantee-banner__icon" aria-hidden="true">🛡️</div>
            <div className="guarantee-banner__text">
              <h4>14-Day Money-Back Guarantee</h4>
              <p>Try the paid membership risk-free for 14 days. Not the right fit? We&apos;ll refund you, no questions asked. Your satisfaction is our promise.</p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" aria-labelledby="faq-heading">
        <div className="container">
          <SectionHeader
            id="faq-heading"
            title="Frequently Asked Questions"
            subtitle="Have questions before you join? We've got answers."
          />
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-banner" aria-labelledby="join-cta-heading">
        <div className="container">
          <h2 id="join-cta-heading">The Industry Is Moving Forward. Are You?</h2>
          <p>Join hundreds of hospitality managers who are already building better teams, running better operations, and delivering better guest experiences.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.skool.com/hospitality-guild" className="btn btn--primary btn--lg" target="_blank" rel="noopener noreferrer">Join the Guild Today</a>
            <Link href="/community" className="btn btn--secondary btn--lg">See What&apos;s Inside</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
