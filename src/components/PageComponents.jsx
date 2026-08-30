// Shared page template components
import { Link } from 'react-router-dom';

export function PageHero({ badge, title, subtitle, color = '#00C2FF' }) {
  return (
    <section className="generic-hero section">
      <div className="generic-hero-bg" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 20%, ${color}12, transparent 70%)` }} />
      <div className="container">
        <div className="section-header">
          <span className="section-badge">{badge}</span>
          <h1 className="section-title">{title}</h1>
          {subtitle && <p className="section-subtitle" style={{ margin: '0 auto' }}>{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}

export function ComingSoonCard({ icon, title, desc, links = [] }) {
  return (
    <section className="section">
      <div className="container">
        <div className="coming-soon-card">
          <div className="coming-soon-icon">{icon}</div>
          <h2 className="coming-soon-title">{title}</h2>
          <p className="coming-soon-desc">{desc}</p>
          {links.length > 0 && (
            <div className="coming-soon-links">
              {links.map(l => {
                const isExternal = l.to.startsWith('http') || l.to.startsWith('mailto') || l.external || l.to.includes('.pdf');
                return isExternal
                  ? <a key={l.label} href={l.to} className={l.primary ? 'btn-primary' : 'btn-outline'} download={l.download}>{l.label}</a>
                  : <Link key={l.label} to={l.to} className={l.primary ? 'btn-primary' : 'btn-outline'}>{l.label}</Link>;
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
