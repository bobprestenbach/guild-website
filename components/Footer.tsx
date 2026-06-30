import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Link href="/" className="footer__brand-logo">The Hospitality Guild</Link>
            <p className="footer__tagline">Building better teams. Elevating the industry.</p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Instagram">IG</a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">in</a>
              <a href="#" className="footer__social-link" aria-label="Facebook">f</a>
            </div>
          </div>
          <div>
            <p className="footer__col-title">Quick Links</p>
            <ul className="footer__links">
              <li><Link href="/" className="footer__link">Home</Link></li>
              <li><Link href="/about" className="footer__link">About</Link></li>
              <li><Link href="/training" className="footer__link">Training</Link></li>
              <li><Link href="/community" className="footer__link">Community</Link></li>
              <li><Link href="/join" className="footer__link">Join the Guild</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer__col-title">Resources</p>
            <ul className="footer__links">
              <li><Link href="/blog" className="footer__link">Blog &amp; Articles</Link></li>
              <li><Link href="/training" className="footer__link">Training Courses</Link></li>
              <li><Link href="/partners" className="footer__link">Partner Discounts</Link></li>
              <li><Link href="/blog" className="footer__link">Free Downloads</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer__col-title">Connect</p>
            <ul className="footer__links">
              <li><Link href="/partners" className="footer__link">Become a Partner</Link></li>
              <li><Link href="/community" className="footer__link">Join the Community</Link></li>
              <li><Link href="/about" className="footer__link">Our Story</Link></li>
              <li><a href="mailto:hello@thehospitalityguild.com" className="footer__link">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2026 The Hospitality Guild. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
