import { PageHero, ComingSoonCard } from '../../components/PageComponents';
import { useReveal } from '../../hooks/useReveal';
import '../shared.css';

const insights = [
  { title: 'AI in Biomanufacturing: The Next Decade', date: 'Jun 2026', category: 'Technology', readTime: '8 min read', icon: '🤖' },
  { title: 'CRISPR Diagnostics: From Lab to Clinic', date: 'May 2026', category: 'Research', readTime: '12 min read', icon: '🧬' },
  { title: 'Synthetic Biology for Sustainable Fuels', date: 'Apr 2026', category: 'Sustainability', readTime: '6 min read', icon: '🌱' },
  { title: 'Building Reproducible Genomics Pipelines', date: 'Mar 2026', category: 'Engineering', readTime: '10 min read', icon: '⚙️' },
  { title: 'The Promise of Cell-Free Systems', date: 'Feb 2026', category: 'Research', readTime: '7 min read', icon: '🧫' },
  { title: 'Photobioreactors: Algae as a Platform', date: 'Jan 2026', category: 'Technology', readTime: '9 min read', icon: '🌊' },
];

export default function Insights() {
  const revealRef = useReveal();
  return (
    <main className="page-enter" ref={revealRef}>
      <PageHero
        badge="Insights & Blog"
        title={<>Insights & <span className="gradient-text">Research</span></>}
        subtitle="Perspectives on synthetic biology, AI, and the future of biotechnology from the ArqGene team."
        color="#00E6C7"
      />
      <section className="section">
        <div className="container">
          <div className="insights-grid">
            {insights.map((a, i) => (
              <div key={i} className="insight-card glass-card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="insight-icon">{a.icon}</div>
                <div className="insight-meta">
                  <span className="badge badge-teal">{a.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>{a.date}</span>
                </div>
                <h3 className="insight-title">{a.title}</h3>
                <div className="insight-read">{a.readTime}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        .insights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .insight-card { padding: 2rem; cursor: pointer; }
        .insight-icon { font-size: 2rem; margin-bottom: 1rem; }
        .insight-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.875rem; flex-wrap: wrap; }
        .insight-title { font-size: 1.05rem; font-weight: 700; color: var(--white); line-height: 1.4; margin-bottom: 0.875rem; font-family: var(--font-display); }
        .insight-read { font-size: 0.75rem; color: var(--muted-text); }
        @media (max-width: 900px) { .insights-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .insights-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
