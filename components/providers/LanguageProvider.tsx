'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Lang } from '@/lib/i18n/content';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'BRL';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

const Ctx = createContext<LangCtx>({
  lang: 'en',
  setLang: () => {},
  toggle: () => {},
  currency: 'USD',
  setCurrency: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const toggle = () => setLang((l) => (l === 'en' ? 'pt' : 'en'));
  return <Ctx.Provider value={{ lang, setLang, toggle, currency, setCurrency }}>{children}</Ctx.Provider>;
};

export const useLang = () => useContext(Ctx);
