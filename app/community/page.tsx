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
            subtitle="The Guild community is built around the way hospitality professionals actually work — fast, practical, and always on."
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

      {/* Platform Preview */}
      <section className="section" aria-labelledby="preview-heading">
        <div className="container">
          <SectionHeader
            id="preview-heading"
            title="Everything in One Place"
            subtitle="The Guild is a fully integrated platform — community, training, resources, and events all live together inside your dashboard."
          />
          <div className="grid-3">
            <div className="card">
              <div className="card__icon" aria-hidden="true">💬</div>
              <h3 className="card__title">Discussion Forums</h3>
              <p className="card__text">Organized channels for every topic — staffing, training, operations, leadership, and more. Post a question, get real answers fast.</p>
            </div>
            <div className="card">
              <div className="card__icon" aria-hidden="true">🎓</div>
              <h3 className="card__title">Integrated Training</h3>
              <p className="card__text">Your training library and community exist side-by-side. Share what you learned from a course and start a discussion in one click.</p>
            </div>
            <div className="card">
              <div className="card__icon" aria-hidden="true">📅</div>
              <h3 className="card__title">Events &amp; Webinars</h3>
              <p className="card__text">Monthly live sessions are listed in your dashboard. RSVP, join live, or catch the replay — all without leaving the platform.</p>
            </div>
            <div className="card">
              <div className="card__icon" aria-hidden="true">📍</div>
              <h3 className="card__title">Regional Groups</h3>
              <p className="card__text">Connect with members in your market. Local conversations, regional referrals, and occasional in-person meetups.</p>
            </div>
            <div className="card">
              <div className="card__icon" aria-hidden="true">📚</div>
              <h3 className="card__title">Shared Resource Library</h3>
              <p className="card__text">Members share templates, SOPs, and tools in the community. If it&apos;s worked for them, it&apos;s available for you.</p>
            </div>
            <div className="card">
              <div className="card__icon" aria-hidden="true">👥</div>
              <h3 className="card__title">Member Directory</h3>
              <p className="card__text">Browse Guild members by role, region, or specialty. Reach out directly, build your hospitality network, find mentors.</p>
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
