'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Lang } from '@/lib/i18n/content';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, toggle: () => {} });

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('en');
  const toggle = () => setLang((l) => (l === 'en' ? 'pt' : 'en'));
  return <Ctx.Provider value={{ lang, setLang, toggle }}>{children}</Ctx.Provider>;
};

export const useLang = () => useContext(Ctx);
