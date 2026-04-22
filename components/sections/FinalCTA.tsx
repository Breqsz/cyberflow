'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

export const FinalCTA = () => {
  const { lang } = useLang();
  const c = content.cta;

  const [form, setForm] = useState({ name: '', email: '', phone: '', website: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch { /* noop */ }
    setSent(true);
    setLoading(false);
  };

  const steps = tArr(c.what_happens, lang);
  const trust = tArr(c.trust, lang);
  const fields = c.fields;

  const inputCls =
    'w-full bg-[#050510] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] placeholder-[#f0f0ff]/20 text-sm focus:outline-none focus:border-[#6c3aff]/50 transition-colors';

  return (
    <section id="contact" className="py-28 bg-[#050510] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#6c3aff]/8 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* left: copy */}
          <div>
            <Badge variant="primary" className="mb-6">{t(c.badge, lang)}</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              {t(c.headline, lang).split('\n').map((line, i) => (
                <span key={i}>
                  {i === 1 ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c3aff] to-[#00d4ff]">
                      {line}
                    </span>
                  ) : line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h2>
            <p className="text-[#f0f0ff]/50 text-lg leading-relaxed mb-10">
              {t(c.sub, lang)}
            </p>

            {/* what happens */}
            <div className="space-y-4 mb-10">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#6c3aff]/15 border border-[#6c3aff]/20 flex items-center justify-center shrink-0">
                    <span className="text-xs font-mono font-bold text-[#6c3aff]">{i + 1}</span>
                  </div>
                  <p className="text-[#f0f0ff]/65 text-sm">{step}</p>
                </div>
              ))}
            </div>

            {/* trust */}
            <div className="space-y-2">
              {trust.map((item, i) => (
                <p key={i} className="text-[#f0f0ff]/30 text-sm">{item}</p>
              ))}
            </div>
          </div>

          {/* right: form */}
          <div className="bg-[#0d0d1a] border border-white/6 rounded-2xl p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#6c3aff]/15 border border-[#6c3aff]/20 flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t(c.sent_title, lang)}</h3>
                <p className="text-[#f0f0ff]/50 text-sm leading-relaxed">{t(c.sent_body, lang)}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs text-[#f0f0ff]/40 mb-1.5 font-mono uppercase tracking-wide">
                      {t(fields.name, lang)}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder="John Smith"
                      className={inputCls}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs text-[#f0f0ff]/40 mb-1.5 font-mono uppercase tracking-wide">
                      {t(fields.email, lang)}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={update('email')}
                      placeholder="john@company.com"
                      className={inputCls}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs text-[#f0f0ff]/40 mb-1.5 font-mono uppercase tracking-wide">
                      {t(fields.phone, lang)}
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="+1 (555) 000-0000"
                      className={inputCls}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-[#f0f0ff]/40 mb-1.5 font-mono uppercase tracking-wide">
                      {t(fields.website, lang)}
                    </label>
                    <input
                      type="url"
                      value={form.website}
                      onChange={update('website')}
                      placeholder="https://yourwebsite.com"
                      className={inputCls}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full justify-center"
                >
                  {loading ? '...' : t(c.submit, lang)}
                </Button>

                <p className="text-center text-[#f0f0ff]/25 text-xs">{t(c.micro, lang)}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
