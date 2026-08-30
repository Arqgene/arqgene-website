import { PageHero, ComingSoonCard } from '../../components/PageComponents';
import '../shared.css';

export default function Research() {
  return (
    <main className="page-enter">
      <PageHero
        badge="Research & Publications"
        title={<>Scientific <span className="gradient-text">Research Portal</span></>}
        subtitle="Access ArqGene's whitepapers, publications, datasets, and conference presentations."
        color="#9D4EDD"
      />
      <ComingSoonCard
        icon="📚"
        title="Research Portal Coming Soon"
        desc="We're building a comprehensive scientific publication repository with filtering by year, journal, and research area. Meanwhile, explore our technology page or contact us for specific research inquiries."
        links={[{ label: 'Explore Technology', to: '/technology', primary: true }, { label: 'Contact Us', to: '/contact', primary: false }]}
      />
    </main>
  );
}
