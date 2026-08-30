import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Team from './pages/Team/Team';
import Products from './pages/Products/Products';
import Technology from './pages/Technology/Technology';
import Services from './pages/Services/Services';
import Download from './pages/Download/Download';
import Careers from './pages/Careers/Careers';
import Contact from './pages/Contact/Contact';
import Research from './pages/Research/Research';
import Insights from './pages/Insights/Insights';
import Innovation from './pages/Innovation/Innovation';
import Investors from './pages/Investors/Investors';
import Docs from './pages/Docs/Docs';
import Support from './pages/Support/Support';
import Pricing from './pages/Pricing/Pricing';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import Checkout from './pages/Checkout/Checkout';
import BulkLicensing from './pages/BulkLicensing/BulkLicensing';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔬</div>
        <h1 style={{ fontSize: '2rem', color: 'var(--white)', marginBottom: '1rem' }}>404 — Page Not Found</h1>
        <p style={{ color: 'var(--muted-text)', marginBottom: '2rem' }}>This sequence could not be assembled.</p>
        <a href="/" className="btn-primary">Return Home</a>
      </div>
    </main>
  );
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/products" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/avail-license" element={<Checkout />} />
        <Route path="/bulk-licensing" element={<BulkLicensing />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/services" element={<Services />} />
        <Route path="/download" element={<Download />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/research" element={<Research />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/innovation" element={<Innovation />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        {/* Solution routes redirect to contact */}
        <Route path="/solutions/:id" element={<Contact />} />
        <Route path="/developers" element={<Docs />} />
        <Route path="/roadmap" element={<Innovation />} />
        <Route path="/media" element={<Contact />} />
        <Route path="/case-studies" element={<Insights />} />
        <Route path="/cookies" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
