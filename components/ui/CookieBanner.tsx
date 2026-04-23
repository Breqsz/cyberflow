'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t } from '@/lib/i18n/content';

const COOKIE_KEY = 'cyberflow_cookie_consent';

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='))
    ?.split('=')[1];
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export function CookieBanner() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookie(COOKIE_KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    setCookie(COOKIE_KEY, 'accepted', 365);
    setVisible(false);
  };

  const decline = () => {
    setCookie(COOKIE_KEY, 'declined', 365);
    setVisible(false);
  };

  const c = content.cookie;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d1f] border-t border-[#6c3aff]/20 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="text-sm text-[#f0f0ff]/60 max-w-2xl">
        {t(c.message, lang)}
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={decline}
          className="px-4 py-2 rounded-lg border border-white/10 text-[#f0f0ff]/50 text-sm hover:border-white/20 transition-colors"
        >
          {t(c.decline, lang)}
        </button>
        <button
          onClick={accept}
          className="px-4 py-2 rounded-lg bg-[#6c3aff] text-white text-sm font-semibold hover:bg-[#7c4aff] transition-colors"
        >
          {t(c.accept, lang)}
        </button>
      </div>
    </div>
  );
}
