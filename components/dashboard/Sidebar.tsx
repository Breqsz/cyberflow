'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t } from '@/lib/i18n/content';
import { createClient } from '@/lib/supabase/client';

interface SidebarProps {
  displayName: string;
  plan: string | null;
  status: string | null;
  unreadCount: number;
}

const navItems = [
  { key: 'overview' as const, href: '/dashboard', icon: '🏠' },
  { key: 'progress' as const, href: '/dashboard/progress', icon: '🚀' },
  { key: 'invoices' as const, href: '/dashboard/invoices', icon: '💳' },
  { key: 'messages' as const, href: '/dashboard/messages', icon: '💬' },
  { key: 'profile' as const, href: '/dashboard/profile', icon: '⚙️' },
];

export function Sidebar({ displayName, plan, status, unreadCount }: SidebarProps) {
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
  };

  return (
    <aside className="w-[220px] shrink-0 bg-[#06060f] border-r border-[#6c3aff]/15 flex flex-col py-5 px-3">
      <Link href="/" className="px-2 mb-6 text-[15px] font-extrabold text-white block">
        Cyber<span className="text-[#6c3aff]">Flow</span>
      </Link>

      <div className="bg-[#0d0d1f] border border-white/[0.06] rounded-xl px-3 py-2.5 mb-5">
        <p className="text-[13px] font-semibold text-white truncate">{displayName}</p>
        <p className="text-[11px] text-[#6c3aff] mt-0.5 capitalize">
          {plan ?? '—'} · <span className="text-[#00d4ff] capitalize">{status ?? '—'}</span>
        </p>
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
                  ? 'bg-[#6c3aff]/15 text-[#c4a8ff] border border-[#6c3aff]/20'
                  : 'text-[#888] hover:bg-[#6c3aff]/08 hover:text-[#d0c0ff]'
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
      </nav>

      <div className="pt-3 border-t border-white/[0.05]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-[12px] text-[#555] hover:text-[#ff6b6b] transition-colors"
        >
          ↩ {t(nav.logout, lang)}
        </button>
      </div>
    </aside>
  );
}
