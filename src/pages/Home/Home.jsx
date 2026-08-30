import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import './Home.css';

/* ---- Particle Canvas ---- */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const colors = ['#00C2FF', '#00E6C7', '#7CFF36', '#9D4EDD'];

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * (canvas.width / window.devicePixelRatio);
        this.y = Math.random() * (canvas.height / window.devicePixelRatio);
        this.size = Math.random() * 2.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.1;
        this.life = Math.random() * 200 + 100;
        this.age = 0;
      }
      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.vx -= (dx / dist) * 0.08;
          this.vy -= (dy / dist) * 0.08;
        }
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;
        this.age++;
        if (this.age > this.life || this.x < 0 || this.x > canvas.width / window.devicePixelRatio || this.y < 0 || this.y > canvas.height / window.devicePixelRatio) {
          this.reset();
        }
      }
      draw() {
        const fade = this.age < 20 ? this.age / 20 : this.age > this.life - 20 ? (this.life - this.age) / 20 : 1;
        ctx.save();
        ctx.globalAlpha = this.alpha * fade;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: 180 }, () => new Particle());
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 100) * 0.12;
            ctx.strokeStyle = particles[i].color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      drawConnections();
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(loop);
    };

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    init();
    loop();

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

/* ---- Live GenXFlow Pipeline Dashboard ---- */
const pipelineSteps = [
  { id: 1, name: 'Upload FASTQ', status: 'done', time: '0.2s', icon: '📤' },
  { id: 2, name: 'FastQC Analysis', status: 'done', time: '12s', icon: '🔍' },
  { id: 3, name: 'Trimmomatic', status: 'done', time: '8s', icon: '✂️' },
  { id: 4, name: 'Genome Assembly', status: 'active', time: '~45s', icon: '🧩' },
  { id: 5, name: 'Gene Annotation', status: 'pending', time: '~60s', icon: '🏷️' },
  { id: 6, name: 'AI Analysis', status: 'pending', time: '~30s', icon: '🤖' },
  { id: 7, name: 'Visualization', status: 'pending', time: '~5s', icon: '📊' },
];

function PipelineDashboard() {
  const [steps, setSteps] = useState(pipelineSteps);
  const [progress, setProgress] = useState(43);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSteps(prev => {
        const activeIdx = prev.findIndex(s => s.status === 'active');
        if (activeIdx === -1 || activeIdx === prev.length - 1) {
          // Reset
          setTimeout(() => {
            setSteps(pipelineSteps.map((s, i) => i === 0 ? { ...s, status: 'active' } : { ...s, status: i === 0 ? 'active' : 'pending' }));
            setProgress(10);
          }, 2000);
          return prev.map(s => ({ ...s, status: 'done' }));
        }
        const next = [...prev];
        next[activeIdx] = { ...next[activeIdx], status: 'done' };
        next[activeIdx + 1] = { ...next[activeIdx + 1], status: 'active' };
        setProgress(Math.round(((activeIdx + 2) / pipelineSteps.length) * 100));
        return next;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="pipeline-dashboard">
      <div className="pipeline-header">
        <div className="pipeline-title-row">
          <div className="pipeline-icon">🧬</div>
          <div>
            <div className="pipeline-name">GenXFlow</div>
            <div className="pipeline-run">Run #1247 · WGS Analysis</div>
          </div>
          <span className={`badge ${running ? 'badge-green' : 'badge-blue'}`} style={{ marginLeft: 'auto' }}>
            <span className="live-dot" />
            {running ? 'Live' : 'Complete'}
          </span>
        </div>

        <div className="pipeline-progress-bar">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-pct">{progress}%</span>
        </div>
      </div>

      <div className="pipeline-steps">
        {steps.map((step, i) => (
          <div key={step.id} className={`pipeline-step step-${step.status}`}>
            <div className="step-connector" />
            <div className="step-dot">
              {step.status === 'done' ? '✓' : step.status === 'active' ? <span className="spin-dot" /> : '○'}
            </div>
            <div className="step-info">
              <span className="step-icon">{step.icon}</span>
              <span className="step-name">{step.name}</span>
              <span className="step-time">{step.status === 'done' ? step.time : step.status === 'active' ? '...' : step.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pipeline-metrics">
        <div className="metric">
          <span className="metric-val">2.4 GB</span>
          <span className="metric-lbl">Input</span>
        </div>
        <div className="metric">
          <span className="metric-val">98.7%</span>
          <span className="metric-lbl">Quality</span>
        </div>
        <div className="metric">
          <span className="metric-val">4 CPUs</span>
          <span className="metric-lbl">Resources</span>
        </div>
        <div className="metric">
          <span className="metric-val">~3m</span>
          <span className="metric-lbl">ETA</span>
        </div>
      </div>
    </div>
  );
}

/* ---- Authentic Platform Benchmarks & Startup Milestones ---- */
const platformHighlights = [
  { value: '3 Flagship', label: 'Biotech Platforms (GenXFlow, Marabi, Uyirinai)', color: 'var(--neon-blue)' },
  { value: 'NIDHI PRAYAS', label: 'DST Govt. of India Grant Winner', color: 'var(--neon-teal)' },
  { value: 'VIT-TBI', label: 'Incubated Deep-Tech Startup', color: 'var(--neon-green)' },
  { value: 'Plasmid Design', label: 'Indian-Made Molecular Cloning Software', color: 'var(--neon-purple)' },
  { value: 'GPU Accelerated', label: 'Native Offline Docking & Simulation', color: 'var(--neon-blue)' },
];

/* ---- Area Cards ---- */
const areas = [
  {
    icon: '🤖',
    title: 'AI-Driven Photobioreactors',
    desc: 'Intelligent systems for optimized algal cultivation and biomanufacturing automation.',
    color: '#00C2FF',
  },
  {
    icon: '🧬',
    title: 'Synthetic Biology',
    desc: 'Engineering biological systems for sustainable production and next-gen therapeutics.',
    color: '#00E6C7',
  },
  {
    icon: '💊',
    title: 'Precision Biotherapeutics',
    desc: 'Targeted biological treatments powered by advanced genetic engineering.',
    color: '#7CFF36',
  },
  {
    icon: '🔬',
    title: 'CRISPR-based Microfluidics',
    desc: 'Rapid, accurate molecular diagnostics for point-of-care applications.',
    color: '#9D4EDD',
  },
];

/* ---- Product Cards — sourced verbatim from original ArqGene site ---- */
const products = [
  {
    id: 'genxflow',
    name: 'GenXFlow',
    tagline: 'Sequence Pipeline Platform',
    desc: 'End-to-end NGS & metagenomics pipeline automation. Supports Flye, SPAdes, MEGAHIT, Unicycler, Fastp, Porechop, Filtlong, Quast, Prokka, FastQC, and QIIME 2 in a native desktop or private cloud platform.',
    icon: '🧬',
    color: '#00C2FF',
    badges: ['NGS Pipeline', 'Metagenomics', 'QIIME 2', 'Desktop & Cloud'],
    to: '/products?tab=genxflow',
    status: 'stable',
  },
  {
    id: 'marabi',
    name: 'Marabi',
    tagline: 'Molecular Cloning & Plasmid Design Software',
    desc: 'Affordable. Powerful. Indian. An Indian-made, affordable software platform that simplifies plasmid map design, in-silico cloning, restriction analysis, primer design, and sequence annotation for every biotech lab.',
    icon: '🧫',
    color: '#FF007A',
    badges: ['Plasmid Map', 'In-Silico Cloning', 'Molecular Software', 'One-Time License'],
    to: '/products?tab=marabi',
    status: 'stable',
  },
  {
    id: 'uyirinai',
    name: 'Uyirinai',
    tagline: 'Molecular Docking & In-Built Simulation Platform',
    desc: 'Smarter Insights. Better Molecules. All-in-one platform for individual target docking, high-throughput bulk docking screening, multiple engines (AutoDock Vina, Glide, Gold), and in-built GPU-accelerated MD simulation engines.',
    icon: '🔬',
    color: '#00E6C7',
    badges: ['Bulk Docking', 'Individual Docking', 'In-Built MD Simulation', '2D/3D Interaction'],
    to: '/products?tab=uyirinai',
    status: 'stable',
  },
];

/* ---- Main Home Component ---- */
export default function Home() {
  const revealRef = useReveal();

  return (
    <main className="home page-enter" ref={revealRef}>
      {/* ===== HERO ===== */}
      <section className="hero-section">
        <ParticleCanvas />
        <div className="hero-aurora" />

        <div className="hero-inner container">
          {/* Left */}
          <div className="hero-left">
            <div className="hero-badge hero-animate" style={{ animationDelay: '0s' }}>
              <span className="badge badge-blue">
                <span className="live-dot" /> India's Premier Synthetic Biology Platform
              </span>
            </div>

            <h1 className="hero-title hero-animate" style={{ animationDelay: '0.1s' }}>
              Engineering the{' '}
              <span className="gradient-text-aurora">Future of Biology</span>
            </h1>

            <p className="hero-desc hero-animate" style={{ animationDelay: '0.2s' }}>
              ArqGene pioneers AI-driven biomanufacturing, synthetic biology, and precision diagnostics.
              From photobioreactors to CRISPR platforms — we build the tools biology needs.
            </p>

            <div className="hero-actions hero-animate" style={{ animationDelay: '0.3s' }}>
              <Link to="/products" className="btn-primary">
                Explore Our Products
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/about" className="btn-outline">Learn Our Science</Link>
            </div>

            <div className="hero-trust hero-animate" style={{ animationDelay: '0.4s' }}>
              <span className="trust-label">Backed by</span>
              <div className="trust-badges">
                <span className="badge badge-blue">DST NIDHI PRAYAS</span>
                <span className="badge badge-teal">DST Ignition</span>
                <span className="badge badge-purple">VIT-TBI</span>
              </div>
            </div>
          </div>

          {/* Right — Live Dashboard */}
          <div className="hero-right hero-animate" style={{ animationDelay: '0.2s' }}>
            <PipelineDashboard />
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span>Scroll to explore</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="mission-section section">
        <div className="container">
          <p className="mission-text reveal">
            At ArqGene, we design <strong>intelligent biological systems</strong> that empower a sustainable, programmable future.
            Our innovations in <strong>AI photobioreactor systems</strong>, <strong>microfluidics for gene editing</strong>, and{' '}
            <strong>CRISPR-enabled platforms</strong> accelerate next-generation biomanufacturing breakthroughs.
          </p>
          <div className="gradient-line reveal" />
        </div>
      </section>

      {/* ===== PLATFORM HIGHLIGHTS & MILESTONES ===== */}
      <section className="stats-section section grid-bg">
        <div className="container">
          <div className="stats-grid">
            {platformHighlights.map((s, i) => (
              <div className="stat-card glass-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="stat-value" style={{ color: s.color, fontSize: s.value.length > 8 ? '1.4rem' : '1.8rem' }}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-glow" style={{ background: `radial-gradient(circle, ${s.color}20, transparent)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AREAS ===== */}
      <section className="areas-section section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Our Focus</span>
            <h2 className="section-title reveal">Areas We Work In</h2>
            <p className="section-subtitle reveal">
              Cutting-edge research and product development across the intersection of AI and biology.
            </p>
          </div>

          <div className="areas-grid">
            {areas.map((area, i) => (
              <div
                className="area-card glass-card reveal"
                key={i}
                style={{ transitionDelay: `${i * 0.1}s`, '--area-color': area.color }}
              >
                <div className="area-icon">{area.icon}</div>
                <h3 className="area-title">{area.title}</h3>
                <p className="area-desc">{area.desc}</p>
                <div className="area-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION BANNER ===== */}
      <section className="banner-section">
        <div className="banner-aurora" />
        <div className="container">
          <h2 className="banner-headline reveal">
            Creating Smarter, Faster, and More Efficient{' '}
            <span className="gradient-text">Biological Workflows</span>{' '}
            Through AI and Advanced Engineering.
          </h2>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="products-section section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Product Ecosystem</span>
            <h2 className="section-title reveal">Our Platform Products</h2>
            <p className="section-subtitle reveal">
              Three flagship products forming a complete biotechnology platform — from discovery to deployment.
            </p>
          </div>

          <div className="products-grid">
            {products.map((p, i) => (
              <Link to={p.to} key={p.id} className="product-card glass-card reveal" style={{ transitionDelay: `${i * 0.12}s`, '--pc': p.color }}>
                <div className="product-card-top">
                  <div className="product-icon-wrap" style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                    <span className="product-icon">{p.icon}</span>
                  </div>
                  {p.status === 'beta' && (
                    <span className="product-status-badge" style={{ background: 'rgba(255,165,0,0.12)', border: '1px solid rgba(255,165,0,0.35)', color: '#FFA500' }}>Beta</span>
                  )}
                </div>
                <div className="product-info">
                  <div className="product-name">{p.name}</div>
                  <div className="product-tagline" style={{ color: p.color }}>{p.tagline}</div>
                  <p className="product-desc">{p.desc}</p>
                  <div className="product-tags">
                    {p.badges.map(b => <span key={b} className="product-tag">{b}</span>)}
                  </div>
                </div>
                <div className="product-cta" style={{ borderTop: `1px solid ${p.color}20`, color: p.color }}>
                  <span>Avail License</span>
                  <span>→</span>
                </div>
                <div className="product-glow" style={{ background: `radial-gradient(circle at bottom, ${p.color}15, transparent)` }} />
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }} className="reveal">
            <Link to="/products" className="btn-outline">View All Products →</Link>
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGY TEASER ===== */}
      <section className="tech-teaser section">
        <div className="container-wide">
          <div className="tech-teaser-grid">
            <div className="tech-teaser-text reveal-left">
              <span className="section-badge">Technology</span>
              <h2 className="section-title">AI-Driven <span className="gradient-text">Photobioreactors</span></h2>
              <p>
                Our AI photobioreactor systems revolutionize algal cultivation through intelligent automation and real-time optimization. Machine learning algorithms dynamically adjust LED spectra and intensity to maximize photosynthetic efficiency.
              </p>
              <ul className="tech-teaser-points">
                <li>
                  <span className="point-dot" />
                  <span>10–25% reduction in media and substrate cost</span>
                </li>
                <li>
                  <span className="point-dot" style={{ background: 'var(--neon-teal)' }} />
                  <span>30–50% reduction in manpower requirements</span>
                </li>
                <li>
                  <span className="point-dot" style={{ background: 'var(--neon-green)' }} />
                  <span>Real-time AI control of pH, temperature, and nutrients</span>
                </li>
              </ul>
              <Link to="/technology" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                Explore Technology →
              </Link>
            </div>
            <div className="tech-teaser-img reveal-right">
              <img src="/images/bioreactor.jpg" alt="Fermion AI R100 Bioreactor Controller System" loading="lazy" />
              <div className="img-glow-frame" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== GRANTS ===== */}
      <section className="grants-section section grid-bg">
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Recognition</span>
            <h2 className="section-title reveal">Grants & Recognition</h2>
          </div>
          <div className="grants-grid">
            {[
              { title: 'DST NIDHI PRAYAS', body: 'Department of Science and Technology, Government of India', icon: '🏛️' },
              { title: 'DST Ignition Grant', body: 'Department of Science and Technology, Government of India', icon: '🔥' },
              { title: 'VIT-TBI Incubated', body: 'VIT Technology Business Incubator, Vellore', icon: '🏫' },
            ].map((g, i) => (
              <div className="grant-card glass-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="grant-icon">{g.icon}</div>
                <h3 className="grant-title">{g.title}</h3>
                <p className="grant-body">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-aurora" />
            <span className="section-badge">Get Started Today</span>
            <h2 className="cta-title">Ready to Engineer the Future?</h2>
            <p className="cta-desc">
              Join researchers and biotech companies worldwide using ArqGene's platform to accelerate biological discovery.
            </p>
            <div className="cta-actions">
              <Link to="/download" className="btn-primary">Download Free Trial</Link>
              <Link to="/contact" className="btn-outline">Talk to an Expert</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
