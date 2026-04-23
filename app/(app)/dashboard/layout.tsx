import { createClient } from '@/lib/supabase/server';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { isAdminEmail } from '@/lib/admin';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: profile }, { data: customer }, { data: unreadMessages }] = await Promise.all([
    supabase.from('profiles').select('name, company_name, role, email').eq('id', user!.id).single(),
    supabase.from('customers').select('plan, status').eq('id', user!.id).single(),
    supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('customer_id', user!.id)
      .eq('sender_role', 'admin')
      .is('read_at', null),
  ]);

  if (profile?.role !== 'admin' && isAdminEmail(user!.email)) {
    await supabase.from('profiles').update({ role: 'admin' }).eq('id', user!.id);
  }

  const isAdmin = profile?.role === 'admin' || isAdminEmail(user!.email);
  const displayName =
    profile?.company_name || profile?.name || user!.email!.split('@')[0];

  return (
    <div className="flex h-screen bg-[#050510] text-[#f0f0ff] overflow-hidden">
      <Sidebar
        displayName={displayName}
        email={user!.email ?? null}
        plan={customer?.plan ?? null}
        status={customer?.status ?? null}
        unreadCount={unreadMessages?.length ?? 0}
        isAdmin={isAdmin}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="px-10 py-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
