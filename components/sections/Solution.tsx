'use client';

import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

export const Solution = () => {
  const { lang } = useLang();
  const c = content.solution;
  const pillars = tArr(c.pillars, lang);
  const [h1, h2] = t(c.headline, lang).split('\n');

  return (
    <section className="py-28 bg-[#050510] relative overflow-hidden">
      {/* background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#6c3aff]/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="max-w-2xl mb-16">
          <Badge variant="primary" className="mb-5">{t(c.badge, lang)}</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            {h1}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c3aff] to-[#00d4ff]">
              {h2}
            </span>
          </h2>
          <p className="text-[#f0f0ff]/50 text-lg leading-relaxed">
            {t(c.sub, lang)}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="group relative bg-[#0d0d1a] border border-white/5 rounded-2xl p-7 hover:border-[#6c3aff]/25 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6c3aff]/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <span className="text-3xl mb-4 block">{pillar.icon}</span>
                <h3 className="text-base font-semibold text-white mb-2">{pillar.title}</h3>
                <p className="text-[#f0f0ff]/45 text-sm leading-relaxed">{pillar.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
