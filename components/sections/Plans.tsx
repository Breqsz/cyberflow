'use client';

import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

const accentByPlan: Record<string, string> = {
  starter: '#6b7280',
  growth: '#6c3aff',
  pro: '#00d4ff',
  onetime: '#a47aff',
};

export const Plans = () => {
  const { lang } = useLang();
  const c = content.plans;
  const items = tArr(c.items, lang);

  return (
    <section id="pricing" className="py-28 bg-[#050510] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-5">
          <Badge variant="primary" className="mb-5">{t(c.badge, lang)}</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t(c.headline, lang)}
          </h2>
          <p className="text-[#f0f0ff]/45 max-w-xl mx-auto">{t(c.sub, lang)}</p>
        </div>

        {/* guarantee strip */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 text-sm text-[#f0f0ff]/40 bg-[#0d0d1a] border border-white/5 rounded-full px-5 py-2.5">
            <span className="text-[#00d4ff]">✓</span>
            {t(c.guarantee, lang)}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((plan) => {
            const accent = accentByPlan[plan.id];
            const isPopular = plan.id === 'growth';
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                  isPopular
                    ? 'bg-[#0d0d1a] border-2 border-[#6c3aff] shadow-[0_0_50px_rgba(108,58,255,0.18)]'
                    : 'bg-[#0d0d1a] border border-white/6 hover:border-white/12'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="primary" className="shadow-lg">Most popular</Badge>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-xs font-mono text-[#f0f0ff]/30 uppercase tracking-widest mb-3">{plan.name}</p>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-[#f0f0ff]/35 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-[#f0f0ff]/50 text-sm leading-relaxed">{plan.pitch}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <span style={{ color: accent }} className="mt-0.5 shrink-0 text-xs">✓</span>
                      <span className="text-[#f0f0ff]/65 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <LinkButton
                    href={`/checkout?plan=${plan.id}`}
                    variant={isPopular ? 'primary' : 'outline'}
                    size="md"
                    className="w-full justify-center"
                    style={!isPopular ? { borderColor: `${accent}40`, color: accent } : undefined}
                  >
                    {plan.cta}
                  </LinkButton>
                  <p className="text-center text-[10px] text-[#f0f0ff]/25">{plan.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
