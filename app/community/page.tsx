import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = {
  title: 'Community',
  description: 'Join a private community of hospitality managers sharing knowledge, support, and real answers to real problems.',
}

export default function CommunityPage() {
  return (
    <main>

      {/* Page Hero */}
      <section className="page-hero" aria-label="Community overview">
        <div className="container">
          <h1>You Shouldn&apos;t Have to Figure This Out Alone</h1>
          <div className="hero__rule" aria-hidden="true"></div>
          <p>The Guild community connects you with hundreds of hospitality professionals who understand your challenges and are generous with their experience.</p>
        </div>
      </section>

      {/* Community Features */}
      <section className="community-features section section--white" aria-labelledby="features-heading">
        <div className="container">
          <SectionHeader
            id="features-heading"
            title="What the Community Looks Like"
            subtitle="Our private Skool community is built around the way hospitality professionals actually work — fast, practical, and always on."
          />
          <div className="grid-2">
            <div className="community-feature">
              <div className="community-feature__icon" aria-hidden="true">💬</div>
              <div>
                <h3>Discussion Forums</h3>
                <p>Post questions, share wins, and get real answers from managers and operators who have been in your exact situation. Organized by topic so you always find what&apos;s relevant.</p>
              </div>
            </div>
            <div className="community-feature">
              <div className="community-feature__icon" aria-hidden="true">📹</div>
              <div>
                <h3>Live Monthly Calls</h3>
                <p>Join our monthly live sessions with guest experts and open Q&amp;A. Can&apos;t make it live? Every session is recorded and available in the resource library within 24 hours.</p>
              </div>
            </div>
            <div className="community-feature">
              <div className="community-feature__icon" aria-hidden="true">📍</div>
              <div>
                <h3>Regional Groups</h3>
                <p>Connect with members in your area for locally relevant conversations, referrals, and even in-person meetups when the community organizes them.</p>
              </div>
            </div>
            <div className="community-feature">
              <div className="community-feature__icon" aria-hidden="true">📚</div>
              <div>
                <h3>Resource Library</h3>
                <p>Every template, SOP, checklist, and recorded webinar is organized in a searchable library. Find what you need in seconds, not hours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A Day in the Guild */}
      <section className="day-in-guild section" aria-labelledby="day-heading">
        <div className="container">
          <SectionHeader
            id="day-heading"
            title="A Day in the Guild"
            subtitle="Here's how a typical member weaves the Guild into their workday."
          />
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-item__dot" aria-hidden="true">☀️</div>
              <div className="timeline-item__content">
                <div className="timeline-item__time">7:30am — Morning Check-in</div>
                <h4>Scan the community feed</h4>
                <p>Start the day with a quick look at new posts. A fellow manager in Chicago shared a scheduling template that saves 2 hours a week — you save it immediately.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item__dot" aria-hidden="true">❓</div>
              <div className="timeline-item__content">
                <div className="timeline-item__time">10:15am — Ask a Question</div>
                <h4>Get answers in real time</h4>
                <p>You post about a recurring issue with late-shift no-shows. Within an hour, three experienced managers have replied with specific tactics they&apos;ve used to solve it.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item__dot" aria-hidden="true">🎓</div>
              <div className="timeline-item__content">
                <div className="timeline-item__time">2:00pm — Training Time</div>
                <h4>Complete a module during downtime</h4>
                <p>While things are quiet between service, you knock out two lessons in the Front of House Excellence track on your phone. Progress saves automatically.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item__dot" aria-hidden="true">📹</div>
              <div className="timeline-item__content">
                <div className="timeline-item__time">4:00pm — Live Webinar</div>
                <h4>Attend a live expert session</h4>
                <p>This month&apos;s guest is a hospitality attorney. You join with 80 other members and walk away with clarity on tip pooling laws in your state — worth the hour alone.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item__dot" aria-hidden="true">📄</div>
              <div className="timeline-item__content">
                <div className="timeline-item__time">6:30pm — Quick Win</div>
                <h4>Download a template, customize, deploy</h4>
                <p>You grab the new server training checklist from the resource library, customize it for your menu in 15 minutes, and hand it to your floor trainer before dinner service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section section--white" aria-labelledby="community-testimonials-heading">
        <div className="container">
          <SectionHeader id="community-testimonials-heading" title="What Members Are Saying" />
          <div className="grid-3">
            <div className="testimonial-card">
              <div className="testimonial-card__quote-mark" aria-hidden="true">&quot;</div>
              <p className="testimonial-card__text">The community is more valuable than any training course I&apos;ve ever taken. Real people, real problems, real solutions — not textbook theory.</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true">DL</div>
                <div>
                  <div className="testimonial-card__name">David L.</div>
                  <div className="testimonial-card__role">Restaurant Owner, Pacific Northwest</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-card__quote-mark" aria-hidden="true">&quot;</div>
              <p className="testimonial-card__text">I posted a question about dealing with a toxic team member and had 12 thoughtful responses within 2 hours. I&apos;ve never experienced anything like it.</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true">MO</div>
                <div>
                  <div className="testimonial-card__name">Maria O.</div>
                  <div className="testimonial-card__role">Operations Manager, Hotel Group</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-card__quote-mark" aria-hidden="true">&quot;</div>
              <p className="testimonial-card__text">The monthly calls alone are worth the membership fee. Having access to industry experts in an open Q&amp;A format is something I can&apos;t get anywhere else.</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true">TC</div>
                <div>
                  <div className="testimonial-card__name">Tom C.</div>
                  <div className="testimonial-card__role">F&amp;B Manager, Resort Property</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skool Preview Mockup */}
      <section className="skool-preview section" aria-labelledby="preview-heading">
        <div className="container">
          <SectionHeader
            id="preview-heading"
            title="A Peek Inside the Community"
            subtitle="The Guild community lives on Skool — a clean, focused platform built for communities like ours. Here's what it looks like."
          />
          <div className="skool-mockup" role="img" aria-label="Preview of the Guild community interface">
            <div className="skool-mockup__bar">
              <div className="skool-mockup__dot"></div>
              <div className="skool-mockup__dot"></div>
              <div className="skool-mockup__dot"></div>
              <div className="skool-mockup__url">skool.com/hospitality-guild</div>
            </div>
            <div className="skool-mockup__body">
              <div className="skool-mockup__sidebar">
                <div className="skool-mockup__sidebar-item active">💬 &nbsp;Community</div>
                <div className="skool-mockup__sidebar-item">🎓 &nbsp;Classroom</div>
                <div className="skool-mockup__sidebar-item">📅 &nbsp;Events</div>
                <div className="skool-mockup__sidebar-item">👥 &nbsp;Members</div>
                <div className="skool-mockup__sidebar-item">📚 &nbsp;Resources</div>
                <div className="skool-mockup__sidebar-item">📍 &nbsp;Regional</div>
              </div>
              <div className="skool-mockup__main">
                <div className="skool-mockup__post">
                  <div className="skool-mockup__post-header">
                    <div className="skool-mockup__avatar">SM</div>
                    <div className="skool-mockup__post-meta">Sarah M. &nbsp;·&nbsp; 42 minutes ago</div>
                  </div>
                  <div className="skool-mockup__post-title">Best new hire onboarding tip I&apos;ve used this year 🔥</div>
                  <div className="skool-mockup__post-text">Started using the buddy system from last month&apos;s webinar and turnover in the first 30 days dropped by half...</div>
                </div>
                <div className="skool-mockup__post">
                  <div className="skool-mockup__post-header">
                    <div className="skool-mockup__avatar">JR</div>
                    <div className="skool-mockup__post-meta">James R. &nbsp;·&nbsp; 1 hour ago</div>
                  </div>
                  <div className="skool-mockup__post-title">Question: How do you handle back-to-back double shifts during holidays?</div>
                  <div className="skool-mockup__post-text">We&apos;re heading into summer and I need a better rotation system. What&apos;s working for your team?</div>
                </div>
                <div className="skool-mockup__post">
                  <div className="skool-mockup__post-header">
                    <div className="skool-mockup__avatar">PK</div>
                    <div className="skool-mockup__post-meta">Priya K. &nbsp;·&nbsp; 2 hours ago</div>
                  </div>
                  <div className="skool-mockup__post-title">Just earned my Front of House Excellence certification! 🎓</div>
                  <div className="skool-mockup__post-text">The upselling module alone changed how my team approaches every table. 12% increase in average check size this month.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" aria-labelledby="community-cta-heading">
        <div className="container">
          <h2 id="community-cta-heading">Join the Community Today</h2>
          <p>Stop figuring it out alone. The Guild community is waiting for you on the other side.</p>
          <Link href="/join" className="btn btn--primary btn--lg">Join the Community</Link>
        </div>
      </section>

    </main>
  )
}
