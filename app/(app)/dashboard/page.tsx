import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('id', user?.id)
    .single();

  return (
    <div className="min-h-screen bg-[#050510] text-[#f0f0ff] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Olá, {user?.email?.split('@')[0]}</h1>
          <p className="text-[#f0f0ff]/50">Bem-vindo à área do cliente CyberFlow.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-6">
            <p className="text-[#f0f0ff]/40 text-sm mb-1">Plano atual</p>
            <p className="text-2xl font-bold text-[#6c3aff] capitalize">{customer?.plan ?? '—'}</p>
          </div>
          <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-6">
            <p className="text-[#f0f0ff]/40 text-sm mb-1">Status</p>
            <p className="text-2xl font-bold text-[#00d4ff] capitalize">{customer?.status ?? '—'}</p>
          </div>
          <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-6">
            <p className="text-[#f0f0ff]/40 text-sm mb-1">Membro desde</p>
            <p className="text-2xl font-bold text-white">
              {customer?.created_at
                ? new Date(customer.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
                : '—'}
            </p>
          </div>
        </div>

        <div className="bg-[#0d0d1a] border border-[#6c3aff]/20 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🚀</div>
          <h2 className="text-xl font-semibold text-white mb-2">Seu projeto está em andamento</h2>
          <p className="text-[#f0f0ff]/50 max-w-md mx-auto">
            Em breve você terá acesso a relatórios, atualizações e comunicação direta com a equipe CyberFlow.
          </p>
        </div>
      </div>
    </div>
  );
}
