import { PageHero, ComingSoonCard } from '../../components/PageComponents';
import '../shared.css';

export default function Innovation() {
  return (
    <main className="page-enter">
      <PageHero
        badge="Patents & Innovation"
        title={<>Innovation & <span className="gradient-text">IP Portfolio</span></>}
        subtitle="ArqGene's patent portfolio protects our proprietary AI algorithms, photobioreactor designs, and CRISPR microfluidic architectures."
        color="#7CFF36"
      />
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            {[
              { title: 'AI Photobioreactor Control System', status: 'Patent Pending', year: '2024', inventors: 'Dr. L. Karthik, Dr. Vijai Chandra', color: '#00C2FF' },
              { title: 'CRISPR Microfluidic Diagnostic Chip', status: 'Patent Pending', year: '2024', inventors: 'Dr. Vijai Chandra', color: '#00E6C7' },
              { title: 'Genomic Pipeline AI Architecture', status: 'Patent Pending', year: '2025', inventors: 'Dr. L. Karthik', color: '#7CFF36' },
              { title: 'Automated Fermentation ML Control', status: 'Filed', year: '2025', inventors: 'Dr. L. Karthik, Dr. Vijai Chandra', color: '#9D4EDD' },
            ].map((p, i) => (
              <div key={i} className="glass-card" style={{ padding: '2rem', borderTop: `2px solid ${p.color}` }}>
                <span className={`badge ${p.status === 'Patent Pending' ? 'badge-blue' : 'badge-orange'}`} style={{ marginBottom: '1rem', display: 'inline-flex' }}>{p.status}</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>{p.title}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted-text)' }}>Filed: {p.year}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: '0.25rem' }}>Inventors: {p.inventors}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
