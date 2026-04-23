import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    if (isAdminEmail(user.email)) {
      await supabase.from('profiles').update({ role: 'admin' }).eq('id', user.id);
    } else {
      redirect('/dashboard');
    }
  }

  return (
    <div className="flex h-screen bg-[#050510] text-[#f0f0ff] overflow-hidden">
      <aside className="w-[220px] shrink-0 bg-[#04040d] border-r border-red-500/15 flex flex-col py-5 px-3">
        <Link href="/" className="px-2 mb-3 text-[15px] font-extrabold text-white block">
          Cyber<span className="text-[#6c3aff]">Flow</span>
        </Link>
        <span className="inline-block self-start mx-2 mb-5 bg-red-500/15 text-red-400 border border-red-500/25 rounded-md px-2 py-0.5 text-[10px] font-extrabold tracking-wider">
          ADMIN
        </span>
        <nav className="flex flex-col gap-0.5 flex-1">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-[#c4a8ff] bg-[#6c3aff]/10 border border-[#6c3aff]/20 font-medium"
          >
            <span className="text-[15px] w-[18px] text-center">👥</span> Clientes
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-[#888] hover:bg-white/5 hover:text-white transition-colors"
          >
            <span className="text-[15px] w-[18px] text-center">↗</span> Ver como cliente
          </Link>
        </nav>
        <div className="pt-3 border-t border-white/5 text-[10px] text-[#555] px-2">
          Logado como<br />
          <span className="text-[#a47aff] break-all">{user.email}</span>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
