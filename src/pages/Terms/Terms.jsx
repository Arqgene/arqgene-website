import { PageHero } from '../../components/PageComponents';

export default function Terms() {
  return (
    <main className="page-enter">
      <PageHero badge="Legal" title={<>Terms of <span className="gradient-text">Service</span></>} subtitle="Last updated: January 2026" />
      <section className="section">
        <div className="container-narrow">
          <div className="glass-card" style={{ padding: '3rem' }}>
            {[
              { title: '1. Acceptance of Terms', content: 'By accessing or using ArqGene\'s platform and services, you agree to be bound by these Terms of Service. If you disagree with any part, you may not access the service.' },
              { title: '2. Use of Service', content: 'You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services to violate any applicable laws, infringe intellectual property rights, or harm others.' },
              { title: '3. Intellectual Property', content: 'The ArqGene platform, including GenXFlow™, Uyirinai, and Marabi, and all associated intellectual property are owned by ArqGene LLP. You may not copy, modify, distribute, or create derivative works without explicit permission.' },
              { title: '4. User Data & Privacy', content: 'Your genomic data, research data, and personal information are processed in accordance with our Privacy Policy. You retain ownership of your research data uploaded to our platform.' },
              { title: '5. License Grant', content: 'Subject to payment of applicable fees and these Terms, ArqGene grants you a limited, non-exclusive, non-transferable license to use our software and services for your internal research purposes.' },
              { title: '6. Limitation of Liability', content: 'ArqGene shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our maximum liability is limited to fees paid in the preceding 12 months.' },
              { title: '7. Termination', content: 'We may terminate or suspend access to our services immediately, without prior notice, for any breach of these Terms. Upon termination, your license to use the services will cease.' },
              { title: '8. Governing Law', content: 'These Terms shall be governed by the laws of India. Any disputes shall be resolved in the courts of Vellore, Tamil Nadu, India.' },
              { title: '9. Contact', content: 'For questions about these Terms, contact us at inquiry@arqgene.com.' },
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
