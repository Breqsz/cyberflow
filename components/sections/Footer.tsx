'use client';

import Link from 'next/link';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

const footerAnchors = ['#how-it-works', '#services', '#work', '#pricing'];

export const Footer = () => {
  const { lang } = useLang();
  const c = content.footer;
  const links = tArr(c.links, lang);

  return (
    <footer className="bg-[#050510] border-t border-white/8 relative">
      {/* subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-[#6c3aff]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-white">
                Cyber<span className="text-[#6c3aff]">Flow</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            </Link>
            <p className="text-[#f0f0ff]/50 text-sm leading-relaxed">{t(c.tagline, lang)}</p>
          </div>

          <nav className="flex items-center flex-wrap gap-x-6 gap-y-2">
            {links.map((label, i) => (
              <a
                key={label}
                href={footerAnchors[i]}
                className="text-sm text-[#f0f0ff]/50 hover:text-[#f0f0ff] transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[#f0f0ff]/30 text-xs">
            © {new Date().getFullYear()} CyberFlow. {t(c.copy, lang)}
          </p>
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-[#f0f0ff]/30">
            <span>Built with Next.js</span>
            <span className="w-1 h-1 rounded-full bg-[#f0f0ff]/20" />
            <span>Hosted on Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
