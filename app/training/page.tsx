import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'
import ResourceForm from '@/components/ResourceForm'

export const metadata: Metadata = {
  title: 'Training',
  description: 'Professional training tracks built for the real world of hospitality — from front of house excellence to leadership development.',
}

export default function TrainingPage() {
  return (
    <main>

      {/* Page Hero */}
      <section className="page-hero" aria-label="Training overview">
        <div className="container">
          <h1>Training Built for the Real World of Hospitality</h1>
          <div className="hero__rule" aria-hidden="true"></div>
          <p>No fluff, no generic business theory. Every course is built by practitioners who have managed real teams in real operations.</p>
        </div>
      </section>

      {/* Training Tracks */}
      <section className="training-tracks section section--white" aria-labelledby="tracks-heading">
        <div className="container">
          <SectionHeader
            id="tracks-heading"
            title="Training Tracks"
            subtitle="Four focused tracks designed to address the most critical skill areas in hospitality operations."
          />
          <div className="grid-2">

            <div className="track-card">
              <div className="track-card__header">
                <div className="track-card__icon" aria-hidden="true">🍷</div>
                <span className="badge badge--green">Available Now</span>
              </div>
              <h3>Front of House Excellence</h3>
              <p>Master the guest-facing skills that define your brand and drive loyalty — from first impressions to service recovery.</p>
              <ul className="track-card__topics">
                <li className="track-card__topic">Setting service standards and scripting guest interactions</li>
                <li className="track-card__topic">Handling complaints and turning negatives into positives</li>
                <li className="track-card__topic">Upselling techniques that feel natural, not pushy</li>
              </ul>
            </div>

            <div className="track-card">
              <div className="track-card__header">
                <div className="track-card__icon" aria-hidden="true">🍳</div>
                <span className="badge badge--green">Available Now</span>
              </div>
              <h3>Back of House Operations</h3>
              <p>Build the systems, processes, and team culture that keep your back-of-house running efficiently and consistently.</p>
              <ul className="track-card__topics">
                <li className="track-card__topic">Kitchen workflow design and line efficiency</li>
                <li className="track-card__topic">Food cost control and waste reduction strategies</li>
                <li className="track-card__topic">Health &amp; safety culture and compliance best practices</li>
              </ul>
            </div>

            <div className="track-card">
              <div className="track-card__header">
                <div className="track-card__icon" aria-hidden="true">👔</div>
                <span className="badge badge--gold">Coming Soon</span>
              </div>
              <h3>Manager &amp; Leadership Development</h3>
              <p>Step into your authority and lead your team with clarity, consistency, and confidence — even under pressure.</p>
              <ul className="track-card__topics">
                <li className="track-card__topic">Difficult conversations: feedback, performance, and discipline</li>
                <li className="track-card__topic">Shift management and scheduling optimization</li>
                <li className="track-card__topic">Building a team culture that retains great people</li>
              </ul>
            </div>

            <div className="track-card">
              <div className="track-card__header">
                <div className="track-card__icon" aria-hidden="true">⭐</div>
                <span className="badge badge--gold">Coming Soon</span>
              </div>
              <h3>Guest Experience Mastery</h3>
              <p>Design guest journeys that don&apos;t just satisfy — they create advocates who come back and bring others with them.</p>
              <ul className="track-card__topics">
                <li className="track-card__topic">Mapping and auditing your guest journey end-to-end</li>
                <li className="track-card__topic">Managing online reputation and responding to reviews</li>
                <li className="track-card__topic">Creating memorable moments with limited budget</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works section" aria-labelledby="how-heading">
        <div className="container">
          <SectionHeader
            id="how-heading"
            title="How It Works"
            subtitle="Getting started with Guild training takes minutes, not months."
          />
          <div className="steps">
            <div className="step">
              <div className="step__number" aria-hidden="true">1</div>
              <h3>Join the Guild</h3>
              <p>Create your free or paid membership account and get immediate access to the platform and community.</p>
            </div>
            <div className="step">
              <div className="step__number" aria-hidden="true">2</div>
              <h3>Access Your Training</h3>
              <p>Choose from available tracks and courses. Watch lessons on any device, on your schedule, at your pace.</p>
            </div>
            <div className="step">
              <div className="step__number" aria-hidden="true">3</div>
              <h3>Earn Your Certification</h3>
              <p>Complete each track and receive a Guild certification to recognize your professional development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Teaser / Email Capture */}
      <section className="resource-teaser" aria-labelledby="resource-heading">
        <div className="container">
          <div className="resource-teaser__inner">
            <h2 id="resource-heading">Download Our Free New Hire Onboarding Checklist</h2>
            <p>Stop starting from scratch every time someone new joins your team. Get our battle-tested onboarding checklist — used by Guild members across 200+ operations.</p>
            <ResourceForm />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" aria-labelledby="training-cta-heading">
        <div className="container">
          <h2 id="training-cta-heading">Ready to Level Up Your Team?</h2>
          <p>Get full access to all training tracks, resources, and the Guild community when you become a member.</p>
          <Link href="/join" className="btn btn--primary btn--lg">Join the Guild</Link>
        </div>
      </section>

    </main>
  )
}
