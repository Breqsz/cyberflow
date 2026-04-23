'use client';

import dynamic from 'next/dynamic';
import { Star } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr, tObj } from '@/lib/i18n/content';

const Beams = dynamic(() => import('@/components/background/Beams'), { ssr: false });

export const Hero = () => {
  const { lang } = useLang();
  const c = content.hero;
  const trust = tArr(c.trust, lang);
  const testimonial = tObj(c.testimonial, lang);
  const [line1, line2] = t(c.headline, lang).split('\n');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Beams background */}
      <div className="absolute inset-0 z-0">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* dark overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050510]/75 via-[#050510]/45 to-[#050510]/90" />

      {/* ambient glow behind headline */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[420px] rounded-full bg-[#6c3aff]/12 blur-[120px] pointer-events-none z-[1]" />

      {/* grid pattern */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(108,58,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(108,58,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
        <div className="flex justify-center mb-6">
          <Badge variant="accent">
            {t(c.badge, lang)}
          </Badge>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[88px] font-bold tracking-tight text-white mb-6 leading-[1.05]">
          {line1}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c3aff] via-[#a47aff] to-[#00d4ff]">
            {line2}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-[#f0f0ff]/65 max-w-2xl mx-auto mb-4 leading-relaxed font-light">
          {t(c.sub, lang)}
        </p>

        <p className="text-sm text-[#f0f0ff]/40 mb-10 font-mono">
          {t(c.micro, lang)}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LinkButton href="#contact" variant="primary" size="lg" className="min-w-[220px]">
            {t(c.cta1, lang)}
          </LinkButton>
          <LinkButton href="#work" variant="ghost" size="lg">
            {t(c.cta2, lang)}
          </LinkButton>
        </div>

        {/* testimonial strip */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-3 bg-white/[0.03] border border-white/8 rounded-full px-5 py-2.5 backdrop-blur-sm">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#00d4ff] text-[#00d4ff]" />
              ))}
            </div>
            <p className="text-sm text-[#f0f0ff]/75">
              &ldquo;{testimonial.quote}&rdquo;
              <span className="text-[#f0f0ff]/40 ml-1.5">— {testimonial.author}</span>
            </p>
          </div>
        </div>

        {/* trust signals */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#f0f0ff]/60">
          {trust.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
              {item}
            </span>
          ))}
        </div>

        {/* tech stack strip */}
        <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
          {['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'OpenAI', 'Vercel'].map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#f0f0ff]/55"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050510] to-transparent z-[3]" />
    </section>
  );
};
