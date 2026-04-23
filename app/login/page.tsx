'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/dashboard` } });
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-xl font-bold text-white mb-4">
            Cyber<span className="text-[#6c3aff]">Flow</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Área do cliente</h1>
          <p className="text-[#f0f0ff]/50 text-sm">Acesse com seu email para continuar.</p>
        </div>

        <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-8">
          {sent ? (
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <p className="text-white font-semibold mb-2">Link enviado!</p>
              <p className="text-[#f0f0ff]/50 text-sm">Verifique seu email para acessar sua conta.</p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-[#f0f0ff]/50 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-[#050510] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] placeholder-[#f0f0ff]/20 focus:outline-none focus:border-[#6c3aff]/50 transition-colors"
                />
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full justify-center" disabled={loading}>
                {loading ? 'Enviando...' : 'Entrar com email →'}
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-[#f0f0ff]/20 text-xs mt-6">
          Não tem conta? <Link href="/#pricing" className="text-[#6c3aff] hover:underline">Escolha um plano</Link>
        </p>
      </div>
    </div>
  );
}
