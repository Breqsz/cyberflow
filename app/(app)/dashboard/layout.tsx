import { createClient } from '@/lib/supabase/server';
import { Sidebar } from '@/components/dashboard/Sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: profile }, { data: customer }, { data: unreadMessages }] = await Promise.all([
    supabase.from('profiles').select('name, company_name, role').eq('id', user!.id).single(),
    supabase.from('customers').select('plan, status').eq('id', user!.id).single(),
    supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('customer_id', user!.id)
      .eq('sender_role', 'admin')
      .is('read_at', null),
  ]);

  const displayName =
    profile?.company_name || profile?.name || user!.email!.split('@')[0];

  return (
    <div className="flex h-screen bg-[#050510] text-[#f0f0ff] overflow-hidden">
      <Sidebar
        displayName={displayName}
        plan={customer?.plan ?? null}
        status={customer?.status ?? null}
        unreadCount={unreadMessages?.length ?? 0}
      />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
