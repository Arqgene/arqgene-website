import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import './Download.css';

const categories = ['All', 'Windows (64-bit)', 'Windows (32-bit)', 'macOS', 'Linux'];

const downloads = [
  /* ---- GenXFlow ---- */
  {
    id: 'gxf-win-64',
    product: 'GenXFlow™',
    name: 'GenXFlow™ Desktop (Windows 64-bit)',
    version: 'v2.4.1',
    platform: 'Windows 64-bit',
    platformIcon: '🪟',
    category: 'Windows (64-bit)',
    size: '187 MB',
    date: '2026-06-15',
    desc: 'Native desktop genomics pipeline app for 64-bit Windows 10, 11 & Windows Server (x64). Full multithreading & GPU acceleration.',
    tags: ['Genomics', '64-bit (x64)', 'Windows', 'Offline'],
    color: '#00C2FF',
    stable: true,
    arch: '64-bit (x64)',
  },
  {
    id: 'gxf-win-32',
    product: 'GenXFlow™',
    name: 'GenXFlow™ Desktop (Windows 32-bit)',
    version: 'v2.4.1',
    platform: 'Windows 32-bit',
    platformIcon: '🪟',
    category: 'Windows (32-bit)',
    size: '175 MB',
    date: '2026-06-15',
    desc: 'Native desktop genomics pipeline app for 32-bit legacy Windows environments (x86). Optimized memory footprint.',
    tags: ['Genomics', '32-bit (x86)', 'Windows', 'Offline'],
    color: '#00C2FF',
    stable: true,
    arch: '32-bit (x86)',
  },
  {
    id: 'gxf-mac',
    product: 'GenXFlow™',
    name: 'GenXFlow™ Desktop (macOS)',
    version: 'v2.4.1',
    platform: 'macOS',
    platformIcon: '🍎',
    category: 'macOS',
    size: '194 MB',
    date: '2026-06-15',
    desc: 'Native desktop genomics pipeline application for macOS 13+ (Universal binary: Apple Silicon M1/M2/M3 & Intel).',
    tags: ['Genomics', 'macOS', 'Apple Silicon / Intel', 'Offline'],
    color: '#00C2FF',
    stable: true,
    internalOnly: true,
  },
  {
    id: 'gxf-linux',
    product: 'GenXFlow™',
    name: 'GenXFlow™ Desktop (Linux)',
    version: 'v2.4.1',
    platform: 'Linux',
    platformIcon: '🐧',
    category: 'Linux',
    size: '172 MB',
    date: '2026-06-15',
    desc: 'Native desktop genomics pipeline application for Linux distributions (.deb / .rpm / AppImage packages).',
    tags: ['Genomics', 'Linux', '.deb / .rpm', 'Offline'],
    color: '#00C2FF',
    stable: true,
    internalOnly: true,
  },

  /* ---- Uyirinai ---- */
  {
    id: 'uyi-win-64',
    product: 'Uyirinai',
    name: 'Uyirinai Desktop (Windows 64-bit)',
    version: 'v1.2.3',
    platform: 'Windows 64-bit',
    platformIcon: '🪟',
    category: 'Windows (64-bit)',
    size: '142 MB',
    date: '2026-05-20',
    desc: 'Molecular docking & simulation desktop app for 64-bit Windows 10/11 (x64). Individual & bulk docking with in-built MD simulation engine.',
    tags: ['Docking', 'Bulk Screening', 'MD Simulation', '64-bit (x64)', 'Offline'],
    color: '#00E6C7',
    stable: true,
    arch: '64-bit (x64)',
    internalOnly: true,
  },
  {
    id: 'uyi-win-32',
    product: 'Uyirinai',
    name: 'Uyirinai Desktop (Windows 32-bit)',
    version: 'v1.2.3',
    platform: 'Windows 32-bit',
    platformIcon: '🪟',
    category: 'Windows (32-bit)',
    size: '130 MB',
    date: '2026-05-20',
    desc: 'Molecular docking & simulation desktop app for 32-bit Windows systems (x86). Lightweight offline docking workstation mode.',
    tags: ['Docking', 'Bulk Screening', 'MD Simulation', '32-bit (x86)', 'Offline'],
    color: '#00E6C7',
    stable: true,
    arch: '32-bit (x86)',
    internalOnly: true,
  },
  {
    id: 'uyi-mac',
    product: 'Uyirinai',
    name: 'Uyirinai Desktop (macOS)',
    version: 'v1.2.3',
    platform: 'macOS',
    platformIcon: '🍎',
    category: 'macOS',
    size: '148 MB',
    date: '2026-05-20',
    desc: 'Molecular docking & simulation desktop app for macOS 13+ (Universal for Apple Silicon Metal GPU acceleration & Intel).',
    tags: ['Docking', 'Bulk Screening', 'MD Simulation', 'Apple Silicon / Intel', 'Offline'],
    color: '#00E6C7',
    stable: true,
    internalOnly: true,
  },
  {
    id: 'uyi-linux',
    product: 'Uyirinai',
    name: 'Uyirinai Desktop (Linux)',
    version: 'v1.2.3',
    platform: 'Linux',
    platformIcon: '🐧',
    category: 'Linux',
    size: '136 MB',
    date: '2026-05-20',
    desc: 'Molecular docking & simulation desktop app for Linux workstations (.deb / .rpm / AppImage) with CUDA GPU acceleration.',
    tags: ['Docking', 'Bulk Screening', 'MD Simulation', '.deb / .rpm', 'Offline'],
    color: '#00E6C7',
    stable: true,
    internalOnly: true,
  },

  /* ---- Marabi ---- */
  {
    id: 'marabi-win-64',
    product: 'Marabi',
    name: 'Marabi Desktop (Windows 64-bit)',
    version: 'v1.0.0',
    platform: 'Windows 64-bit',
    platformIcon: '🪟',
    category: 'Windows (64-bit)',
    size: '115 MB',
    date: '2026-05-20',
    desc: 'Molecular cloning & plasmid design desktop app for 64-bit Windows 10/11 (x64). Indian-made molecular cloning software with vector map rendering & in-silico cloning.',
    tags: ['Plasmid Map', 'Cloning', 'Plasmid Design', '64-bit (x64)', 'Offline'],
    color: '#FF007A',
    stable: true,
    arch: '64-bit (x64)',
    internalOnly: true,
  },
  {
    id: 'marabi-win-32',
    product: 'Marabi',
    name: 'Marabi Desktop (Windows 32-bit)',
    version: 'v1.0.0',
    platform: 'Windows 32-bit',
    platformIcon: '🪟',
    category: 'Windows (32-bit)',
    size: '105 MB',
    date: '2026-05-20',
    desc: 'Molecular cloning & plasmid design desktop app for 32-bit Windows systems (x86). Lightweight offline plasmid editor mode.',
    tags: ['Plasmid Map', 'Cloning', 'Plasmid Design', '32-bit (x86)', 'Offline'],
    color: '#FF007A',
    stable: true,
    arch: '32-bit (x86)',
    internalOnly: true,
  },
  {
    id: 'marabi-mac',
    product: 'Marabi',
    name: 'Marabi Desktop (macOS)',
    version: 'v1.0.0',
    platform: 'macOS',
    platformIcon: '🍎',
    category: 'macOS',
    size: '122 MB',
    date: '2026-05-20',
    desc: 'Molecular cloning & plasmid design desktop app for macOS 13+ (Universal for Apple Silicon & Intel). High-res SVG map exporter.',
    tags: ['Plasmid Map', 'Cloning', 'Plasmid Design', 'Apple Silicon / Intel', 'Offline'],
    color: '#FF007A',
    stable: true,
    internalOnly: true,
  },
  {
    id: 'marabi-linux',
    product: 'Marabi',
    name: 'Marabi Desktop (Linux)',
    version: 'v1.0.0',
    platform: 'Linux',
    platformIcon: '🐧',
    category: 'Linux',
    size: '110 MB',
    date: '2026-05-20',
    desc: 'Molecular cloning & plasmid design desktop app for Linux workstations (.deb / .rpm / AppImage). Restriction digest & primer design suite.',
    tags: ['Plasmid Map', 'Cloning', 'Plasmid Design', '.deb / .rpm', 'Offline'],
    color: '#FF007A',
    stable: true,
    internalOnly: true,
  },
];

function DownloadItem({ item, onStartDownload }) {
  return (
    <div className="dl-card glass-card reveal" style={{ '--dpc': item.internalOnly ? '#666666' : item.color, opacity: item.internalOnly ? 0.85 : 1 }}>
      {item.internalOnly ? (
        <div className="beta-ribbon" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: 'var(--muted-text)' }}>
          Internal Use
        </div>
      ) : (
        !item.stable && <div className="beta-ribbon">Beta</div>
      )}

      <div className="dl-card-header">
        <div className="dl-icon" style={{ color: item.internalOnly ? '#888888' : item.color }}>{item.platformIcon}</div>
        <div className="dl-product-badge" style={{ color: item.internalOnly ? '#888888' : item.color, borderColor: item.internalOnly ? 'rgba(255,255,255,0.15)' : `${item.color}30`, background: item.internalOnly ? 'rgba(255,255,255,0.05)' : `${item.color}10` }}>
          {item.product}
        </div>
      </div>

      <div className="dl-info">
        <h3 className="dl-name">{item.name}</h3>
        <p className="dl-desc">{item.desc}</p>
        <div className="dl-tags">
          {item.tags.map(t => <span key={t} className="dl-tag">{t}</span>)}
        </div>
      </div>

      <div className="dl-meta">
        <div className="dl-meta-item">
          <span className="dl-meta-label">Version</span>
          <span className="dl-meta-val">{item.version}</span>
        </div>
        <div className="dl-meta-item">
          <span className="dl-meta-label">Platform</span>
          <span className="dl-meta-val">{item.platform}</span>
        </div>
        <div className="dl-meta-item">
          <span className="dl-meta-label">Size</span>
          <span className="dl-meta-val">{item.internalOnly ? 'Internal' : item.size}</span>
        </div>
        <div className="dl-meta-item">
          <span className="dl-meta-label">Released</span>
          <span className="dl-meta-val">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      {item.internalOnly ? (
        <Link 
          to={`/contact?product=${encodeURIComponent(item.product)}&platform=${encodeURIComponent(item.platform)}&reason=internal-only`}
          className="dl-btn" 
          style={{ borderColor: 'rgba(255, 255, 255, 0.15)', color: 'var(--muted-text)', textDecoration: 'none' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Contact Sales
        </Link>
      ) : (
        <button className="dl-btn" style={{ borderColor: `${item.color}40`, color: item.color }} onClick={() => onStartDownload(item)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          Download Installer
        </button>
      )}
    </div>
  );
}

export default function Download() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProduct, setActiveProduct] = useState('All');
  const [search, setSearch] = useState('');
  const [downloadTriggered, setDownloadTriggered] = useState(null);
  const revealRef = useReveal();

  const products = ['All', 'GenXFlow™', 'Uyirinai', 'Marabi'];

  const filtered = downloads.filter(d => {
    const matchCat = activeCategory === 'All' || d.category === activeCategory || d.platform.includes(activeCategory);
    const matchProd = activeProduct === 'All' || d.product === activeProduct || (activeProduct === 'GenXFlow™' && d.product.includes('GenXFlow'));
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchProd && matchSearch;
  });

  const handleStartDownload = (item) => {
    if (item.internalOnly) return;
    const is32 = item.platform.includes('32-bit') || item.arch?.includes('32');
    const isMac = item.platform === 'macOS';
    const isLinux = item.platform === 'Linux';

    let downloadUrl = 'https://downloads.arqgene.com/';
    if (item.product === 'GenXFlow') {
      if (is32) downloadUrl = import.meta.env.VITE_GENXFLOW_WIN_X86_URL || 'https://next99.nyc3.digitaloceanspaces.com/arqgene/x32/GenXFlow_Setup.exe';
      else if (isMac) downloadUrl = 'https://downloads.arqgene.com/genxflow/v2.4.1/GenXFlow-v2.4.1-mac.dmg';
      else if (isLinux) downloadUrl = 'https://downloads.arqgene.com/genxflow/v2.4.1/GenXFlow-v2.4.1-linux.AppImage';
      else downloadUrl = import.meta.env.VITE_GENXFLOW_WIN_X64_URL || 'https://next99.nyc3.digitaloceanspaces.com/arqgene/x64/GenXFlow_Setup.exe';
    } else if (item.product === 'Uyirinai') {
      if (is32) downloadUrl = 'https://downloads.arqgene.com/uyirinai/v1.2.3/Uyirinai-v1.2.3-win-x86.exe';
      else if (isMac) downloadUrl = 'https://downloads.arqgene.com/uyirinai/v1.2.3/Uyirinai-v1.2.3-mac.dmg';
      else if (isLinux) downloadUrl = 'https://downloads.arqgene.com/uyirinai/v1.2.3/Uyirinai-v1.2.3-linux.deb';
      else downloadUrl = 'https://downloads.arqgene.com/uyirinai/v1.2.3/Uyirinai-v1.2.3-win-x64.exe';
    } else {
      if (is32) downloadUrl = 'https://downloads.arqgene.com/marabi/v0.9.2/Marabi-v0.9.2-win-x86.exe';
      else if (isMac) downloadUrl = 'https://downloads.arqgene.com/marabi/v0.9.2/Marabi-v0.9.2-mac.dmg';
      else if (isLinux) downloadUrl = 'https://downloads.arqgene.com/marabi/v0.9.2/Marabi-v0.9.2-linux.deb';
      else downloadUrl = 'https://downloads.arqgene.com/marabi/v0.9.2/Marabi-v0.9.2-win-x64.exe';
    }

    setDownloadTriggered({
      item: item.name,
      version: item.version,
      platform: item.platform,
      downloadUrl,
    });
  };

  return (
    <main className="download-page page-enter" ref={revealRef}>
      {/* Hero */}
      <section className="dl-hero section">
        <div className="dl-hero-bg" />
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Download Center</span>
            <h1 className="section-title reveal">
              Desktop Software <span className="gradient-text">Installers</span>
            </h1>
            <p className="section-subtitle reveal">
              Download native offline desktop app installers for GenXFlow™, Uyirinai, and Marabi tools on Windows (32-bit &amp; 64-bit), macOS, and Linux.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="dl-quick-stats reveal">
            {[
              { val: 'Windows 64-bit', label: 'Recommended x64 Arch' },
              { val: 'Windows 32-bit', label: 'Legacy x86 Arch' },
              { val: 'macOS', label: 'Apple Silicon & Intel' },
              { val: 'Linux', label: '.deb / .rpm / AppImage' },
            ].map((s, i) => (
              <div key={i} className="dl-stat">
                <div className="dl-stat-val">{s.val}</div>
                <div className="dl-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="dl-filters-section">
        <div className="container">
          <div className="dl-search-row">
            <div className="dl-search-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search software by tool or OS..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="dl-search-input"
              />
            </div>
          </div>

          {/* Filter Rows */}
          <div className="dl-filter-row">
            {/* Category Pills */}
            <div className="filter-group">
              <span className="filter-label">Platform:</span>
              <div className="filter-pills">
                {categories.map(c => (
                  <button
                    key={c}
                    className={`filter-pill ${activeCategory === c ? 'active' : ''}`}
                    onClick={() => setActiveCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Pills */}
            <div className="filter-group">
              <span className="filter-label">Tool:</span>
              <div className="filter-pills">
                {products.map(p => (
                  <button
                    key={p}
                    className={`filter-pill ${activeProduct === p ? 'active' : ''}`}
                    onClick={() => setActiveProduct(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="section">
        <div className="container">
          <div className="dl-grid">
            {filtered.map(item => (
              <DownloadItem key={item.id} item={item} onStartDownload={handleStartDownload} />
            ))}
          </div>
        </div>
      </section>

      {/* Download Trigger Notification */}
      {downloadTriggered && createPortal(
        <div className="modal-backdrop" onClick={() => setDownloadTriggered(null)}>
          <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">⚡</div>
            <h2 className="modal-title">Starting Installer Download</h2>
            <p className="modal-desc">
              Direct download initiated for <strong>{downloadTriggered.item}</strong> ({downloadTriggered.version}).
            </p>
            <div className="license-key-box" style={{ wordBreak: 'break-all', textAlign: 'left' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted-text)', display: 'block', marginBottom: '0.25rem' }}>Download URL:</span>
              <code style={{ fontSize: '0.8rem' }}>{downloadTriggered.downloadUrl}</code>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: '0.75rem' }}>
              Note: ArqGene desktop tools operate 100% offline on your machine for complete data privacy and local processing.
            </p>
            <div className="modal-actions" style={{ marginTop: '1.5rem' }}>
              <a href={downloadTriggered.downloadUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Download Direct File →
              </a>
              <button className="btn-ghost" onClick={() => setDownloadTriggered(null)}>Close</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </main>
  );
}
