'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import SpotlightCard from '@/components/ui/effects/SpotlightCard';

type Mode = 'signin' | 'signup' | 'magic';

const ERROR_LABELS: Record<string, string> = {
  auth_callback_failed: 'Não foi possível validar seu acesso. Tente novamente.',
  token_invalid_or_expired: 'Seu link expirou. Solicite um novo.',
  missing_auth_params: 'Link inválido. Solicite um novo acesso.',
  oauth_failed: 'Falha na autenticação com Google.',
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050510]" />}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialError = searchParams.get('error');

  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [sent, setSent] = useState(false);
  const [signupSent, setSignupSent] = useState(false);
  const [error, setError] = useState<string | null>(
    initialError ? ERROR_LABELS[initialError] ?? 'Erro ao autenticar.' : null
  );
  const [info, setInfo] = useState<string | null>(null);
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

  const getRedirectTo = () =>
    `${window.location.origin}/auth/callback?next=/onboarding`;

  const resetFeedback = () => {
    setError(null);
    setInfo(null);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      setError(
        signInError.message === 'Invalid login credentials'
          ? 'E-mail ou senha inválidos.'
          : signInError.message === 'Email not confirmed'
          ? 'Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.'
          : signInError.message
      );
      setLoading(false);
      return;
    }
    router.replace('/dashboard');
    router.refresh();
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    if (password.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getRedirectTo(),
        data: { name },
      },
    });
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }
    if (data.session) {
      router.replace('/onboarding');
      router.refresh();
      return;
    }
    setSignupSent(true);
    setLoading(false);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: getRedirectTo() },
    });
    if (signInError) {
      setError(signInError.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    resetFeedback();
    setGoogleLoading(true);
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: getRedirectTo() },
    });
    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
  };

  const handleResend = async () => {
    resetFeedback();
    setLoading(true);
    const supabase = createClient();
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: getRedirectTo() },
    });
    if (resendError) setError(resendError.message);
    else setInfo('E-mail de confirmação reenviado.');
    setLoading(false);
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    resetFeedback();
    setSent(false);
    setSignupSent(false);
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
            <h1 className="text-xl font-bold text-white mb-2">
              {mode === 'signup' ? 'Crie sua conta' : 'Acesse sua conta com segurança'}
            </h1>
            <p className="text-[#f0f0ff]/55 text-sm">
              {mode === 'signup'
                ? 'Cadastre-se para acompanhar seu projeto em tempo real.'
                : 'Entre com Google, senha ou link mágico.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1 mb-5 p-1 bg-[#050510] border border-white/10 rounded-xl">
            <button
              type="button"
              onClick={() => switchMode('signin')}
              className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                mode !== 'signup'
                  ? 'bg-[#6c3aff]/20 text-white border border-[#6c3aff]/40'
                  : 'text-[#f0f0ff]/55 hover:text-white'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => switchMode('signup')}
              className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'signup'
                  ? 'bg-[#6c3aff]/20 text-white border border-[#6c3aff]/40'
                  : 'text-[#f0f0ff]/55 hover:text-white'
              }`}
            >
              Criar conta
            </button>
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
            <span className="text-xs uppercase tracking-wider text-[#f0f0ff]/40">
              ou com e-mail
            </span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {mode === 'signup' && signupSent ? (
            <div className="text-center rounded-xl border border-[#6c3aff]/25 bg-[#6c3aff]/8 p-4 space-y-3">
              <p className="text-white font-semibold">Confirme seu e-mail</p>
              <p className="text-[#f0f0ff]/65 text-sm">
                Enviamos um link de confirmação para <strong>{email}</strong>. Clique
                no botão do e-mail para ativar sua conta.
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                className="text-xs text-[#a47aff] hover:text-white underline"
              >
                Não recebeu? Reenviar
              </button>
            </div>
          ) : mode === 'magic' && sent ? (
            <div className="text-center rounded-xl border border-[#6c3aff]/25 bg-[#6c3aff]/8 p-4">
              <p className="text-white font-semibold mb-2">Link enviado</p>
              <p className="text-[#f0f0ff]/65 text-sm">
                Confira sua caixa de entrada e clique no botão do e-mail.
              </p>
            </div>
          ) : mode === 'signup' ? (
            <form onSubmit={handleSignUp} className="space-y-3">
              <div>
                <label className="block text-sm text-[#f0f0ff]/55 mb-1.5">Nome</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como devemos te chamar?"
                  className="w-full bg-[#050510] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] placeholder-[#f0f0ff]/20 focus:outline-none focus:border-[#6c3aff]/50 transition-colors"
                />
              </div>
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
              <div>
                <label className="block text-sm text-[#f0f0ff]/55 mb-1.5">Senha</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-[#050510] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] placeholder-[#f0f0ff]/20 focus:outline-none focus:border-[#6c3aff]/50 transition-colors"
                />
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full justify-center" disabled={loading}>
                {loading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>
          ) : mode === 'magic' ? (
            <form onSubmit={handleMagicLink} className="space-y-3">
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
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="w-full text-xs text-[#a47aff] hover:text-white underline py-1"
              >
                Voltar para login com senha
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignIn} className="space-y-3">
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
              <div>
                <label className="block text-sm text-[#f0f0ff]/55 mb-1.5">Senha</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="w-full bg-[#050510] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] placeholder-[#f0f0ff]/20 focus:outline-none focus:border-[#6c3aff]/50 transition-colors"
                />
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full justify-center" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
              <button
                type="button"
                onClick={() => switchMode('magic')}
                className="w-full text-xs text-[#a47aff] hover:text-white underline py-1"
              >
                Prefiro entrar com link mágico
              </button>
            </form>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {info && (
            <p className="mt-4 text-sm text-emerald-200 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
              {info}
            </p>
          )}

          <div className="mt-6 space-y-2 text-center">
            <p className="text-[#f0f0ff]/35 text-xs">
              {mode === 'signup' ? 'Já tem conta?' : 'Ainda não tem conta?'}{' '}
              <button
                type="button"
                onClick={() => switchMode(mode === 'signup' ? 'signin' : 'signup')}
                className="text-[#6c3aff] hover:underline"
              >
                {mode === 'signup' ? 'Entrar' : 'Criar conta'}
              </button>
            </p>
            <p className="text-[#f0f0ff]/25 text-xs">
              Ao continuar, você concorda com nossos termos e política de privacidade.
            </p>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
