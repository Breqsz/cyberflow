'use client';

import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

export const Projects = () => {
  const { lang } = useLang();
  const c = content.projects;
  const items = tArr(c.items, lang);
  const [h1, h2] = t(c.headline, lang).split('\n');

  return (
    <section id="work" className="py-28 bg-[#050510] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="surface" className="mb-5">{t(c.badge, lang)}</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {h1}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c3aff] to-[#00d4ff]">
              {h2}
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {items.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[#0d0d1a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/12 transition-all duration-300"
            >
              {/* card header */}
              <div
                className="relative h-36 flex items-end p-6 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${project.accent}18, ${project.accent}06)` }}
              >
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: `linear-gradient(${project.accent}60 1px, transparent 1px), linear-gradient(90deg, ${project.accent}60 1px, transparent 1px)`,
                    backgroundSize: '28px 28px',
                  }}
                />
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: `${project.accent}20`, color: project.accent }}
                  >
                    {project.tag}
                  </span>
                </div>
                <div className="relative flex items-center gap-3">
                  <span className="text-4xl">{project.emoji}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                    <p className="text-[#f0f0ff]/40 text-sm">{project.what}</p>
                  </div>
                </div>
              </div>

              {/* card body */}
              <div className="p-6 space-y-4">
                {/* stack */}
                <div className="flex gap-2 flex-wrap">
                  {project.stack.map((s) => (
                    <span key={s} className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-[#f0f0ff]/40">
                      {s}
                    </span>
                  ))}
                </div>

                {/* objective + outcome */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#f0f0ff]/25 mb-1.5 font-mono">
                      {lang === 'en' ? 'Objective' : 'Objetivo'}
                    </p>
                    <p className="text-[#f0f0ff]/55 text-xs leading-relaxed">{project.objective}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#00d4ff]/50 mb-1.5 font-mono">
                      {lang === 'en' ? 'Outcome' : 'Resultado'}
                    </p>
                    <p className="text-[#f0f0ff]/55 text-xs leading-relaxed">{project.outcome}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-[#f0f0ff]/25 font-mono">{project.url.replace('https://', '')}</span>
                  <span
                    className="text-xs font-medium group-hover:gap-2 transition-all flex items-center gap-1"
                    style={{ color: project.accent }}
                  >
                    {lang === 'en' ? 'View project' : 'Ver projeto'} →
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
