'use client';

import { Zap, Target, Bot, Link2, Database, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Target,
  Bot,
  Link2,
  Database,
  TrendingUp,
};

export const Solution = () => {
  const { lang } = useLang();
  const c = content.solution;
  const pillars = tArr(c.pillars, lang);
  const [h1, h2] = t(c.headline, lang).split('\n');

  return (
    <section className="py-28 bg-[#06061a] relative overflow-hidden">
      {/* background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[480px] rounded-full bg-[#6c3aff]/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="max-w-2xl mb-16 flex items-start gap-4">
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
            <p className="text-[#f0f0ff]/65 text-lg leading-relaxed">
              {t(c.sub, lang)}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => {
            const Icon = iconMap[pillar.icon];
            const isFeatured = i === 1; // Conversion Architecture gets more weight

            return (
              <div
                key={i}
                className={`group relative rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(108,58,255,0.12)] ${
                  isFeatured
                    ? 'bg-gradient-to-br from-[#6c3aff]/10 to-[#0d0d1a] border-[#6c3aff]/25'
                    : 'bg-[#0d0d1a] border-white/6 hover:border-[#6c3aff]/25'
                }`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                  isFeatured
                    ? 'from-[#6c3aff]/8 to-transparent'
                    : 'from-[#6c3aff]/6 to-transparent opacity-0 group-hover:opacity-100'
                } transition-opacity duration-300 pointer-events-none`} />

                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-[#6c3aff]/12 border border-[#6c3aff]/25 flex items-center justify-center mb-5">
                    {Icon && <Icon className="w-5 h-5 text-[#a47aff]" strokeWidth={2} />}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{pillar.title}</h3>
                  <p className="text-[#f0f0ff]/55 text-sm leading-relaxed">{pillar.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
