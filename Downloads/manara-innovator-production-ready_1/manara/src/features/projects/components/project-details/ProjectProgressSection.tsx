import type { ProjectDetailsViewModel } from '../../viewModels';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';

export interface ProjectProgressSectionProps {
  project: ProjectDetailsViewModel;
}

export function ProjectProgressSection({ project }: ProjectProgressSectionProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="font-display font-bold text-ink-900">التقدّم</h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-3">
        {typeof project.progressPercent === 'number' ? (
          <div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
              <div className="h-full rounded-full bg-brand-700" style={{ width: `${project.progressPercent}%` }} />
            </div>
            <p className="mt-1.5 text-sm text-ink-500">نسبة الإنجاز: {project.progressPercent}٪</p>
          </div>
        ) : (
          <p className="text-sm text-ink-500">لا توجد نسبة إنجاز مسجّلة بعد.</p>
        )}

        {(project.startDateLabel || project.endDateLabel) && (
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-500">
            {project.startDateLabel && <span>تاريخ البدء: {project.startDateLabel}</span>}
            {project.endDateLabel && <span>تاريخ الانتهاء المتوقع: {project.endDateLabel}</span>}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
