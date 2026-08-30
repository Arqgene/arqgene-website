import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import './Products.css';

/* ─── Product data sourced from original ArqGene site ─── */
const productData = {
  genxflow: {
    id: 'genxflow',
    name: 'GenXFlow™',
    tagline: 'Native Desktop & Private Cloud Analytics Pipeline for Genomics & Proteomics',
    icon: '🧬',
    color: '#00C2FF',
    image: '/images/genxflow.jpg',
    version: 'v2.4.1',
    status: 'Generally Available',

    /* Verbatim from original index.html line 412 */
    desc: 'GenXFlow™ is our premier AI-powered analytics desktop application and pipeline designed for high-throughput genomic and proteomic sequencing. Runs natively as a desktop application on your local workstation for 100% data privacy and offline processing, or can be deployed into your organization\'s managed private cloud.',

    whatHowWho: {
      what: 'Automates and accelerates genomic and proteomic sequencing workflows using a pre-configured toolkit of 11 industry-standard and proprietary tools, fully customizable for your lab.',
      how: 'Executes locally on Windows (32-bit & 64-bit), macOS, or Linux, using Rust and PyTorch local GPU acceleration, or scales across your private cloud / HPC cluster.',
      who: 'Bioinformatics teams, academic researchers, clinical labs, and biomanufacturing companies requiring complete data sovereignty and tailored pipeline tools.',
    },

    /* Pre-installed Default Tools */
    defaultTools: [
      { name: 'FastQC', category: 'Quality Control', desc: 'High-throughput sequence data quality assessment' },
      { name: 'Porechop', category: 'Adapter Trimming', desc: 'Nanopore adapter & barcode removal' },
      { name: 'Filtlong', category: 'Read Filtering', desc: 'Quality-based filtering for long-read FASTQ files' },
      { name: 'SPAdes', category: 'De Novo Assembly', desc: 'Genome assembly for short and paired-end reads' },
      { name: 'Flye', category: 'Long-Read Assembly', desc: 'Fast & accurate de novo long-read assembler' },
      { name: 'Racon', category: 'Consensus Polishing', desc: 'Rapid consensus module for raw unpolished assemblies' },
      { name: 'QUAST', category: 'Assembly Evaluation', desc: 'Genome assembly quality metrics & comparison' },
      { name: 'Prokka', category: 'Genome Annotation', desc: 'Rapid prokaryotic genome feature annotation' },
      { name: 'QIIME2', category: 'Microbiome Analysis', desc: 'Marker-gene & amplicon sequencing data analysis' },
      { name: 'Unique Gene Marker', category: 'Proprietary Engine', desc: 'ArqGene in-house engine for unique target marker identification', proprietary: true },
      { name: 'Sequence Blaster', category: 'Proprietary BLAST+', desc: 'High-speed local sequence alignment & BLAST+ analysis', proprietary: true },
    ],

    bullets: [
      { title: 'Native Desktop Application', body: 'Installs directly on Windows (64-bit / 32-bit), macOS, or Linux. Complete offline processing with zero cloud data transfer.' },
      { title: 'Pre-Installed Default Toolkit', body: 'Comes pre-packaged with 11 essential tools: FastQC, Porechop, Filtlong, SPAdes, Flye, Racon, QUAST, Prokka, QIIME2, Unique Gene Marker, and Sequence Blaster.' },
      { title: 'Extensive Customization Guarantee', body: 'We customize and swap out tools based on your exact requirements! Integrate your lab\'s custom scripts, proprietary algorithms, or specialized tools.' },
      { title: 'Managed Private Cloud Option', body: 'If your team has cloud infrastructure, we deploy and maintain a dedicated instance in your AWS, GCP, or HPC server for full privacy.' },
    ],

    pipelines: [
      { name: 'QC & Trimming', input: 'Raw FASTQ', tools: 'FastQC → Porechop → Filtlong', output: 'Cleaned FASTQ, Quality Metrics', runtime: '5–15 min' },
      { name: 'Short-Read Assembly', input: 'Illumina FASTQ', tools: 'FastQC → SPAdes → QUAST', output: 'Contigs FASTA, Assembly Report', runtime: '15–40 min' },
      { name: 'Long-Read Assembly', input: 'Nanopore / PacBio', tools: 'Filtlong → Flye → Racon → QUAST', output: 'Polished Genome Assembly', runtime: '20–60 min' },
      { name: 'Prokaryotic Annotation', input: 'Assembly FASTA', tools: 'Prokka → Unique Gene Marker', output: 'Annotated GFF3, GBK, Target Markers', runtime: '5–15 min' },
      { name: 'Microbiome & 16S', input: 'Amplicon FASTQ', tools: 'FastQC → QIIME2 → Taxa Plots', output: 'OTU Table, Biodiversity Report', runtime: '10–30 min' },
      { name: 'Proprietary Sequence BLAST', input: 'Query FASTA + DB', tools: 'Sequence Blaster → Target Alignment', output: 'Alignment Matrix, Hit Score', runtime: '1–5 min' },
    ],

    features: [
      { icon: '🖥️', title: 'Native Desktop App', desc: 'Runs locally on Windows (32-bit / 64-bit), macOS, and Linux. No mandatory cloud account needed.' },
      { icon: '🛠️', title: 'Full Tool Customization', desc: 'We tailor the tool pipeline to your lab! Swap out default tools for your preferred software or custom scripts.' },
      { icon: '🧬', title: 'Proprietary Target Markers', desc: 'Includes ArqGene Unique Gene Marker & Sequence Blaster tools for rapid sequence identification.' },
      { icon: '🔒', title: '100% Data Privacy', desc: 'Your proprietary genetic sequences never leave your physical machine or private cloud.' },
      { icon: '☁️', title: 'Managed Private Cloud', desc: 'Optionally deployed inside your organization\'s AWS, GCP, or HPC cluster, fully maintained by ArqGene.' },
      { icon: '📊', title: 'Publication-Ready Reports', desc: 'Generates interactive HTML reports, phylogenetic trees, alignment maps, and GFF3 annotation files.' },
    ],

    specs: [
      { label: 'Deployment Options', value: 'Native Desktop App (Windows 32/64-bit, macOS, Linux) OR Managed Private Cloud' },
      { label: 'Default Toolsuite', value: 'FastQC, Porechop, Filtlong, SPAdes, Flye, Racon, QUAST, Prokka, QIIME2, Unique Gene Marker, Sequence Blaster' },
      { label: 'Customization', value: 'Fully customizable — tools & scripts can be swapped or added on request' },
      { label: 'Supported input formats', value: 'FASTQ, FASTA, BAM, CRAM, VCF, GFF3, BED' },
      { label: 'Max genome size', value: 'Up to 10 Gbp (microbial, plant, mammalian, complex genomes)' },
      { label: 'Minimum RAM', value: '16 GB (32 GB recommended for large assembly)' },
      { label: 'Data Sovereignty', value: '100% Local offline processing or Private Cloud instance' },
      { label: 'License', value: '7-Day Free Trial, Academic (₹999/mo), Enterprise (Custom)' },
    ],
  },

  uyirinai: {
    id: 'uyirinai',
    name: 'Uyirinai',
    tagline: 'Molecular Docking & In-Built Simulation Platform',
    icon: '🔬',
    color: '#00E6C7',
    image: '/images/uyirinai.jpg',
    version: 'v1.2.3',
    status: 'Generally Available',

    desc: 'Uyirinai is a high-performance molecular docking and structural simulation platform designed for drug discovery, virtual screening, and structural biology. Operating as a native desktop application and managed private cloud platform like GenXFlow, Uyirinai integrates individual receptor-ligand docking, high-throughput bulk/batch ligand screening, and in-built molecular dynamics (MD) simulation engines into a seamless, 100% offline-capable interface.',

    whatHowWho: {
      what: 'Provides end-to-end computational drug discovery workflows — performing individual protein-ligand docking, automated bulk screening of multi-thousand compound libraries, and in-built molecular dynamics (MD) simulations.',
      how: 'Runs GPU-accelerated docking engines (AutoDock Vina / Vinardo / proprietary algorithms) and native MD simulation pipelines on local Windows (32/64-bit), macOS, Linux, or private HPC cloud clusters with interactive 3D visualization.',
      who: 'Computational chemists, drug discovery teams, structural biologists, pharmaceutical R&D labs, academic research groups, and biotech startups seeking fast, secure docking and simulation.',
    },

    bullets: [
      { title: 'Individual Target & Receptor Docking', body: 'Precision single receptor-ligand and protein-protein docking with active site grid parameterization, flexible side-chain modeling, and interactive 3D pose visualization.' },
      { title: 'High-Throughput Bulk Docking Screen', body: 'Massive batch docking and virtual screening of chemical compound libraries (SDF, SMILES, PDBQT) with automated GPU parallelization and candidate ranking.' },
      { title: 'In-Built MD Simulation Engine', body: 'Integrated Molecular Dynamics (MD) simulation workflows — including energy minimization, solvated equilibration, trajectory analysis, and RMSD/RMSF profiling without third-party software overhead.' },
      { title: 'Native Desktop & Private Cloud', body: 'Installs directly on Windows (32-bit & 64-bit), macOS, and Linux for 100% local data sovereignty, or deploys seamlessly inside your organization’s private HPC cloud.' },
    ],

    pipelines: [
      { name: 'Individual Ligand-Protein Docking', input: 'Receptor PDB + Ligand SDF', tools: 'Grid Box Setup → AutoDock Vina / Vinardo → Pose Scoring', output: '3D Binding Poses, Affinity Score (kcal/mol), H-Bond Analysis', runtime: '1–5 min' },
      { name: 'High-Throughput Bulk Screening', input: 'Target Protein + 50,000 Ligand Library', tools: 'Batch Ligand Prep → GPU Bulk Docking Engine → Score Filter', output: 'Top 100 Candidate Hit List, CSV/SDF Export', runtime: '15–60 min' },
      { name: 'In-Built MD Trajectory Simulation', input: 'Docked Protein-Ligand Complex', tools: 'Solvation (TIP3P) → Energy Minimization → NVT/NPT → Production MD', output: 'RMSD / RMSF Curves, Trajectory Movie, Free Energy Surface', runtime: '1–6 hours' },
      { name: 'Protein-Protein Interface Docking', input: 'Receptor PDB + Partner Protein PDB', tools: 'Rigid Body Search → Electrostatic Refinement → Interface Analyzer', output: 'Complex Model, Interface ΔG, Contact Residue Map', runtime: '10–30 min' },
      { name: 'Flexible Receptor Docking', input: 'Receptor PDB + Flexible Residue Selection', tools: 'Rotamer Library Sampling → Conformation Search → Binding Score', output: 'Induced-Fit Poses, Conformational Energy Plot', runtime: '5–15 min' },
      { name: 'Binding Free Energy (MM-PBSA / MM-GBSA)', input: 'MD Simulation Trajectory', tools: 'Polar/Non-Polar Solvation Calculation → Entropy Estimation', output: 'Per-Residue Energy Decomposition, Binding ΔG', runtime: '15–45 min' },
      { name: 'ADMET & Drug-likeness Filter', input: 'Virtual Screening Hit Library', tools: 'Lipinski Rule of 5 → Veber Filter → Toxicity Alert Screening', output: 'Filtered Lead Molecule Panel, ADMET Radar Chart', runtime: '2–10 min' },
      { name: 'Conformational Library Generation', input: 'Raw 2D SMILES / 3D MOL2', tools: '3D Structure Generation → Low-Energy Conformational Search', output: 'Optimized 3D Conformers PDBQT', runtime: '5–20 min' },
    ],

    features: [
      { icon: '🎯', title: 'Individual Docking Engine', desc: 'Precise single receptor-ligand docking with active site grid mapping, binding affinity prediction, and 3D pose viewer.' },
      { icon: '⚡', title: 'High-Throughput Bulk Docking', desc: 'Virtual screening engine capable of batch docking thousands of compounds per hour with automated parallel GPU acceleration.' },
      { icon: '🧪', title: 'In-Built MD Simulation', desc: 'Native molecular dynamics simulation suite covering solvation, energy minimization, NVT/NPT equilibration, and trajectory analysis.' },
      { icon: '💻', title: 'Native Desktop & Private Cloud', desc: '100% offline desktop application running on Windows (32/64-bit), macOS, Linux, or deployable to your enterprise HPC.' },
      { icon: '🔬', title: 'Protein-Protein Interface Docking', desc: 'Advanced macromolecular complex modeling for antibody-antigen and protein-protein interaction studies.' },
      { icon: '📊', title: 'Binding Affinity & Free Energy', desc: 'Automated post-docking analysis with MM-PBSA/GBSA binding free energy calculation and per-residue contribution maps.' },
    ],

    specs: [
      { label: 'Docking Modalities', value: 'Individual Docking, High-Throughput Bulk Library Screening, Flexible Side-Chain Docking' },
      { label: 'Built-In Simulation Engine', value: 'Integrated Molecular Dynamics (MD), Energy Minimization, Solvation, Trajectory Analysis (RMSD/RMSF)' },
      { label: 'Supported File Formats', value: 'PDB, PDBQT, SDF, MOL2, SMILES, CIF, MAE' },
      { label: 'Docking Engines & Scoring', value: 'AutoDock Vina, Vinardo, Custom Empirical Scoring, MM-PBSA / MM-GBSA' },
      { label: 'Hardware Acceleration', value: 'NVIDIA CUDA, OpenCL, Apple Metal, Multi-Core CPU Parallelization' },
      { label: 'Deployment Options', value: 'Native Desktop App (Windows 32/64-bit, macOS, Linux) OR Managed Private Cloud / HPC' },
      { label: 'Data Sovereignty & Security', value: '100% Local offline processing with zero cloud data transmission' },
      { label: 'License', value: 'Research (₹1,499/mo), Academic & Enterprise (Custom SLA)' },
    ],
  },

  marabi: {
    id: 'marabi',
    name: 'Marabi',
    tagline: 'Molecular Cloning & Plasmid Design Software (Affordable. Powerful. Indian.)',
    icon: '🧫',
    color: '#FF007A',
    image: '/images/marabi.jpg',
    version: 'v1.0.0',
    status: 'Generally Available',

    desc: 'Marabi is an Indian-made, affordable molecular cloning and plasmid design software that simplifies molecular cloning, plasmid design, and in-silico analysis for every biotech lab. Built for researchers, students, biotech startups, and academic institutions, Marabi provides lightweight, powerful plasmid map editing and cloning simulations all in one affordable desktop platform.',

    whatHowWho: {
      what: 'Simplifies plasmid map design, restriction enzyme analysis, primer design, sequence annotation, and in-silico cloning simulation in an intuitive offline desktop interface.',
      how: 'Runs native offline on Windows (32/64-bit), macOS, and Linux — executing Gibson assembly, Golden Gate, and restriction cloning simulations with virtual gel electrophoresis.',
      who: 'Researchers, university students, biotech startups, academic labs, and synthetic biology teams seeking an affordable, globally competitive molecular cloning solution.',
    },

    bullets: [
      { title: 'Plasmid Map Design & View', body: 'Interactive circular and linear plasmid map rendering with automatic feature annotation, restriction site mapping, and ORF detection.' },
      { title: 'In-Silico Cloning Simulation', body: 'Simulate restriction cloning, Gibson Assembly, Golden Gate cloning, and Gateway recombination with virtual agarose gel electrophoresis.' },
      { title: 'Primer Design & PCR Analysis', body: 'Automated primer design with melting temperature (Tm) calculation, hairpin detection, GC content analysis, and binding site mapping.' },
      { title: 'Indian Made & One-Time Affordable', body: 'Globally competitive, lightweight, and easy to use with affordable pricing, regular software updates, and local Indian support.' },
    ],

    pipelines: [
      { name: 'Plasmid Map Design & Feature Annotation', input: 'GenBank / FASTA sequence', tools: 'ORF Finder → Feature Auto-Annotator → Map Renderer', output: 'Annotated Plasmid Map, GenBank File', runtime: 'Instant' },
      { name: 'In-Silico Restriction Cloning', input: 'Vector + Insert sequence', tools: 'Restriction Site Mapper → Ligase Simulator → Construct Check', output: 'Recombinant Plasmid Map, Virtual Gel', runtime: '1–2 min' },
      { name: 'Gibson Assembly Simulation', input: 'Multiple Overlapping Fragments', tools: 'Exonuclease Trimming → Polymerase Fill → Construct Assembly', output: 'Assembled Construct Map, Sequence Alignment', runtime: '1–3 min' },
      { name: 'Automated PCR Primer Design', input: 'Target DNA Sequence', tools: 'Primer3 Engine → Tm Calculator → Binding Predictor', output: 'Forward & Reverse Primers, PCR Product Map', runtime: '1–2 min' },
      { name: 'Sanger Sequencing (.ab1) Alignment', input: 'Chromatogram (.ab1 / .scf)', tools: 'Trace Viewer → Base Call Check → Reference Alignment', output: 'Alignment Matrix, Mutation / SNP Call Report', runtime: '1–5 min' },
      { name: 'Golden Gate & Modular Assembly', input: 'Type IIS Restriction Enz Fragments', tools: 'Scarless Ligation → Directional Assembly Verification', output: 'Final Construct Map, Fragment Audit', runtime: '1–3 min' },
    ],

    features: [
      { icon: '🗺️', title: 'Plasmid Map Design', desc: 'Beautiful circular & linear map rendering with custom color schemes and high-res SVG export.' },
      { icon: '✂️', title: 'In-Silico Cloning', desc: 'Simulate restriction digest, Gibson, Golden Gate, and Gateway cloning with virtual agarose gel views.' },
      { icon: '🧪', title: 'Restriction Analysis', desc: 'Comprehensive restriction enzyme database with methylation sensitivity checks and single/double cut filters.' },
      { icon: '🧬', title: 'Primer Design & Tm', desc: 'Automated primer search, melting temperature calculation, dimer checks, and binding site visualizer.' },
      { icon: '🏷️', title: 'Sequence Annotation', desc: 'Automatic feature detection against 5,000+ curated plasmid features, promoters, tags, and selectable markers.' },
      { icon: '📤', title: 'Export & File Sharing', desc: 'Seamlessly import and export DNA (.dna), GenBank, FASTA, EMBL, and publication-grade PDF/PNG maps.' },
    ],

    specs: [
      { label: 'Category', value: 'Molecular Cloning & Plasmid Design Software' },
      { label: 'Supported File Formats', value: 'DNA (.dna), GenBank (.gb/.gbk), FASTA, EMBL, SwissProt, Chromatogram (.ab1)' },
      { label: 'Cloning Modalities', value: 'Restriction Digest & Ligation, Gibson Assembly, Golden Gate, Gateway, TOPO, LIC' },
      { label: 'Restriction Enzyme DB', value: 'Rebase integrated (1,000+ restriction enzymes with methylation info)' },
      { label: 'Deployment Options', value: 'Native Offline Desktop App (Windows 32/64-bit, macOS, Linux)' },
      { label: 'Export Modalities', value: 'High-res Vector SVG, PDF, PNG, GenBank, FASTA' },
      { label: 'Origin & Support', value: '100% Indian-made with dedicated local support & regular feature updates' },
      { label: 'License Model', value: 'Student (₹499/mo), Academic One-Time License, Enterprise Team Seats' },
    ],
  },
};

/* ─── Two core platform technology pillars ─── */
const platformTech = [
  {
    id: 'bioreactor',
    name: 'Fermion AI R100™ (AI-Driven Bioreactor)',
    icon: '🌊',
    color: '#00C2FF',
    image: '/images/bioreactor.jpg',
    badge: 'Platform Technology',
    desc: 'Fermion AI R100™ is our AI-driven bioreactor system that revolutionizes biomanufacturing and micro-organism cultivation through intelligent automation and real-time optimization.',
    what: 'Automates the cultivation of algae and other microorganisms using AI to optimize growth conditions.',
    how: 'Uses machine learning to dynamically adjust light spectra, intensity, nutrients, and environmental factors in real-time.',
    who: 'Biotech companies, research institutions, and sustainable energy firms looking for high-yield biomanufacturing.',
    bullets: [
      { title: 'AI-Optimized Light Cycles', body: 'Machine learning algorithms dynamically adjust LED spectra and intensity to maximize photosynthetic efficiency and biomass production.' },
      { title: 'Nutrient Delivery Systems', body: 'Automated precision dosing based on real-time sensor feedback ensures optimal growth conditions while minimizing waste.' },
      { title: 'Growth Prediction Models', body: 'Predictive analytics forecast biomass yield and identify optimal harvest times, enabling efficient production planning.' },
      { title: 'Automated Scale-Up', body: 'Seamless transition from laboratory to industrial-scale biomanufacturing with AI-guided process optimization.' },
    ],
    stats: [
      { val: '10–25%', label: 'Media & Substrate Cost Reduction' },
      { val: '30–50%', label: 'Manpower Reduction' },
      { val: 'Real-Time', label: 'Dynamic AI Optimization' },
      { val: '3×', label: 'Biomass Yield Increase' },
    ],
  },
  {
    id: 'crispr-scan',
    name: 'Crispr Scan (CRISPR Microfluidics)',
    icon: '🔮',
    color: '#7CFF36',
    image: '/images/crspr.webp',
    badge: 'Platform Technology',
    desc: 'Crispr Scan combines CRISPR technology with microfluidics to create powerful tools for point-of-care diagnostics and precise gene editing.',
    what: 'Enables rapid, high-precision genetic testing and editing on a portable microfluidic chip.',
    how: 'Integrates CRISPR-Cas enzymes with microfluidic channels to detect or edit genetic material with high specificity.',
    who: 'Diagnostics firms, hospitals, and genetic research labs requiring fast and accurate molecular tools.',
    bullets: [
      { title: 'CRISPR Gene Detection', body: 'Ultrasensitive nucleic acid detection using CRISPR-Cas systems for rapid identification of pathogens and genetic variants.' },
      { title: 'Microfluidic Amplification', body: 'Integrated isothermal amplification enables sample-to-answer diagnostics without complex thermal cycling equipment.' },
      { title: 'Point-of-Care Diagnostics', body: 'Portable, user-friendly devices deliver laboratory-quality results in resource-limited settings within minutes.' },
      { title: 'Automated Gene Editing', body: 'Microfluidic platforms streamline CRISPR knock-in and knock-out workflows for high-throughput functional genomics.' },
    ],
    stats: [
      { val: '<10 copies/µL', label: 'Detection Sensitivity' },
      { val: '12–18 min', label: 'Sample-to-Answer Time' },
      { val: '12 targets', label: 'Simultaneous Multiplex' },
      { val: '18+ months', label: 'Reagent Stability' },
    ],
  },
];

/* ─── Helper: Pipeline Accordion Button ─── */
function PipelineButton({ pipe, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`pipeline-btn-wrap ${open ? 'expanded' : ''}`}>
      <button
        className="pipeline-btn"
        style={{ borderColor: open ? `${color}50` : '', color: open ? color : '' }}
        onClick={() => setOpen(!open)}
      >
        <span className="pipe-icon">⬡</span>
        {pipe.name}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ marginLeft: 'auto', transform: open ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="pipeline-details" style={{ borderColor: `${color}30` }}>
          <div className="pipe-flow">
            {[
              { label: 'Input', val: pipe.input, icon: '📤' },
              { label: 'Tools', val: pipe.tools, icon: '⚙️' },
              { label: 'Output', val: pipe.output, icon: '📊' },
              { label: 'Runtime', val: pipe.runtime, icon: '⏱️' },
            ].map(item => (
              <div key={item.label} className="pipe-detail-row">
                <span className="pipe-detail-icon">{item.icon}</span>
                <span className="pipe-detail-label">{item.label}:</span>
                <span className="pipe-detail-val">{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Products Page ─── */
export default function Products() {
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState(() => {
    const tab = searchParams.get('tab');
    return tab && productData[tab] ? tab : 'genxflow';
  });
  const [view, setView] = useState(() => {
    return searchParams.get('view') === 'platform' ? 'platform' : 'products';
  });
  const revealRef = useReveal();
  const prod = productData[active];

  // Sync state when URL changes (e.g. navigating from header dropdown)
  useEffect(() => {
    const tab = searchParams.get('tab');
    const viewParam = searchParams.get('view');
    if (viewParam === 'platform') {
      setView('platform');
    } else {
      setView('products');
      if (tab && productData[tab]) setActive(tab);
    }
  }, [searchParams]);

  // Re-trigger reveal animations when switching products
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!revealRef.current) return;
      const els = revealRef.current.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      els.forEach(el => {
        el.classList.remove('visible');
        void el.offsetHeight;
        el.classList.add('visible');
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [active, view]);

  return (
    <main className="products-page page-enter" ref={revealRef}>

      {/* ── Hero ── */}
      <section className="prod-hero section">
        <div className="prod-hero-bg" />
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Product Ecosystem</span>
            <h1 className="section-title">
              Products &amp; <span className="gradient-text">Platforms</span>
            </h1>
            <p className="section-subtitle">
              Three integrated software products and two core platform technologies
              forming a complete biotechnology intelligence ecosystem.
            </p>
          </div>

          {/* View toggle */}
          <div className="prod-view-toggle">
            <button className={`prod-view-btn ${view === 'products' ? 'active' : ''}`} onClick={() => setView('products')}>
              📦 Software Products
            </button>
            <button className={`prod-view-btn ${view === 'platform' ? 'active' : ''}`} onClick={() => setView('platform')}>
              🔬 Platform Technologies
            </button>
          </div>
        </div>
      </section>

      {view === 'products' ? (
        <>
          {/* ── Product Switcher ── */}
          <section className="prod-switcher-section">
            <div className="container">
              <div className="prod-switcher">
                {Object.values(productData).map(p => (
                  <button key={p.id}
                    className={`prod-switch-btn ${active === p.id ? 'active' : ''}`}
                    style={active === p.id ? { borderColor: `${p.color}60`, background: `${p.color}10`, color: p.color } : {}}
                    onClick={() => setActive(p.id)}>
                    <span>{p.icon}</span>
                    <div className="psb-info">
                      <div className="psb-name">{p.name}</div>
                      <div className="psb-tagline">{p.tagline.split(' ').slice(0, 3).join(' ')}…</div>
                    </div>
                    {p.status === 'Beta' && <span className="beta-dot">Beta</span>}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── Product Overview ── */}
          <section className="prod-detail section">
            <div className="container-wide">
              <div className="prod-detail-grid">
                <div className="prod-detail-left reveal-left">
                  <div className="prod-version-row">
                    <span className="badge badge-blue">{prod.version}</span>
                    <span className={`badge ${prod.status === 'Beta' ? 'badge-orange' : 'badge-teal'}`}>{prod.status}</span>
                  </div>
                  <h2 className="prod-detail-name" style={{ color: prod.color }}>{prod.name}</h2>
                  <div className="prod-detail-tagline">{prod.tagline}</div>
                  <p className="prod-detail-desc">{prod.desc}</p>
                  <div className="prod-detail-actions">
                    <Link to={`/avail-license?product=${prod.id}`} className="btn-primary">Avail License</Link>
                    <Link to="/bulk-licensing" className="btn-outline">Bulk Institutional Order</Link>
                    <Link to="/contact" className="btn-ghost">Request Demo →</Link>
                  </div>
                </div>
                <div className="prod-detail-right reveal-right">
                  <div className="prod-img-wrap" style={{ borderColor: `${prod.color}30` }}>
                    <img src={prod.image} alt={`${prod.name} platform`} loading="lazy" />
                    <div className="prod-img-overlay" style={{ background: `radial-gradient(circle at center, ${prod.color}10, transparent)` }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Deployment Architecture Banner ── */}
          <section className="deployment-banner-section section">
            <div className="container-wide">
              <div className="deployment-banner-card glass-card">
                <div className="dbc-header">
                  <span className="section-badge" style={{ marginBottom: 0 }}>Flexible Deployment Architecture</span>
                  <h3 className="dbc-title">Native Desktop Application + Managed Private Cloud</h3>
                  <p className="dbc-desc">
                    Built for maximum data privacy, scientific safety, and full control over your proprietary biological data.
                  </p>
                </div>

                <div className="dbc-grid">
                  <div className="dbc-option glass-card">
                    <div className="dbc-icon">🖥️</div>
                    <h4 className="dbc-opt-title" style={{ color: 'var(--neon-blue)' }}>1. Native Desktop Application (Default)</h4>
                    <p className="dbc-opt-desc">
                      Installs directly on Windows, macOS, or Linux workstations. Performs all genomic sequencing analysis, cell-line modelling, and bioreactor control locally on your machine.
                    </p>
                    <ul className="dbc-list">
                      <li>✓ 100% Offline Capability — No internet connection required for core analysis</li>
                      <li>✓ Zero Data Exfiltration — Your genomic &amp; strain data never leaves your computer</li>
                      <li>✓ Local GPU Acceleration — Powered by PyTorch &amp; Rust for maximum speed</li>
                    </ul>
                  </div>

                  <div className="dbc-option glass-card">
                    <div className="dbc-icon">☁️</div>
                    <h4 className="dbc-opt-title" style={{ color: 'var(--neon-teal)' }}>2. Managed Private Cloud (Optional)</h4>
                    <p className="dbc-opt-desc">
                      Have your own cloud infrastructure or HPC cluster? ArqGene deploys a dedicated private cloud instance directly inside your AWS, Azure, GCP, or on-premise server.
                    </p>
                    <ul className="dbc-list">
                      <li>✓ Deployed Inside YOUR Cloud — Runs inside your organization's security perimeter</li>
                      <li>✓ Fully Maintained by ArqGene — We handle software updates, patches, &amp; maintenance</li>
                      <li>✓ Absolute Data Sovereignty — Total safety &amp; compliance with full administrative control</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── What / How / Who ── */}
          <section className="whohow-section section grid-bg">
            <div className="container">
              <div className="section-header">
                <span className="section-badge reveal">At a Glance</span>
                <h2 className="section-title reveal">
                  Understanding <span className="gradient-text">{prod.name}</span>
                </h2>
              </div>
              <div className="whohow-grid">
                {[
                  { icon: '🔍', heading: 'What it does', body: prod.whatHowWho.what, color: prod.color },
                  { icon: '⚙️', heading: 'How it works', body: prod.whatHowWho.how, color: prod.color },
                  { icon: '🎯', heading: 'Who it is for', body: prod.whatHowWho.who, color: prod.color },
                ].map((card, i) => (
                  <div key={i} className="whohow-card glass-card reveal" style={{ transitionDelay: `${i * 0.1}s`, borderTop: `2px solid ${card.color}40` }}>
                    <div className="whohow-icon" style={{ color: card.color }}>{card.icon}</div>
                    <h3 className="whohow-heading" style={{ color: card.color }}>{card.heading}</h3>
                    <p className="whohow-body">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Key Technology Bullets ── */}
          <section className="bullets-section section">
            <div className="container-wide">
              <div className="bullets-grid">
                <div className="bullets-left reveal-left">
                  <span className="section-badge">Core Technology</span>
                  <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
                    How <span className="gradient-text">{prod.name}</span> Works
                  </h2>
                  <p style={{ color: 'var(--muted-text)', marginTop: '1rem', lineHeight: 1.8, maxWidth: '460px' }}>
                    {prod.desc}
                  </p>
                  <div className="bullets-cta">
                    <Link to="/download" className="btn-primary">Download Free Trial</Link>
                  </div>
                </div>
                <div className="bullets-right reveal-right">
                  {prod.bullets.map((b, i) => (
                    <div key={i} className="bullet-item" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="bullet-dot" style={{ background: prod.color, boxShadow: `0 0 10px ${prod.color}60` }} />
                      <div>
                        <div className="bullet-title" style={{ color: prod.color }}>{b.title}</div>
                        <div className="bullet-body">{b.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Default Pre-Installed Tools & Customization ── */}
          {prod.defaultTools && (
            <section className="default-tools-section section">
              <div className="container">
                <div className="section-header">
                  <span className="section-badge reveal">Pre-Installed Suite</span>
                  <h2 className="section-title reveal">
                    Default Tools &amp; <span className="gradient-text">Customization Guarantee</span>
                  </h2>
                  <p className="section-subtitle reveal">
                    {prod.name} comes pre-configured with 11 core tools out-of-the-box. Need custom software? We tailor the toolchain for your lab!
                  </p>
                </div>

                <div className="default-tools-grid">
                  {prod.defaultTools.map((t, i) => (
                    <div key={t.name} className="default-tool-card glass-card reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
                      <div className="dtc-header">
                        <span className="dtc-name" style={{ color: t.proprietary ? 'var(--neon-teal)' : 'var(--neon-blue)' }}>
                          {t.name}
                        </span>
                        <span className={`badge ${t.proprietary ? 'badge-teal' : 'badge-blue'}`}>
                          {t.category}
                        </span>
                      </div>
                      <p className="dtc-desc">{t.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Extensive Customization Banner */}
                <div className="customization-banner glass-card reveal">
                  <div className="cb-inner">
                    <div className="cb-icon">🛠️</div>
                    <div className="cb-text">
                      <h3 className="cb-title">
                        Extensive Tool &amp; Pipeline Customization Available
                      </h3>
                      <p className="cb-desc">
                        The 11 tools above (Prokka, Racon, SPAdes, Flye, QIIME2, Filtlong, Porechop, QUAST, FastQC, Unique Gene Marker, and Sequence Blaster) represent our default baseline. 
                        <strong> We offer full custom pipeline development</strong> — swapping out default tools, configuring new bioinformatics packages, or integrating your lab's proprietary algorithms &amp; scripts upon request.
                      </p>
                    </div>
                    <Link to="/contact" className="btn-primary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                      Request Custom Pipeline →
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Scientific Pipelines ── */}
          <section className="pipelines-section section grid-bg">
            <div className="container">
              <div className="section-header">
                <span className="section-badge reveal">Supported Workflows</span>
                <h2 className="section-title reveal">Scientific Pipelines</h2>
                <p className="section-subtitle reveal">
                  Click any pipeline to see tools, inputs, outputs, and estimated runtimes.
                </p>
              </div>
              <div className="pipelines-grid reveal">
                {prod.pipelines.map((pipe, i) => (
                  <PipelineButton key={pipe.name} pipe={pipe} color={prod.color} />
                ))}
              </div>
            </div>
          </section>

          {/* ── Key Features ── */}
          <section className="features-section section">
            <div className="container">
              <div className="section-header">
                <span className="section-badge reveal">Capabilities</span>
                <h2 className="section-title reveal">Key Features</h2>
              </div>
              <div className="features-grid">
                {prod.features.map((f, i) => (
                  <div key={i} className="feature-card glass-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                    <div className="feature-icon">{f.icon}</div>
                    <h3 className="feature-title">{f.title}</h3>
                    <p className="feature-desc">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Specifications ── */}
          <section className="specs-section section grid-bg">
            <div className="container">
              <div className="section-header">
                <span className="section-badge reveal">Technical</span>
                <h2 className="section-title reveal">Specifications</h2>
              </div>
              <div className="specs-table-wrap glass-card reveal">
                <table className="data-table">
                  <tbody>
                    {prod.specs.map((s, i) => (
                      <tr key={i}>
                        <td style={{ color: 'var(--muted-text)', width: '260px', fontWeight: 500 }}>{s.label}</td>
                        <td style={{ color: 'var(--white)', fontWeight: 500 }}>{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="section">
            <div className="container" style={{ textAlign: 'center' }}>
              <h2 className="section-title reveal">
                Ready to try <span className="gradient-text">{prod.name}</span>?
              </h2>
              <p className="reveal" style={{ color: 'var(--muted-text)', marginTop: '0.75rem', marginBottom: '2.5rem' }}>
                Start with a 7-day free trial — no credit card required.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} className="reveal">
                <Link to={`/avail-license?product=${prod.id}`} className="btn-primary">Avail License</Link>
                <Link to="/bulk-licensing" className="btn-outline">Bulk License Orders</Link>
                <Link to="/contact" className="btn-ghost">Contact Sales →</Link>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* ── Platform Technologies View ── */
        <>
          {platformTech.map((tech, tIdx) => (
            <div key={tech.id}>
              {/* Overview */}
              <section className={`section ${tIdx % 2 !== 0 ? 'grid-bg' : ''}`} style={{ background: tIdx % 2 === 0 ? 'var(--surface-1)' : '' }}>
                <div className="container-wide">
                  <div className={`prod-detail-grid ${tIdx % 2 !== 0 ? 'reverse' : ''}`}>
                    {tIdx % 2 !== 0 && (
                      <div className="prod-detail-right reveal-left">
                        <div className="prod-img-wrap" style={{ borderColor: `${tech.color}30` }}>
                          <img src={tech.image} alt={tech.name} loading="lazy" />
                        </div>
                      </div>
                    )}
                    <div className="prod-detail-left reveal-right">
                      <span className="section-badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>{tech.badge}</span>
                      <h2 className="prod-detail-name" style={{ color: tech.color, fontSize: '2.25rem', marginTop: '0.5rem' }}>
                        {tech.icon} {tech.name}
                      </h2>
                      <p className="prod-detail-desc" style={{ marginTop: '1rem' }}>{tech.desc}</p>

                      {/* What/How/Who */}
                      <div className="inline-whohow">
                        {[
                          { q: 'What it does', a: tech.what },
                          { q: 'How it works', a: tech.how },
                          { q: 'Who it is for', a: tech.who },
                        ].map(item => (
                          <div key={item.q} className="inline-whohow-item">
                            <span className="iww-q" style={{ color: tech.color }}>{item.q}</span>
                            <span className="iww-a">{item.a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {tIdx % 2 === 0 && (
                      <div className="prod-detail-right reveal-right">
                        <div className="prod-img-wrap" style={{ borderColor: `${tech.color}30` }}>
                          <img src={tech.image} alt={tech.name} loading="lazy" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Stats */}
              <section className="section" style={{ background: tIdx % 2 !== 0 ? 'var(--bg-primary)' : 'var(--bg-primary)', paddingTop: 0 }}>
                <div className="container">
                  <div className="tech-stats-row">
                    {tech.stats.map((s, i) => (
                      <div key={i} className="tech-stat-card glass-card reveal" style={{ transitionDelay: `${i * 0.1}s`, borderTop: `2px solid ${tech.color}40` }}>
                        <div className="tsc-val" style={{ color: tech.color }}>{s.val}</div>
                        <div className="tsc-label">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Technology Bullets */}
              <section className="section grid-bg" style={{ paddingTop: 0 }}>
                <div className="container">
                  <div className="bullets-right" style={{ maxWidth: '700px', margin: '0 auto' }}>
                    {tech.bullets.map((b, i) => (
                      <div key={i} className="bullet-item reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                        <div className="bullet-dot" style={{ background: tech.color, boxShadow: `0 0 10px ${tech.color}60` }} />
                        <div>
                          <div className="bullet-title" style={{ color: tech.color }}>{b.title}</div>
                          <div className="bullet-body">{b.body}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          ))}

          {/* CTA */}
          <section className="section">
            <div className="container" style={{ textAlign: 'center' }}>
              <h2 className="section-title reveal">Interested in our <span className="gradient-text">Platform Technologies</span>?</h2>
              <p className="reveal" style={{ color: 'var(--muted-text)', marginTop: '0.75rem', marginBottom: '2.5rem' }}>
                Our platform technologies power all three ArqGene products. Contact us for collaboration, licensing, or custom integration.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} className="reveal">
                <Link to="/contact" className="btn-primary">Contact Our Team</Link>
                <Link to="/technology" className="btn-outline">Technology Deep Dive</Link>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
