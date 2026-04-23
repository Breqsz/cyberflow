import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

const STAGE_ORDER = ['briefing', 'design', 'development', 'review', 'delivered'] as const;

const STAGE_LABELS: Record<string, string> = {
  briefing: 'Briefing',
  design: 'Design',
  development: 'Desenvolvimento',
  review: 'Revisão',
  delivered: 'Entregue',
};

const PLAN_LABELS: Record<string, string> = {
  starter: 'Launch',
  growth: 'Scale',
  pro: 'Dominate',
  onetime: 'Ignite',
};

const greet = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: profile }, { data: customer }, { data: project }, { data: recentMessages }] = await Promise.all([
    supabase.from('profiles').select('name, company_name').eq('id', user!.id).single(),
    supabase.from('customers').select('plan, status, created_at').eq('id', user!.id).single(),
    supabase.from('projects').select('current_stage, stage_note, updated_at').eq('customer_id', user!.id).maybeSingle(),
    supabase
      .from('messages')
      .select('id, sender_role, content, created_at, read_at')
      .eq('customer_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(3),
  ]);

  const firstName =
    profile?.name?.split(' ')[0] ?? profile?.company_name ?? user!.email!.split('@')[0];

  const memberSince = customer?.created_at
    ? new Date(customer.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    : '—';

  const stageIndex = project ? STAGE_ORDER.indexOf(project.current_stage as typeof STAGE_ORDER[number]) : -1;
  const progress = stageIndex >= 0 ? Math.round(((stageIndex + 1) / STAGE_ORDER.length) * 100) : 0;
  const planLabel = customer?.plan ? PLAN_LABELS[customer.plan] ?? customer.plan : null;

  const unreadAdmin = (recentMessages ?? []).filter(
    (m) => m.sender_role === 'admin' && !m.read_at
  ).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#6c3aff] mb-1">Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {greet()}, <span className="text-[#a47aff]">{firstName}</span> 👋
          </h1>
          <p className="text-[#f0f0ff]/50 mt-1.5">Aqui está um resumo do seu projeto hoje.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/messages"
            className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6c3aff]/10 border border-[#6c3aff]/25 text-[#c4a8ff] hover:bg-[#6c3aff]/20 text-sm font-medium transition-colors"
          >
            💬 Mensagens
            {unreadAdmin > 0 && (
              <span className="bg-[#6c3aff] text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                {unreadAdmin}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon="⚡"
          label="Plano atual"
          value={planLabel ?? 'Sem plano'}
          accent="#6c3aff"
          hint={customer?.plan ? 'Ativo' : 'Escolha um plano'}
          href={customer?.plan ? '/dashboard/invoices' : '/#pricing'}
        />
        <StatCard
          icon="🟢"
          label="Status da conta"
          value={customer?.status ? capitalize(customer.status) : 'Pending'}
          accent="#00d4ff"
          hint={customer?.status === 'active' ? 'Tudo em ordem' : 'Aguardando ação'}
        />
        <StatCard
          icon="🗓"
          label="Membro desde"
          value={memberSince}
          accent="#a47aff"
          hint="Obrigado pela parceria"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {project ? (
            <Link
              href="/dashboard/progress"
              className="block relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] via-[#0d0d1a] to-[#1a0d2e] border border-[#6c3aff]/20 rounded-2xl p-7 hover:border-[#6c3aff]/40 transition-all group"
            >
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#6c3aff]/10 rounded-full blur-3xl group-hover:bg-[#6c3aff]/20 transition-colors" />
              <div className="relative">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#6c3aff] mb-1">Progresso</p>
                    <h2 className="text-xl font-bold text-white">
                      Etapa atual:{' '}
                      <span className="text-[#00d4ff]">
                        {STAGE_LABELS[project.current_stage] ?? project.current_stage}
                      </span>
                    </h2>
                  </div>
                  <span className="text-sm font-semibold text-[#a47aff]">{progress}%</span>
                </div>

                <div className="relative h-2 bg-[#111124] rounded-full overflow-hidden mb-4">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#6c3aff] to-[#00d4ff] rounded-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="grid grid-cols-5 gap-1 mb-5">
                  {STAGE_ORDER.map((s, i) => {
                    const done = i < stageIndex;
                    const active = i === stageIndex;
                    return (
                      <div key={s} className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-full h-1 rounded-full ${
                            done
                              ? 'bg-[#6c3aff]'
                              : active
                              ? 'bg-gradient-to-r from-[#6c3aff] to-[#00d4ff]'
                              : 'bg-[#1a1a2e]'
                          }`}
                        />
                        <span
                          className={`text-[10px] font-medium ${
                            done ? 'text-[#a47aff]' : active ? 'text-[#00d4ff]' : 'text-[#555]'
                          }`}
                        >
                          {STAGE_LABELS[s]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {project.stage_note && (
                  <div className="rounded-xl bg-[#050510]/60 border border-white/5 p-4 mt-4">
                    <p className="text-[10px] uppercase tracking-widest text-[#6c3aff] mb-1">
                      Nota da equipe
                    </p>
                    <p className="text-sm text-[#f0f0ff]/75 leading-relaxed">{project.stage_note}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-[#a47aff] mt-5 group-hover:gap-3 transition-all">
                  Ver todas as etapas
                  <span>→</span>
                </div>
              </div>
            </Link>
          ) : (
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] to-[#0d0d1a] border border-dashed border-[#6c3aff]/25 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-xl font-bold text-white mb-2">
                Seu projeto começa em breve
              </h2>
              <p className="text-[#f0f0ff]/50 max-w-md mx-auto mb-5">
                Assim que iniciarmos, você verá aqui o andamento de cada etapa em tempo real.
              </p>
              <Link
                href="/dashboard/messages"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6c3aff] hover:bg-[#7c4aff] text-white text-sm font-semibold transition-colors"
              >
                Fale com a equipe →
              </Link>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <QuickAction href="/dashboard/invoices" icon="💳" label="Faturas" />
            <QuickAction href="/dashboard/messages" icon="💬" label="Mensagens" badge={unreadAdmin} />
            <QuickAction href="/dashboard/profile" icon="⚙️" label="Perfil" />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-[#6c3aff] mb-3">Atividade recente</p>
            {recentMessages && recentMessages.length > 0 ? (
              <ul className="space-y-3">
                {recentMessages.map((msg) => {
                  const isTeam = msg.sender_role === 'admin';
                  return (
                    <li key={msg.id} className="flex gap-3 items-start">
                      <div
                        className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isTeam
                            ? 'bg-[#6c3aff]/20 border border-[#6c3aff]/30 text-[#a47aff]'
                            : 'bg-[#00d4ff]/15 border border-[#00d4ff]/25 text-[#00d4ff]'
                        }`}
                      >
                        {isTeam ? 'CF' : 'V'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white">
                          {isTeam ? 'CyberFlow' : 'Você'}
                        </p>
                        <p className="text-xs text-[#f0f0ff]/55 line-clamp-2 mt-0.5">
                          {msg.content}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-xs text-[#f0f0ff]/40">
                Sem mensagens ainda. Fale com a equipe CyberFlow.
              </p>
            )}
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#6c3aff]/25 bg-gradient-to-br from-[#1a0d2e] via-[#0d0d1a] to-[#0d0d1a] p-5">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#00d4ff]/15 rounded-full blur-3xl" />
            <div className="relative">
              <p className="text-xs uppercase tracking-widest text-[#00d4ff] mb-2">Dica</p>
              <h3 className="text-sm font-bold text-white mb-2">
                Mantenha seu perfil atualizado
              </h3>
              <p className="text-xs text-[#f0f0ff]/55 mb-4 leading-relaxed">
                Seu telefone e empresa nos ajudam a personalizar seu atendimento.
              </p>
              <Link
                href="/dashboard/profile"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a47aff] hover:text-white"
              >
                Completar perfil →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function StatCard({
  icon,
  label,
  value,
  accent,
  hint,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  accent: string;
  hint: string;
  href?: string;
}) {
  const inner = (
    <div className="relative overflow-hidden bg-[#0d0d1a] border border-white/5 rounded-2xl p-5 h-full transition-all hover:border-white/15">
      <div
        className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-40"
        style={{ background: accent }}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl">{icon}</span>
          <span className="text-[10px] uppercase tracking-widest text-[#f0f0ff]/40">{label}</span>
        </div>
        <p className="text-2xl font-bold text-white capitalize mb-1">{value}</p>
        <p className="text-xs text-[#f0f0ff]/40">{hint}</p>
      </div>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

function QuickAction({
  href,
  icon,
  label,
  badge,
}: {
  href: string;
  icon: string;
  label: string;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className="relative flex items-center gap-3 bg-[#0d0d1a] border border-white/5 rounded-xl p-4 hover:border-[#6c3aff]/30 hover:bg-[#6c3aff]/5 transition-all"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium text-[#f0f0ff]/80">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="ml-auto bg-[#6c3aff] text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
          {badge}
        </span>
      )}
    </Link>
  );
}
