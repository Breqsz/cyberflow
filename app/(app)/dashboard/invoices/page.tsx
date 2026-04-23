import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';

const STATUS_LABELS: Record<string, string> = {
  paid: 'Pago',
  open: 'Pendente',
  uncollectible: 'Vencido',
  void: 'Cancelado',
  draft: 'Rascunho',
};

const STATUS_COLORS: Record<string, string> = {
  paid: 'text-[#00d4ff] bg-[#00d4ff]/10 border-[#00d4ff]/20',
  open: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  uncollectible: 'text-red-400 bg-red-400/10 border-red-400/20',
  void: 'text-[#555] bg-[#555]/10 border-[#555]/20',
  draft: 'text-[#555] bg-[#555]/10 border-[#555]/20',
};

export default async function InvoicesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: customer } = await supabase
    .from('customers')
    .select('stripe_customer_id')
    .eq('id', user!.id)
    .single();

  if (!customer?.stripe_customer_id) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Faturas</h1>
        <p className="text-[#f0f0ff]/50 mb-8">Histórico de cobranças do seu plano.</p>
        <div className="bg-[#0d0d1a] border border-white/[0.05] rounded-2xl p-10 text-center">
          <div className="text-4xl mb-3">💳</div>
          <p className="text-white font-semibold mb-2">Faturamento não configurado</p>
          <p className="text-[#f0f0ff]/40 text-sm">Entre em contato com a equipe CyberFlow para configurar.</p>
        </div>
      </div>
    );
  }

  const invoices = await stripe.invoices.list({
    customer: customer.stripe_customer_id,
    limit: 24,
  });

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Faturas</h1>
      <p className="text-[#f0f0ff]/50 mb-8">Histórico de cobranças do seu plano.</p>

      {invoices.data.length === 0 ? (
        <div className="bg-[#0d0d1a] border border-white/[0.05] rounded-2xl p-10 text-center">
          <p className="text-[#f0f0ff]/40">Nenhuma fatura ainda.</p>
        </div>
      ) : (
        <div className="bg-[#0d0d1a] border border-white/[0.05] rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-[#555]">Data</th>
                <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-[#555]">Valor</th>
                <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-[#555]">Status</th>
                <th className="text-right px-6 py-4 text-xs uppercase tracking-widest text-[#555]">PDF</th>
              </tr>
            </thead>
            <tbody>
              {invoices.data.map((inv) => {
                const date = new Date(inv.created * 1000).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                });
                const amount = new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: inv.currency.toUpperCase(),
                }).format((inv.amount_due ?? 0) / 100);
                const statusLabel = STATUS_LABELS[inv.status ?? 'draft'] ?? inv.status;
                const statusClass = STATUS_COLORS[inv.status ?? 'draft'] ?? STATUS_COLORS.draft;

                return (
                  <tr key={inv.id} className="border-b border-white/[0.03] last:border-0">
                    <td className="px-6 py-4 text-sm text-[#f0f0ff]/70">{date}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">{amount}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusClass}`}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {inv.invoice_pdf ? (
                        <a
                          href={inv.invoice_pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#6c3aff] hover:text-[#a47aff] transition-colors"
                        >
                          Baixar ↓
                        </a>
                      ) : (
                        <span className="text-xs text-[#444]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
