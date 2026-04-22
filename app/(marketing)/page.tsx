import { Hero } from '@/components/sections/Hero';
import { PainPoints } from '@/components/sections/PainPoints';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Projects } from '@/components/sections/Projects';
import { Plans } from '@/components/sections/Plans';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <PainPoints />
      <HowItWorks />
      <Projects />
      <Plans />
      <FinalCTA />
      <Footer />
    </>
  );
}
