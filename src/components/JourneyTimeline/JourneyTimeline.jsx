import { useState } from 'react';
import './JourneyTimeline.css';

const milestones = [
  {
    id: 'inception',
    date: 'Jan 2025',
    badge: 'Milestone 01 · 2025',
    headline: 'Company Inception (Founded 2025)',
    organization: 'VIT-TBI Incubated Deep-Tech Startup',
    description: 'ArqGene was founded in 2025 at the VIT Technology Business Incubator to pioneer next-generation computational genomics, bio-AI, and synthetic biology translation.',
    color: '#00C2FF',
    glow: 'rgba(0, 194, 255, 0.25)',
    borderGlow: 'rgba(0, 194, 255, 0.45)',
    highlights: ['Founded in 2025', 'VIT-TBI Incubation', 'Computational Genomics'],
    // Lucide Rocket
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="timeline-lucide-icon">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    id: 'nidhi-prayas',
    date: 'April 2025',
    badge: 'Grant Funding',
    headline: 'Secured DST National Research Grants',
    organization: 'Department of Science and Technology (DST), Govt. of India',
    description: 'Awarded competitive catalytic funding under the DST NIDHI-PRAYAS and DST Ignition schemes to accelerate deep-tech prototyping, AI biomanufacturing scale-up, and translational bio-engineering.',
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.25)',
    borderGlow: 'rgba(16, 185, 129, 0.45)',
    highlights: ['Govt. of India Capital', 'NIDHI-PRAYAS & Ignition', 'Translational Bio-R&D'],
    // Lucide Award
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="timeline-lucide-icon">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 'product-rollout',
    date: 'July 2026',
    badge: 'Commercial Deployment',
    headline: 'Simultaneous Launch of 4 Flagship Platforms',
    organization: 'ArqGene Core Platform Suite Release',
    description: 'Released our core suite of computational biology, sequence profiling, and AI platforms to bridge biological data with clinical execution.',
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.25)',
    borderGlow: 'rgba(168, 85, 247, 0.45)',
    products: [
      { 
        name: 'GenXFlow™', 
        desc: 'Automated high-throughput bioinformatics & sequencing workflow pipeline', 
        color: '#00C2FF' 
      },
      { 
        name: 'Marabi', 
        desc: 'Computational genomics & biological design engine for molecular cloning & plasmids', 
        color: '#FF007A' 
      },
      { 
        name: 'Uyirinai', 
        desc: 'Bio-computational docking & in-built GPU molecular dynamics simulation platform', 
        color: '#00E6C7' 
      },
      { 
        name: 'Fermion AI R100™ (AI-Driven Bioreactor)', 
        desc: 'Fermion AI R100™ is our AI-driven bioreactor system that revolutionizes biomanufacturing and micro-organism cultivation through intelligent automation and real-time optimization.', 
        color: '#a855f7',
        featured: true,
      },
    ],
    highlights: ['4 Platforms Released', '100% Offline / Cloud', 'Enterprise SLAs'],
    // Lucide Layers / Cpu
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="timeline-lucide-icon">
        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
        <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
      </svg>
    ),
  },
  {
    id: 'hackathon-victory',
    date: 'Aug 2026',
    badge: '1st Place Victory',
    headline: 'Winner – EyeQInnovate Hackathon 2.0',
    organization: 'Jointly presented by Dr. Agarwal’s Eye Hospital & StartupTN',
    description: 'Bagged top honors for pioneering clinical AI diagnostic solutions, validated by premier ophthalmologists and regional venture accelerators.',
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.25)',
    borderGlow: 'rgba(245, 158, 11, 0.45)',
    highlights: ['1st Place Champion', 'Clinical Eye Diagnostics', 'StartupTN & Venture Jury'],
    // Lucide Trophy
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="timeline-lucide-icon">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
  },
];

export default function JourneyTimeline() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="journey-section section" id="journey">
      <div className="container">
        {/* Section Header */}
        <div className="section-header journey-header">
          <span className="section-badge journey-badge">
            <span className="live-dot" /> Trajectory &amp; Momentum
          </span>
          <h2 className="section-title journey-title">
            Company Journey &amp; <span className="gradient-text">Milestones</span>
          </h2>
          <p className="section-subtitle journey-sub">
            From inception at VIT-TBI in 2025 to national grant recognition, four flagship bio-computation platforms, and clinical victories.
          </p>
        </div>

        {/* Dual-Sided Vertical Timeline Container */}
        <div className="journey-timeline-track">
          {/* Continuous Center Circuit Trace Line */}
          <div className="timeline-center-rail" />

          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;
            const isHovered = hoveredIndex === index;

            const cardMarkup = (
              <div className="timeline-card glass-card">
                {/* Subtle Top Accent Border */}
                <div className="card-top-accent" style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }} />

                {/* Card Header: Badge & Date */}
                <div className="card-header-row">
                  <span className="milestone-badge" style={{ color: item.color, borderColor: item.borderGlow, background: item.glow }}>
                    {item.badge}
                  </span>
                  <span className="milestone-mobile-date">{item.date}</span>
                </div>

                {/* Headline & Organization */}
                <h3 className="milestone-headline">{item.headline}</h3>
                {item.organization && (
                  <div className="milestone-org">
                    <span className="org-icon">🏛️</span> {item.organization}
                  </div>
                )}

                {/* Description */}
                <p className="milestone-desc">{item.description}</p>

                {/* Featured Products Grid (Specific to Milestone 3) */}
                {item.products && (
                  <div className="products-featured-grid">
                    {item.products.map((p) => (
                      <div 
                        key={p.name} 
                        className={`product-item-chip ${p.featured ? 'product-featured-full' : ''}`} 
                        style={{ borderLeftColor: p.color }}
                      >
                        <div className="prod-chip-header">
                          <span className="prod-chip-name" style={{ color: p.color }}>{p.name}</span>
                          {p.featured && <span className="prod-chip-tag" style={{ backgroundColor: `${p.color}20`, color: p.color }}>AI Hardware + Software</span>}
                        </div>
                        <span className="prod-chip-desc">{p.desc}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Highlights Tags */}
                {item.highlights && (
                  <div className="milestone-tags-row">
                    {item.highlights.map((tag) => (
                      <span key={tag} className="milestone-tag">
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );

            const dateStampMarkup = (
              <div className="timeline-date-stamp">
                <span className="date-stamp-pill" style={{ borderColor: item.borderGlow, color: item.color }}>
                  <span className="date-dot" style={{ backgroundColor: item.color }} />
                  {item.date}
                </span>
              </div>
            );

            return (
              <div
                key={item.id}
                className={`timeline-row ${isEven ? 'row-left' : 'row-right'} ${isHovered ? 'row-hovered' : ''}`}
                style={{
                  '--milestone-accent': item.color,
                  '--milestone-glow': item.glow,
                  '--milestone-border': item.borderGlow,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Left Slot on Desktop */}
                <div className={`timeline-slot timeline-slot-left ${isEven ? 'timeline-slot-card' : 'timeline-slot-date'}`}>
                  {isEven ? cardMarkup : dateStampMarkup}
                </div>

                {/* Center Node Pin Slot (Dedicated space completely isolated from card text) */}
                <div className="timeline-slot timeline-slot-center">
                  <div className="timeline-node-pin">
                    <div className="node-halo" />
                    <div className="node-circle" style={{ borderColor: item.color, color: item.color }}>
                      {item.iconSvg}
                    </div>
                    <div className="node-ripple" style={{ borderColor: item.color }} />
                  </div>
                </div>

                {/* Right Slot on Desktop */}
                <div className={`timeline-slot timeline-slot-right ${isEven ? 'timeline-slot-date' : 'timeline-slot-card'}`}>
                  {isEven ? dateStampMarkup : cardMarkup}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
