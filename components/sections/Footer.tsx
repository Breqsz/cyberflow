'use client';

import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

const footerAnchors = ['#how-it-works', '#services', '#work', '#pricing', 'https://breq.com.br'];

export const Footer = () => {
  const { lang } = useLang();
  const c = content.footer;
  const links = tArr(c.links, lang);

  return (
    <footer className="bg-[#050510] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <a href="/" className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-white">
                Cyber<span className="text-[#6c3aff]">Flow</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            </a>
            <p className="text-[#f0f0ff]/25 text-sm">{t(c.tagline, lang)}</p>
          </div>

          <nav className="flex items-center flex-wrap gap-x-6 gap-y-2">
            {links.map((label, i) => (
              <a
                key={label}
                href={footerAnchors[i]}
                target={footerAnchors[i].startsWith('http') ? '_blank' : undefined}
                rel={footerAnchors[i].startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-sm text-[#f0f0ff]/35 hover:text-[#f0f0ff]/70 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          <p className="text-[#f0f0ff]/20 text-xs whitespace-nowrap">
            © {new Date().getFullYear()} CyberFlow. {t(c.copy, lang)}
          </p>
        </div>
      </div>
    </footer>
  );
};
