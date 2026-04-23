import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const PLAN_LABELS: Record<string, string> = {
  starter: 'Launch',
  growth: 'Scale',
  pro: 'Dominate',
  onetime: 'Ignite',
};

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const [{ data: existingCustomer }, { data: profile }] = await Promise.all([
    supabase.from('customers').select('id, plan, status').eq('id', user.id).single(),
    supabase.from('profiles').select('email').eq('id', user.id).single(),
  ]);

  if (user.email && profile?.email !== user.email) {
    await supabase.from('profiles').update({ email: user.email }).eq('id', user.id);
  }

  if (!existingCustomer) {
    await supabase.from('customers').upsert({
      id: user.id,
      status: 'pending',
      plan: null,
    });
  }

  const customer = existingCustomer ?? { plan: null as string | null, status: 'pending' as string };
  const accountEmail = user.email ?? profile?.email ?? 'email nÃ£o disponÃ­vel';
  const resolvedPlan = customer.plan ? PLAN_LABELS[customer.plan] ?? customer.plan : null;

  return (
    <div className="min-h-screen bg-[#050510] text-[#f0f0ff] px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-8">
          <p className="text-xs uppercase tracking-widest text-[#6c3aff] mb-2">Onboarding</p>
          <h1 className="text-3xl font-bold text-white mb-2">Conta autenticada com sucesso</h1>
          <p className="text-[#f0f0ff]/55 mb-8">
            Identificamos sua conta por e-mail e carregamos o nÃ­vel de acesso com base no seu plano atual.
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-8">
            <div className="rounded-xl border border-white/10 bg-[#050510] p-4">
              <p className="text-xs text-[#f0f0ff]/45 mb-1">E-mail da conta</p>
              <p className="text-sm font-semibold break-all">{accountEmail}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#050510] p-4">
              <p className="text-xs text-[#f0f0ff]/45 mb-1">NÃ­vel da conta (plano)</p>
              <p className="text-sm font-semibold">
                {resolvedPlan ?? 'Sem plano ativo'}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#050510] p-4 md:col-span-2">
              <p className="text-xs text-[#f0f0ff]/45 mb-1">Status</p>
              <p className="text-sm font-semibold capitalize">{customer.status ?? 'pending'}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-[#6c3aff] text-white font-medium hover:bg-[#5a2ee0] transition-colors"
            >
              Ir para o dashboard
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-white/15 text-[#f0f0ff] hover:bg-white/5 transition-colors"
            >
              Ver planos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
