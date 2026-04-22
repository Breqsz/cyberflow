'use client';

import { Badge } from '@/components/ui/Badge';

const pains = [
  {
    icon: '⚡',
    title: 'Site lento = venda perdida',
    description:
      '53% dos visitantes abandonam uma página que demora mais de 3 segundos. Cada segundo a mais custa conversões reais.',
    stat: '53%',
    statLabel: 'abandonam em 3s',
  },
  {
    icon: '🎯',
    title: 'UX ruim afasta clientes',
    description:
      'Um design confuso ou desatualizado comunica falta de profissionalismo. O visitante julga em menos de 0,05 segundo.',
    stat: '0.05s',
    statLabel: 'para formar opinião',
  },
  {
    icon: '📉',
    title: 'Sem funil, sem crescimento',
    description:
      'Atrair tráfego sem um funil estruturado é jogar dinheiro fora. Visitas não viram leads. Leads não viram clientes.',
    stat: '3–5×',
    statLabel: 'menos conversão sem funil',
  },
];

export const PainPoints = () => {
  return (
    <section className="py-24 bg-[#050510] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d1a]/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <Badge variant="accent" className="mb-4">O problema</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            O que está custando{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] to-[#ff9500]">
              caro demais
            </span>
          </h2>
          <p className="text-[#f0f0ff]/50 text-lg max-w-2xl mx-auto">
            Presença digital fraca não é só estética. É receita que vai para o concorrente todos os dias.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pains.map((pain) => (
            <div
              key={pain.title}
              className="group relative bg-[#0d0d1a] border border-white/5 rounded-2xl p-8 hover:border-[#6c3aff]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6c3aff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className="text-4xl mb-4">{pain.icon}</div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[#ff4d4d]">{pain.stat}</span>
                  <span className="ml-2 text-sm text-[#f0f0ff]/40">{pain.statLabel}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{pain.title}</h3>
                <p className="text-[#f0f0ff]/50 leading-relaxed">{pain.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
