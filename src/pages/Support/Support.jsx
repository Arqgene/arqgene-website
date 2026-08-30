import { PageHero, ComingSoonCard } from '../../components/PageComponents';
export default function Support() {
  return (
    <main className="page-enter">
      <PageHero badge="Support" title={<>Help & <span className="gradient-text">Support Center</span></>} subtitle="Get help with installation, troubleshooting, licensing, and technical questions." color="#00E6C7" />
      <ComingSoonCard icon="🛟" title="Support Portal Coming Soon" desc="Our support center is under construction. For urgent issues, email us directly and we'll respond within 24 hours." links={[{ label: 'Email Support', to: 'mailto:inquiry@arqgene.com', primary: true }, { label: 'Documentation', to: '/docs', primary: false }]} />
    </main>
  );
}
