import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import { getApiBaseUrl } from '../../config/api';
import './Checkout.css';

const productPricing = {
  genxflow: {
    id: 'genxflow',
    name: 'GenXFlow™',
    icon: '🧬',
    tagline: 'AI-Powered Analytics Pipeline for Genomics & Proteomics',
    color: '#00C2FF',
    tiers: [
      { id: 'community', name: '7-Day Free Trial', priceMonthly: 0, priceAnnual: 0, desc: 'Full-featured trial for individual research', features: ['5 GB Cloud Storage', 'Standard WGS & RNA-Seq', '7-Day Trial Support', 'Docker Container Access'] },
      { id: 'academic', name: 'Academic / Research', priceMonthly: 5000, priceAnnual: 50000, originalPriceAnnual: 60000, desc: 'Ideal for university labs & independent researchers (Save ₹10,000 on annual plan)', popular: true, features: ['100 GB Cloud Storage', 'All 10 Genomic Pipelines', 'Priority SLURM HPC Dispatch', 'VCF & BAM Variant Reports', 'Email & Discord Support'] },
      { id: 'lab', name: 'Professional Lab', customPrice: true, priceMonthly: 0, priceAnnual: 0, desc: 'Contact Us — pricing will be discussed based on requirements', features: ['1 TB Cloud Storage', 'Unlimited Parallel Runs', 'Custom Pipeline Scripting', 'REST API & Python SDK', '24/7 Priority Support'] },
    ],
  },
  uyirinai: {
    id: 'uyirinai',
    name: 'Uyirinai',
    icon: '🔬',
    tagline: 'Molecular Docking & In-Built Simulation Platform',
    color: '#00E6C7',
    tiers: [
      { id: 'community', name: '7-Day Free Trial', priceMonthly: 0, priceAnnual: 0, desc: 'Full-featured trial for independent docking & research', features: ['Single Receptor Docking', 'Basic 3D Binding Pose View', '7-Day Trial Support'] },
      { id: 'academic', name: 'Research Lab', priceMonthly: 1499, priceAnnual: 14990, desc: 'For university drug discovery labs & research groups', popular: true, features: ['Bulk Docking (up to 5,000 Ligands/run)', 'In-Built MD Trajectory Simulation Engine', 'MM-PBSA Binding Free Energy', 'Local GPU Acceleration (CUDA / Metal)'] },
      { id: 'lab', name: 'Enterprise Lead Discovery', priceMonthly: 6999, priceAnnual: 69990, desc: 'For pharma R&D & commercial drug discovery', features: ['Unlimited High-Throughput Bulk Screening', 'Enterprise MD Simulation Workflows', 'Private Cloud & HPC Cluster Deployment', 'Custom Scoring Engine & Receptor Tuning'] },
    ],
  },
  marabi: {
    id: 'marabi',
    name: 'Marabi',
    icon: '🧫',
    tagline: 'Molecular Cloning & Plasmid Design Software',
    color: '#FF007A',
    tiers: [
      { id: 'community', name: '7-Day Free Trial', priceMonthly: 0, priceAnnual: 0, desc: 'Full-featured trial for plasmid map design', features: ['Plasmid Map Design & Viewing', 'Basic Restriction Digest Simulation', 'GenBank / FASTA Export', '7-Day Trial Support'] },
      { id: 'academic', name: 'Academic Lab', priceMonthly: 499, priceAnnual: 4990, desc: 'For university cloning labs & biotech research', popular: true, features: ['In-Silico Gibson & Golden Gate Assembly', 'Automated PCR Primer Design & Tm Check', 'Chromatogram (.ab1) Sanger Alignment', 'Virtual Agarose Gel Electrophoresis'] },
      { id: 'lab', name: 'Professional Biotech', priceMonthly: 1999, priceAnnual: 19990, desc: 'For biotech startups & commercial synthesis labs', features: ['Unlimited High-Res Plasmid Map Exports (SVG/PDF)', 'DNA (.dna) Native Import & Conversion', 'Custom Feature Library & Team Sharing', 'Priority Local Support & Regular Updates'] },
    ],
  },
};

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const revealRef = useReveal();

  const initialProduct = searchParams.get('product') || 'genxflow';
  const initialTier = searchParams.get('tier') || 'academic';

  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [selectedTier, setSelectedTier] = useState(initialTier);
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    country: 'India',
    gstOrTaxId: '',
    billingPref: 'annual',
    specialNotes: '',
    requestInvoice: false,
  });
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success | error
  const [submitError, setSubmitError] = useState('');

  const productObj = productPricing[selectedProduct] || productPricing.genxflow;
  const currentTier = productObj.tiers.find(t => t.id === selectedTier) || productObj.tiers[1];

  const price = billingCycle === 'annual' ? currentTier.priceAnnual : currentTier.priceMonthly;
  const savings = billingCycle === 'annual' && currentTier.priceMonthly > 0
    ? (currentTier.priceMonthly * 12) - currentTier.priceAnnual
    : 0;

  const handleInputChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: val });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      setSubmitError('Please fill in your full name and work email.');
      return;
    }
    setSubmitState('loading');
    setSubmitError('');
    const apiBase = getApiBaseUrl();

    const payload = {
      name: formData.fullName,
      email: formData.email,
      type: 'license',
      subject: `License Inquiry: ${productObj.name} — ${currentTier.name}`,
      message: [
        `Product: ${productObj.name}`,
        `Tier: ${currentTier.name}`,
        `Billing Preference: ${formData.billingPref === 'annual' ? 'Annual (Recommended)' : 'Monthly'}`,
        `Organization: ${formData.organization || 'N/A'}`,
        `Country: ${formData.country}`,
        `GST/Tax ID: ${formData.gstOrTaxId || 'N/A'}`,
        `Request Official Invoice/PO Quote: ${formData.requestInvoice ? 'Yes' : 'No'}`,
        formData.specialNotes ? `\nSpecial Requirements:\n${formData.specialNotes}` : '',
      ].filter(Boolean).join('\n'),
    };

    fetch(`${apiBase}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (res.ok) setSubmitState('success');
        else { setSubmitState('error'); setSubmitError('Server error. Please try again.'); }
      })
      .catch(() => {
        setSubmitState('error');
        setSubmitError('Cannot reach backend server. Please ensure it is running.');
      });
  };

  return (
    <main className="checkout-page page-enter" ref={revealRef}>
      <section className="checkout-hero section">
        <div className="checkout-hero-bg" />
        <div className="container">
          <div className="section-header">
            <span className="section-badge">License Checkout</span>
            <h1 className="section-title">
              Avail <span className="gradient-text">{productObj.name}</span> License
            </h1>
            <p className="section-subtitle">
              Select your tier, configure billing, and activate your ArqGene platform license instantly.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-wide">
          <div className="checkout-layout">

            {/* Left Column — Configurator */}
            <div className="checkout-left">
              {/* Product Selector */}
              <div className="checkout-box glass-card">
                <h3 className="box-title">1. Select Product</h3>
                <div className="prod-select-grid">
                  {Object.values(productPricing).map(p => (
                    <button
                      key={p.id}
                      className={`prod-card-btn ${selectedProduct === p.id ? 'active' : ''}`}
                      style={selectedProduct === p.id ? { borderColor: p.color, background: `${p.color}15` } : {}}
                      onClick={() => {
                        setSelectedProduct(p.id);
                        setSelectedTier(p.tiers[1].id);
                      }}
                    >
                      <span className="pcb-icon">{p.icon}</span>
                      <div>
                        <div className="pcb-name">{p.name}</div>
                        <div className="pcb-sub">{p.id.toUpperCase()}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Billing Cycle & Tier Selector */}
              <div className="checkout-box glass-card">
                <div className="box-header-row">
                  <h3 className="box-title">2. Choose License Tier</h3>
                  {selectedTier !== 'community' && (
                    <div className="billing-toggle">
                      <button className={billingCycle === 'monthly' ? 'active' : ''} onClick={() => setBillingCycle('monthly')}>Monthly</button>
                      <button className={billingCycle === 'annual' ? 'active' : ''} onClick={() => setBillingCycle('annual')}>
                        Annual <span className="save-badge">Save 20%</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="tier-cards-grid">
                  {productObj.tiers.map(tier => (
                    <div
                      key={tier.id}
                      className={`tier-select-card ${selectedTier === tier.id ? 'selected' : ''}`}
                      style={selectedTier === tier.id ? { borderColor: productObj.color } : {}}
                      onClick={() => setSelectedTier(tier.id)}
                    >
                      {tier.popular && <span className="popular-badge">Recommended</span>}
                      <div className="tier-head">
                        <div className="tier-name">{tier.name}</div>
                        <div className="tier-price">
                          {tier.customPrice ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.1rem' }}>
                              <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--white)' }}>Contact Us</span>
                              <span style={{ fontSize: '0.72rem', color: 'var(--muted-text)' }}>Custom Quote</span>
                            </div>
                          ) : tier.priceMonthly === 0 ? (
                            <span className="free-tag">Free</span>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.1rem' }}>
                              {tier.originalPriceAnnual && billingCycle === 'annual' && (
                                <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', fontWeight: 600 }}>
                                  ₹{tier.originalPriceAnnual.toLocaleString('en-IN')}/year
                                </span>
                              )}
                              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                <span className="curr">₹</span>
                                <span className="amt">{(billingCycle === 'annual' ? tier.priceAnnual : tier.priceMonthly).toLocaleString('en-IN')}</span>
                                <span className="per">/{billingCycle === 'annual' ? 'year' : 'mo'}</span>
                              </div>
                              {tier.originalPriceAnnual && billingCycle === 'annual' && (
                                <span style={{ fontSize: '0.72rem', color: 'var(--neon-teal)', fontWeight: 600 }}>
                                  Save ₹10,000
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="tier-desc">{tier.desc}</p>
                      <ul className="tier-feats">
                        {tier.features.map(f => (
                          <li key={f}><span className="check" style={{ color: productObj.color }}>✓</span> {f}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Information */}
              <div className="checkout-box glass-card">
                <h3 className="box-title">3. Account &amp; Organization Info</h3>
                <div className="checkout-form-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" name="fullName" className="form-input" placeholder="Dr. Aris Thorne" value={formData.fullName} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Work Email *</label>
                    <input type="email" name="email" className="form-input" placeholder="researcher@lab.org" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Organization / Lab Name</label>
                    <input type="text" name="organization" className="form-input" placeholder="BioGenX Research Institute" value={formData.organization} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <select name="country" className="form-input" value={formData.country} onChange={handleInputChange}>
                      <option value="India">India 🇮🇳</option>
                      <option value="United States">United States 🇺🇸</option>
                      <option value="United Kingdom">United Kingdom 🇬🇧</option>
                      <option value="Germany">Germany 🇩🇪</option>
                      <option value="Singapore">Singapore 🇸🇬</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group full">
                    <label className="form-label">GST / Tax ID (Optional for Tax Invoice)</label>
                    <input type="text" name="gstOrTaxId" className="form-input" placeholder="33AAAAA0000A1Z5" value={formData.gstOrTaxId} onChange={handleInputChange} />
                  </div>
                  {selectedTier !== 'community' && (
                    <>
                      <div className="form-group full">
                        <label className="form-label">Billing Preference</label>
                        <div className="billing-pref-toggle">
                          <label className={`bp-option ${formData.billingPref === 'annual' ? 'active' : ''}`}>
                            <input type="radio" name="billingPref" value="annual" checked={formData.billingPref === 'annual'} onChange={handleInputChange} />
                            <span>🏆 Annual Billing <strong>(Recommended — Save extra)</strong></span>
                          </label>
                          <label className={`bp-option ${formData.billingPref === 'monthly' ? 'active' : ''}`}>
                            <input type="radio" name="billingPref" value="monthly" checked={formData.billingPref === 'monthly'} onChange={handleInputChange} />
                            <span>Monthly Billing</span>
                          </label>
                        </div>
                      </div>
                      <div className="form-group full">
                        <label className="form-label">Special Requirements / Custom Deployment Notes</label>
                        <textarea name="specialNotes" className="form-input" rows={3} value={formData.specialNotes} onChange={handleInputChange} placeholder="e.g. Need on-premise SLURM HPC deployment, custom single sign-on (SSO), or 21 CFR Part 11 compliance documentation." />
                      </div>
                      <div className="form-group full">
                        <label className="form-label invoice-check-label">
                          <input type="checkbox" name="requestInvoice" checked={formData.requestInvoice} onChange={handleInputChange} />
                          <span>Request Official Institutional Invoice / PO Quote →</span>
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Payment Gateway replacement box */}
              <div className="checkout-box glass-card">
                {selectedTier === 'community' ? (
                  <>
                    <h3 className="box-title">4. Get Started Instantly</h3>
                    <div className="payment-engine-blank-slot" style={{ border: '1px dashed var(--neon-teal)', padding: '2rem', borderRadius: 'var(--r-md)', textAlign: 'center' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
                      <p className="notice-title" style={{ color: 'var(--neon-teal)', fontWeight: 700, marginBottom: '0.5rem' }}>No Payment Required</p>
                      <p className="notice-body" style={{ color: 'var(--muted-text)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto' }}>
                        Your 7-day free trial is completely free and requires no card or payment processing. You can download, install, and run the GenXFlow™ application natively on your workstation right away.
                      </p>
                    </div>
                    <div style={{ marginTop: '1.5rem' }}>
                      <Link to="/download" className="btn-primary btn-large" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                        Go to Downloads Page →
                      </Link>
                    </div>
                  </>
                ) : submitState === 'success' ? (
                  <>
                    <h3 className="box-title">4. Request Submitted ✅</h3>
                    <div className="payment-engine-blank-slot" style={{ border: '1px dashed var(--neon-teal)', padding: '2rem', borderRadius: 'var(--r-md)', textAlign: 'center' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎉</div>
                      <p className="notice-title" style={{ color: 'var(--neon-teal)', fontWeight: 700, marginBottom: '0.5rem' }}>License Request Recorded!</p>
                      <p className="notice-body" style={{ color: 'var(--muted-text)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto' }}>
                        Thank you, <strong>{formData.fullName}</strong>! Our team will review your request for <strong>{productObj.name} — {currentTier.name}</strong> and contact you at <strong>{formData.email}</strong> within 24–48 hours with your license key and invoice details.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="box-title">4. Complete License Purchase</h3>
                    <div className="payment-engine-blank-slot" style={{ border: '1px dashed rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: 'var(--r-md)', textAlign: 'center' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📩</div>
                      <p className="notice-title" style={{ color: 'var(--neon-blue)', fontWeight: 700, marginBottom: '0.5rem' }}>Licensing &amp; Invoicing via Sales</p>
                      <p className="notice-body" style={{ color: 'var(--muted-text)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto' }}>
                        Fill in your details above and submit — our team will respond with your license key and invoice within 24–48 hours.
                      </p>
                    </div>
                    {submitError && (
                      <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', marginTop: '1rem' }}>⚠️ {submitError}</p>
                    )}
                    <div style={{ marginTop: '1.5rem' }}>
                      <button
                        onClick={handleContactSubmit}
                        disabled={submitState === 'loading'}
                        className="btn-primary btn-large"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        {submitState === 'loading' ? 'Submitting...' : 'Submit License Request →'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column — Summary & Bulk Link */}
            <div className="checkout-right">
              <div className="summary-card glass-card sticky-summary">
                <h3 className="summary-title">Order Summary</h3>
                <div className="summary-prod-row">
                  <span className="spi-icon">{productObj.icon}</span>
                  <div>
                    <div className="spi-name" style={{ color: productObj.color }}>{productObj.name}</div>
                    <div className="spi-tier">{currentTier.name} Tier</div>
                  </div>
                </div>

                <div className="summary-details">
                  <div className="sd-row">
                    <span>Billing Cycle</span>
                    <span className="sd-val">
                      {selectedTier === 'community' ? '7-Day Free Trial' : (billingCycle === 'annual' ? 'Annual (billed yearly)' : 'Monthly')}
                    </span>
                  </div>
                  <div className="sd-row">
                    <span>Base Price</span>
                    <span className="sd-val">
                      {currentTier.customPrice
                        ? 'Custom Quote'
                        : price === 0
                        ? 'Free'
                        : billingCycle === 'annual' && savings > 0
                        ? `₹${(currentTier.originalPriceAnnual || currentTier.priceMonthly * 12).toLocaleString('en-IN')}`
                        : `₹${price.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  {savings > 0 && !currentTier.customPrice && (
                    <div className="sd-row savings">
                      <span>Annual Savings</span>
                      <span className="sd-val">-₹{savings.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="sd-row">
                    <span>Tax (GST 18% inclusive)</span>
                    <span className="sd-val">{currentTier.customPrice ? 'Per Quote' : 'Included'}</span>
                  </div>
                  <div className="summary-divider" />
                  <div className="sd-row total">
                    <span>Total Due Today</span>
                    <span className="total-amt" style={{ color: productObj.color }}>
                      {currentTier.customPrice ? 'Custom (Contact Us)' : (price === 0 ? '₹0 (Free Trial)' : `₹${price.toLocaleString('en-IN')}`)}
                    </span>
                  </div>
                </div>

                {/* Bulk License Banner */}
                <div className="bulk-promo-box">
                  <div className="bpb-badge">Need Multiple Seats?</div>
                  <h4 className="bpb-title">Bulk &amp; University Licensing</h4>
                  <p className="bpb-desc">Get up to 50% discount for lab teams, universities, and multi-product bundles.</p>
                  <Link to="/bulk-licensing" className="btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
                    Calculate Bulk Discount →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
