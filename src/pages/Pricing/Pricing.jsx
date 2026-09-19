import { PageHero } from '../../components/PageComponents';
import { Link } from 'react-router-dom';
import '../shared.css';

export default function Pricing() {
  return (
    <main className="page-enter">
      <PageHero
        badge="Purchase GenXFlow"
        title={<>Purchase <span className="gradient-text">GenXFlow</span></>}
        subtitle="Choose the license that fits your genomic research needs. From an evaluation trial to high-throughput enterprise bio-foundry deployments."
        color="#00C2FF"
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
                originalPrice: '₹60,000/year',
                price: '₹50,000',
                period: '/year',
                discountBadge: 'Save ₹10,000',
                color: '#00C2FF',
                to: '/avail-license?tier=academic',
                features: ['Up to 5 Lab seats', '100 GB Cloud storage', 'All 10 Genomic pipelines', 'Real-time bioprocess AI', 'Priority SLURM HPC compute', 'Email & Discord support'],
                cta: 'Avail Academic License',
                highlight: true,
              },
              {
                plan: 'Professional Lab',
                price: 'Contact Us',
                period: '',
                subtext: 'Pricing discussed based on requirements',
                color: '#9D4EDD',
                to: '/contact?product=genxflow&tier=professional-lab',
                features: [
                  'Unlimited Lab & bio-foundry seats',
                  'Dedicated on-premise / private cloud',
                  'Custom pipeline scripting & SLURM HPC',
                  '21 CFR Part 11 compliance documentation',
                  'REST API, Python SDK & custom connectors',
                  '24/7 Dedicated Technical Support & SLAs',
                ],
                cta: 'Contact Us',
              },
            ].map((p, i) => (
              <div key={i} className="glass-card" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden', borderColor: p.highlight ? `${p.color}40` : '', boxShadow: p.highlight ? `0 0 30px ${p.color}20` : '' }}>
                {p.highlight && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #00C2FF, #00E6C7)', color: '#000', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 1rem', borderRadius: '0 0 8px 8px' }}>Recommended for Labs</div>}
                <div style={{ color: p.color, fontSize: '1.5rem', marginTop: p.highlight ? '1rem' : '0' }}>{'⬡'}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--white)', fontFamily: 'var(--font-display)' }}>{p.plan}</div>
                
                {/* Price Display */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', minHeight: '80px', justifyContent: 'flex-end' }}>
                  {p.originalPrice && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.45)', fontSize: '1.1rem', fontWeight: 600 }}>
                        {p.originalPrice}
                      </span>
                      {p.discountBadge && (
                        <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.15rem 0.55rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                          {p.discountBadge}
                        </span>
                      )}
                    </div>
                  )}
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: p.color, fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
                    {p.price}
                    <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--muted-text)' }}>{p.period}</span>
                  </div>
                  {p.subtext ? (
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-mono, monospace)', lineHeight: 1.35 }}>
                      <span style={{ color: p.color, fontWeight: 600 }}>{p.subtext}</span>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.8rem', color: 'transparent', userSelect: 'none' }}>-</div>
                  )}
                </div>

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
