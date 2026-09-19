import { PageHero, ComingSoonCard } from '../../components/PageComponents';
import { Link } from 'react-router-dom';
import '../shared.css';

export default function Investors() {
  return (
    <main className="page-enter">
      <PageHero
        badge="Investor Relations"
        title={<>The <span className="gradient-text">Investment Opportunity</span></>}
        subtitle="Founded in 2025 at VIT-TBI, ArqGene is building the enterprise AI platform for synthetic biology. We are early-stage, India-based, and globally ambitious."
        color="#9D4EDD"
      />
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { icon: '🗓️', title: 'Founded', val: '2025', desc: 'Inception at VIT-TBI, Vellore' },
              { icon: '🌍', title: 'Market Size', val: '$800B+', desc: 'Global synthetic biology market by 2035' },
              { icon: '🚀', title: 'Funding Stage', val: 'Seed', desc: 'Actively fundraising for Series A' },
              { icon: '🏛️', title: 'Grants Received', val: '2 Govt Grants', desc: 'DST NIDHI PRAYAS + DST Ignition' },
            ].map((m, i) => (
              <div key={i} className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{m.icon}</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neon-blue)', fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>{m.val}</div>
                <div style={{ fontWeight: 700, color: 'var(--white)', marginBottom: '0.375rem', fontFamily: 'var(--font-display)' }}>{m.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted-text)' }}>{m.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Interested in Investing?</h2>
            <p style={{ color: 'var(--muted-text)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
              We'd love to share our detailed pitch deck and business plan with qualified investors.
            </p>
            <Link to="/contact?type=investor" className="btn-primary">Request Pitch Deck</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
