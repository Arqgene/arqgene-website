import { useState, useEffect } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { getApiBaseUrl } from '../../config/api';
import './AdminInquiries.css';

export default function AdminInquiries() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  
  // Login Form States
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Dashboard States
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Filtering & Searching State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  
  // Selected Inquiry for Modal Detail Viewer
  const [activeInquiry, setActiveInquiry] = useState(null);

  const revealRef = useReveal();
  const apiBase = getApiBaseUrl();

  // Check for existing session token on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('arqgene_admin_token');
    if (savedToken) {
      setAdminToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch inquiries from backend when authenticated
  const fetchInquiries = (tokenToUse = adminToken) => {
    if (!tokenToUse) return;
    setLoading(true);
    fetch(`${apiBase}/admin/inquiries`, {
      headers: {
        'X-Admin-Token': tokenToUse
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to retrieve inquiries from server.');
        return res.json();
      })
      .then((data) => {
        setInquiries(data);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching inquiries:', err);
        setError(err.message);
        setInquiries([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isAuthenticated && adminToken) {
      fetchInquiries(adminToken);
    }
  }, [isAuthenticated, adminToken]);

  // Handle Login Authentication
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    fetch(`${apiBase}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: passwordInput })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Invalid admin password.');
        return res.json();
      })
      .then((data) => {
        sessionStorage.setItem('arqgene_admin_token', data.token);
        setAdminToken(data.token);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        setLoginError(err.message);
      });
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('arqgene_admin_token');
    setIsAuthenticated(false);
    setAdminToken('');
    setInquiries([]);
    setPasswordInput('');
    setLoginError('');
  };

  // Delete an inquiry
  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    fetch(`${apiBase}/admin/inquiries/${id}`, {
      method: 'DELETE',
      headers: {
        'X-Admin-Token': adminToken
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete inquiry.');
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (activeInquiry && activeInquiry.id === id) {
          setActiveInquiry(null);
        }
      })
      .catch((err) => {
        alert(`Delete failed: ${err.message}`);
      });
  };

  // Helper labels for Inquiry Types
  const typeMap = {
    all: 'All Inquiries',
    general: 'General Inquiry',
    demo: 'Request Demo',
    partnership: 'Partnership',
    support: 'Technical Support',
    press: 'Press & Media',
    investor: 'Investor Relations',
    license: 'License Request',
  };

  // Filter logic
  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'all' || item.type === selectedType;

    return matchesSearch && matchesType;
  });

  const formatDate = (isoStr) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoStr;
    }
  };

  // Login Screen Render
  if (!isAuthenticated) {
    return (
      <main className="admin-inquiries-page page-enter" ref={revealRef}>
        <div className="login-screen-bg" />
        <section className="admin-login-section section">
          <div className="container">
            <div className="admin-login-card glass-card">
              <div className="login-logo">🔒</div>
              <h2 className="login-title">Admin Dashboard</h2>
              <p className="login-subtitle">
                Enter the administrator password to view and manage platform contact inquiries.
              </p>
              
              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label className="form-label">Password *</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter admin password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                
                {loginError && <p className="login-error-msg">⚠️ {loginError}</p>}
                
                <button type="submit" className="btn-primary login-btn" style={{ width: '100%', justifyContent: 'center' }}>
                  Authenticate Access
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Dashboard Render
  return (
    <main className="admin-inquiries-page page-enter" ref={revealRef}>
      <section className="admin-inquiries-hero section">
        <div className="ai-hero-bg" />
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Admin Dashboard</span>
            <h1 className="section-title">
              Contact <span className="gradient-text">Inquiries</span>
            </h1>
            <p className="section-subtitle">
              Manage and respond to incoming platform submissions stored in the local inquiries database.
            </p>
          </div>
        </div>
      </section>

      <section className="inquiries-list-section section">
        <div className="container">
          {/* Controls Panel */}
          <div className="controls-panel glass-card">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name, email, subject or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>
                  ×
                </button>
              )}
            </div>

            <div className="filter-box">
              <span className="filter-label">Inquiry Type:</span>
              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                {Object.entries(typeMap).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="controls-actions">
              <button className="btn-outline refresh-btn" onClick={() => fetchInquiries()}>
                🔄 Refresh
              </button>
              <button className="btn-outline logout-btn" onClick={handleLogout}>
                🚪 Logout
              </button>
            </div>
          </div>

          {/* Error Message if API failed */}
          {error && (
            <div className="api-warning">
              ⚠️ Cannot connect to backend at <strong>{apiBase}</strong>. Please ensure the backend server is active and accessible.
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="loading-container glass-card">
              <div className="spinner" />
              <p>Sequencing Inquiries from Database...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="empty-container glass-card">
              <div className="empty-icon">📁</div>
              <h3>No Inquiries Found</h3>
              <p>
                {searchTerm || selectedType !== 'all'
                  ? 'Try adjusting your search query or filters.'
                  : 'No customer inquiries have been submitted yet.'}
              </p>
            </div>
          ) : (
            /* Inquiries Cards Grid */
            <div className="inquiries-grid">
              {filteredInquiries.map((item) => (
                <div
                  key={item.id}
                  className="inquiry-card glass-card reveal"
                  onClick={() => setActiveInquiry(item)}
                >
                  <div className="ic-header">
                    <span className={`ic-badge badge-${item.type}`}>
                      {typeMap[item.type] || item.type}
                    </span>
                    <span className="ic-date">{formatDate(item.created_at)}</span>
                  </div>

                  <h3 className="ic-subject">{item.subject}</h3>
                  <p className="ic-message-preview">{item.message}</p>

                  <div className="ic-footer">
                    <div className="ic-sender">
                      <div className="ic-avatar">{item.name.charAt(0)}</div>
                      <div>
                        <div className="ic-name">{item.name}</div>
                        <a
                          href={`mailto:${item.email}`}
                          className="ic-email"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item.email}
                        </a>
                      </div>
                    </div>

                    <button
                      className="btn-delete"
                      onClick={(e) => handleDelete(item.id, e)}
                      title="Delete Inquiry"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Inquiry Detail Modal */}
      {activeInquiry && (
        <div className="modal-backdrop active" onClick={() => setActiveInquiry(null)}>
          <div className="modal-content glass-card active" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveInquiry(null)}>
              ×
            </button>

            <div className="modal-header">
              <span className={`ic-badge badge-${activeInquiry.type}`}>
                {typeMap[activeInquiry.type] || activeInquiry.type}
              </span>
              <span className="ic-date">{formatDate(activeInquiry.created_at)}</span>
            </div>

            <h2 className="modal-subject-title">{activeInquiry.subject}</h2>

            <div className="modal-sender-info">
              <div className="ic-avatar modal-avatar">{activeInquiry.name.charAt(0)}</div>
              <div>
                <h4 className="modal-sender-name">{activeInquiry.name}</h4>
                <a href={`mailto:${activeInquiry.email}`} className="modal-sender-email">
                  {activeInquiry.email}
                </a>
              </div>
            </div>

            <div className="modal-message-box">
              <p className="modal-message-text">{activeInquiry.message}</p>
            </div>

            <div className="modal-actions-footer">
              <a href={`mailto:${activeInquiry.email}`} className="btn-primary">
                📩 Reply via Email
              </a>
              <button
                className="btn-outline btn-modal-delete"
                onClick={(e) => handleDelete(activeInquiry.id, e)}
              >
                🗑️ Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
