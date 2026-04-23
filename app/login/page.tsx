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
      options: { emailRedirectTo: getRedirectTo(), shouldCreateUser: false },
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
    <div className="min-h-screen bg-[#050510] flex flex-col">
      <div className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-lg font-extrabold text-white">
          Cyber<span className="text-[#6c3aff]">Flow</span>
        </Link>
        <Link
          href="/"
          className="text-sm text-[#f0f0ff]/60 hover:text-white transition-colors inline-flex items-center gap-1.5"
        >
          <span>←</span> Voltar ao site
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          <SpotlightCard
            className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-8"
            spotlightColor="rgba(108,58,255,0.30)"
          >
            <div className="text-center mb-6">
              <Badge variant="surface" className="mb-4">
                Área do Cliente
              </Badge>
              <h1 className="text-xl font-bold text-white mb-2">
                {mode === 'signup' ? 'Crie sua conta' : 'Bem-vindo de volta'}
              </h1>
              <p className="text-[#f0f0ff]/55 text-sm">
                {mode === 'signup'
                  ? 'Cadastre-se e acompanhe seu projeto em tempo real.'
                  : 'Entre com Google, senha ou link mágico.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-1 mb-5 p-1 bg-[#050510] border border-white/10 rounded-xl">
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
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
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
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
              <div className="text-center rounded-xl border border-[#6c3aff]/30 bg-gradient-to-br from-[#6c3aff]/10 to-transparent p-5 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#6c3aff]/15 border border-[#6c3aff]/30 flex items-center justify-center mx-auto text-2xl">
                  ✉️
                </div>
                <div className="space-y-2">
                  <p className="text-white font-semibold">Confirme seu e-mail</p>
                  <p className="text-[#f0f0ff]/65 text-sm leading-relaxed">
                    Enviamos um link para{' '}
                    <strong className="text-white">{email}</strong>.
                    <br />
                    Clique no botão do e-mail para ativar sua conta e entrar.
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={loading}
                    className="text-xs text-[#a47aff] hover:text-white underline disabled:opacity-50"
                  >
                    {loading ? 'Reenviando...' : 'Não recebeu? Reenviar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => switchMode('signin')}
                    className="text-xs text-[#f0f0ff]/45 hover:text-white underline"
                  >
                    Já confirmei, ir para entrar
                  </button>
                </div>
              </div>
            ) : mode === 'magic' && sent ? (
              <div className="text-center rounded-xl border border-[#6c3aff]/30 bg-gradient-to-br from-[#6c3aff]/10 to-transparent p-5 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#6c3aff]/15 border border-[#6c3aff]/30 flex items-center justify-center mx-auto text-2xl">
                  🔗
                </div>
                <p className="text-white font-semibold">Link enviado</p>
                <p className="text-[#f0f0ff]/65 text-sm">
                  Confira sua caixa de entrada e clique no botão do e-mail.
                </p>
              </div>
            ) : mode === 'signup' ? (
              <form onSubmit={handleSignUp} className="space-y-3">
                <Field
                  label="Nome"
                  type="text"
                  value={name}
                  onChange={setName}
                  placeholder="Como devemos te chamar?"
                  required
                />
                <Field
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="seu@email.com"
                  required
                />
                <Field
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  disabled={loading}
                >
                  {loading ? 'Criando conta...' : 'Criar conta e receber link'}
                </Button>
                <p className="text-[10px] text-[#f0f0ff]/40 text-center pt-1">
                  Enviaremos um link de confirmação para ativar sua conta
                </p>
              </form>
            ) : mode === 'magic' ? (
              <form onSubmit={handleMagicLink} className="space-y-3">
                <Field
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="seu@email.com"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  disabled={loading}
                >
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
                <Field
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="seu@email.com"
                  required
                />
                <Field
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="Sua senha"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  disabled={loading}
                >
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
                  className="text-[#6c3aff] hover:underline font-medium"
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
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  minLength,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <div>
      <label className="block text-xs text-[#f0f0ff]/55 mb-1.5 font-medium">{label}</label>
      <input
        type={type}
        required={required}
        minLength={minLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#050510] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] placeholder-[#f0f0ff]/20 focus:outline-none focus:border-[#6c3aff]/50 focus:ring-1 focus:ring-[#6c3aff]/20 transition-all text-sm"
      />
    </div>
  );
}
