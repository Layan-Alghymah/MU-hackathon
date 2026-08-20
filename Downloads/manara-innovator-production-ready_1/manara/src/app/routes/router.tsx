import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout';
import { InnovatorLayout } from '@/layouts/InnovatorLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { RouteFallback } from './RouteFallback';

// Every page is its own lazy-loaded chunk — only the layouts (small, always
// needed immediately) stay as static imports. Named exports require the
// `.then(module => ({ default: module.X }))` adapter since React.lazy only
// accepts a default export.
const LoginPage = lazy(() => import('@/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() =>
  import('@/pages/auth/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })),
);

const DashboardPage = lazy(() => import('@/pages/innovator/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const MyIdeasPage = lazy(() => import('@/pages/innovator/MyIdeasPage').then((m) => ({ default: m.MyIdeasPage })));
const SubmitIdeaPage = lazy(() =>
  import('@/pages/innovator/SubmitIdeaPage').then((m) => ({ default: m.SubmitIdeaPage })),
);
const IdeaDetailsPage = lazy(() =>
  import('@/pages/innovator/IdeaDetailsPage').then((m) => ({ default: m.IdeaDetailsPage })),
);
const MyProjectsPage = lazy(() =>
  import('@/pages/innovator/MyProjectsPage').then((m) => ({ default: m.MyProjectsPage })),
);
const ProjectDetailsPage = lazy(() =>
  import('@/pages/innovator/ProjectDetailsPage').then((m) => ({ default: m.ProjectDetailsPage })),
);
const NotificationsPage = lazy(() =>
  import('@/pages/innovator/NotificationsPage').then((m) => ({ default: m.NotificationsPage })),
);
const ProfilePage = lazy(() => import('@/pages/innovator/ProfilePage').then((m) => ({ default: m.ProfilePage })));

const PublicOrganizationPage = lazy(() =>
  import('@/pages/external/PublicOrganizationPage').then((m) => ({ default: m.PublicOrganizationPage })),
);
const ExternalRegisterPage = lazy(() =>
  import('@/pages/external/ExternalRegisterPage').then((m) => ({ default: m.ExternalRegisterPage })),
);

/** Wraps a lazy page element in the shared Suspense fallback — one place, so every route gets the same loading UX. */
function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/innovator" replace /> },

  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: withSuspense(<LoginPage />) },
      { path: '/forgot-password', element: withSuspense(<ForgotPasswordPage />) },
    ],
  },

  {
    path: '/innovator',
    element: <InnovatorLayout />,
    children: [
      { index: true, element: <Navigate to="/innovator/dashboard" replace /> },
      { path: 'dashboard', element: withSuspense(<DashboardPage />) },
      { path: 'ideas', element: withSuspense(<MyIdeasPage />) },
      { path: 'ideas/new', element: withSuspense(<SubmitIdeaPage />) },
      { path: 'ideas/:id/edit', element: withSuspense(<SubmitIdeaPage />) },
      { path: 'ideas/:id', element: withSuspense(<IdeaDetailsPage />) },
      { path: 'projects', element: withSuspense(<MyProjectsPage />) },
      { path: 'projects/:id', element: withSuspense(<ProjectDetailsPage />) },
      { path: 'notifications', element: withSuspense(<NotificationsPage />) },
      { path: 'profile', element: withSuspense(<ProfilePage />) },
    ],
  },

  {
    element: <PublicLayout />,
    children: [
      { path: '/organizations/:organizationSlug', element: withSuspense(<PublicOrganizationPage />) },
      { path: '/organizations/:organizationSlug/register', element: withSuspense(<ExternalRegisterPage />) },
    ],
  },

  { path: '*', element: <Navigate to="/innovator" replace /> },
]);
