import { Hero } from '@/components/sections/Hero';
import { PainPoints } from '@/components/sections/PainPoints';
import { Solution } from '@/components/sections/Solution';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Services } from '@/components/sections/Services';
import { Projects } from '@/components/sections/Projects';
import { Plans } from '@/components/sections/Plans';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <PainPoints />
      <Solution />
      <HowItWorks />
      <Services />
      <Projects />
      <Plans />
      <FinalCTA />
      <Footer />
    </>
  );
}
