import { Users } from 'lucide-react';
import type { ProjectStakeholder } from '../../types';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { EmptyState } from '@/components/shared/EmptyState';

export interface ProjectStakeholdersListProps {
  stakeholders: ProjectStakeholder[];
}

export function ProjectStakeholdersList({ stakeholders }: ProjectStakeholdersListProps) {
  if (stakeholders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h2 className="font-display font-bold text-ink-900">الجهات المعنية</h2>
        </CardHeader>
        <CardBody>
          <EmptyState icon={Users} title="لا توجد بيانات مسجّلة بعد" />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="font-display font-bold text-ink-900">الجهات المعنية</h2>
      </CardHeader>
      <CardBody>
        <ul className="flex flex-col gap-2">
          {stakeholders.map((stakeholder) => (
            <li key={stakeholder.id} className="flex items-center justify-between gap-3 text-sm">
              <span className="text-ink-900">{stakeholder.name}</span>
              <span className="text-ink-500">{stakeholder.role}</span>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
