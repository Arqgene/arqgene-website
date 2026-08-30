import { PageHero } from '../../components/PageComponents';
import '../shared.css';

export default function Privacy() {
  return (
    <main className="page-enter">
      <PageHero badge="Legal" title={<>Privacy <span className="gradient-text">Policy</span></>} subtitle="Last updated: January 2026" />
      <section className="section">
        <div className="container-narrow">
          <div className="glass-card" style={{ padding: '3rem' }}>
            {[
              { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes name, email address, organization, and usage data.' },
              { title: '2. How We Use Information', content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send technical notices, respond to inquiries, and send promotional communications (with your consent).' },
              { title: '3. Data Security', content: 'We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest.' },
              { title: '4. Data Retention', content: 'We retain your information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time by contacting us at inquiry@arqgene.com.' },
              { title: '5. Cookies', content: 'We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.' },
              { title: '6. Third-Party Services', content: 'Our service may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to read their privacy policies.' },
              { title: '7. Contact Us', content: 'If you have questions about this Privacy Policy, please contact us at inquiry@arqgene.com or Room No: 5A, VIT-TBI, VIT University, Vellore, Tamil Nadu 632014, India.' },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted-text)', fontSize: '0.925rem', lineHeight: '1.8', margin: 0 }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
