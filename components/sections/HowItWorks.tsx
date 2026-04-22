'use client';

import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

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
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px">
            <div className="h-full bg-gradient-to-r from-[#6c3aff] via-[#a47aff] to-[#00d4ff] opacity-20" />
          </div>

          {steps.map((step, i) => (
            <div key={step.n} className="relative flex flex-col gap-4">
              <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-7 hover:border-white/10 transition-all duration-300 flex-1">
                {/* step number */}
                <div className="w-12 h-12 rounded-xl bg-[#6c3aff]/15 border border-[#6c3aff]/20 flex items-center justify-center mb-5">
                  <span className="text-sm font-mono font-bold text-[#6c3aff]">{step.n}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-[#f0f0ff]/45 text-sm leading-relaxed mb-5">{step.body}</p>

                {/* deliverables */}
                <div className="border-t border-white/5 pt-4 space-y-2">
                  {step.deliverables.map((d) => (
                    <div key={d} className="flex items-start gap-2 text-xs">
                      <span className="text-[#6c3aff] mt-0.5 shrink-0">→</span>
                      <span className="text-[#f0f0ff]/55">{d}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
};
