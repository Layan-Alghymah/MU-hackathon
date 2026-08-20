import { Link } from 'react-router-dom';
import { Lightbulb, Clock, FileQuestion, CheckCircle2, FolderKanban, Bell, BarChart3 } from 'lucide-react';
import { useAuth } from '@/app/providers/AuthContext';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { useNotificationFeed } from '@/features/notifications/hooks/useNotificationFeed';
import { countActiveProjects } from '@/features/projects/selectors';
import { IdeasTable } from '@/features/ideas/components/IdeasTable';
import { ProjectsList } from '@/features/projects/components/ProjectsList';
import { RecentActivityList } from '@/features/dashboard/components/RecentActivityList';
import { DashboardWelcomeSummary } from '@/features/dashboard/components/DashboardWelcomeSummary';
import { DashboardQuickActionTile } from '@/features/dashboard/components/DashboardQuickActionTile';
import { IdeaStatusDistributionChart } from '@/features/dashboard/components/IdeaStatusDistributionChart';
import { DashboardSection } from '@/components/shared/DashboardSection';
import { DashboardGrid } from '@/components/shared/DashboardGrid';
import { ActionCard } from '@/components/shared/ActionCard';
import { StatCard } from '@/components/shared/StatCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/Button';

function getFirstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

export function DashboardPage() {
  const { session } = useAuth();
  const { summary, quickActions, requiredActions, recentIdeas, projects, recentActivity, statusDistribution } =
    useDashboard();
  const { markAsRead } = useNotificationFeed();

  return (
    <div className="flex flex-col gap-8">
      {/* Section 1 — Welcome Header */}
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">
          مرحبًا، {session ? getFirstName(session.user.fullName) : ''}
        </h2>
        <p className="mt-1 text-sm text-ink-500">نتمنى لك يومًا مليئًا بالأفكار والإنجازات.</p>
        <DashboardWelcomeSummary
          underReviewCount={summary.data?.underReview ?? 0}
          needsInformationCount={requiredActions.data?.length ?? 0}
          activeProjectsCount={countActiveProjects(projects.data ?? [])}
          isLoading={summary.isLoading || requiredActions.isLoading || projects.isLoading}
        />
      </div>

      {/* Section 2 — Statistics */}
      <DashboardSection title="نظرة عامة" isError={summary.isError} onRetry={() => summary.refetch()}>
        <DashboardGrid columns={5}>
          <StatCard title="إجمالي الأفكار" value={summary.data?.totalIdeas ?? 0} icon={Lightbulb} tone="brand" isLoading={summary.isLoading} />
          <StatCard title="قيد المراجعة" value={summary.data?.underReview ?? 0} icon={Clock} tone="neutral" isLoading={summary.isLoading} />
          <StatCard title="تحتاج استكمال" value={summary.data?.needsInformation ?? 0} icon={FileQuestion} tone="beacon" isLoading={summary.isLoading} />
          <StatCard title="الأفكار المعتمدة" value={summary.data?.approved ?? 0} icon={CheckCircle2} tone="brand" isLoading={summary.isLoading} />
          <StatCard title="المشاريع الناتجة" value={summary.data?.projectsCount ?? 0} icon={FolderKanban} tone="neutral" isLoading={summary.isLoading} />
        </DashboardGrid>
      </DashboardSection>

      {/* Section 3 — Quick Actions */}
      <DashboardSection
        title="إجراءات سريعة"
        isLoading={quickActions.isLoading}
        isError={quickActions.isError}
        onRetry={() => quickActions.refetch()}
      >
        <DashboardGrid columns={5}>
          {quickActions.data?.map((action) => (
            <DashboardQuickActionTile key={action.id} action={action} />
          ))}
        </DashboardGrid>
      </DashboardSection>

      {/* Section 4 — Required Actions */}
      <DashboardSection
        title="الإجراءات المطلوبة"
        description="أفكار بحاجة إلى إجراء منك"
        isLoading={requiredActions.isLoading}
        loadingLabel="جاري تحميل الإجراءات المطلوبة..."
        isError={requiredActions.isError}
        onRetry={() => requiredActions.refetch()}
        isEmpty={(requiredActions.data?.length ?? 0) === 0}
        emptyState={
          <EmptyState
            icon={CheckCircle2}
            title="لا توجد إجراءات مطلوبة حاليًا"
            description="سنخبرك فور الحاجة إلى استكمال أي معلومات."
          />
        }
      >
        <div className="flex flex-col gap-3">
          {requiredActions.data?.map((action) => (
            <ActionCard
              key={action.id}
              title={action.title}
              description={action.description}
              status={action.status}
              metadata={action.metadata}
              primaryAction={action.primaryAction}
            />
          ))}
        </div>
      </DashboardSection>

      {/* Section 5 — Recent Ideas */}
      <DashboardSection
        title="أحدث أفكاري"
        action={
          <Link to="/innovator/ideas" className="text-sm font-medium text-brand-800 underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 rounded-control">
            عرض كل الأفكار
          </Link>
        }
        isLoading={recentIdeas.isLoading}
        loadingLabel="جاري تحميل الأفكار..."
        isError={recentIdeas.isError}
        onRetry={() => recentIdeas.refetch()}
        isEmpty={(recentIdeas.data?.length ?? 0) === 0}
        emptyState={
          <EmptyState
            icon={Lightbulb}
            title="لا توجد أفكار بعد"
            description="ابدأ بتقديم أول فكرة لك."
            action={
              <Link to="/innovator/ideas/new">
                <Button variant="outline" size="sm">تقديم فكرة</Button>
              </Link>
            }
          />
        }
      >
        <IdeasTable items={recentIdeas.data ?? []} />
      </DashboardSection>

      {/* Section 5b — Ideas Status Distribution */}
      <DashboardSection
        title="توزيع حالات الأفكار"
        description="نسبة كل حالة من إجمالي أفكارك"
        isLoading={statusDistribution.isLoading}
        loadingLabel="جاري تحميل التوزيع..."
        isError={statusDistribution.isError}
        onRetry={() => statusDistribution.refetch()}
        isEmpty={(statusDistribution.data?.length ?? 0) === 0}
        emptyState={
          <EmptyState icon={BarChart3} title="لا توجد بيانات" description="سيظهر هنا توزيع حالات أفكارك بمجرد تقديم أول فكرة." />
        }
      >
        <IdeaStatusDistributionChart items={statusDistribution.data ?? []} />
      </DashboardSection>

      {/* Section 6 — Projects */}
      <DashboardSection
        title="مشاريعي"
        action={
          <Link to="/innovator/projects" className="text-sm font-medium text-brand-800 underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 rounded-control">
            عرض كل المشاريع
          </Link>
        }
        isLoading={projects.isLoading}
        loadingLabel="جاري تحميل المشاريع..."
        isError={projects.isError}
        onRetry={() => projects.refetch()}
        isEmpty={(projects.data?.length ?? 0) === 0}
        emptyState={<EmptyState icon={FolderKanban} title="لا توجد مشاريع بعد" description="تظهر هنا المشاريع الناتجة عن أفكارك المعتمدة." />}
      >
        <ProjectsList projects={projects.data ?? []} />
      </DashboardSection>

      {/* Section 7 — Recent Notifications */}
      <DashboardSection
        title="أحدث الإشعارات"
        action={
          <Link to="/innovator/notifications" className="text-sm font-medium text-brand-800 underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 rounded-control">
            عرض كل الإشعارات
          </Link>
        }
        isLoading={recentActivity.isLoading}
        loadingLabel="جاري تحميل الإشعارات..."
        isError={recentActivity.isError}
        onRetry={() => recentActivity.refetch()}
        isEmpty={(recentActivity.data?.length ?? 0) === 0}
        emptyState={<EmptyState icon={Bell} title="لا توجد إشعارات" description="ستظهر هنا آخر التحديثات المتعلقة بأفكارك ومشاريعك." />}
      >
        <RecentActivityList activities={recentActivity.data ?? []} onMarkAsRead={markAsRead} />
      </DashboardSection>
    </div>
  );
}
