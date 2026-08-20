import { Paperclip, Download } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatFileSize } from '@/utils/formatFileSize';

/**
 * Structural shape only — `IdeaAttachment` and `ProjectAttachment` both
 * satisfy this already, so either can be passed directly without mapping.
 * If a future domain's attachment shape diverges, that domain maps to this
 * shape at its own boundary; this component stays domain-agnostic.
 */
export interface AttachmentListItem {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
}

export interface AttachmentsListProps {
  attachments: AttachmentListItem[];
  title?: string;
  emptyTitle?: string;
}

/** Read-only attachments list — no uploader. Used by both Idea Details and Project Details. */
export function AttachmentsList({ attachments, title = 'المرفقات', emptyTitle = 'لا توجد مرفقات' }: AttachmentsListProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="font-display font-bold text-ink-900">{title}</h2>
      </CardHeader>
      <CardBody>
        {attachments.length === 0 ? (
          <EmptyState icon={Paperclip} title={emptyTitle} />
        ) : (
          <ul className="flex flex-col gap-2">
            {attachments.map((attachment) => (
              <li
                key={attachment.id}
                className="flex items-center gap-3 rounded-control border border-ink-100 px-3 py-2"
              >
                <Paperclip className="size-4 shrink-0 text-ink-500" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-sm text-ink-900">{attachment.fileName}</span>
                <span className="shrink-0 text-xs text-ink-400">{formatFileSize(attachment.fileSize)}</span>
                <a
                  href={attachment.fileUrl}
                  download={attachment.fileName}
                  aria-label={`تنزيل ${attachment.fileName}`}
                  className="shrink-0 rounded-control p-1.5 text-ink-500 hover:bg-ink-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  <Download className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
