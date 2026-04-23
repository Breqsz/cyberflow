'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import ElectricBorder from '@/components/ui/effects/ElectricBorder';
import SpotlightCard from '@/components/ui/effects/SpotlightCard';
import StarBorder from '@/components/ui/effects/StarBorder';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

type Currency = 'USD' | 'EUR' | 'GBP' | 'BRL';

const accentByPlan: Record<string, string> = {
  starter: '#6b7280',
  growth: '#6c3aff',
  pro: '#00d4ff',
  onetime: '#a47aff',
};

const priceByPlan: Record<string, { USD: string; EUR: string; GBP: string; BRL: string; period: { en: string; pt: string } }> = {
  starter: {
    USD: '$97',
    EUR: '€89',
    GBP: '£79',
    BRL: 'R$497',
    period: { en: '/ month', pt: '/ mês' },
  },
  growth: {
    USD: '$247',
    EUR: '€229',
    GBP: '£199',
    BRL: 'R$1.197',
    period: { en: '/ month', pt: '/ mês' },
  },
  pro: {
    USD: '$497',
    EUR: '€459',
    GBP: '£399',
    BRL: 'R$2.497',
    period: { en: '/ month', pt: '/ mês' },
  },
  onetime: {
    USD: '$997',
    EUR: '€949',
    GBP: '£849',
    BRL: 'R$4.997',
    period: { en: 'one-time', pt: 'pagamento único' },
  },
};

export const Plans = () => {
  const { lang, currency } = useLang();
  const c = content.plans;
  const items = tArr(c.items, lang);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [h1, h2] = t(c.headline, lang).split('\n');

  const handleCheckout = async (planId: string) => {
    if (loadingPlan) return;
    setLoadingPlan(planId);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.assign(data.url);
        return;
      }
      window.location.assign('#contact');
    } catch {
      window.location.assign('#contact');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="py-28 bg-[#06061a] relative">
      <div id="plans" className="absolute -top-20" aria-hidden />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-5">
          <Badge variant="primary" className="mb-5">{t(c.badge, lang)}</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {h1}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c3aff] to-[#00d4ff]">
              {h2}
            </span>
          </h2>
          <p className="text-[#f0f0ff]/60 max-w-xl mx-auto leading-relaxed">{t(c.sub, lang)}</p>
        </div>

        {/* guarantee strip */}
        <div className="flex justify-center mb-14">
          <div className="flex items-center gap-2 text-sm text-[#f0f0ff]/55 bg-[#0d0d1a] border border-white/8 rounded-full px-5 py-2.5">
            <Check className="w-4 h-4 text-[#00d4ff]" strokeWidth={3} />
            {t(c.guarantee, lang)}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 pt-8 pb-4 px-1">
          {items.map((plan) => {
            const accent = accentByPlan[plan.id];
            const isPopular = plan.id === 'growth';
            const price = priceByPlan[plan.id];
            const isLoading = loadingPlan === plan.id;
            const priceDisplay = price[currency as Currency];

            const cardContent = (
              <>
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <Badge variant="primary" className="shadow-lg whitespace-nowrap">
                      {lang === 'pt' ? 'Mais popular' : 'Most popular'}
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <p
                      className="text-xs font-mono uppercase tracking-[0.2em]"
                      style={{ color: accent }}
                    >
                      {plan.name}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="text-4xl font-bold text-white tracking-tight">{priceDisplay}</span>
                    <span className="text-[#f0f0ff]/45 text-sm">{price.period[lang]}</span>
                  </div>
                  <p className="text-[#f0f0ff]/60 text-sm leading-relaxed min-h-[72px]">{plan.pitch}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <span
                        style={{ color: accent }}
                        className="mt-1 shrink-0 text-[10px]"
                      >
                        ✓
                      </span>
                      <span className="text-[#f0f0ff]/70 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  {isPopular ? (
                    <Button
                      type="button"
                      onClick={() => handleCheckout(plan.id)}
                      variant="primary"
                      size="md"
                      disabled={isLoading}
                      className="w-full justify-center"
                    >
                      {isLoading ? '...' : plan.cta}
                    </Button>
                  ) : (
                    <StarBorder
                      as="div"
                      className="w-full"
                      color={accent}
                      speed="5s"
                      thickness={1}
                      style={{ borderRadius: 12 }}
                    >
                      <Button
                        type="button"
                        onClick={() => handleCheckout(plan.id)}
                        variant="outline"
                        size="md"
                        disabled={isLoading}
                        className="w-full justify-center border-0"
                        style={{ color: accent, background: 'transparent' }}
                      >
                        {isLoading ? '...' : plan.cta}
                      </Button>
                    </StarBorder>
                  )}
                  <p className="text-center text-[11px] text-[#f0f0ff]/45">{plan.note}</p>
                </div>
              </>
            );

            if (isPopular) {
              return (
                <ElectricBorder
                  key={plan.id}
                  color="#6c3aff"
                  speed={1}
                  chaos={0.12}
                  borderRadius={18}
                  className="rounded-2xl"
                >
                  <div className="relative flex flex-col rounded-2xl p-7 bg-[#0d0d1a] border-2 border-[#6c3aff] shadow-[0_0_50px_rgba(108,58,255,0.18)] transition-all duration-300 hover:-translate-y-1">
                    {cardContent}
                  </div>
                </ElectricBorder>
              );
            }

            return (
              <SpotlightCard
                key={plan.id}
                spotlightColor="transparent"
                className="no-blue-hover relative flex flex-col rounded-2xl p-7 bg-[#0d0d1a] border border-white/8 hover:border-white/15 hover:shadow-[0_8px_30px_rgba(108,58,255,0.08)] transition-all duration-300 hover:-translate-y-1 overflow-visible"
              >
                {cardContent}
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
