import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/dashboard');

  return (
    <div className="flex h-screen bg-[#050510] text-[#f0f0ff] overflow-hidden">
      <aside className="w-[200px] shrink-0 bg-[#04040d] border-r border-red-500/12 flex flex-col py-5 px-3">
        <div className="px-2 mb-2 text-[14px] font-extrabold text-white">
          Cyber<span className="text-[#6c3aff]">Flow</span>
        </div>
        <span className="inline-block mx-2 mb-5 bg-red-500/15 text-red-400 border border-red-500/20 rounded-md px-2 py-0.5 text-[10px] font-bold">
          ADMIN
        </span>
        <nav className="flex flex-col gap-0.5">
          <a
            href="/admin"
            className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[12px] text-[#888] hover:text-[#d0c0ff] hover:bg-[#6c3aff]/08 transition-colors"
          >
            👥 Clientes
          </a>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
