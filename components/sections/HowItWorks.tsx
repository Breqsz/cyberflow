'use client';

import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

const stepColors = [
  { bg: 'bg-[#6c3aff]/15', border: 'border-[#6c3aff]/30', text: 'text-[#6c3aff]' },
  { bg: 'bg-[#8a52ff]/15', border: 'border-[#8a52ff]/30', text: 'text-[#8a52ff]' },
  { bg: 'bg-[#a47aff]/15', border: 'border-[#a47aff]/30', text: 'text-[#a47aff]' },
  { bg: 'bg-[#00d4ff]/15', border: 'border-[#00d4ff]/30', text: 'text-[#00d4ff]' },
];

export const HowItWorks = () => {
  const { lang } = useLang();
  const c = content.howItWorks;
  const steps = tArr(c.steps, lang);

  return (
    <section id="how-it-works" className="py-28 bg-[#050510] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="surface" className="mb-5">{t(c.badge, lang)}</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {t(c.headline, lang)}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* desktop connector */}
          <div className="hidden lg:block absolute top-[76px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px pointer-events-none">
            <div className="h-full bg-gradient-to-r from-[#6c3aff]/50 via-[#a47aff]/50 to-[#00d4ff]/50" />
          </div>

          {steps.map((step, i) => {
            const color = stepColors[i];
            return (
              <div key={step.n} className="relative flex flex-col gap-4">
                <div className="bg-[#0d0d1a] border border-white/6 rounded-2xl p-7 hover:border-white/12 hover:shadow-[0_8px_30px_rgba(108,58,255,0.08)] transition-all duration-300 flex-1">
                  {/* step number */}
                  <div className={`w-12 h-12 rounded-xl ${color.bg} border ${color.border} flex items-center justify-center mb-4`}>
                    <span className={`text-sm font-mono font-bold ${color.text}`}>{step.n}</span>
                  </div>

                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#f0f0ff]/40 mb-2">
                    {step.time}
                  </p>

                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-[#f0f0ff]/55 text-sm leading-relaxed mb-5">{step.body}</p>

                  {/* deliverables */}
                  <div className="border-t border-white/6 pt-4 space-y-2">
                    {step.deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-2 text-xs">
                        <span className={`${color.text} mt-0.5 shrink-0`}>→</span>
                        <span className="text-[#f0f0ff]/65">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* mobile connector */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center">
                    <div className="w-px h-5 bg-gradient-to-b from-[#6c3aff]/40 to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
