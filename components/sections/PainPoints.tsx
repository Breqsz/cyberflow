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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16 flex items-start gap-4">
          <div className="w-0.5 h-20 bg-gradient-to-b from-[#ff4444] to-transparent mt-1 shrink-0" />
          <div>
            <Badge variant="accent" className="mb-5">{t(c.badge, lang)}</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              {t(c.headline, lang)}
            </h2>
            <p className="text-[#f0f0ff]/65 text-lg leading-relaxed">
              {t(c.sub, lang)}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-[#050510] p-10 hover:bg-[#0a0a18] transition-colors duration-300 group relative"
            >
              {/* subtle red accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ff4444]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="text-5xl font-bold text-[#ff4444] mb-2 tabular-nums tracking-tight">
                {item.stat}
              </div>
              <div className="text-white font-semibold mb-3 leading-snug">
                {item.label}
              </div>
              <p className="text-[#f0f0ff]/55 text-sm leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
