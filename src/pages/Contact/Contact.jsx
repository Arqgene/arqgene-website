import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { getApiBaseUrl } from '../../config/api';
import './Contact.css';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', type: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const revealRef = useReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const apiBase = getApiBaseUrl();
    fetch(`${apiBase}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    })
      .then(res => {
        if (res.ok) {
          setSubmitted(true);
        } else {
          alert("Server error: Unable to save inquiry in database.");
        }
      })
      .catch(err => {
        console.error("Network error submitting contact form:", err);
        alert(`Failed to reach backend server at ${apiBase}. Make sure your backend server is accessible.`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const contactTypes = [
    { val: 'general', label: 'General Inquiry' },
    { val: 'demo', label: 'Request Demo' },
    { val: 'partnership', label: 'Partnership' },
    { val: 'support', label: 'Technical Support' },
    { val: 'press', label: 'Press & Media' },
    { val: 'investor', label: 'Investor Relations' },
  ];

  return (
    <main className="contact-page page-enter" ref={revealRef}>
      <section className="contact-hero section">
        <div className="contact-hero-bg" />
        <div className="container">
          <div className="section-header">
            <span className="section-badge reveal">Get in Touch</span>
            <h1 className="section-title reveal">Let's Build the Future <span className="gradient-text">Together</span></h1>
            <p className="section-subtitle reveal">
              Whether you're a researcher, enterprise, or investor — we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-section section">
        <div className="container">
          <div className="contact-grid">
            {/* Info Panel */}
            <div className="contact-info-panel reveal-left">
              <div className="contact-info-card glass-card">
                <h2 className="contact-info-title">Contact Information</h2>

                <div className="contact-info-items">
                  <div className="contact-info-item">
                    <div className="ci-icon">👤</div>
                    <div>
                      <div className="ci-label">Founder</div>
                      <div className="ci-val">Dr. L. Karthik, Founder</div>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="ci-icon">📍</div>
                    <div>
                      <div className="ci-label">Location</div>
                      <div className="ci-val">Room No: 5A, VIT-TBI<br />VIT University, Vellore<br />Tamil Nadu 632014, India</div>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="ci-icon">📧</div>
                    <div>
                      <div className="ci-label">Email</div>
                      <a href="mailto:karthik@arqgene.com" className="ci-val ci-link">karthik@arqgene.com</a>
                      <span style={{ opacity: 0.6, fontSize: '0.85rem', display: 'block' }}>or inquiry@arqgene.com</span>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="ci-icon">📞</div>
                    <div>
                      <div className="ci-label">Phone</div>
                      <a href="tel:+919952545640" className="ci-val ci-link">+91 99525 45640</a>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="ci-icon">🔗</div>
                    <div>
                      <div className="ci-label">LinkedIn</div>
                      <a href="https://www.linkedin.com/in/arqgene-llp-0ab916391/" target="_blank" rel="noreferrer" className="ci-val ci-link">ArqGene LLP</a>
                    </div>
                  </div>
                </div>

                <div className="contact-quick-links">
                  <div className="cq-title">Quick Links</div>
                  {[
                    { label: 'Request a Demo', icon: '🖥️', to: '#' },
                    { label: 'Download Free Trial', icon: '⬇️', to: '/download' },
                    { label: 'Documentation', icon: '📚', to: '/docs' },
                    { label: 'Careers', icon: '💼', to: '/careers' },
                  ].map(l => (
                    <a key={l.label} href={l.to} className="cq-link">
                      <span>{l.icon}</span> {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-panel reveal-right">
              {submitted ? (
                <div className="success-panel glass-card">
                  <div className="success-icon">✅</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. Our team will respond within 24–48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form glass-card">
                  <h2 className="form-title">Send us a Message</h2>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Name *</label>
                      <input type="text" className="form-input" required value={formState.name} onChange={e => setFormState(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input type="email" className="form-input" required value={formState.email} onChange={e => setFormState(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Inquiry Type</label>
                    <div className="type-pills">
                      {contactTypes.map(ct => (
                        <button type="button" key={ct.val}
                          className={`type-pill ${formState.type === ct.val ? 'active' : ''}`}
                          onClick={() => setFormState(p => ({ ...p, type: ct.val }))}>
                          {ct.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject *</label>
                    <input type="text" className="form-input" required value={formState.subject} onChange={e => setFormState(p => ({ ...p, subject: e.target.value }))} placeholder="What is this about?" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea className="form-input" required value={formState.message} onChange={e => setFormState(p => ({ ...p, message: e.target.value }))} placeholder="Tell us more about your inquiry..." rows={6} />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      opacity: loading ? 0.75 : 1,
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <span className="btn-spinner" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
