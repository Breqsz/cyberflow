'use client';

import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'R$ 297',
    period: '/mês',
    description: 'Para negócios que precisam de presença sólida sem complicação.',
    features: [
      'Site institucional (até 5 páginas)',
      'Design responsivo mobile-first',
      'SEO básico e Google Analytics',
      'Formulário de captação de leads',
      'Suporte via WhatsApp (seg-sex)',
      '1 revisão/mês',
    ],
    cta: 'Começar com Starter',
    popular: false,
    accent: '#6b7280',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 'R$ 597',
    period: '/mês',
    description: 'Para empresas prontas para crescer com funil e presença otimizada.',
    features: [
      'Tudo do Starter +',
      'Landing pages de conversão',
      'Funil de vendas estruturado',
      'Integração CRM e email marketing',
      'Relatório mensal de performance',
      'Revisões ilimitadas',
      'Suporte prioritário',
    ],
    cta: 'Escalar com Growth',
    popular: true,
    accent: '#6c3aff',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'R$ 1.197',
    period: '/mês',
    description: 'Para negócios sérios que querem dominar o digital.',
    features: [
      'Tudo do Growth +',
      'Estratégia digital completa',
      'Múltiplas landing pages',
      'Automações avançadas',
      'Dashboard de métricas custom',
      'Reunião estratégica mensal',
      'Acesso direto por chat',
    ],
    cta: 'Dominar com Pro',
    popular: false,
    accent: '#00d4ff',
  },
  {
    id: 'onetime',
    name: 'One Time',
    price: 'R$ 1.997',
    period: 'pagamento único',
    description: 'Site premium entregue de uma vez. Sem mensalidade.',
    features: [
      'Site completo até 8 páginas',
      'Design premium exclusivo',
      'SEO avançado on-page',
      'Performance garantida (Core Web Vitals)',
      'Integração de pagamentos',
      '30 dias de suporte pós-entrega',
    ],
    cta: 'Quero o site pronto',
    popular: false,
    accent: '#a47aff',
  },
];

export const Plans = () => {
  return (
    <section id="plans" className="py-24 bg-[#050510]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Planos</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Escolha como{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c3aff] to-[#00d4ff]">
              quer crescer
            </span>
          </h2>
          <p className="text-[#f0f0ff]/50 text-lg max-w-2xl mx-auto">
            Sem contratos longos, sem surpresas. Cancele quando quiser.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-[#0d0d1a] rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'border-2 border-[#6c3aff] shadow-[0_0_40px_rgba(108,58,255,0.2)]'
                  : 'border border-white/5 hover:border-white/15'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="primary">✦ Mais popular</Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-bold" style={{ color: plan.accent }}>
                    {plan.price}
                  </span>
                  <span className="text-[#f0f0ff]/40 text-sm">{plan.period}</span>
                </div>
                <p className="text-[#f0f0ff]/50 text-sm leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <span style={{ color: plan.accent }} className="mt-0.5 shrink-0">✓</span>
                    <span className="text-[#f0f0ff]/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <LinkButton
                href={`/checkout?plan=${plan.id}`}
                variant={plan.popular ? 'primary' : 'outline'}
                size="md"
                className="w-full justify-center"
                style={
                  !plan.popular
                    ? { borderColor: `${plan.accent}60`, color: plan.accent }
                    : undefined
                }
              >
                {plan.cta}
              </LinkButton>
            </div>
          ))}
        </div>

        <p className="text-center text-[#f0f0ff]/30 text-sm mt-8">
          Todos os planos incluem configuração inicial gratuita e 7 dias de garantia.
        </p>
      </div>
    </section>
  );
};
