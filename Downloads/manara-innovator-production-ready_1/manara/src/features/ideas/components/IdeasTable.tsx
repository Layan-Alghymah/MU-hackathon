import { Link } from 'react-router-dom';
import type { IdeaCardViewModel } from '../viewModels';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/Button';

export interface IdeasTableProps {
  items: IdeaCardViewModel[];
}

/**
 * Professional table view of ideas — Title, Organization, Category,
 * Submission Date, Status, Actions. Wrapped in a horizontally-scrolling
 * container instead of collapsing columns on narrow screens, which keeps
 * every column legible rather than truncating data on mobile.
 */
export function IdeasTable({ items }: IdeasTableProps) {
  return (
    <div className="overflow-x-auto rounded-card border border-ink-100 bg-surface">
      <table className="w-full min-w-[720px] text-start text-sm">
        <thead>
          <tr className="border-b border-ink-100 text-ink-500">
            <th scope="col" className="px-4 py-3 text-start font-medium">عنوان الفكرة</th>
            <th scope="col" className="px-4 py-3 text-start font-medium">الجهة</th>
            <th scope="col" className="px-4 py-3 text-start font-medium">التصنيف</th>
            <th scope="col" className="px-4 py-3 text-start font-medium">تاريخ التقديم</th>
            <th scope="col" className="px-4 py-3 text-start font-medium">الحالة</th>
            <th scope="col" className="px-4 py-3 text-start font-medium">
              <span className="sr-only">الإجراء</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50">
              <td className="px-4 py-3 font-medium text-ink-900">{item.title}</td>
              <td className="px-4 py-3 text-ink-700">{item.organizationName}</td>
              <td className="px-4 py-3 text-ink-700">{item.category}</td>
              <td className="px-4 py-3 text-ink-500">{item.submittedAtLabel ?? 'لم تُرسل بعد'}</td>
              <td className="px-4 py-3">
                <StatusBadge label={item.status.label} tone={item.status.tone} />
              </td>
              <td className="px-4 py-3">
                <Link to={item.href}>
                  <Button variant="outline" size="sm">
                    عرض التفاصيل
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
