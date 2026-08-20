import { FolderKanban } from 'lucide-react';
import { useProjects } from '@/features/projects/hooks/useProjects';
import { ProjectsList } from '@/features/projects/components/ProjectsList';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';

export function MyProjectsPage() {
  const projectsQuery = useProjects();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="مشاريعي" description="المشاريع الناتجة عن أفكارك المعتمدة." />

      {projectsQuery.isLoading ? (
        <LoadingState label="جاري تحميل المشاريع..." />
      ) : projectsQuery.isError ? (
        <ErrorState onRetry={() => projectsQuery.refetch()} />
      ) : (projectsQuery.data?.length ?? 0) === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="لا توجد مشاريع بعد"
          description="تظهر هنا المشاريع الناتجة عن أفكارك المعتمدة."
        />
      ) : (
        <ProjectsList projects={projectsQuery.data!} />
      )}
    </div>
  );
}
