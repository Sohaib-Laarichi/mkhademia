import { Header } from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Hero } from '@/components/home/hero';
import { Features } from '@/components/home/features';
import { Stats } from '@/components/home/stats';
import { Categories } from '@/components/home/categories';
import { Testimonials } from '@/components/home/testimonials';
import { CTA } from '@/components/home/cta';
import { HowItWorks } from '@/components/home/how-it-works';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Categories />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
