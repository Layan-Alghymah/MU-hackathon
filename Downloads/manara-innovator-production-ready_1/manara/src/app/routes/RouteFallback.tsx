import { LoadingState } from '@/components/shared/LoadingState';

/** Shown briefly while a lazy-loaded route's JS chunk downloads. */
export function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <LoadingState label="جاري التحميل..." />
    </div>
  );
}
