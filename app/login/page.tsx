'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import SpotlightCard from '@/components/ui/effects/SpotlightCard';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      if (data.session) router.replace('/dashboard');
    };
    void checkSession();
  }, [router]);

  const getRedirectTo = () => `${window.location.origin}/auth/callback?next=/onboarding`;

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: getRedirectTo(),
      },
    });
    if (signInError) {
      setError(signInError.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError(null);
    setGoogleLoading(true);
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getRedirectTo(),
      },
    });
    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        <SpotlightCard className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-8" spotlightColor="rgba(108,58,255,0.30)">
          <div className="text-center mb-6">
            <Badge variant="surface" className="mb-4">
              Área do Cliente
            </Badge>
            <Link href="/" className="inline-block text-2xl font-bold text-white mb-3">
              Cyber<span className="text-[#6c3aff]">Flow</span>
            </Link>
            <h1 className="text-xl font-bold text-white mb-2">Acesse sua conta com segurança</h1>
            <p className="text-[#f0f0ff]/55 text-sm">
              Entre com Google ou receba um link de acesso no seu e-mail.
            </p>
          </div>

          <div className="space-y-3 mb-5">
            <Button
              type="button"
              variant="outline"
              size="md"
              className="w-full justify-center"
              onClick={handleGoogle}
              disabled={googleLoading}
            >
              {googleLoading ? 'Redirecionando...' : 'Continuar com Google'}
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-xs uppercase tracking-wider text-[#f0f0ff]/40">ou por e-mail</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {sent ? (
            <div className="text-center rounded-xl border border-[#6c3aff]/25 bg-[#6c3aff]/8 p-4">
              <p className="text-white font-semibold mb-2">Link enviado</p>
              <p className="text-[#f0f0ff]/65 text-sm">
                Confira sua caixa de entrada e clique no botão do e-mail para concluir o acesso.
              </p>
            </div>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div>
                <label className="block text-sm text-[#f0f0ff]/55 mb-1.5">E-mail</label>
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
                {loading ? 'Enviando link...' : 'Receber link de acesso'}
              </Button>
            </form>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="mt-6 space-y-2 text-center">
            <p className="text-[#f0f0ff]/25 text-xs">
              Não tem conta? <Link href="/#pricing" className="text-[#6c3aff] hover:underline">Escolha um plano</Link>
            </p>
            <p className="text-[#f0f0ff]/25 text-xs">
              Ao continuar, você receberá um token seguro por e-mail para validar o acesso.
            </p>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
