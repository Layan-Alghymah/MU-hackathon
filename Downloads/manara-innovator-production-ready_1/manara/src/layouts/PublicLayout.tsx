import { useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useFocusMainOnNavigate } from '@/hooks/useFocusMainOnNavigate';
import { SkipToContentLink } from '@/components/shared/SkipToContentLink';

const MAIN_CONTENT_ID = 'main-content';

export function PublicLayout() {
  const mainRef = useRef<HTMLElement>(null);
  useFocusMainOnNavigate(mainRef);

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <SkipToContentLink targetId={MAIN_CONTENT_ID} />
      <header className="border-b border-ink-100 bg-surface px-4 py-4 sm:px-6">
        <Link to="/" className="flex w-fit items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 rounded-control">
          <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="var(--color-brand-900)" />
            <path d="M16 6 L23 24 H9 Z" fill="none" stroke="var(--color-beacon-500)" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="16" cy="12" r="2.2" fill="var(--color-beacon-500)" />
          </svg>
          <span className="font-display text-lg font-bold text-ink-900">منارة</span>
        </Link>
      </header>
      <main id={MAIN_CONTENT_ID} ref={mainRef} tabIndex={-1} className="flex-1 px-4 py-8 outline-none sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
