import { useReveal } from '../../hooks/useReveal';
import '../shared.css';
import './Technology.css';

const architectureNodes = [
  { label: 'DNA / RNA Sample', sub: 'Raw biological material', color: '#00C2FF' },
  { label: 'Sequencer / Bioreactor', sub: 'Illumina, PacBio, Oxford Nanopore', color: '#00E6C7' },
  { label: 'FASTQ / Raw Data', sub: 'Terabyte-scale genomic files', color: '#7CFF36' },
  { label: 'AI Quality Analysis', sub: 'Neural QC & filtering', color: '#9D4EDD' },
  { label: 'Assembly & Alignment', sub: 'Rust-native assembler', color: '#00C2FF' },
  { label: 'Gene Annotation', sub: 'Multi-DB reference matching', color: '#00E6C7' },
  { label: 'AI Interpretation', sub: 'Variant calling & prediction', color: '#7CFF36' },
  { label: 'Interactive Dashboard', sub: 'Genome viewer, charts, reports', color: '#9D4EDD' },
];

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
              From AI-driven photobioreactors to CRISPR-on-a-chip — ArqGene's technology spans the full spectrum of modern biotechnology.
            </p>
          </div>
        </div>
      </section>

      {/* Photobioreactor */}
      <section className="section">
        <div className="container-wide">
          <div className="tech-split-grid">
            <div className="reveal-left">
              <span className="section-badge">Platform 1</span>
              <h2 className="section-title" style={{ marginTop: '0.75rem' }}>AI-Driven <span className="gradient-text">Photobioreactors</span></h2>
              <p>Our AI photobioreactor systems revolutionize algal cultivation through intelligent automation. Machine learning algorithms dynamically adjust LED spectra and intensity to maximize photosynthetic efficiency and biomass production.</p>
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
                <img src="/images/bioreactor.jpg" alt="Fermion AI R100 Bioreactor Controller System" loading="lazy" />
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
                <img src="/images/crspr.webp" alt="CRISPR Microfluidic" loading="lazy" />
              </div>
            </div>
            <div className="reveal-right">
              <span className="section-badge">Platform 2</span>
              <h2 className="section-title" style={{ marginTop: '0.75rem' }}>CRISPR-Based <span className="gradient-text">Microfluidic Platforms</span></h2>
              <p>Combining CRISPR technology with microfluidics creates powerful tools for rapid diagnostics and precise gene editing. Our Marabi platform integrates CRISPR-Cas enzymes with microfluidic channels for unmatched sensitivity.</p>
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

      {/* GenXFlow Architecture Diagram */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Platform 3</span>
            <h2 className="section-title reveal">GenXFlow <span className="gradient-text">Architecture</span></h2>
            <p className="section-subtitle reveal">Click any node to learn more about each pipeline stage.</p>
          </div>
          <div className="tech-diagram reveal">
            {architectureNodes.map((node, i) => (
              <div key={i} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="tech-node" style={{ borderColor: `${node.color}30` }}>
                  <div className="tech-node-label" style={{ color: node.color }}>{node.label}</div>
                  <div className="tech-node-sub">{node.sub}</div>
                </div>
                {i < architectureNodes.length - 1 && <div className="tech-arrow" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
