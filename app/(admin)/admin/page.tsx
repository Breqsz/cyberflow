import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

const STAGE_LABELS: Record<string, string> = {
  briefing: 'Briefing',
  design: 'Design',
  development: 'Desenvolvimento',
  review: 'Revisão',
  delivered: 'Entregue',
};

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, name, company_name, email, role')
    .eq('role', 'customer');

  const customerIds = profiles?.map((p) => p.id) ?? [];

  if (customerIds.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Clientes</h1>
        <p className="text-[#f0f0ff]/40">Nenhum cliente cadastrado ainda.</p>
      </div>
    );
  }

  const [{ data: customers }, { data: projects }, { data: unread }] = await Promise.all([
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Clientes</h1>
      <div className="bg-[#0d0d1a] border border-white/[0.05] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[#555]">Cliente</th>
              <th className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[#555]">Plano</th>
              <th className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[#555]">Etapa</th>
              <th className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[#555]">Msgs</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody>
            {profiles!.map((p) => {
              const name = p.company_name || p.name || p.email;
              const customer = customerMap[p.id];
              const project = projectMap[p.id];
              const msgs = unreadCount[p.id] ?? 0;

              return (
                <tr key={p.id} className="border-b border-white/[0.03] last:border-0 hover:bg-[#6c3aff]/[0.03]">
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs text-[#555]">{p.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#a47aff] capitalize">{customer?.plan ?? '—'}</td>
                  <td className="px-5 py-3.5">
                    {project ? (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20">
                        {STAGE_LABELS[project.current_stage] ?? project.current_stage}
                      </span>
                    ) : (
                      <span className="text-xs text-[#444]">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    {msgs > 0 ? (
                      <span className="text-sm font-bold text-red-400">{msgs}</span>
                    ) : (
                      <span className="text-sm text-[#555]">0</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/admin/clients/${p.id}`}
                      className="text-xs text-[#a47aff] hover:text-white border border-[#6c3aff]/20 hover:border-[#6c3aff]/50 rounded-lg px-3 py-1.5 transition-colors"
                    >
                      Gerenciar →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
