'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t } from '@/lib/i18n/content';
import { createClient } from '@/lib/supabase/client';

interface SidebarProps {
  displayName: string;
  email: string | null;
  plan: string | null;
  status: string | null;
  unreadCount: number;
  isAdmin: boolean;
}

const navItems = [
  { key: 'overview' as const, href: '/dashboard', icon: '🏠' },
  { key: 'progress' as const, href: '/dashboard/progress', icon: '🚀' },
  { key: 'invoices' as const, href: '/dashboard/invoices', icon: '💳' },
  { key: 'messages' as const, href: '/dashboard/messages', icon: '💬' },
  { key: 'profile' as const, href: '/dashboard/profile', icon: '⚙️' },
];

export function Sidebar({ displayName, email, plan, status, unreadCount, isAdmin }: SidebarProps) {
  const pathname = usePathname();
  const { lang } = useLang();
  const router = useRouter();
  const nav = content.dashboard.nav;

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <aside className="w-[240px] shrink-0 bg-[#06060f] border-r border-white/5 flex flex-col py-5 px-3">
      <Link href="/" className="px-2 mb-6 text-[15px] font-extrabold text-white block">
        Cyber<span className="text-[#6c3aff]">Flow</span>
      </Link>

      <div className="bg-gradient-to-br from-[#6c3aff]/15 via-[#0d0d1f] to-[#0d0d1f] border border-[#6c3aff]/20 rounded-xl p-3 mb-5">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6c3aff] to-[#00d4ff] flex items-center justify-center text-[12px] font-bold text-white shrink-0">
            {initials || 'C'}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-white truncate">{displayName}</p>
            {email && <p className="text-[10px] text-[#f0f0ff]/40 truncate">{email}</p>}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="px-1.5 py-0.5 rounded bg-[#6c3aff]/20 text-[#c4a8ff] uppercase tracking-wider font-semibold">
            {plan ?? 'Sem plano'}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[#00d4ff]/15 text-[#00d4ff] uppercase tracking-wider font-semibold capitalize">
            {status ?? 'pending'}
          </span>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5 flex-1">
        {navItems.map(({ key, href, icon }) => {
          const active = isActive(href);
          const label = t(nav[key], lang);
          const badge = key === 'messages' && unreadCount > 0 ? unreadCount : null;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                active
                  ? 'bg-[#6c3aff]/15 text-[#c4a8ff] border border-[#6c3aff]/25'
                  : 'text-[#888] hover:bg-white/5 hover:text-[#d0c0ff]'
              }`}
            >
              <span className="text-[15px] w-[18px] text-center">{icon}</span>
              {label}
              {badge && (
                <span className="ml-auto bg-[#6c3aff] text-white text-[9px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center px-1">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}

        {isAdmin && (
          <>
            <div className="my-3 border-t border-white/5" />
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 border border-red-500/20 transition-colors"
            >
              <span className="text-[15px] w-[18px] text-center">🛡</span> Admin
            </Link>
          </>
        )}
      </nav>

      <div className="pt-3 border-t border-white/5 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-[12px] text-[#888] hover:bg-white/5 hover:text-white transition-colors"
        >
          ← Site principal
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-[12px] text-[#888] hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          ↩ {t(nav.logout, lang)}
        </button>
      </div>
    </aside>
  );
}
