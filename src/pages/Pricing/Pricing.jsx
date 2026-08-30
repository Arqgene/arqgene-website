import { PageHero } from '../../components/PageComponents';
import { Link } from 'react-router-dom';
import '../shared.css';

export default function Pricing() {
  return (
    <main className="page-enter">
      <PageHero
        badge="Transparent Pricing &amp; Licensing"
        title={<>Simple, <span className="gradient-text">Accessible Licensing</span></>}
        subtitle="Choose the license that fits your research needs. From a 7-day free trial to enterprise bio-foundry deployments."
        color="#7CFF36"
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
            {[
              {
                plan: '7-Day Free Trial',
                price: 'Free',
                period: ' for 7 days',
                color: '#00E6C7',
                to: '/avail-license?tier=community',
                features: ['1 Researcher seat', '5 GB Cloud storage', 'Standard WGS & RNA-Seq', '7-Day trial support', 'Docker container access'],
                cta: 'Start Free Trial',
              },
              {
                plan: 'Academic / Research',
                price: '₹999',
                period: '/month',
                color: '#00C2FF',
                to: '/avail-license?tier=academic',
                features: ['Up to 5 Lab seats', '100 GB Cloud storage', 'All 10 Genomic pipelines', 'Real-time bioprocess AI', 'Priority SLURM HPC compute', 'Email & Discord support'],
                cta: 'Avail Academic License',
                highlight: true,
              },
              {
                plan: 'Enterprise & Bio-Foundry',
                price: 'Custom SLA',
                period: '',
                color: '#9D4EDD',
                to: '/bulk-licensing',
                features: ['Unlimited seat license', 'On-premise / Private cloud', '21 CFR Part 11 compliance', 'Dedicated technical CSM', 'Custom SCADA & API SDK', '99.9% Uptime SLA'],
                cta: 'Bulk & Institutional Order',
              },
            ].map((p, i) => (
              <div key={i} className="glass-card" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden', borderColor: p.highlight ? `${p.color}40` : '', boxShadow: p.highlight ? `0 0 30px ${p.color}20` : '' }}>
                {p.highlight && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #00C2FF, #00E6C7)', color: '#000', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 1rem', borderRadius: '0 0 8px 8px' }}>Recommended for Labs</div>}
                <div style={{ color: p.color, fontSize: '1.5rem', marginTop: p.highlight ? '1rem' : '0' }}>{'⬡'}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--white)', fontFamily: 'var(--font-display)' }}>{p.plan}</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: p.color, fontFamily: 'var(--font-display)' }}>{p.price}<span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--muted-text)' }}>{p.period}</span></div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, margin: '1rem 0' }}>
                  {p.features.map(f => <li key={f} style={{ fontSize: '0.875rem', color: 'var(--light-text)', display: 'flex', gap: '0.5rem' }}><span style={{ color: p.color, fontWeight: 800 }}>✓</span> {f}</li>)}
                </ul>
                <Link to={p.to} className={p.highlight ? 'btn-primary' : 'btn-outline'} style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
                  {p.cta} →
                </Link>
              </div>
            ))}
          </div>

          {/* Bulk Licensing Callout Banner */}
          <div className="glass-card" style={{ maxWidth: '1000px', margin: '3rem auto 0', padding: '2.5rem', textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(157,78,221,0.1), transparent)' }}>
            <span className="section-badge" style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>Volume Purchasing</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--white)', fontFamily: 'var(--font-display)', marginBottom: '0.75rem' }}>
              University &amp; Enterprise Bulk License Orders
            </h3>
            <p style={{ color: 'var(--muted-text)', maxWidth: '650px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
              Ordering 5 to 500+ licenses for your university department, research center, or bio-foundry? Use our interactive calculator for volume discounts up to 50% off.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/bulk-licensing" className="btn-primary">Calculate Bulk Discounts →</Link>
              <Link to="/contact" className="btn-ghost">Contact Procurement Team</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
