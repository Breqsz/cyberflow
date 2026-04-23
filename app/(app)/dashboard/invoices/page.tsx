import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';
import Link from 'next/link';

const STATUS_LABELS: Record<string, string> = {
  paid: 'Pago',
  open: 'Pendente',
  uncollectible: 'Vencido',
  void: 'Cancelado',
  draft: 'Rascunho',
};

const STATUS_COLORS: Record<string, string> = {
  paid: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25',
  open: 'text-yellow-300 bg-yellow-400/10 border-yellow-400/25',
  uncollectible: 'text-red-300 bg-red-500/10 border-red-500/25',
  void: 'text-[#888] bg-white/5 border-white/10',
  draft: 'text-[#888] bg-white/5 border-white/10',
};

export default async function InvoicesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: customer } = await supabase
    .from('customers')
    .select('stripe_customer_id, plan')
    .eq('id', user!.id)
    .single();

  if (!customer?.stripe_customer_id) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-[#6c3aff] mb-1">Financeiro</p>
          <h1 className="text-3xl font-bold text-white">Faturas</h1>
          <p className="text-[#f0f0ff]/50 mt-1">Histórico de cobranças do seu plano.</p>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] to-[#1a0d2e] border border-dashed border-[#6c3aff]/25 rounded-2xl p-10 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#6c3aff]/10 border border-[#6c3aff]/25 flex items-center justify-center text-2xl mb-4">
            💳
          </div>
          <p className="text-white font-semibold mb-2">Faturamento não configurado</p>
          <p className="text-[#f0f0ff]/40 text-sm max-w-md mx-auto mb-5">
            Assim que você assinar um plano, seu histórico de pagamentos aparecerá aqui.
          </p>
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6c3aff] hover:bg-[#7c4aff] text-white text-sm font-semibold transition-colors"
          >
            Ver planos →
          </Link>
        </div>
      </div>
    );
  }

  let invoicesList: Awaited<ReturnType<typeof stripe.invoices.list>>['data'] = [];
  try {
    const invoices = await stripe.invoices.list({
      customer: customer.stripe_customer_id,
      limit: 24,
    });
    invoicesList = invoices.data;
  } catch {
    invoicesList = [];
  }

  const totalPaid = invoicesList
    .filter((i) => i.status === 'paid')
    .reduce((acc, i) => acc + (i.amount_paid ?? 0), 0);

  const currency = invoicesList[0]?.currency?.toUpperCase() ?? 'USD';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#6c3aff] mb-1">Financeiro</p>
          <h1 className="text-3xl font-bold text-white">Faturas</h1>
          <p className="text-[#f0f0ff]/50 mt-1">Histórico de cobranças do seu plano.</p>
        </div>
        <div className="bg-[#0d0d1a] border border-white/5 rounded-xl px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest text-[#6c3aff] font-semibold">
            Total pago
          </p>
          <p className="text-lg font-bold text-white">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(totalPaid / 100)}
          </p>
        </div>
      </div>

      {invoicesList.length === 0 ? (
        <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-10 text-center">
          <p className="text-[#f0f0ff]/40">Nenhuma fatura ainda.</p>
        </div>
      ) : (
        <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_auto] gap-4 px-6 py-4 border-b border-white/5 text-[10px] uppercase tracking-widest text-[#555] font-semibold">
            <span>Data</span>
            <span>Valor</span>
            <span>Status</span>
            <span>PDF</span>
          </div>
          {invoicesList.map((inv) => {
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
              <div
                key={inv.id}
                className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors items-center"
              >
                <div>
                  <p className="text-sm text-white font-medium">{date}</p>
                  <p className="text-[10px] text-[#555] md:hidden mt-0.5">{inv.number}</p>
                </div>
                <p className="text-sm font-bold text-white">{amount}</p>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border self-start justify-self-start ${statusClass}`}
                >
                  {statusLabel}
                </span>
                <div className="text-right">
                  {inv.invoice_pdf ? (
                    <a
                      href={inv.invoice_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#a47aff] hover:text-white transition-colors inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#6c3aff]/20 hover:border-[#6c3aff]/40"
                    >
                      Baixar ↓
                    </a>
                  ) : (
                    <span className="text-xs text-[#444]">—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
