'use client';

import { ArrowUpRight, Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

export const Projects = () => {
  const { lang } = useLang();
  const c = content.projects;
  const items = tArr(c.items, lang);
  const labels = c.labels;
  const [h1, h2] = t(c.headline, lang).split('\n');

  return (
    <section id="work" className="py-28 bg-[#050510] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="surface" className="mb-5">{t(c.badge, lang)}</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {h1}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c3aff] to-[#00d4ff]">
              {h2}
            </span>
          </h2>
          <p className="text-[#f0f0ff]/55 max-w-xl mx-auto">
            {t(c.sub, lang)}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {items.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[#0d0d1a] border border-white/6 rounded-2xl overflow-hidden hover:border-white/14 hover:shadow-[0_12px_40px_rgba(108,58,255,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* browser mockup */}
              <div className="relative">
                {/* browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a14] border-b border-white/6">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/60" />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex items-center gap-1.5 bg-[#050510] border border-white/8 rounded-md px-3 py-1 min-w-[180px] max-w-[280px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]/70" />
                      <span className="text-[11px] font-mono text-[#f0f0ff]/55 truncate">{project.domain}</span>
                    </div>
                  </div>
                  <span className="w-3 h-3 opacity-30" />
                </div>

                {/* stylized preview */}
                <div
                  className="relative h-44 flex items-center justify-center overflow-hidden"
                  style={{
                    background: `radial-gradient(ellipse at center, ${project.accent}22, transparent 70%), linear-gradient(135deg, ${project.accent}14, #06061a)`,
                  }}
                >
                  {/* grid pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.1]"
                    style={{
                      backgroundImage: `linear-gradient(${project.accent}60 1px, transparent 1px), linear-gradient(90deg, ${project.accent}60 1px, transparent 1px)`,
                      backgroundSize: '32px 32px',
                    }}
                  />

                  {/* glow */}
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background: `radial-gradient(circle at 30% 50%, ${project.accent}33, transparent 50%)`,
                    }}
                  />

                  <div className="relative text-center px-4">
                    <p
                      className="text-[10px] font-mono uppercase tracking-[0.2em] mb-2"
                      style={{ color: project.accent }}
                    >
                      {project.tag}
                    </p>
                    <h3
                      className="text-3xl font-bold text-white mb-1 tracking-tight"
                      style={{ textShadow: `0 0 30px ${project.accent}80` }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-[#f0f0ff]/55 text-xs">{project.what}</p>
                  </div>

                  {/* hover overlay */}
                  <div className="absolute inset-0 bg-[#050510]/75 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-medium text-sm"
                      style={{
                        borderColor: project.accent,
                        color: project.accent,
                        boxShadow: `0 0 30px ${project.accent}40`,
                      }}
                    >
                      {t(labels.viewLive, lang)}
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* card body */}
              <div className="p-6 space-y-5">
                {/* stack */}
                <div className="flex gap-1.5 flex-wrap">
                  {project.stack.map((s) => (
                    <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/6 text-[#f0f0ff]/60">
                      {s}
                    </span>
                  ))}
                </div>

                {/* challenge */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#f0f0ff]/40 mb-1.5 font-mono">
                    {t(labels.challenge, lang)}
                  </p>
                  <p className="text-[#f0f0ff]/70 text-sm leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                {/* built + result */}
                <div className="grid sm:grid-cols-2 gap-5 pt-1">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#a47aff] mb-2 font-mono">
                      {t(labels.built, lang)}
                    </p>
                    <ul className="space-y-1.5">
                      {project.built.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-[#6c3aff] mt-1 shrink-0 text-[10px]">●</span>
                          <span className="text-[#f0f0ff]/60 text-xs leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#00d4ff] mb-2 font-mono">
                      {t(labels.result, lang)}
                    </p>
                    <ul className="space-y-1.5">
                      {project.results.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="w-3 h-3 text-[#00d4ff] mt-0.5 shrink-0" strokeWidth={3} />
                          <span className="text-[#f0f0ff]/65 text-xs leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-xs text-[#f0f0ff]/40 font-mono">{project.url.replace('https://', '')}</span>
                  <span
                    className="text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                    style={{ color: project.accent }}
                  >
                    {t(labels.viewLive, lang)}
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
