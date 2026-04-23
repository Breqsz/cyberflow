'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
  lang: 'pt',
  setLang: () => {},
  toggle: () => {},
  currency: 'BRL',
  setCurrency: () => {},
});

function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const val = localStorage.getItem(key);
    return val ? (JSON.parse(val) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>('pt');
  const [currency, setCurrencyState] = useState<Currency>('BRL');

  useEffect(() => {
    setLangState(getStored<Lang>('cf_lang', 'pt'));
    setCurrencyState(getStored<Currency>('cf_currency', 'BRL'));
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('cf_lang', JSON.stringify(l));
  };

  const toggle = () => {
    const next: Lang = lang === 'en' ? 'pt' : 'en';
    setLang(next);
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('cf_currency', JSON.stringify(c));
  };

  return (
    <Ctx.Provider value={{ lang, setLang, toggle, currency, setCurrency }}>
      {children}
    </Ctx.Provider>
  );
};

export const useLang = () => useContext(Ctx);
