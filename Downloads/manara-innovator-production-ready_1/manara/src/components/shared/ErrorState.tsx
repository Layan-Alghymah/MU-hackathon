import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'حدث خطأ غير متوقع',
  description = 'تعذر تحميل البيانات. حاول مرة أخرى.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-status-danger-bg bg-status-danger-bg/40 px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-status-danger-bg text-status-danger-fg">
        <AlertTriangle className="size-6" aria-hidden="true" />
      </div>
      <div>
        <p className="font-display text-base font-bold text-ink-900">{title}</p>
        <p className="mt-1 text-sm text-ink-500">{description}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          إعادة المحاولة
        </Button>
      )}
    </div>
  );
}
