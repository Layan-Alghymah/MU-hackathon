import { Link } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-e border-ink-100 bg-surface lg:flex lg:flex-col">
      <Link to="/innovator/dashboard" className="flex items-center gap-2 px-5 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 rounded-control">
        <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
          <rect width="32" height="32" rx="7" fill="var(--color-brand-900)" />
          <path d="M16 6 L23 24 H9 Z" fill="none" stroke="var(--color-beacon-500)" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="16" cy="12" r="2.2" fill="var(--color-beacon-500)" />
        </svg>
        <span className="font-display text-lg font-bold text-ink-900">منارة</span>
      </Link>
      <div className="flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
    </aside>
  );
}
