import { useReveal } from '../../hooks/useReveal';
import { PageHero } from '../../components/PageComponents';
import '../shared.css';
import { Link } from 'react-router-dom';

const services = [
  { icon: '🧬', title: 'Next-Gen Sequencing', desc: 'High-throughput genomic sequencing with advanced bioinformatics analysis and variant calling.' },
  { icon: '✂️', title: 'Molecular Cloning', desc: 'Precision gene cloning and plasmid construction services for research and production.' },
  { icon: '🔬', title: 'CRISPR Gene Editing', desc: 'Custom CRISPR-Cas9 design and genome editing solutions with high fidelity.' },
  { icon: '🧫', title: 'Protein Expression', desc: 'Recombinant protein production and purification in multiple expression systems.' },
  { icon: '🩺', title: 'Diagnostic Assay Development', desc: 'Custom molecular diagnostic test design, validation, and regulatory pathway support.' },
  { icon: '🔭', title: 'Biomarker Discovery', desc: 'Identification and validation of disease biomarkers using multi-omics approaches.' },
  { icon: '💻', title: 'Bioinformatics Analysis', desc: 'Computational analysis of genomic, transcriptomic, and proteomic datasets.' },
  { icon: '⚗️', title: 'Bioprocess Optimization', desc: 'Scale-up and optimization of biological production processes for industry.' },
  { icon: '🦠', title: 'Microbial Engineering', desc: 'Metabolic engineering for enhanced production strains in industrial fermentation.' },
  { icon: '💊', title: 'Drug Screening', desc: 'High-throughput compound screening, target identification and validation.' },
  { icon: '🧪', title: 'Synthetic Biology Design', desc: 'Design and construction of novel biological systems, circuits, and pathways.' },
  { icon: '✅', title: 'Quality Control Testing', desc: 'Comprehensive QC analysis for biopharmaceutical products (GMP-compliant).' },
  { icon: '📊', title: 'R&D Consulting', desc: 'Expert guidance for biotechnology research projects, grant applications, and strategy.' },
];

export default function Services() {
  const revealRef = useReveal();

  return (
    <main className="page-enter" ref={revealRef}>
      <PageHero
        badge="Services"
        title={<>Our <span className="gradient-text">Services</span></>}
        subtitle="From sequencing to scale-up — comprehensive biotechnology services for research, clinical, and industrial applications."
      />

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card-item glass-card reveal" style={{ transitionDelay: `${i * 0.04}s` }}>
                <div className="svc-icon">{s.icon}</div>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }} className="reveal">
            <p style={{ color: 'var(--muted-text)', marginBottom: '1.5rem' }}>
              Looking for custom solutions or specialized consultancy?
            </p>
            <Link to="/contact" className="btn-primary">Contact Our Team →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
