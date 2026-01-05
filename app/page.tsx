import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import CategoryGrid from '@/components/CategoryGrid';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Services />
      <Pricing />
      <CategoryGrid />
    </main>
  );
}

