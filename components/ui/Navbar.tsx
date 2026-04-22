'use client';

import { useState, useEffect } from 'react';
import { LinkButton } from './Button';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

const anchors = ['#how-it-works', '#services', '#work', '#pricing'];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggle } = useLang();

  const links = tArr(content.nav.links, lang);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050510]/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* logo */}
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-tight text-white">
            Cyber<span className="text-[#6c3aff]">Flow</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
        </a>

        {/* desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((label, i) => (
            <li key={label}>
              <a
                href={anchors[i]}
                className="text-sm text-[#f0f0ff]/60 hover:text-[#f0f0ff] transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* language toggle */}
          <button
            onClick={toggle}
            className="text-xs font-mono px-3 py-1.5 rounded-lg border border-white/10 text-[#f0f0ff]/50 hover:text-[#f0f0ff] hover:border-white/20 transition-all"
          >
            {lang === 'en' ? 'PT' : 'EN'}
          </button>
          <LinkButton href="#contact" variant="primary" size="sm">
            {t(content.nav.cta, lang)}
          </LinkButton>
        </div>

        {/* mobile toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs font-mono px-2.5 py-1 rounded border border-white/10 text-[#f0f0ff]/50"
          >
            {lang === 'en' ? 'PT' : 'EN'}
          </button>
          <button
            className="text-[#f0f0ff]/60 hover:text-[#f0f0ff] p-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#050510]/98 backdrop-blur-xl border-b border-white/5 px-6 py-5 space-y-1">
          {links.map((label, i) => (
            <a
              key={label}
              href={anchors[i]}
              onClick={() => setMobileOpen(false)}
              className="block text-[#f0f0ff]/60 hover:text-[#f0f0ff] py-2.5 text-sm border-b border-white/5 last:border-0"
            >
              {label}
            </a>
          ))}
          <div className="pt-3">
            <LinkButton href="#contact" variant="primary" size="sm" className="w-full justify-center">
              {t(content.nav.cta, lang)}
            </LinkButton>
          </div>
        </div>
      )}
    </nav>
  );
};
