import { Link } from 'react-router-dom';
import { Lightbulb, FolderKanban, Bell } from 'lucide-react';
import type { DashboardRecentActivity } from '../types';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import { cn } from '@/utils/cn';

export interface RecentActivityItemProps {
  activity: DashboardRecentActivity;
  onMarkAsRead?: (id: string) => void;
}

function getIcon(category: DashboardRecentActivity['category']) {
  if (category === 'idea') return Lightbulb;
  if (category === 'project') return FolderKanban;
  return Bell;
}

export function RecentActivityItem({ activity, onMarkAsRead }: RecentActivityItemProps) {
  const Icon = getIcon(activity.category);

  const content = (
    <div
      className={cn(
        'flex items-start gap-3 rounded-card border px-4 py-3 transition-colors',
        activity.isRead ? 'border-ink-100 bg-surface' : 'border-brand-100 bg-brand-50',
      )}
    >
      <div
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full',
          activity.isRead ? 'bg-ink-50 text-ink-500' : 'bg-brand-100 text-brand-800',
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn('text-sm', activity.isRead ? 'text-ink-700' : 'font-medium text-ink-900')}>{activity.title}</p>
          {!activity.isRead && <span className="mt-1 size-2 shrink-0 rounded-full bg-beacon-500" aria-hidden="true" />}
        </div>
        <p className="mt-0.5 text-sm text-ink-500">{activity.description}</p>
        <p className="mt-1 text-xs text-ink-300">{formatRelativeTime(activity.timestamp)}</p>
      </div>
    </div>
  );

  const handleClick = () => {
    if (!activity.isRead) onMarkAsRead?.(activity.id);
  };

  if (activity.to) {
    return (
      <Link to={activity.to} onClick={handleClick} className="block rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={handleClick} className="block w-full text-start rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">
      {content}
    </button>
  );
}
