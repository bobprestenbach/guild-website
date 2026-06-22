import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Hospitality Guild team. We respond within one business day.',
}

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero" aria-label="Contact us">
        <div className="container">
          <h1>Get in Touch</h1>
          <div className="hero__rule" aria-hidden="true" />
          <p>Questions about membership, partnerships, or anything else? We read every message and respond within one business day.</p>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="contact-layout">

            {/* Contact info sidebar */}
            <div className="contact-layout__info">
              <div className="contact-info-card">
                <div className="contact-info-card__icon">📧</div>
                <h3>Email</h3>
                <p>hello@thehospitalityguild.com</p>
              </div>
              <div className="contact-info-card">
                <div className="contact-info-card__icon">💬</div>
                <h3>Community Support</h3>
                <p>For fastest support, post in the members-only help channel in our Skool community.</p>
                <Link href="/dashboard/community" className="btn btn--outline-navy" style={{ fontSize: '0.82rem', marginTop: '12px', display: 'inline-block' }}>
                  Go to Community
                </Link>
              </div>
              <div className="contact-info-card">
                <div className="contact-info-card__icon">🤝</div>
                <h3>Partnerships</h3>
                <p>Interested in becoming a Guild partner? Use the form and select "Partnership Inquiry" as your subject.</p>
                <Link href="/partners" className="btn btn--outline-navy" style={{ fontSize: '0.82rem', marginTop: '12px', display: 'inline-block' }}>
                  Partner With Us
                </Link>
              </div>
            </div>

            {/* Contact form */}
            <div className="contact-layout__form">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '28px' }}>
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
