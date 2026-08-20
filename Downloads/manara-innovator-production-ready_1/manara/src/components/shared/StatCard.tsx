import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { SkeletonBlock } from './LoadingState';

export interface StatCardTrend {
  direction: 'up' | 'down';
  label: string;
}

export interface StatCardProps {
  title: string;
  value: number | string;
  icon?: LucideIcon;
  description?: string;
  tone?: 'brand' | 'beacon' | 'neutral';
  trend?: StatCardTrend;
  /** When true, renders a skeleton placeholder instead of value/description — callers don't need to build their own loading markup per card. */
  isLoading?: boolean;
  /** Reserved for future drill-down (e.g. clicking "تحتاج استكمال" filters My Ideas). */
  onClick?: () => void;
}

const toneStyles = {
  brand: 'bg-brand-50 text-brand-800',
  beacon: 'bg-beacon-50 text-beacon-700',
  neutral: 'bg-ink-50 text-ink-700',
};

export function StatCard({ title, value, icon: Icon, description, tone = 'neutral', trend, isLoading, onClick }: StatCardProps) {
  const isInteractive = Boolean(onClick) && !isLoading;
  const Wrapper = isInteractive ? 'button' : 'div';
  const TrendIcon = trend?.direction === 'up' ? TrendingUp : TrendingDown;

  return (
    <Wrapper
      onClick={isInteractive ? onClick : undefined}
      type={isInteractive ? 'button' : undefined}
      aria-label={isInteractive ? `${title}: ${value}` : undefined}
      className={cn(
        'flex items-center gap-4 rounded-card border border-ink-100 bg-surface p-4 text-start',
        isInteractive &&
          'transition-shadow hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700',
      )}
    >
      {Icon && (
        <div className={cn('flex size-11 shrink-0 items-center justify-center rounded-control', toneStyles[tone])}>
          <Icon className="size-5" aria-hidden="true" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        {isLoading ? (
          <>
            <SkeletonBlock className="h-6 w-12" />
            <SkeletonBlock className="mt-2 h-4 w-20" />
          </>
        ) : (
          <>
            <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
            <p className="text-sm text-ink-500">{title}</p>
            {description && <p className="mt-0.5 text-xs text-ink-300">{description}</p>}
            {trend && (
              <p
                className={cn(
                  'mt-1 flex items-center gap-1 text-xs font-medium',
                  trend.direction === 'up' ? 'text-status-success-fg' : 'text-status-danger-fg',
                )}
              >
                <TrendIcon className="size-3.5" aria-hidden="true" />
                {trend.label}
              </p>
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
}
