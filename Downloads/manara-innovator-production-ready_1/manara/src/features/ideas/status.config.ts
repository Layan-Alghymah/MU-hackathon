import type { IdeaStatus } from './types';
import type { StatusTone } from '@/types/status';

export type { StatusTone };

interface IdeaStatusConfigEntry {
  label: string;
  tone: StatusTone;
  /** Short description shown in tooltips / detail headers. */
  description: string;
}

/**
 * Single source of truth for idea status → Arabic label / visual tone.
 * Do NOT duplicate this mapping inside components — import from here.
 */
export const IDEA_STATUS_CONFIG: Record<IdeaStatus, IdeaStatusConfigEntry> = {
  DRAFT: {
    label: 'مسودة',
    tone: 'neutral',
    description: 'لم يتم إرسال الفكرة بعد، ولا يزال بإمكانك تعديلها.',
  },
  SUBMITTED: {
    label: 'تم الإرسال',
    tone: 'info',
    description: 'تم استلام فكرتك وهي بانتظار بدء المراجعة.',
  },
  UNDER_REVIEW: {
    label: 'قيد المراجعة',
    tone: 'info',
    description: 'الجهة المستقبلة تراجع تفاصيل فكرتك حاليًا.',
  },
  NEEDS_INFORMATION: {
    label: 'يحتاج استكمال معلومات',
    tone: 'warning',
    description: 'مطلوب منك استكمال معلومات أو مستندات إضافية.',
  },
  UNDER_EVALUATION: {
    label: 'قيد التقييم',
    tone: 'info',
    description: 'فكرتك قيد التقييم الفني والموضوعي.',
  },
  RECOMMENDATION_SUBMITTED: {
    label: 'تم رفع التوصية',
    tone: 'info',
    description: 'تم رفع توصية بخصوص فكرتك لأصحاب القرار.',
  },
  PENDING_DECISION: {
    label: 'بانتظار القرار',
    tone: 'warning',
    description: 'فكرتك بانتظار اتخاذ القرار النهائي.',
  },
  APPROVED: {
    label: 'معتمدة',
    tone: 'success',
    description: 'تم اعتماد فكرتك.',
  },
  RETURNED_FOR_REVIEW: {
    label: 'معادة للمراجعة',
    tone: 'warning',
    description: 'تمت إعادة فكرتك لمراجعة إضافية.',
  },
  DEFERRED: {
    label: 'مؤجلة',
    tone: 'neutral',
    description: 'تم تأجيل النظر في فكرتك لوقت لاحق.',
  },
  NOT_PURSUED: {
    label: 'لن تتم متابعتها حاليًا',
    tone: 'danger',
    description: 'تقرر عدم المتابعة بهذه الفكرة حاليًا.',
  },
  WITHDRAWN: {
    label: 'مسحوبة',
    tone: 'neutral',
    description: 'تم سحب هذه الفكرة من قبلك.',
  },
};

export function getIdeaStatusLabel(status: IdeaStatus): string {
  return IDEA_STATUS_CONFIG[status].label;
}

export function getIdeaStatusTone(status: IdeaStatus): StatusTone {
  return IDEA_STATUS_CONFIG[status].tone;
}
