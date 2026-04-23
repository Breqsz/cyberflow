'use client';

import { useState } from 'react';
import { Check, Lock, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t, tArr } from '@/lib/i18n/content';

const trustIcons = [Lock, Check, Zap, Clock];

export const FinalCTA = () => {
  const { lang } = useLang();
  const c = content.cta;

  const [form, setForm] = useState({ name: '', email: '', phone: '', website: '', challenge: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateText = (k: 'name' | 'email' | 'phone' | 'website') =>
    (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const updateSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm((f) => ({ ...f, challenge: e.target.value }));

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
  const challengeOptions = tArr(c.challenge_options, lang);
  const fields = c.fields;

  const inputCls =
    'w-full bg-[#050510] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] placeholder-[#f0f0ff]/25 text-sm focus:outline-none focus:border-[#6c3aff]/50 focus:shadow-[0_0_0_3px_rgba(108,58,255,0.12)] transition-all';
  const labelCls = 'block text-xs text-[#f0f0ff]/55 mb-1.5 font-mono uppercase tracking-wide';

  return (
    <section id="contact" className="py-28 bg-[#050510] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#6c3aff]/10 blur-[140px] pointer-events-none" />

      {/* subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(108,58,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(108,58,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

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
            <p className="text-[#f0f0ff]/65 text-lg leading-relaxed mb-10">
              {t(c.sub, lang)}
            </p>

            {/* what happens */}
            <div className="space-y-4 mb-8">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#6c3aff]/15 border border-[#6c3aff]/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-mono font-bold text-[#a47aff]">{i + 1}</span>
                  </div>
                  <p className="text-[#f0f0ff]/75 text-sm">{step}</p>
                </div>
              ))}
            </div>

            {/* social proof */}
            <div className="flex items-start gap-3 pt-6 border-t border-white/8">
              <div className="flex -space-x-1">
                {['#6c3aff', '#a47aff', '#00d4ff'].map((color) => (
                  <span
                    key={color}
                    className="w-6 h-6 rounded-full border-2 border-[#050510]"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
                  />
                ))}
              </div>
              <p className="text-[#f0f0ff]/55 text-xs leading-relaxed pt-0.5">
                {t(c.social_proof, lang)}
              </p>
            </div>

            {/* trust */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
              {trust.map((item, i) => {
                const Icon = trustIcons[i] ?? Check;
                return (
                  <p key={i} className="text-[#f0f0ff]/55 text-xs flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-[#00d4ff]" />
                    {item}
                  </p>
                );
              })}
            </div>
          </div>

          {/* right: form */}
          <div className="bg-[#0d0d1a] border border-[#6c3aff]/15 rounded-2xl p-8 shadow-[0_0_60px_rgba(108,58,255,0.08)]">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#00d4ff]/15 border-2 border-[#00d4ff]/30 flex items-center justify-center mx-auto mb-5 animate-pulse-accent">
                  <Check className="w-7 h-7 text-[#00d4ff]" strokeWidth={3} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t(c.sent_title, lang)}</h3>
                <p className="text-[#f0f0ff]/65 text-sm leading-relaxed max-w-sm mx-auto">
                  {t(c.sent_body, lang)}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className={labelCls}>
                      {t(fields.name, lang)}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={updateText('name')}
                      placeholder={lang === 'pt' ? 'João Silva' : 'John Smith'}
                      className={inputCls}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className={labelCls}>
                      {t(fields.email, lang)}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={updateText('email')}
                      placeholder={lang === 'pt' ? 'joao@empresa.com' : 'john@company.com'}
                      className={inputCls}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className={labelCls}>
                      {t(fields.phone, lang)}
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={updateText('phone')}
                      placeholder="+55 (11) 00000-0000"
                      className={inputCls}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>
                      {t(fields.website, lang)}
                    </label>
                    <input
                      type="url"
                      value={form.website}
                      onChange={updateText('website')}
                      placeholder="https://yourwebsite.com"
                      className={inputCls}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>
                      {t(fields.challenge, lang)}
                    </label>
                    <select
                      value={form.challenge}
                      onChange={updateSelect}
                      className={`${inputCls} cursor-pointer appearance-none bg-[#050510]`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23f0f0ff88' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        paddingRight: '2.5rem',
                      }}
                    >
                      <option value="">{lang === 'pt' ? 'Selecione…' : 'Select…'}</option>
                      {challengeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
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

                <p className="text-center text-[#f0f0ff]/40 text-xs">{t(c.micro, lang)}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
