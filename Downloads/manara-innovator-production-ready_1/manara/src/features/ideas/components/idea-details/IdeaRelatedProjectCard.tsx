import type { Project } from '@/features/projects/types';
import { ProjectCard } from '@/features/projects/components/ProjectCard';

export interface IdeaRelatedProjectCardProps {
  project: Project;
}

/**
 * Purely presentational — ideaDetailsService already fetched the project,
 * so this component has no data-fetching of its own (unlike its Phase 4C
 * version, which called useProject() itself; that responsibility moved to
 * the aggregation service).
 */
export function IdeaRelatedProjectCard({ project }: IdeaRelatedProjectCardProps) {
  return (
    <div>
      <h2 className="mb-4 font-display font-bold text-ink-900">المشروع المرتبط</h2>
      <ProjectCard project={project} />
    </div>
  );
}
