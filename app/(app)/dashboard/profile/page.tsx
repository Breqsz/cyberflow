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

  const field = (id: keyof ProfileForm, label: string, type = 'text', readOnly = false) => (
    <div key={id}>
      <label className="block text-xs text-[#f0f0ff]/40 mb-1.5">{label}</label>
      <input
        type={type}
        value={form[id]}
        onChange={(e) => !readOnly && setForm((prev) => ({ ...prev, [id]: e.target.value }))}
        readOnly={readOnly}
        className={`w-full bg-[#050510] border rounded-xl px-4 py-3 text-[#f0f0ff] text-sm focus:outline-none transition-colors ${
          readOnly
            ? 'border-white/[0.04] text-[#f0f0ff]/40 cursor-default'
            : 'border-white/10 focus:border-[#6c3aff]/50'
        }`}
      />
    </div>
  );

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">{t(c.title, lang)}</h1>
      <p className="text-[#f0f0ff]/50 mb-8">{t(c.subtitle, lang)}</p>

      <div className="bg-[#0d0d1a] border border-white/[0.05] rounded-2xl p-8 space-y-5">
        {field('name', t(c.name, lang))}
        {field('company_name', t(c.company, lang))}
        {field('email', t(c.email, lang), 'email', true)}
        {field('phone', t(c.phone, lang), 'tel')}

        <div>
          <label className="block text-xs text-[#f0f0ff]/40 mb-1.5">{t(c.country, lang)}</label>
          <select
            value={form.country}
            onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
            className="w-full bg-[#050510] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] text-sm focus:outline-none focus:border-[#6c3aff]/50 transition-colors"
          >
            <option value="">— selecionar —</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSave}
          disabled={isPending}
          className="w-full bg-[#6c3aff] hover:bg-[#7c4aff] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
        >
          {saved ? t(c.saved, lang) : isPending ? t(c.saving, lang) : t(c.save, lang)}
        </button>
      </div>
    </div>
  );
}
