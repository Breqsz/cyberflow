'use client';

import { Badge } from '@/components/ui/Badge';

const projects = [
  {
    name: 'BREQ',
    url: 'https://breq.com.br',
    description:
      'Portfólio e hub digital completo. Identidade visual forte, performance otimizada e funil de captação integrado.',
    tags: ['Next.js', 'Design', 'SEO'],
    accent: '#6c3aff',
    emoji: '🚀',
  },
  {
    name: 'Desafog.ai',
    url: 'https://desafog.ai',
    description:
      'Plataforma SaaS com IA para saúde mental. Landing de alta conversão, onboarding fluido e integração de pagamentos.',
    tags: ['SaaS', 'IA', 'Saúde Mental'],
    accent: '#00d4ff',
    emoji: '🧠',
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-[#050510]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="surface" className="mb-4">Projetos reais</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trabalhos que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c3aff] to-[#00d4ff]">
              falam por si
            </span>
          </h2>
          <p className="text-[#f0f0ff]/50 text-lg max-w-2xl mx-auto">
            Cada projeto é entregue com obsessão por qualidade e resultado mensurável.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[#0d0d1a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300 hover:-translate-y-2"
              style={{ boxShadow: `0 0 0 0 ${project.accent}` }}
            >
              {/* preview area */}
              <div
                className="h-48 flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${project.accent}15, ${project.accent}05)` }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(${project.accent}40 1px, transparent 1px), linear-gradient(90deg, ${project.accent}40 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                  }}
                />
                <span className="text-7xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {project.emoji}
                </span>
                <div
                  className="absolute top-4 right-4 text-xs font-mono px-2 py-1 rounded"
                  style={{ background: `${project.accent}20`, color: project.accent }}
                >
                  {project.url.replace('https://', '')}
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#a47aff] transition-colors">
                  {project.name}
                </h3>
                <p className="text-[#f0f0ff]/50 mb-5 leading-relaxed">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: `${project.accent}15`, color: project.accent }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#f0f0ff]/30 group-hover:text-[#f0f0ff]/70 transition-colors text-sm">
                    Ver projeto →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
