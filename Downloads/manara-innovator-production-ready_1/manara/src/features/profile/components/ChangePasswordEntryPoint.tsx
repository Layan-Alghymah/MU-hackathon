import { Link } from 'react-router-dom';
import { KeyRound, ChevronLeft } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';

/**
 * There is no authenticated "change password while logged in" service —
 * only `authService.forgotPassword`. Rather than inventing a new backend
 * capability, this entry point reuses the existing, already-approved
 * Forgot Password flow (Phase 2).
 */
export function ChangePasswordEntryPoint() {
  return (
    <Card>
      <CardHeader>
        <h2 className="font-display font-bold text-ink-900">الأمان</h2>
      </CardHeader>
      <CardBody>
        <Link
          to="/forgot-password"
          className="flex items-center justify-between gap-3 rounded-control border border-ink-100 px-4 py-3 hover:bg-ink-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          <span className="flex items-center gap-2.5 text-sm text-ink-900">
            <KeyRound className="size-4 text-ink-500" aria-hidden="true" />
            تغيير كلمة المرور
          </span>
          <ChevronLeft className="size-4 text-ink-400" aria-hidden="true" />
        </Link>
      </CardBody>
    </Card>
  );
}
