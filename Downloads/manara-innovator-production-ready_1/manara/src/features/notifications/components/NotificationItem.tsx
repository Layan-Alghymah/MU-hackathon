import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { Lightbulb, FolderKanban, Bell } from 'lucide-react';
import type { NotificationViewModel } from '../viewModels';
import { cn } from '@/utils/cn';

export interface NotificationItemProps {
  notification: NotificationViewModel;
  onMarkAsRead?: (id: string) => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  idea: Lightbulb,
  project: FolderKanban,
  general: Bell,
};

const SEVERITY_BG_CLASS: Record<NotificationViewModel['severity'], string> = {
  info: 'bg-status-info-bg text-status-info-fg',
  success: 'bg-status-success-bg text-status-success-fg',
  warning: 'bg-status-warning-bg text-status-warning-fg',
  danger: 'bg-status-danger-bg text-status-danger-fg',
};

/**
 * Presentation-only: renders a `NotificationViewModel`. Never builds a
 * route itself — `notification.action` (an `ActionModel` already resolved
 * by `notificationNavigationService`, via the view-model mapper) is the
 * only thing that decides whether this renders as a `<Link>` or a plain
 * button, and where it points.
 */
export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const Icon = ICON_MAP[notification.icon] ?? Bell;

  const content = (
    <div
      className={cn(
        'flex items-start gap-3 rounded-card border px-4 py-3 transition-colors',
        notification.isRead ? 'border-ink-100 bg-surface' : 'border-brand-100 bg-brand-50',
      )}
    >
      <div
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full',
          notification.isRead ? 'bg-ink-50 text-ink-500' : SEVERITY_BG_CLASS[notification.severity],
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn('text-sm', notification.isRead ? 'text-ink-700' : 'font-medium text-ink-900')}>
            {notification.title}
          </p>
          {!notification.isRead && <span className="mt-1 size-2 shrink-0 rounded-full bg-beacon-500" aria-hidden="true" />}
        </div>
        <p className="mt-0.5 text-sm text-ink-500">{notification.message}</p>
        <p className="mt-1 text-xs text-ink-300">{notification.relativeTime}</p>
      </div>
    </div>
  );

  const handleClick = () => {
    if (!notification.isRead) onMarkAsRead?.(notification.id);
  };

  if (notification.action?.enabled && notification.action.route) {
    return (
      <Link
        to={notification.action.route}
        onClick={handleClick}
        className="block rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      >
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
