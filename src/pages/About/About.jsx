import { useReveal } from '../../hooks/useReveal';
import { Link } from 'react-router-dom';
import JourneyTimeline from '../../components/JourneyTimeline/JourneyTimeline';
import './About.css';

const values = [
  { icon: '🔬', title: 'Scientific Rigor', desc: 'Every decision grounded in peer-reviewed science and validated data.' },
  { icon: '🤝', title: 'Open Collaboration', desc: 'We believe great biology is built together, not in isolation.' },
  { icon: '🌱', title: 'Sustainability', desc: 'Engineering biology to solve climate, food, and health challenges.' },
  { icon: '⚡', title: 'Speed to Discovery', desc: 'Cutting development timelines with AI automation and robotics.' },
  { icon: '🎯', title: 'Precision First', desc: 'Accuracy is non-negotiable in diagnostics and therapeutics.' },
  { icon: '🌍', title: 'Global Impact', desc: 'Building solutions for researchers and clinicians worldwide.' },
];

export default function About() {
  const revealRef = useReveal();

  return (
    <main className="about-page page-enter" ref={revealRef}>
      {/* Unified Ambient Aurora Glows */}
      <div className="about-ambient-glow glow-top" />
      <div className="about-ambient-glow glow-mid" />
      <div className="about-ambient-glow glow-bottom" />

      {/* Hero */}
      <section className="about-hero section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Our Story</span>
            <h1 className="section-title reveal">Engineering Biology<br />with <span className="gradient-text">Intelligence</span></h1>
            <p className="section-subtitle reveal">
              Founded in 2025 in the heart of India's innovation ecosystem, ArqGene is building the future of synthetic biology — one intelligent system at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mv-section section">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card glass-card reveal-left">
              <div className="mv-icon">🎯</div>
              <h2 className="mv-title">Our Mission</h2>
              <p>To design <strong>intelligent biological systems</strong> that solve global challenges in health, sustainability, and food security — by merging AI, robotics, and synthetic biology into a unified platform.</p>
            </div>
            <div className="mv-card glass-card reveal-right">
              <div className="mv-icon">🔭</div>
              <h2 className="mv-title">Our Vision</h2>
              <p>A world where <strong>biology is programmable</strong> — where any researcher, anywhere, can design, test, and deploy biological solutions using intelligent tools that make discovery accessible and reproducible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Text */}
      <section className="story-section section">
        <div className="container-narrow">
          <h2 className="section-title text-center reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            The <span className="gradient-text">ArqGene</span> Story
          </h2>
          <div className="story-text reveal">
            <p>
              ArqGene was born from a simple observation: biology is one of the most complex fields in science, yet the tools researchers use to study it are often fragmented, slow, and disconnected from each other. We saw an opportunity to change that.
            </p>
            <p>
              Founded in 2025 at the VIT Technology Business Incubator in Vellore, India, our team combines deep expertise in molecular biology, AI engineering, microfluidics, and industrial bioprocessing. We've built ArqGene to be the platform we wished existed when we started our own research.
            </p>
            <p>
              Today, ArqGene operates at the intersection of three major technological waves: <strong>artificial intelligence</strong>, <strong>synthetic biology</strong>, and <strong>precision medicine</strong>. Our three flagship products — GenXFlow™, Uyirinai, and Marabi — represent our first step toward a fully integrated biological intelligence platform.
            </p>
          </div>
        </div>
      </section>

      {/* Company Journey / Milestones (Spot #1) */}
      <JourneyTimeline />

      {/* Values */}
      <section className="values-section section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Culture</span>
            <h2 className="section-title reveal">What Drives Us</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card glass-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="value-icon">{v.icon}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="location-section section">
        <div className="container">
          <div className="location-grid">
            <div className="reveal-left">
              <span className="section-badge">Headquarters</span>
              <h2 className="section-title" style={{ marginTop: '1rem' }}>Based in <span className="gradient-text">Vellore, India</span></h2>
              <p style={{ marginTop: '1rem' }}>Located at the VIT Technology Business Incubator, one of India's premier startup ecosystems for deep-tech and life sciences innovation.</p>
              <div className="location-details">
                <div className="location-item">
                  <span>📍</span>
                  <span>Room No: 5A, VIT-TBI, VIT University, Vellore, Tamil Nadu 632014</span>
                </div>
                <div className="location-item">
                  <span>📧</span>
                  <a href="mailto:inquiry@arqgene.com" style={{ color: 'var(--neon-blue)' }}>inquiry@arqgene.com</a>
                </div>
                <div className="location-item">
                  <span>📞</span>
                  <span>+91 93452 33677</span>
                </div>
              </div>
            </div>
            <div className="location-map glass-card reveal-right">
              <div className="map-placeholder">
                <span>🗺️</span>
                <p>VIT University Campus<br />Vellore, Tamil Nadu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title reveal">Join Our Mission</h2>
          <p className="section-subtitle reveal" style={{ margin: '0 auto 2rem' }}>
            Whether you're a researcher, investor, or engineer — there's a place for you at ArqGene.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} className="reveal">
            <Link to="/careers" className="btn-primary">View Open Positions</Link>
            <Link to="/contact" className="btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
