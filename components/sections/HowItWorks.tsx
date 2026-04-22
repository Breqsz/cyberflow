'use client';

import { Badge } from '@/components/ui/Badge';

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Analisamos sua presença atual, concorrentes e oportunidades. Identificamos os gaps que estão travando seu crescimento.',
    color: '#6c3aff',
  },
  {
    number: '02',
    title: 'Estratégia',
    description:
      'Montamos um plano personalizado: arquitetura de funil, identidade visual, copy e metas de conversão claras.',
    color: '#8b5cf6',
  },
  {
    number: '03',
    title: 'Execução',
    description:
      'Desenvolvemos e lançamos sua presença digital com velocidade. Sites rápidos, responsivos e otimizados para converter.',
    color: '#a47aff',
  },
  {
    number: '04',
    title: 'Escala',
    description:
      'Acompanhamos métricas, iteramos e expandimos. Sua presença evolui junto com seu negócio, sem precisar começar do zero.',
    color: '#00d4ff',
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-[#050510]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Como funciona</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Do diagnóstico à{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c3aff] to-[#00d4ff]">
              escala real
            </span>
          </h2>
          <p className="text-[#f0f0ff]/50 text-lg max-w-2xl mx-auto">
            Um processo direto, sem enrolação, focado em resultado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* connector line desktop */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#6c3aff] via-[#a47aff] to-[#00d4ff] opacity-30" />

          {steps.map((step, i) => (
            <div key={step.number} className="group relative">
              <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-7 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-sm font-bold font-mono"
                  style={{ background: `${step.color}20`, color: step.color, border: `1px solid ${step.color}30` }}
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-[#f0f0ff]/50 text-sm leading-relaxed">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-2">
                  <div className="w-px h-6 bg-gradient-to-b from-[#6c3aff] to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
