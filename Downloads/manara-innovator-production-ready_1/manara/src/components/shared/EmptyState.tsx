import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-ink-200 px-6 py-12 text-center">
      {Icon && (
        <div className="flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <Icon className="size-6" aria-hidden="true" />
        </div>
      )}
      <div>
        <p className="font-display text-base font-bold text-ink-900">{title}</p>
        {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
