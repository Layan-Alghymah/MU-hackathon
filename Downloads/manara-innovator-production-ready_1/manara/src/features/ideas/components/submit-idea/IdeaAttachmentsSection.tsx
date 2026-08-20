import type { IdeaAttachment } from '../../types';
import { AttachmentUploader, type PendingAttachment } from '@/components/shared/AttachmentUploader';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Paperclip } from 'lucide-react';
import { formatFileSize } from '@/utils/formatFileSize';

export interface IdeaAttachmentsSectionProps {
  pendingAttachments: PendingAttachment[];
  onPendingAttachmentsChange: (files: PendingAttachment[]) => void;
  /** Already-uploaded attachments — only present in edit mode. Read-only here; removal isn't a confirmed capability yet. */
  existingAttachments?: IdeaAttachment[];
  error?: string;
  disabled?: boolean;
}

export function IdeaAttachmentsSection({
  pendingAttachments,
  onPendingAttachmentsChange,
  existingAttachments,
  error,
  disabled,
}: IdeaAttachmentsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="font-display font-bold text-ink-900">المرفقات</h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {existingAttachments && existingAttachments.length > 0 && (
          <ul className="flex flex-col gap-2">
            {existingAttachments.map((attachment) => (
              <li
                key={attachment.id}
                className="flex items-center gap-2 rounded-control border border-ink-100 px-3 py-2 text-sm text-ink-700"
              >
                <Paperclip className="size-4 shrink-0 text-ink-500" aria-hidden="true" />
                <span className="truncate">{attachment.fileName}</span>
                <span className="shrink-0 text-xs text-ink-400">{formatFileSize(attachment.fileSize)}</span>
              </li>
            ))}
          </ul>
        )}
        <AttachmentUploader
          files={pendingAttachments}
          onFilesChange={onPendingAttachmentsChange}
          error={error}
          disabled={disabled}
        />
      </CardBody>
    </Card>
  );
}
