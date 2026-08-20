import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import type { StatusTone } from '@/types/status';

export type BadgeTone = StatusTone;

const toneStyles: Record<BadgeTone, string> = {
  success: 'bg-status-success-bg text-status-success-fg',
  warning: 'bg-status-warning-bg text-status-warning-fg',
  danger: 'bg-status-danger-bg text-status-danger-fg',
  info: 'bg-status-info-bg text-status-info-fg',
  neutral: 'bg-status-neutral-bg text-status-neutral-fg',
};

export interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
