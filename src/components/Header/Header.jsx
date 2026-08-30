import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const navItems = [
  {
    label: 'Products',
    to: '/products',
    children: [
      { label: 'GenXFlow™', sub: 'Sequence Pipeline Platform (NGS & Metagenomics)', to: '/products?tab=genxflow', icon: '🧬' },
      { label: 'Marabi', sub: 'Molecular Cloning & Plasmid Design Software', to: '/products?tab=marabi', icon: '🧫' },
      { label: 'Uyirinai', sub: 'Molecular Docking & MD Simulation Platform', to: '/products?tab=uyirinai', icon: '🔬' },
      { label: 'Platform Technologies', sub: 'Fermion AI R100™ & Crispr Scan', to: '/products?view=platform', icon: '⚡' },
    ],
  },
  {
    label: 'Resources',
    to: '/docs',
    children: [
      { label: 'Documentation', sub: 'Guides & API reference', to: '/docs', icon: '📚' },
      { label: 'Research', sub: 'Publications & whitepapers', to: '/research', icon: '📄' },
      { label: 'Downloads', sub: 'Software & datasets', to: '/download', icon: '⬇️' },
      { label: 'Insights', sub: 'Blog & case studies', to: '/insights', icon: '💡' },
      { label: 'Support', sub: 'Help center & tickets', to: '/support', icon: '🛟' },
    ],
  },
  {
    label: 'Company',
    to: '/about',
    children: [
      { label: 'About', sub: 'Our story & mission', to: '/about', icon: '🏢' },
      { label: 'Team', sub: 'Founders & advisors', to: '/team', icon: '👥' },
      { label: 'Careers', sub: 'Open positions', to: '/careers', icon: '💼' },
      { label: 'Innovation', sub: 'Patents & IP', to: '/innovation', icon: '💡' },
      { label: 'Investors', sub: 'Funding & roadmap', to: '/investors', icon: '📈' },
    ],
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [location]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src="/images/ARQGENE NAME.png" alt="ArqGene" />
        </Link>

        {/* Desktop Nav */}
        <nav className="header-nav">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="nav-item"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link to={item.to} className="nav-trigger">
                {item.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>

              {activeMenu === item.label && (
                <div className="mega-menu">
                  <div className="mega-menu-inner">
                    {item.children.map((child) => (
                      <Link key={child.label} to={child.to} className="mega-item">
                        <span className="mega-icon">{child.icon}</span>
                        <div>
                          <div className="mega-label">{child.label}</div>
                          <div className="mega-sub">{child.sub}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <Link to="/technology" className="nav-link-plain">Technology</Link>
          <Link to="/pricing" className="nav-link-plain">Pricing</Link>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <Link to="/contact" className="btn-ghost">Contact</Link>
          <Link to="/download" className="btn-primary">
            Get Started
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <div key={item.label} className="mobile-section">
              <Link to={item.to} className="mobile-section-title-link">
                {item.label} →
              </Link>
              {item.children.map((child) => (
                <Link key={child.label} to={child.to} className="mobile-link">
                  <span>{child.icon}</span>
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="mobile-section">
            <Link to="/technology" className="mobile-link">⚙️ Technology</Link>
            <Link to="/pricing" className="mobile-link">💰 Pricing</Link>
          </div>
          <div className="mobile-actions">
            <Link to="/download" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Get Started →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
