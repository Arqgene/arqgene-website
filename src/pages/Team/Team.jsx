import { useReveal } from '../../hooks/useReveal';
import './Team.css';

const founders = [
  {
    name: 'Dr. L. Karthik',
    title: 'Founder & CEO',
    bio: 'Expert in synthetic biology and AI-driven bioprocessing. Leading ArqGene\'s mission to merge intelligent systems with biological engineering.',
    image: '/images/KARTHIK NEW white.png',
    linkedin: 'https://www.linkedin.com/in/arqgene-llp-0ab916391/',
    tags: ['Synthetic Biology', 'AI', 'Bioprocessing'],
  },
  {
    name: 'Dr. Vijai Chandra',
    title: 'Founder & CTO',
    bio: 'Pioneer in microfluidics and CRISPR diagnostics. Architecting the technical foundation of ArqGene\'s platform products.',
    image: '/images/VIJAY.jpeg',
    linkedin: 'https://www.linkedin.com/in/arqgene-llp-0ab916391/',
    tags: ['Microfluidics', 'CRISPR', 'Platform Engineering'],
  },
];

const advisors = [
  {
    name: 'Dr. V. Mohanasrinivasan',
    title: 'Scientific Advisor',
    bio: 'Professor and researcher with expertise in microbiology and industrial biotechnology.',
    image: '/images/mm.jpeg',
    tags: ['Microbiology', 'Industrial Biotech'],
  },
  {
    name: 'Dr. Raymond McCauley',
    title: 'Technology Advisor',
    bio: 'Global leader in digital biology, computational genomics, and synthetic biology commercialization.',
    image: '/images/raymond_mccauley.png',
    tags: ['Digital Biology', 'Genomics', 'Commercialization'],
  },
  {
    name: 'Tom Nodine',
    title: 'Business Advisor',
    bio: 'Serial entrepreneur and investor with deep experience in biotech startup scaling and global market development.',
    image: '/images/Tom-Nodine.jpg',
    tags: ['Entrepreneurship', 'Investment', 'Strategy'],
  },
];

export default function Team() {
  const revealRef = useReveal();

  return (
    <main className="team-page page-enter" ref={revealRef}>
      <section className="team-hero section">
        <div className="team-hero-bg" />
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Our People</span>
            <h1 className="section-title reveal">The Team Behind <span className="gradient-text">ArqGene</span></h1>
            <p className="section-subtitle reveal">
              A multidisciplinary team of scientists, engineers, and entrepreneurs united by a common goal — programming biology to benefit humanity.
            </p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Leadership</span>
            <h2 className="section-title reveal">Founders</h2>
          </div>
          <div className="founders-grid">
            {founders.map((f, i) => (
              <div key={i} className="founder-card glass-card reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="founder-img-wrap">
                  <img src={f.image} alt={f.name} loading="lazy" />
                  <div className="founder-img-overlay" />
                </div>
                <div className="founder-info">
                  <h3 className="founder-name">{f.name}</h3>
                  <div className="founder-title">{f.title}</div>
                  <p className="founder-bio">{f.bio}</p>
                  <div className="founder-tags">
                    {f.tags.map(t => <span key={t} className="badge badge-blue">{t}</span>)}
                  </div>
                  <a href={f.linkedin} target="_blank" rel="noreferrer" className="founder-linkedin btn-ghost" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zm-11 19H5V8h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="section grid-bg">
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Advisory Board</span>
            <h2 className="section-title reveal">Scientific & Business Advisors</h2>
            <p className="section-subtitle reveal">World-class experts guiding ArqGene's scientific, commercial, and strategic direction.</p>
          </div>
          <div className="advisors-grid">
            {advisors.map((a, i) => (
              <div key={i} className="advisor-card glass-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="advisor-img-wrap">
                  <img src={a.image} alt={a.name} loading="lazy" />
                </div>
                <h4 className="advisor-name">{a.name}</h4>
                <div className="advisor-title-badge">{a.title}</div>
                <p className="advisor-bio">{a.bio}</p>
                <div className="advisor-tags">
                  {a.tags.map(t => <span key={t} className="badge badge-teal">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title reveal">Join the Team</h2>
          <p className="section-subtitle reveal" style={{ margin: '0 auto 2rem' }}>
            We're always looking for passionate scientists, engineers, and innovators to push the boundaries of biology.
          </p>
          <a href="/careers" className="btn-primary reveal" style={{ display: 'inline-flex' }}>View Open Positions →</a>
        </div>
      </section>
    </main>
  );
}
