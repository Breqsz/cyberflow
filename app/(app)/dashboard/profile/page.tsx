'use client';

import { useState, useEffect, useTransition } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t } from '@/lib/i18n/content';

const COUNTRIES = [
  'Brasil', 'Portugal', 'Estados Unidos', 'Reino Unido', 'Espanha',
  'França', 'Alemanha', 'Itália', 'Canadá', 'Austrália', 'Argentina',
  'México', 'Chile', 'Colômbia', 'Uruguai', 'Outro',
];

type ProfileForm = {
  name: string;
  company_name: string;
  email: string;
  phone: string;
  country: string;
};

export default function ProfilePage() {
  const { lang } = useLang();
  const c = content.dashboard.profile;
  const [form, setForm] = useState<ProfileForm>({
    name: '', company_name: '', email: '', phone: '', country: '',
  });
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('name, company_name, email, phone, country')
        .eq('id', user.id)
        .single();
      setForm({
        name: data?.name ?? '',
        company_name: data?.company_name ?? '',
        email: data?.email ?? user.email ?? '',
        phone: data?.phone ?? '',
        country: data?.country ?? '',
      });
      setLoaded(true);
    });
  }, []);

  const handleSave = () => {
    startTransition(async () => {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  };

  const displayName = form.company_name || form.name || form.email.split('@')[0] || 'Cliente';
  const initials = displayName
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const completeness = [form.name, form.company_name, form.phone, form.country].filter(
    (v) => v && v.length > 0
  ).length;
  const pct = Math.round((completeness / 4) * 100);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-[#6c3aff] mb-1">Conta</p>
        <h1 className="text-3xl font-bold text-white">{t(c.title, lang)}</h1>
        <p className="text-[#f0f0ff]/50 mt-1">{t(c.subtitle, lang)}</p>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] via-[#0d0d1a] to-[#1a0d2e] border border-white/5 rounded-2xl p-6 mb-6">
        <div className="absolute -right-20 -top-20 w-48 h-48 bg-[#6c3aff]/15 rounded-full blur-3xl" />
        <div className="relative flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6c3aff] to-[#00d4ff] flex items-center justify-center text-2xl font-bold text-white shrink-0">
            {initials || 'C'}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white truncate">{displayName}</h2>
            <p className="text-sm text-[#f0f0ff]/50 truncate">{form.email || '—'}</p>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase tracking-widest text-[#6c3aff] font-semibold">
                  Completude do perfil
                </span>
                <span className="text-xs font-semibold text-[#a47aff]">{pct}%</span>
              </div>
              <div className="h-1.5 bg-[#111124] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#6c3aff] to-[#00d4ff] transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-7 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <Field
            label={t(c.name, lang)}
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
          />
          <Field
            label={t(c.company, lang)}
            value={form.company_name}
            onChange={(v) => setForm((p) => ({ ...p, company_name: v }))}
          />
        </div>

        <Field
          label={t(c.email, lang)}
          value={form.email}
          type="email"
          readOnly
          hint="O e-mail só pode ser alterado em contato com a equipe"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <Field
            label={t(c.phone, lang)}
            value={form.phone}
            type="tel"
            placeholder="+55 11 99999-9999"
            onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
          />
          <div>
            <label className="block text-xs text-[#f0f0ff]/55 mb-1.5 font-medium">
              {t(c.country, lang)}
            </label>
            <select
              value={form.country}
              onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
              className="w-full bg-[#050510] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] text-sm focus:outline-none focus:border-[#6c3aff]/50 transition-colors"
            >
              <option value="">— selecionar —</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isPending || !loaded}
          className={`w-full font-semibold py-3 rounded-xl transition-all text-sm ${
            saved
              ? 'bg-emerald-500 text-white'
              : 'bg-gradient-to-br from-[#6c3aff] to-[#4a20b5] hover:from-[#7c4aff] text-white disabled:opacity-50'
          }`}
        >
          {saved ? `✓ ${t(c.saved, lang)}` : isPending ? t(c.saving, lang) : t(c.save, lang)}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  readOnly,
  hint,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-[#f0f0ff]/55 mb-1.5 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={(e) => !readOnly && onChange?.(e.target.value)}
        className={`w-full rounded-xl px-4 py-3 text-sm transition-colors ${
          readOnly
            ? 'bg-[#050510]/60 border border-white/[0.04] text-[#f0f0ff]/55 cursor-default'
            : 'bg-[#050510] border border-white/10 text-[#f0f0ff] focus:outline-none focus:border-[#6c3aff]/50 placeholder-[#f0f0ff]/20'
        }`}
      />
      {hint && <p className="text-[10px] text-[#f0f0ff]/35 mt-1.5">{hint}</p>}
    </div>
  );
}
