'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const FinalCTA = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" className="py-24 bg-[#050510] relative overflow-hidden">
      {/* glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6c3aff]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative">
        <div className="bg-[#0d0d1a] border border-[#6c3aff]/20 rounded-3xl p-10 md:p-14 text-center shadow-[0_0_60px_rgba(108,58,255,0.1)]">
          <Badge variant="primary" className="mb-6">Vagas limitadas</Badge>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Chega de perder vendas
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c3aff] to-[#00d4ff]">
              para o concorrente.
            </span>
          </h2>

          <p className="text-[#f0f0ff]/50 text-lg mb-10 max-w-xl mx-auto">
            Deixe seu contato. Em até 24 horas faremos um diagnóstico gratuito da sua presença digital.
          </p>

          {sent ? (
            <div className="py-8">
              <div className="text-5xl mb-4">🚀</div>
              <p className="text-xl font-semibold text-white mb-2">Recebido!</p>
              <p className="text-[#f0f0ff]/50">Entraremos em contato em breve para o diagnóstico gratuito.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#f0f0ff]/50 mb-1.5">Nome</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Seu nome"
                    className="w-full bg-[#050510] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] placeholder-[#f0f0ff]/20 focus:outline-none focus:border-[#6c3aff]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#f0f0ff]/50 mb-1.5">WhatsApp</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-[#050510] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] placeholder-[#f0f0ff]/20 focus:outline-none focus:border-[#6c3aff]/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#f0f0ff]/50 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full bg-[#050510] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] placeholder-[#f0f0ff]/20 focus:outline-none focus:border-[#6c3aff]/50 transition-colors"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full justify-center"
              >
                {loading ? 'Enviando...' : 'Quero meu diagnóstico gratuito →'}
              </Button>
            </form>
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-[#f0f0ff]/30">
            <span>🔒 Seus dados são sigilosos</span>
            <span>✓ Sem compromisso</span>
            <span>⚡ Resposta em até 24h</span>
          </div>
        </div>
      </div>
    </section>
  );
};
