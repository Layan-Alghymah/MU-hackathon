import type { ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/utils/cn';

export type AlertTone = 'success' | 'danger' | 'info';

const toneConfig: Record<AlertTone, { icon: typeof CheckCircle2; className: string }> = {
  success: { icon: CheckCircle2, className: 'bg-status-success-bg text-status-success-fg' },
  danger: { icon: AlertCircle, className: 'bg-status-danger-bg text-status-danger-fg' },
  info: { icon: Info, className: 'bg-status-info-bg text-status-info-fg' },
};

export interface AlertProps {
  tone: AlertTone;
  children: ReactNode;
  className?: string;
}

/** Inline banner for form-level feedback (e.g. login failure, reset email sent). */
export function Alert({ tone, children, className }: AlertProps) {
  const { icon: Icon, className: toneClassName } = toneConfig[tone];

  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn('flex items-start gap-2.5 rounded-control px-3.5 py-3 text-sm', toneClassName, className)}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
