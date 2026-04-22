'use client';

import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

export const PainPoints = () => {
  const { lang } = useLang();
  const c = content.problem;
  const items = tArr(c.items, lang);

  return (
    <section className="py-28 bg-[#050510] relative">
      {/* section divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <Badge variant="accent" className="mb-5">{t(c.badge, lang)}</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            {t(c.headline, lang)}
          </h2>
          <p className="text-[#f0f0ff]/50 text-lg leading-relaxed">
            {t(c.sub, lang)}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-[#050510] p-10 hover:bg-[#0a0a18] transition-colors duration-300 group"
            >
              <div className="text-5xl font-bold text-[#ff4444] mb-2 tabular-nums tracking-tight">
                {item.stat}
              </div>
              <div className="text-white font-semibold mb-3 leading-snug">
                {item.label}
              </div>
              <p className="text-[#f0f0ff]/40 text-sm leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
