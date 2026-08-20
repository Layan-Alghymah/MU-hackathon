import { useLocation, matchPath } from 'react-router-dom';

const TITLE_ROUTES: { pattern: string; title: string }[] = [
  { pattern: '/innovator/dashboard', title: 'الرئيسية' },
  { pattern: '/innovator/ideas/new', title: 'تقديم فكرة' },
  { pattern: '/innovator/ideas/:id/edit', title: 'متابعة تقديم فكرة' },
  { pattern: '/innovator/ideas/:id', title: 'تفاصيل الفكرة' },
  { pattern: '/innovator/ideas', title: 'أفكاري' },
  { pattern: '/innovator/projects/:id', title: 'تفاصيل المشروع' },
  { pattern: '/innovator/projects', title: 'مشاريعي' },
  { pattern: '/innovator/notifications', title: 'الإشعارات' },
  { pattern: '/innovator/profile', title: 'الملف الشخصي' },
];

export function usePageTitle(): string {
  const location = useLocation();
  const match = TITLE_ROUTES.find((route) => matchPath(route.pattern, location.pathname));
  return match?.title ?? 'منارة';
}
