import { Link } from 'react-router-dom';
import './Footer.css';

const footerLinks = {
  Products: [
    { label: 'GenXFlow™', to: '/products?tab=genxflow' },
    { label: 'Marabi', to: '/products?tab=marabi' },
    { label: 'Uyirinai', to: '/products?tab=uyirinai' },
    { label: 'Platform Technologies', to: '/products?view=platform' },
    { label: 'Pricing', to: '/pricing' },
  ],
  Resources: [
    { label: 'Documentation', to: '/docs' },
    { label: 'Downloads', to: '/download' },
    { label: 'Research', to: '/research' },
    { label: 'API & SDK', to: '/developers' },
    { label: 'Support', to: '/support' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Team', to: '/team' },
    { label: 'Careers', to: '/careers' },
    { label: 'Innovation', to: '/innovation' },
    { label: 'Investors', to: '/investors' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Cookie Policy', to: '/cookies' },
    { label: 'Media Kit', to: '/media' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link">
              <img src="/images/ARQGENE NAME.png" alt="ArqGene" className="footer-logo" />
            </Link>
            <p className="footer-tagline">
              Engineering biology with intelligence. Building the future of synthetic biology and biomanufacturing.
            </p>
            <div className="footer-social">
              <a href={import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/arqgene-llp-0ab916391/'} target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zm-11 19H5V8h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                </svg>
              </a>
              <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'inquiry@arqgene.com'}`} className="social-btn" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5H21.518zM2 19V7.183l10 8.104 10-8.104V19H2z" />
                </svg>
              </a>
              <a href={import.meta.env.VITE_TWITTER_URL || 'https://x.com/arqgene'} target="_blank" rel="noreferrer" className="social-btn" aria-label="Twitter/X">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            {/* Newsletter */}
            <div className="footer-newsletter">
              <p className="newsletter-label">Stay updated with our research</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email" className="newsletter-input" />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="footer-links-grid">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group} className="footer-col">
                <h4 className="footer-col-title">{group}</h4>
                <ul className="footer-col-links">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="footer-link">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="gradient-line" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} ArqGene LLP. All rights reserved. Built in India 🇮🇳
          </p>
          <div className="footer-bottom-badges">
            <span className="badge badge-blue">DST NIDHI PRAYAS</span>
            <span className="badge badge-teal">DST Ignition Grant</span>
            <span className="badge badge-green">VIT-TBI Incubated</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
