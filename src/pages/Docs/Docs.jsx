import { PageHero, ComingSoonCard } from '../../components/PageComponents';
import '../shared.css';
import userManualPdf from '../../assets/GenXFlow_Customer_User_Manual.pdf';

export default function Docs() {
  return (
    <main className="page-enter">
      <PageHero badge="Documentation" title={<>GenXFlow™ <span className="gradient-text">Documentation</span></>} subtitle="Guides, user manuals, and technical references for the GenXFlow™ desktop application and analytics pipeline." />
      <ComingSoonCard icon="📚" title="GenXFlow™ Customer User Manual" desc="Download the official, comprehensive user manual for GenXFlow™ to learn about local installation, pipeline configurations, offline execution, and custom tool setup." links={[{ label: 'Download User Manual (PDF)', to: userManualPdf, download: 'GenXFlow_Customer_User_Manual.pdf', primary: true }, { label: 'Contact Support', to: '/support', primary: false }]} />
    </main>
  );
}
