import { useReveal } from '../../hooks/useReveal';
import '../shared.css';
import './Technology.css';

export default function Technology() {
  const revealRef = useReveal();

  return (
    <main className="tech-page page-enter" ref={revealRef}>
      <section className="generic-hero section">
        <div className="generic-hero-bg" />
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Technology</span>
            <h1 className="section-title reveal">Our <span className="gradient-text">Technology Stack</span></h1>
            <p className="section-subtitle reveal">
              From Fermion AI R100™ bioreactors to Crispr Scan microfluidics — ArqGene's technology spans the full spectrum of modern biotechnology.
            </p>
          </div>
        </div>
      </section>

      {/* Bioreactor */}
      <section className="section">
        <div className="container-wide">
          <div className="tech-split-grid">
            <div className="reveal-left">
              <span className="section-badge">Platform 1</span>
              <h2 className="section-title" style={{ marginTop: '0.75rem' }}>Fermion AI R100™ <span className="gradient-text">Bioreactor</span></h2>
              <p style={{ fontWeight: 600, color: 'var(--neon-blue)', marginBottom: '0.5rem' }}>AI-Driven Bioreactor Controller System</p>
              <p>Our Fermion AI R100™ bioreactor systems revolutionize biomanufacturing and cultivation through intelligent automation. Machine learning algorithms dynamically adjust environmental spectra and parameters to maximize yield and efficiency.</p>
              <div className="tech-stats-mini">
                {[
                  { val: '10–25%', label: 'Media cost reduction' },
                  { val: '30–50%', label: 'Manpower reduction' },
                  { val: 'Real-time', label: 'AI optimization' },
                  { val: '3x', label: 'Biomass yield increase' },
                ].map((s, i) => (
                  <div key={i} className="tsm-item">
                    <div className="tsm-val">{s.val}</div>
                    <div className="tsm-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-right">
              <div className="tech-img-card glass-card">
                <img src="/images/bioreactor.jpg" alt="Fermion AI R100™ Bioreactor Controller System" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CRISPR */}
      <section className="section grid-bg">
        <div className="container-wide">
          <div className="tech-split-grid reverse">
            <div className="reveal-left">
              <div className="tech-img-card glass-card">
                <img src="/images/crspr.webp" alt="Crispr Scan Microfluidic Diagnostic Chip" loading="lazy" />
              </div>
            </div>
            <div className="reveal-right">
              <span className="section-badge">Platform 2</span>
              <h2 className="section-title" style={{ marginTop: '0.75rem' }}>Crispr Scan <span className="gradient-text">Microfluidics</span></h2>
              <p style={{ fontWeight: 600, color: 'var(--neon-green)', marginBottom: '0.5rem' }}>CRISPR-Based Microfluidic Diagnostic & Editing Platform</p>
              <p>Crispr Scan combines CRISPR technology with microfluidics to create powerful tools for rapid point-of-care diagnostics and precise gene editing with attomolar sensitivity.</p>
              <div className="crispr-features">
                {['CRISPR-Cas12 / Cas13 detection', 'Attomolar sensitivity', 'Isothermal amplification', 'Smartphone readout', '12-plex simultaneous detection', 'Room-temperature stable reagents'].map(f => (
                  <div key={f} className="crispr-feature">
                    <span style={{ color: 'var(--neon-green)' }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
