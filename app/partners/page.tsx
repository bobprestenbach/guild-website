import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'
import PartnerForm from '@/components/PartnerForm'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Guild members get exclusive access to discounts and deals from our vetted industry partners.',
}

export default function PartnersPage() {
  return (
    <main>

      {/* Page Hero */}
      <section className="page-hero" aria-label="Partners overview">
        <div className="container">
          <h1>Our Affiliate Partners</h1>
          <div className="hero__rule" aria-hidden="true"></div>
          <p>Guild members get exclusive access to discounts and deals from our vetted industry partners — tools and services we stand behind.</p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="partners-grid-section section section--white" aria-labelledby="partners-heading">
        <div className="container">
          <SectionHeader
            id="partners-heading"
            title="Member-Exclusive Partner Discounts"
            subtitle="Every partner in the Guild network has been vetted by our team. These are the tools and services real hospitality operators use and trust."
          />
          <div className="grid-3">

            <div className="partner-card">
              <div className="partner-card__badge">
                <span className="badge badge--gold">Member Discount</span>
              </div>
              <div className="partner-card__logo" aria-hidden="true">🖥️</div>
              <div className="partner-card__category">POS Systems</div>
              <h3>TableFlow POS</h3>
              <p>The cloud-based POS built for full-service restaurants. Tableside ordering, real-time reporting, and seamless kitchen integration.</p>
              <span className="badge badge--navy">20% Off First Year</span>
            </div>

            <div className="partner-card">
              <div className="partner-card__badge">
                <span className="badge badge--gold">Member Discount</span>
              </div>
              <div className="partner-card__logo" aria-hidden="true">👥</div>
              <div className="partner-card__category">Staffing &amp; Recruitment</div>
              <h3>HireHospitality</h3>
              <p>Specialized hospitality staffing solutions connecting operators with pre-vetted, experienced front and back of house talent.</p>
              <span className="badge badge--navy">First Placement Free</span>
            </div>

            <div className="partner-card">
              <div className="partner-card__badge">
                <span className="badge badge--gold">Member Discount</span>
              </div>
              <div className="partner-card__logo" aria-hidden="true">🛏️</div>
              <div className="partner-card__category">Linen &amp; Laundry</div>
              <h3>CrispLine Linen Co.</h3>
              <p>Premium commercial linen supply and laundry services for restaurants and hotels. White-glove delivery and guaranteed stock levels.</p>
              <span className="badge badge--navy">15% Off Monthly Rate</span>
            </div>

            <div className="partner-card">
              <div className="partner-card__badge">
                <span className="badge badge--gold">Member Discount</span>
              </div>
              <div className="partner-card__logo" aria-hidden="true">📊</div>
              <div className="partner-card__category">Scheduling &amp; HR</div>
              <h3>ShiftWise Pro</h3>
              <p>Staff scheduling, time tracking, and HR compliance software designed specifically for shift-based hospitality operations.</p>
              <span className="badge badge--navy">3 Months Free Trial</span>
            </div>

            <div className="partner-card">
              <div className="partner-card__badge">
                <span className="badge badge--gold">Member Discount</span>
              </div>
              <div className="partner-card__logo" aria-hidden="true">🍷</div>
              <div className="partner-card__category">Beverage Distribution</div>
              <h3>Vintage &amp; Vine</h3>
              <p>Curated wine and spirits distributor for independent restaurants and hotels. Expert selection support and flexible ordering minimums.</p>
              <span className="badge badge--navy">10% Off First Order</span>
            </div>

            <div className="partner-card">
              <div className="partner-card__badge">
                <span className="badge badge--gold">Member Discount</span>
              </div>
              <div className="partner-card__logo" aria-hidden="true">⭐</div>
              <div className="partner-card__category">Reputation Management</div>
              <h3>ReviewPulse</h3>
              <p>Automated review monitoring, response tools, and reputation analytics for multi-location hospitality brands and independents.</p>
              <span className="badge badge--navy">30 Days Free + 25% Off</span>
            </div>

          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="become-partner section" aria-labelledby="become-partner-heading">
        <div className="container">
          <div className="become-partner__inner">
            <div className="become-partner__text">
              <h2 id="become-partner-heading">Become a Guild Partner</h2>
              <p>Reach a highly engaged community of hospitality managers and operators who are actively investing in improving their businesses. Our members are decision-makers.</p>
              <p>Guild partnerships are built on trust. We only recommend products and services we believe in — and our members know that.</p>
              <div className="become-partner__perks">
                <div className="become-partner__perk">
                  <span className="become-partner__perk-icon" aria-hidden="true">✓</span>
                  Featured placement in the partner directory
                </div>
                <div className="become-partner__perk">
                  <span className="become-partner__perk-icon" aria-hidden="true">✓</span>
                  Co-branded webinar and content opportunities
                </div>
                <div className="become-partner__perk">
                  <span className="become-partner__perk-icon" aria-hidden="true">✓</span>
                  Newsletter feature to 2,000+ members
                </div>
                <div className="become-partner__perk">
                  <span className="become-partner__perk-icon" aria-hidden="true">✓</span>
                  Community spotlight posts and introductions
                </div>
                <div className="become-partner__perk">
                  <span className="become-partner__perk-icon" aria-hidden="true">✓</span>
                  Direct access to hospitality decision-makers
                </div>
              </div>
            </div>
            <div className="partner-form">
              <h3 style={{ marginBottom: '24px', fontSize: '1.3rem' }}>Partner Inquiry</h3>
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" aria-labelledby="partners-cta-heading">
        <div className="container">
          <h2 id="partners-cta-heading">Unlock All Partner Discounts</h2>
          <p>Partner discounts are exclusively available to Guild members. Join today to access all of them.</p>
          <Link href="/join" className="btn btn--primary btn--lg">Join the Guild</Link>
        </div>
      </section>

    </main>
  )
}
