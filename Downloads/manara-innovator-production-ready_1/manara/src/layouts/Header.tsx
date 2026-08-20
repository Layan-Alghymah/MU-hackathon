import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Drawer } from '@/components/ui/Drawer';
import { SidebarNav } from './SidebarNav';
import { useAuth } from '@/app/providers/AuthContext';
import { useNotificationFeed } from '@/features/notifications/hooks/useNotificationFeed';

export interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { session } = useAuth();
  const { unreadCount } = useNotificationFeed();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-100 bg-surface px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="فتح القائمة"
            className="rounded-control p-2 text-ink-700 hover:bg-ink-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 lg:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
          <h1 className="font-display text-lg font-bold text-ink-900">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/innovator/notifications"
            aria-label={`الإشعارات${unreadCount > 0 ? ` (${unreadCount} غير مقروءة)` : ''}`}
            className="relative rounded-control p-2 text-ink-700 hover:bg-ink-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            <Bell className="size-5" aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute end-1.5 top-1.5 flex size-2 rounded-full bg-beacon-500" aria-hidden="true" />
            )}
          </Link>
          {session && (
            <Link to="/innovator/profile" aria-label="الملف الشخصي" className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">
              <Avatar name={session.user.fullName} imageUrl={session.user.avatarUrl} size="sm" />
            </Link>
          )}
        </div>
      </header>

      <Drawer isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} title="منارة">
        <SidebarNav onNavigate={() => setIsMobileNavOpen(false)} />
      </Drawer>
    </>
  );
}
