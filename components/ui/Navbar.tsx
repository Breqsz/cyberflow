'use client';

import { useState, useEffect } from 'react';
import { LinkButton } from './Button';

const navLinks = [
  { label: 'Como funciona', href: '#how-it-works' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Planos', href: '#plans' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#050510]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-tight text-white">
            Cyber<span className="text-[#6c3aff]">Flow</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[#f0f0ff]/70 hover:text-[#f0f0ff] transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <LinkButton href="#plans" variant="outline" size="sm">
            Ver planos
          </LinkButton>
          <LinkButton href="#cta" variant="primary" size="sm">
            Começar agora
          </LinkButton>
        </div>

        <button
          className="md:hidden text-[#f0f0ff]/70 hover:text-[#f0f0ff] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#050510]/95 backdrop-blur-md border-b border-white/5 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-[#f0f0ff]/70 hover:text-[#f0f0ff] py-2 text-sm"
            >
              {link.label}
            </a>
          ))}
          <LinkButton href="#plans" variant="primary" size="sm" className="w-full justify-center mt-2">
            Começar agora
          </LinkButton>
        </div>
      )}
    </nav>
  );
};
