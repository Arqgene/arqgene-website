import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useReveal } from '../../hooks/useReveal';
import { Link } from 'react-router-dom';
import './BulkLicensing.css';

const baseSeatPrices = {
  genxflow: 999, // ₹999/mo per seat base
  uyirinai: 1499,
  marabi: 2499,
};

export default function BulkLicensing() {
  const revealRef = useReveal();

  // State
  const [seats, setSeats] = useState(25);
  const [selectedProducts, setSelectedProducts] = useState({
    genxflow: true,
    uyirinai: true,
    marabi: false,
  });
  const [billingCycle, setBillingCycle] = useState('annual');
  const [quoteRequested, setQuoteRequested] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    department: '',
    role: 'Principal Investigator / Lab Head',
    notes: '',
  });

  // Calculate discount percentage based on seat quantity
  const getDiscountPct = (qty) => {
    if (qty >= 150) return 50; // 50% off for 150+ seats
    if (qty >= 50) return 35;  // 35% off for 50+ seats
    if (qty >= 15) return 20;  // 20% off for 15+ seats
    if (qty >= 5) return 10;   // 10% off for 5+ seats
    return 0;
  };

  const discountPct = getDiscountPct(seats);

  // Calculate raw monthly per seat sum across selected products
  const selectedProductIds = Object.keys(selectedProducts).filter(k => selectedProducts[k]);
  const basePricePerSeatMonthly = selectedProductIds.reduce((sum, id) => sum + (baseSeatPrices[id] || 0), 0);

  // Multi-product bundle extra 10% discount
  const bundleDiscountPct = selectedProductIds.length >= 2 ? 10 : 0;
  const totalDiscountPct = Math.min(60, discountPct + bundleDiscountPct);

  const monthlyUndiscounted = basePricePerSeatMonthly * seats;
  const monthlyDiscounted = Math.round(monthlyUndiscounted * (1 - totalDiscountPct / 100));

  const finalPrice = billingCycle === 'annual' ? monthlyDiscounted * 12 : monthlyDiscounted;
  const totalSavings = (monthlyUndiscounted * (billingCycle === 'annual' ? 12 : 1)) - finalPrice;

  const toggleProduct = (id) => {
    setSelectedProducts(prev => {
      const next = { ...prev, [id]: !prev[id] };
      // Prevent unchecking all
      if (!Object.values(next).some(Boolean)) return prev;
      return next;
    });
  };

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.institution) {
      alert('Please complete the required contact details.');
      return;
    }
    setQuoteRequested(true);
  };

  return (
    <main className="bulk-page page-enter" ref={revealRef}>
      {/* Hero */}
      <section className="bulk-hero section">
        <div className="bulk-hero-bg" />
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Institutional Licensing</span>
            <h1 className="section-title">
              Bulk &amp; University <span className="gradient-text">License Orders</span>
            </h1>
            <p className="section-subtitle">
              Deploy GenXFlow™, Uyirinai, and Marabi across your university, hospital system, or bio-foundry with multi-seat volume discounts up to 50%.
            </p>
          </div>
        </div>
      </section>

      {/* Main Calculator & Quote Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-wide">
          <div className="bulk-layout">
            
            {/* Left: Interactive Configurator */}
            <div className="bulk-left">
              
              {/* Product Bundle Selector */}
              <div className="bulk-card glass-card">
                <h3 className="box-title">1. Choose Products for Your Bundle</h3>
                <p className="box-desc">Select one or multiple products. Bundling 2+ platforms unlocks an additional 10% discount.</p>
                <div className="bundle-products-grid">
                  {[
                    { id: 'genxflow', name: 'GenXFlow™', desc: 'AI Genomics & Proteomics Pipeline', icon: '🧬', color: '#00C2FF' },
                    { id: 'uyirinai', name: 'Uyirinai', desc: 'Molecular Docking & Simulation Platform', icon: '🔬', color: '#00E6C7' },
                    { id: 'marabi', name: 'Marabi', desc: 'Molecular Cloning & Plasmid Design Software', icon: '🧫', color: '#FF007A' },
                  ].map(p => (
                    <div
                      key={p.id}
                      className={`bundle-prod-card ${selectedProducts[p.id] ? 'selected' : ''}`}
                      style={selectedProducts[p.id] ? { borderColor: p.color, background: `${p.color}12` } : {}}
                      onClick={() => toggleProduct(p.id)}
                    >
                      <div className="bpc-checkbox" style={selectedProducts[p.id] ? { background: p.color, borderColor: p.color } : {}}>
                        {selectedProducts[p.id] ? '✓' : ''}
                      </div>
                      <span className="bpc-icon">{p.icon}</span>
                      <div>
                        <div className="bpc-name" style={{ color: p.color }}>{p.name}</div>
                        <div className="bpc-desc">{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seat Selection in Text Box Format */}
              <div className="bulk-card glass-card">
                <div className="box-header-row">
                  <div>
                    <h3 className="box-title">2. Select Number of User Seats</h3>
                    <p className="box-desc">Number of researchers, lab technicians, or student accounts.</p>
                  </div>

                  {/* Text Box Input Format */}
                  <div className="seat-input-container">
                    <button
                      type="button"
                      className="seat-step-btn"
                      onClick={() => setSeats(prev => Math.max(1, (Number(prev) || 1) - 1))}
                      title="Decrease seats"
                    >
                      −
                    </button>
                    <div className="seat-textbox-wrap">
                      <input
                        type="number"
                        min="1"
                        max="5000"
                        value={seats}
                        onChange={e => {
                          const val = e.target.value;
                          if (val === '') {
                            setSeats('');
                          } else {
                            const num = parseInt(val, 10);
                            if (!isNaN(num)) setSeats(Math.max(1, num));
                          }
                        }}
                        onBlur={() => {
                          if (!seats || Number(seats) < 1) setSeats(1);
                        }}
                        className="seat-number-textbox"
                        placeholder="Seats"
                        aria-label="Number of User Seats"
                      />
                      <span className="seat-textbox-label">Seats</span>
                    </div>
                    <button
                      type="button"
                      className="seat-step-btn"
                      onClick={() => setSeats(prev => (Number(prev) || 0) + 1)}
                      title="Increase seats"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="slider-wrap">
                  <input
                    type="range"
                    min="1"
                    max="200"
                    step="1"
                    value={Number(seats) || 1}
                    onChange={e => setSeats(Number(e.target.value))}
                    className="bulk-slider"
                  />
                  <div className="slider-ticks">
                    <span onClick={() => setSeats(5)} style={{ cursor: 'pointer' }}>5 Seats (10% Off)</span>
                    <span onClick={() => setSeats(25)} style={{ cursor: 'pointer' }}>25 Seats (20% Off)</span>
                    <span onClick={() => setSeats(50)} style={{ cursor: 'pointer' }}>50 Seats (35% Off)</span>
                    <span onClick={() => setSeats(150)} style={{ cursor: 'pointer' }}>150+ Seats (50% Off)</span>
                  </div>
                </div>
              </div>

              {/* Institution Quote Request Form */}
              <div className="bulk-card glass-card">
                <h3 className="box-title">3. Institutional Quote &amp; PO Request Form</h3>
                <p className="box-desc">Fill out your details to receive an official Proforma Invoice / Formal Purchase Order (PO) quote for your procurement department.</p>

                <form onSubmit={handleSubmitQuote} className="bulk-form-grid">
                  <div className="form-group">
                    <label className="form-label">Contact Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Prof. Evelyn Vance"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Institutional Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="evelyn.vance@university.edu"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">University / Institution / Enterprise Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Stanford University School of Medicine"
                      value={formData.institution}
                      onChange={e => setFormData({ ...formData, institution: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Department / Center</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Department of Bioengineering"
                      value={formData.department}
                      onChange={e => setFormData({ ...formData, department: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Role</label>
                    <select
                      className="form-input"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="Principal Investigator / Lab Head">Principal Investigator / Lab Head</option>
                      <option value="Department Chair / Dean">Department Chair / Dean</option>
                      <option value="Procurement / Purchasing Agent">Procurement / Purchasing Agent</option>
                      <option value="Bio-Foundry Director">Bio-Foundry Director</option>
                      <option value="Corporate R&D Lead">Corporate R&D Lead</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Billing Preference</label>
                    <select
                      className="form-input"
                      value={billingCycle}
                      onChange={e => setBillingCycle(e.target.value)}
                    >
                      <option value="annual">Annual Billing (Recommended - Save extra)</option>
                      <option value="monthly">Monthly Recurring Billing</option>
                    </select>
                  </div>
                  <div className="form-group full">
                    <label className="form-label">Special Requirements / Custom Deployment Notes</label>
                    <textarea
                      className="form-input"
                      placeholder="e.g. Need on-premise SLURM HPC deployment, custom single sign-on (SSO), or 21 CFR Part 11 compliance documentation."
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  <div className="form-group full">
                    <button type="submit" className="btn-primary btn-large" style={{ width: '100%', justifyContent: 'center' }}>
                      Request Official Institutional Invoice / PO Quote →
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Live Quote Calculator Box */}
            <div className="bulk-right">
              <div className="bulk-quote-summary glass-card sticky-summary">
                <span className="section-badge" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>Instant Estimate</span>
                <h3 className="summary-title">Volume Pricing Breakdown</h3>

                <div className="quote-badge-row">
                  <span className="qb-item">👥 {seats} User Seats</span>
                  <span className="qb-item">📦 {selectedProductIds.length} Products</span>
                </div>

                <div className="quote-details-list">
                  <div className="qd-row">
                    <span>Products Selected</span>
                    <span className="qd-val">{selectedProductIds.map(id => id.toUpperCase()).join(', ')}</span>
                  </div>
                  <div className="qd-row">
                    <span>Base Rate (per seat/mo)</span>
                    <span className="qd-val">₹{basePricePerSeatMonthly.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="qd-row">
                    <span>Seat Volume Discount</span>
                    <span className="qd-val discount">-{discountPct}%</span>
                  </div>
                  {bundleDiscountPct > 0 && (
                    <div className="qd-row">
                      <span>Multi-Product Bundle Bonus</span>
                      <span className="qd-val discount">-{bundleDiscountPct}%</span>
                    </div>
                  )}
                  <div className="summary-divider" />
                  <div className="qd-row highlight">
                    <span>Total Effective Discount</span>
                    <span className="qd-val highlight-disc">-{totalDiscountPct}% OFF</span>
                  </div>
                  <div className="qd-row">
                    <span>Estimated Monthly Cost</span>
                    <span className="qd-val">₹{monthlyDiscounted.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div className="summary-divider" />
                  <div className="qd-row total">
                    <span>Total Annual Estimate</span>
                    <span className="total-amt gradient-text">
                      ₹{finalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="savings-callout">
                      🎉 You save <strong>₹{totalSavings.toLocaleString('en-IN')}</strong> per year with volume bundling!
                    </div>
                  )}
                </div>

                {/* Benefits List */}
                <div className="bulk-benefits-list">
                  <div className="bbl-item">
                    <span className="bbl-check">✓</span>
                    <span>Dedicated Technical Account Manager</span>
                  </div>
                  <div className="bbl-item">
                    <span className="bbl-check">✓</span>
                    <span>Single Sign-On (SAML 2.0 / Shibboleth)</span>
                  </div>
                  <div className="bbl-item">
                    <span className="bbl-check">✓</span>
                    <span>On-Premise / Private Cloud Compute Node</span>
                  </div>
                  <div className="bbl-item">
                    <span className="bbl-check">✓</span>
                    <span>Custom SLA with 99.9% Uptime Guarantee</span>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem' }}>
                  <Link to="/contact" className="btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
                    Speak with Enterprise Sales →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Confirmation Modal */}
      {quoteRequested && createPortal(
        <div className="modal-backdrop" onClick={() => setQuoteRequested(false)}>
          <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">📄</div>
            <h2 className="modal-title">Institutional Quote Generated!</h2>
            <p className="modal-desc">
              Thank you, <strong>{formData.name}</strong> ({formData.institution}). We have generated an official Proforma Quote for <strong>{seats} Seats</strong> across <strong>{selectedProductIds.map(i => i.toUpperCase()).join(', ')}</strong> with a <strong>{totalDiscountPct}% volume discount</strong>.
            </p>
            <div className="license-key-box">
              <code>QUOTE-ARQ-2026-{Math.floor(100000 + Math.random() * 900000)}</code>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted-text)' }}>
              Our enterprise procurement team has emailed the PDF quote &amp; PO instructions to <strong>{formData.email}</strong>.
            </p>
            <div className="modal-actions" style={{ marginTop: '1.5rem' }}>
              <Link to="/products" className="btn-primary">Return to Products</Link>
              <button className="btn-ghost" onClick={() => setQuoteRequested(false)}>Close</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </main>
  );
}
