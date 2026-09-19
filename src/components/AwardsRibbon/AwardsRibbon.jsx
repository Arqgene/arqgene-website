import { useState } from 'react';
import './AwardsRibbon.css';

const awardsData = [
  {
    id: 'dst-prayas',
    num: '01',
    badge: 'National Deep-Tech Capital',
    title: 'DST NIDHI-PRAYAS Grant',
    shortTitle: 'DST NIDHI-PRAYAS',
    entity: 'Department of Science and Technology (DST), Govt. of India',
    scope: 'Competitive catalytic funding under the NIDHI-PRAYAS scheme to accelerate deep-tech prototyping, computational genomics, and translational bio-engineering.',
    color: '#00C2FF',
    glow: 'rgba(0, 194, 255, 0.18)',
    borderGlow: 'rgba(0, 194, 255, 0.45)',
    category: 'Govt. of India Capital',
    metrics: [
      { label: 'Grant Focus', val: 'Genomic Prototyping' },
      { label: 'Authority', val: 'DST Govt. of India' },
      { label: 'Scheme', val: 'NIDHI-PRAYAS' },
    ],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="ribbon-icon-svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5M4.5 21V10.5M3 21h18" />
      </svg>
    ),
  },
  {
    id: 'dst-ignition',
    num: '02',
    badge: 'Seed Translation Grant',
    title: 'DST Ignition Grant',
    shortTitle: 'DST Ignition Grant',
    entity: 'Department of Science and Technology (DST), Govt. of India',
    scope: 'Translational seed funding to accelerate AI-driven biomanufacturing scale-up, microfluidic diagnostics, and preclinical validation.',
    color: '#00E6C7',
    glow: 'rgba(0, 230, 199, 0.18)',
    borderGlow: 'rgba(0, 230, 199, 0.45)',
    category: 'National Seed Validation',
    metrics: [
      { label: 'Grant Focus', val: 'Biomanufacturing Scale-Up' },
      { label: 'Authority', val: 'DST Govt. of India' },
      { label: 'Milestone', val: 'Translational Proof' },
    ],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="ribbon-icon-svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.289A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    id: 'google-startups',
    num: '03',
    badge: 'Global Tech Backing',
    title: 'Google for Startups Cloud & AI Grant',
    shortTitle: 'Google Cloud & AI',
    entity: 'Google for Startups',
    scope: 'Scalable high-performance computing, AI tensor infrastructure, and cloud credits for computational biology pipelines.',
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.18)',
    borderGlow: 'rgba(16, 185, 129, 0.45)',
    category: 'Global AI Infrastructure',
    metrics: [
      { label: 'Resource Access', val: 'TPU / GPU Clusters' },
      { label: 'Ecosystem', val: 'Google for Startups' },
      { label: 'Application', val: 'Genomic AI Pipelines' },
    ],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="ribbon-icon-svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
      </svg>
    ),
  },
  {
    id: 'eyeq-innovate',
    num: '04',
    badge: 'Clinical Innovation Winner',
    title: 'EyeQInnovate Hackathon 2.0 – Winner (1st Place)',
    shortTitle: 'EyeQInnovate (1st Place)',
    entity: 'Jointly presented by Dr. Agarwal’s Eye Hospital & StartupTN',
    scope: 'First-place recognition for pioneering clinical bio-AI diagnostic systems evaluated by top ophthalmologists and venture leaders.',
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.18)',
    borderGlow: 'rgba(245, 158, 11, 0.45)',
    category: 'Clinical Jury Consensus',
    metrics: [
      { label: 'Rank Awarded', val: '1st Place Champion' },
      { label: 'Evaluation Panel', val: 'Clinical & Venture Jury' },
      { label: 'Partnership', val: 'StartupTN & Eye Hospital' },
    ],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="ribbon-icon-svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.003 0V4.875A2.625 2.625 0 0011.75 2.25h-.5a2.625 2.625 0 00-2.625 2.625v9.375m5.25 0h-5.25" />
      </svg>
    ),
  },
];

export default function AwardsRibbon() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="awards-section section" id="awards">
      {/* Background Technical Grid & Radial Aura */}
      <div className="awards-bg-grid" />
      <div className="awards-radial-glow" />

      <div className="container">
        {/* Section Header */}
        <div className="section-header awards-header">
          <div className="awards-badge-wrap">
            <span className="section-badge awards-section-badge">
              <span className="live-dot" /> Institutional Validation &amp; Recognition
            </span>
          </div>
          <h2 className="section-title awards-main-title">
            Awards &amp; <span className="gradient-text">Honours</span>
          </h2>
          <p className="section-subtitle awards-sub">
            Recognized and backed by premier science ministries, global AI infrastructure titans, and clinical health networks.
          </p>
        </div>

        {/* Desktop Interactive Spotlight Ribbon & Responsive Stack */}
        <div className="awards-ribbon-container">
          {awardsData.map((award, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={award.id}
                className={`award-ribbon-panel ${isActive ? 'panel-active' : 'panel-collapsed'}`}
                style={{
                  '--panel-accent': award.color,
                  '--panel-glow': award.glow,
                  '--panel-border-glow': award.borderGlow,
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveIndex(index);
                  }
                }}
                aria-expanded={isActive}
              >
                {/* Background Ambient Radial Glow */}
                <div className="panel-glow-aura" />

                {/* Subtle Technical Grid Overlay on Panel */}
                <div className="panel-micro-grid" />

                {/* ================= COLLAPSED TEASER VIEW (Desktop) ================= */}
                <div className="panel-collapsed-view">
                  <div className="collapsed-top">
                    <span className="collapsed-num">{award.num}</span>
                  </div>
                  <div className="collapsed-center">
                    <div className="collapsed-icon-wrap" style={{ color: award.color }}>
                      {award.iconSvg}
                    </div>
                    <div className="collapsed-vertical-title">{award.shortTitle || award.title}</div>
                  </div>
                  <div className="collapsed-bottom">
                    <span className="collapsed-indicator" />
                  </div>
                </div>

                {/* ================= EXPANDED VIEW (Desktop Active & Mobile) ================= */}
                <div className="panel-expanded-view">
                  {/* Top Bar: Category Pill & Index Number */}
                  <div className="panel-top-bar">
                    <span
                      className="panel-category-pill"
                      style={{
                        color: award.color,
                        borderColor: award.borderGlow,
                        backgroundColor: award.glow,
                      }}
                    >
                      <span className="category-pill-dot" style={{ backgroundColor: award.color }} />
                      {award.badge}
                    </span>
                    <span className="panel-serial-num">{award.num} // 0{awardsData.length}</span>
                  </div>

                  {/* Main Award Identity */}
                  <div className="panel-identity-block">
                    <div
                      className="panel-brand-icon"
                      style={{
                        color: award.color,
                        borderColor: award.borderGlow,
                        background: `radial-gradient(circle, ${award.glow}, rgba(15, 23, 42, 0.9))`,
                      }}
                    >
                      {award.iconSvg}
                    </div>
                    <div>
                      <h3 className="panel-award-title">{award.title}</h3>
                      <p className="panel-granting-entity">
                        <span className="entity-label">Granting Authority:</span>{' '}
                        <strong className="entity-name">{award.entity}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Technical Scope & Impact Summary */}
                  <div className="panel-scope-box">
                    <p className="panel-scope-text">{award.scope}</p>
                  </div>

                  {/* Technical Metrics / Scope Tags */}
                  <div className="panel-metrics-grid">
                    {award.metrics.map((m) => (
                      <div key={m.label} className="metric-pill">
                        <span className="metric-pill-label">{m.label}</span>
                        <span className="metric-pill-val" style={{ color: award.color }}>
                          {m.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Status Indicator */}
                  <div className="panel-footer-row">
                    <span className="panel-status-indicator">
                      <span className="status-ping" style={{ backgroundColor: award.color }} />
                      <span className="status-label">{award.category}</span>
                    </span>
                    <span className="verified-seal">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Verified Institutional Honor
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
