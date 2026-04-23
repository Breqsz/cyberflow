'use client';

import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

export const Services = () => {
  const { lang } = useLang();
  const c = content.services;
  const items = tArr(c.items, lang);
  const [h1, h2] = t(c.headline, lang).split('\n');

  return (
    <section id="services" className="py-28 bg-[#06061a] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* left: headline */}
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <div className="flex items-start gap-4">
              <div className="w-0.5 h-20 bg-gradient-to-b from-[#6c3aff] to-transparent mt-1 shrink-0" />
              <div>
                <Badge variant="primary" className="mb-5">{t(c.badge, lang)}</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                  {h1}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c3aff] to-[#00d4ff]">
                    {h2}
                  </span>
                </h2>
                <p className="text-[#f0f0ff]/60 leading-relaxed">{t(c.sub, lang)}</p>
              </div>
            </div>
          </div>

          {/* right: services grid */}
          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 bg-[#0d0d1a] border border-white/6 rounded-xl p-5 hover:border-[#6c3aff]/25 hover:shadow-[0_8px_30px_rgba(108,58,255,0.08)] transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-[#6c3aff]/12 border border-[#6c3aff]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#6c3aff]/20 transition-colors">
                  <span className="text-[#a47aff] text-xs font-mono font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{item.label}</h3>
                  <p className="text-[#f0f0ff]/55 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
