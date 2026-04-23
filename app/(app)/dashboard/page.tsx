import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import LanyardWidget from '@/components/dashboard/LanyardWidget';

const STAGE_ORDER = ['briefing', 'design', 'development', 'review', 'delivered'];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: customer }, { data: project }] = await Promise.all([
    supabase.from('customers').select('plan, status, created_at').eq('id', user!.id).single(),
    supabase.from('projects').select('current_stage').eq('customer_id', user!.id).single(),
  ]);

  const memberSince = customer?.created_at
    ? new Date(customer.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    : '—';

  const stageIndex = project ? STAGE_ORDER.indexOf(project.current_stage) : -1;
  const progress = stageIndex >= 0 ? Math.round(((stageIndex + 1) / STAGE_ORDER.length) * 100) : 0;

  const stagesLabels: Record<string, string> = {
    briefing: 'Briefing',
    design: 'Design',
    development: 'Desenvolvimento',
    review: 'Revisão',
    delivered: 'Entregue',
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Lanyard + stats side by side */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8 items-start">
        {/* Left: header + stats */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-1">Visão Geral</h1>
            <p className="text-[#f0f0ff]/50">Bem-vindo à sua área do cliente CyberFlow.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div className="bg-[#0d0d1a] border border-white/[0.05] rounded-2xl p-5">
              <p className="text-[#f0f0ff]/40 text-xs mb-1.5">Plano atual</p>
              <p className="text-2xl font-bold text-[#6c3aff] capitalize">{customer?.plan ?? '—'}</p>
            </div>
            <div className="bg-[#0d0d1a] border border-white/[0.05] rounded-2xl p-5">
              <p className="text-[#f0f0ff]/40 text-xs mb-1.5">Status</p>
              <p className="text-2xl font-bold text-[#00d4ff] capitalize">{customer?.status ?? '—'}</p>
            </div>
            <div className="bg-[#0d0d1a] border border-white/[0.05] rounded-2xl p-5">
              <p className="text-[#f0f0ff]/40 text-xs mb-1.5">Membro desde</p>
              <p className="text-2xl font-bold text-white">{memberSince}</p>
            </div>
          </div>

          {project ? (
            <Link
              href="/dashboard/progress"
              className="block bg-[#0d0d1a] border border-[#6c3aff]/20 rounded-2xl p-6 mb-5 hover:border-[#6c3aff]/40 transition-colors"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-semibold text-white">Progresso do projeto</p>
                <p className="text-xs text-[#6c3aff]">Ver detalhes →</p>
              </div>
              <div className="bg-[#111124] rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-[#6c3aff] to-[#00d4ff] h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-[#f0f0ff]/40">
                Etapa atual:{' '}
                <span className="text-[#00d4ff]">
                  {stagesLabels[project.current_stage] ?? project.current_stage}
                </span>
              </p>
            </Link>
          ) : (
            <div className="bg-[#0d0d1a] border border-[#6c3aff]/20 rounded-2xl p-8 text-center mb-5">
              <div className="text-4xl mb-3">🚀</div>
              <h2 className="text-xl font-semibold text-white mb-2">Seu projeto será iniciado em breve</h2>
              <p className="text-[#f0f0ff]/50 max-w-md mx-auto">
                Em breve você terá acesso a relatórios, atualizações e comunicação direta com a equipe CyberFlow.
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            {[
              { href: '/dashboard/invoices', icon: '💳', label: 'Ver faturas' },
              { href: '/dashboard/messages', icon: '💬', label: 'Mensagens' },
              { href: '/dashboard/profile', icon: '⚙️', label: 'Editar perfil' },
            ].map(({ href, icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 bg-[#0d0d1a] border border-white/[0.05] rounded-xl p-4 hover:border-[#6c3aff]/30 transition-colors"
              >
                <span className="text-lg">{icon}</span>
                <span className="text-xs font-medium text-[#f0f0ff]/70">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Lanyard widget */}
        <div className="hidden lg:block">
          <LanyardWidget />
        </div>
      </div>
    </div>
  );
}
