import { useReveal } from '../../hooks/useReveal';
import { Link } from 'react-router-dom';
import './Careers.css';

const openings = [
  { title: 'Bioinformatics Engineer', dept: 'Engineering', type: 'Full-time', location: 'Vellore, India', desc: 'Build and optimize genomic analysis pipelines using Rust, Python, and cloud technologies.' },
  { title: 'ML Research Scientist', dept: 'AI/ML', type: 'Full-time', location: 'Vellore, India / Remote', desc: 'Develop deep learning models for genomics, proteomics, and metabolic flux prediction.' },
  { title: 'Synthetic Biology Researcher', dept: 'Research', type: 'Full-time', location: 'Vellore, India', desc: 'Design and characterize genetic circuits, metabolic pathways, and cell-free systems.' },
  { title: 'Microfluidics Engineer', dept: 'Hardware', type: 'Full-time', location: 'Vellore, India', desc: 'Design and prototype Crispr Scan microfluidic chips for point-of-care diagnostics.' },
  { title: 'Full-Stack Developer', dept: 'Engineering', type: 'Full-time', location: 'Remote', desc: 'Build enterprise web applications using React, Node.js, and cloud infrastructure.' },
  { title: 'Genomics Research Intern', dept: 'Research', type: 'Internship', location: 'Vellore, India', desc: '3-month hands-on experience in next-generation sequencing and bioinformatics.' },
  { title: 'AI/ML Intern', dept: 'AI/ML', type: 'Internship', location: 'Vellore, India / Remote', desc: '3-6 month program applying machine learning to biological data.' },
];

const benefits = [
  { icon: '🌱', title: 'Meaningful Work', desc: 'Work on problems that matter — improving human health and sustainable biology.' },
  { icon: '🎓', title: 'Learning Budget', desc: '₹50,000/year for courses, conferences, and books. We invest in your growth.' },
  { icon: '💡', title: 'Research Freedom', desc: '20% of your time to pursue your own biological engineering ideas.' },
  { icon: '🏥', title: 'Health Benefits', desc: 'Comprehensive health insurance for you and your immediate family.' },
  { icon: '🌍', title: 'Remote Friendly', desc: 'Flexible remote work options for most engineering and AI roles.' },
  { icon: '📈', title: 'Equity', desc: 'Early-stage equity for exceptional candidates joining our core team.' },
];

export default function Careers() {
  const revealRef = useReveal();

  return (
    <main className="careers-page page-enter" ref={revealRef}>
      <section className="careers-hero section">
        <div className="careers-hero-bg" />
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Join Us</span>
            <h1 className="section-title reveal">Build the <span className="gradient-text">Future of Biology</span></h1>
            <p className="section-subtitle reveal">
              ArqGene is on a mission to merge artificial intelligence with synthetic biology. We're looking for scientists, engineers, and dreamers to join us.
            </p>
          </div>
          <div style={{ textAlign: 'center' }} className="reveal">
            <a href="#openings" className="btn-primary">View Open Positions</a>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="section grid-bg">
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Culture</span>
            <h2 className="section-title reveal">Why ArqGene?</h2>
          </div>
          <div className="benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card glass-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="benefit-icon">{b.icon}</div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internships */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Students & Graduates</span>
            <h2 className="section-title reveal">Internship Programs</h2>
          </div>
          <div className="internship-grid">
            {[
              { title: 'Short-Term (2–3 months)', icon: '⚡', desc: 'Focused research projects in synthetic biology, Crispr Scan microfluidic diagnostics, or Fermion AI R100™ bioreactor optimization. Ideal for undergraduates.' },
              { title: 'Long-Term (6–12 months)', icon: '🔬', desc: 'Immersive programs for advanced students. Work on AI-driven bioprocessing, microfluidic platform development, and computational biology.' },
              { title: 'Remote Internship', icon: '💻', desc: 'For software engineers and bioinformaticians. Contribute to GenXFlow™ pipeline development and AI model training remotely.' },
            ].map((p, i) => (
              <div key={i} className="internship-card glass-card reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="internship-icon">{p.icon}</div>
                <h3 className="internship-title">{p.title}</h3>
                <p className="internship-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section id="openings" className="section grid-bg">
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Hiring Now</span>
            <h2 className="section-title reveal">Open Positions</h2>
          </div>
          <div className="openings-list">
            {openings.map((job, i) => (
              <div key={i} className="job-card glass-card reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
                <div className="job-left">
                  <div className="job-title">{job.title}</div>
                  <p className="job-desc">{job.desc}</p>
                </div>
                <div className="job-meta">
                  <span className={`badge ${job.type === 'Internship' ? 'badge-teal' : 'badge-blue'}`}>{job.type}</span>
                  <span className="job-dept">{job.dept}</span>
                  <span className="job-location">📍 {job.location}</span>
                </div>
                <a href="mailto:inquiry@arqgene.com?subject=Application: {{job.title}}" className="btn-outline" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Apply →
                </a>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }} className="reveal">
            <p style={{ color: 'var(--muted-text)', marginBottom: '1rem' }}>Don't see your role? We're always open to exceptional candidates.</p>
            <a href="mailto:inquiry@arqgene.com?subject=Open Application - ArqGene" className="btn-ghost">Send an Open Application</a>
          </div>
        </div>
      </section>
    </main>
  );
}
