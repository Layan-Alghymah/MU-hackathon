import type { IdeaDetailsViewModel } from '../../viewModels';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { StatusBadge } from '@/components/shared/StatusBadge';

export interface IdeaDecisionSectionProps {
  decision: NonNullable<IdeaDetailsViewModel['decision']>;
}

export function IdeaDecisionSection({ decision }: IdeaDecisionSectionProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="font-display font-bold text-ink-900">القرار</h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <StatusBadge label={decision.outcomeLabel} tone={decision.tone} />
          <span className="text-xs text-ink-400">بتاريخ {decision.decidedAtLabel}</span>
        </div>
        {decision.reason && <p className="text-sm text-ink-700">{decision.reason}</p>}
      </CardBody>
    </Card>
  );
}
