import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

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

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, name, company_name, email, role, created_at')
    .eq('role', 'customer')
    .order('created_at', { ascending: false });

  const customerIds = profiles?.map((p) => p.id) ?? [];

  const [{ data: customers }, { data: projects }, { data: unread }] =
    customerIds.length === 0
      ? [{ data: [] }, { data: [] }, { data: [] }]
      : await Promise.all([
          supabase.from('customers').select('id, plan, status').in('id', customerIds),
          supabase.from('projects').select('customer_id, current_stage').in('customer_id', customerIds),
          supabase
            .from('messages')
            .select('customer_id')
            .in('customer_id', customerIds)
            .eq('sender_role', 'customer')
            .is('read_at', null),
        ]);

  const customerMap = Object.fromEntries(customers?.map((c) => [c.id, c]) ?? []);
  const projectMap = Object.fromEntries(projects?.map((p) => [p.customer_id, p]) ?? []);
  const unreadCount = (unread ?? []).reduce<Record<string, number>>((acc, m) => {
    acc[m.customer_id] = (acc[m.customer_id] ?? 0) + 1;
    return acc;
  }, {});

  const totalClients = profiles?.length ?? 0;
  const activeClients = (customers ?? []).filter((c) => c.status === 'active').length;
  const totalUnread = Object.values(unreadCount).reduce((a, b) => a + b, 0);
  const inProgress = (projects ?? []).filter(
    (p) => p.current_stage && p.current_stage !== 'delivered'
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-red-400 mb-1">Admin</p>
        <h1 className="text-3xl font-bold text-white">Clientes</h1>
        <p className="text-[#f0f0ff]/50 mt-1">Gerencie projetos, mensagens e planos dos clientes.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <AdminStat label="Clientes" value={totalClients} accent="#6c3aff" />
        <AdminStat label="Ativos" value={activeClients} accent="#00d4ff" />
        <AdminStat label="Em projeto" value={inProgress} accent="#a47aff" />
        <AdminStat label="Não lidas" value={totalUnread} accent={totalUnread > 0 ? '#ff5c5c' : '#555'} />
      </div>

      {totalClients === 0 ? (
        <div className="bg-[#0d0d1a] border border-dashed border-white/10 rounded-2xl p-10 text-center">
          <p className="text-white font-semibold mb-2">Nenhum cliente cadastrado ainda</p>
          <p className="text-[#f0f0ff]/40 text-sm">
            Os clientes aparecerão aqui assim que se registrarem.
          </p>
        </div>
      ) : (
        <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_0.7fr_auto] gap-4 px-6 py-4 border-b border-white/5 text-[10px] uppercase tracking-widest text-[#555] font-semibold">
            <span>Cliente</span>
            <span>Plano</span>
            <span>Etapa</span>
            <span className="text-center">Msgs</span>
            <span />
          </div>
          {profiles!.map((p) => {
            const name = p.company_name || p.name || p.email?.split('@')[0] || 'Cliente';
            const customer = customerMap[p.id];
            const project = projectMap[p.id];
            const msgs = unreadCount[p.id] ?? 0;

            return (
              <div
                key={p.id}
                className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_0.7fr_auto] gap-3 md:gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-[#6c3aff]/[0.04] transition-colors items-center"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-[#6c3aff]/30 to-[#00d4ff]/20 border border-[#6c3aff]/20 flex items-center justify-center text-xs font-bold text-[#c4a8ff]">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{name}</p>
                    <p className="text-xs text-[#555] truncate">{p.email}</p>
                  </div>
                </div>
                <div>
                  {customer?.plan ? (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#6c3aff]/15 text-[#c4a8ff] border border-[#6c3aff]/25">
                      {PLAN_LABELS[customer.plan] ?? customer.plan}
                    </span>
                  ) : (
                    <span className="text-xs text-[#555]">—</span>
                  )}
                </div>
                <div>
                  {project ? (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/25">
                      {STAGE_LABELS[project.current_stage] ?? project.current_stage}
                    </span>
                  ) : (
                    <span className="text-xs text-[#555]">—</span>
                  )}
                </div>
                <div className="md:text-center">
                  {msgs > 0 ? (
                    <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-red-500/15 text-red-300 border border-red-500/25 text-xs font-bold">
                      {msgs}
                    </span>
                  ) : (
                    <span className="text-sm text-[#444]">0</span>
                  )}
                </div>
                <div className="md:text-right">
                  <Link
                    href={`/admin/clients/${p.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#a47aff] hover:text-white border border-[#6c3aff]/25 hover:border-[#6c3aff]/60 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    Gerenciar →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AdminStat({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="relative overflow-hidden bg-[#0d0d1a] border border-white/5 rounded-2xl p-4">
      <div
        className="absolute -right-6 -top-6 w-20 h-20 rounded-full blur-2xl opacity-40"
        style={{ background: accent }}
      />
      <div className="relative">
        <p className="text-[10px] uppercase tracking-widest text-[#f0f0ff]/40 font-semibold mb-1">
          {label}
        </p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
