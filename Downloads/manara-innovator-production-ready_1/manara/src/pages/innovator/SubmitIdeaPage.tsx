import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams, Navigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import type { IdeaFormValues } from '@/features/ideas/types';
import { ideaDraftSchema, ideaFormSchema } from '@/features/ideas/schemas';
import { useIdea } from '@/features/ideas/hooks/useIdea';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useCategories } from '@/hooks/useCategories';
import { mapIdeaToFormValues } from '@/features/ideas/viewModels';
import { canEditIdea } from '@/features/ideas/policies';
import { ideaWorkflow, IdeaWorkflowError } from '@/features/ideas/services/ideaWorkflow';
import { getIdeaWorkflowErrorMessage } from '@/features/ideas/workflowErrorMessages';
import { queryKeys } from '@/constants/queryKeys';
import { useAuth } from '@/app/providers/AuthContext';
import { useFormFeedback } from '@/hooks/useFormFeedback';
import { IdeaBasicInfoSection } from '@/features/ideas/components/submit-idea/IdeaBasicInfoSection';
import { IdeaDetailsSection } from '@/features/ideas/components/submit-idea/IdeaDetailsSection';
import { IdeaAttachmentsSection } from '@/features/ideas/components/submit-idea/IdeaAttachmentsSection';
import { IdeaFormActions } from '@/features/ideas/components/submit-idea/IdeaFormActions';
import type { PendingAttachment } from '@/components/shared/AttachmentUploader';
import { PageHeader } from '@/components/shared/PageHeader';
import { FormAlert } from '@/components/shared/FormAlert';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';

const EMPTY_VALUES: IdeaFormValues = {
  title: '',
  organizationId: '',
  category: '',
  description: '',
  problem: '',
  proposedSolution: '',
  expectedImpact: '',
  ideaStage: '',
  supportType: '',
  additionalNotes: '',
};

export function SubmitIdeaPage() {
  const { id: draftId } = useParams<{ id: string }>();
  const isEditMode = Boolean(draftId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const [searchParams] = useSearchParams();

  const ideaQuery = useIdea(draftId);
  // Fetched here too (cache-shared with IdeaBasicInfoSection) purely to know
  // when the select options exist, so resetting the form in edit mode
  // doesn't try to select an option that hasn't rendered yet.
  const organizationsQuery = useOrganizations();
  const categoriesQuery = useCategories();

  // External registration deep-links here with ?organizationId= so the
  // organization the innovator registered through is pre-selected — read
  // once at mount, only relevant when creating a brand-new idea.
  const [defaultValues] = useState<IdeaFormValues>(() => ({
    ...EMPTY_VALUES,
    organizationId: !isEditMode ? (searchParams.get('organizationId') ?? '') : '',
  }));

  const form = useForm<IdeaFormValues>({
    resolver: zodResolver(ideaDraftSchema),
    defaultValues,
  });

  const [pendingAttachments, setPendingAttachments] = useState<PendingAttachment[]>([]);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const feedback = useFormFeedback();

  const isDataReady =
    !isEditMode || (ideaQuery.data && !organizationsQuery.isLoading && !categoriesQuery.isLoading);

  useEffect(() => {
    if (isEditMode && ideaQuery.data && isDataReady) {
      form.reset(mapIdeaToFormValues(ideaQuery.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, ideaQuery.data, isDataReady]);

  if (isEditMode && ideaQuery.isLoading) {
    return <LoadingState label="جاري تحميل المسودة..." />;
  }

  if (isEditMode && ideaQuery.isError) {
    return <ErrorState onRetry={() => ideaQuery.refetch()} />;
  }

  if (isEditMode && ideaQuery.data && !canEditIdea(ideaQuery.data.status)) {
    // Not (or no longer) editable — send the innovator to the read-only details view instead.
    return <Navigate to={`/innovator/ideas/${draftId}`} replace />;
  }

  const invalidateIdeaQueries = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.ideas.all() });
    queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all() });
  };

  const handleSaveDraft = form.handleSubmit(async (values) => {
    feedback.clear();
    setIsSavingDraft(true);
    try {
      const result = await ideaWorkflow.saveDraft({
        values,
        pendingFiles: pendingAttachments.map((p) => p.file),
        existingAttachments: ideaQuery.data?.attachments,
        currentStatus: ideaQuery.data?.status ?? null,
        draftId,
        currentUserId: session!.user.id,
      });
      invalidateIdeaQueries();
      setPendingAttachments([]);
      feedback.setSuccess('تم حفظ المسودة بنجاح.');
      navigate(result.redirectTo, { replace: true });
    } catch (error) {
      feedback.setError(getIdeaWorkflowErrorMessage(error instanceof IdeaWorkflowError ? error : undefined));
    } finally {
      setIsSavingDraft(false);
    }
  });

  const handleSubmitIdea = async () => {
    feedback.clear();

    const values = form.getValues();
    const result = ideaFormSchema.safeParse(values);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof IdeaFormValues;
        form.setError(field, { type: 'manual', message: issue.message });
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const workflowResult = await ideaWorkflow.submit({
        values: result.data,
        pendingFiles: pendingAttachments.map((p) => p.file),
        existingAttachments: ideaQuery.data?.attachments,
        currentStatus: ideaQuery.data?.status ?? null,
        draftId,
        currentUserId: session!.user.id,
      });
      invalidateIdeaQueries();
      navigate(workflowResult.redirectTo, { replace: true });
    } catch (error) {
      feedback.setError(getIdeaWorkflowErrorMessage(error instanceof IdeaWorkflowError ? error : undefined));
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-6 pb-4">
        <PageHeader
          title={isEditMode ? 'متابعة تقديم فكرة' : 'تقديم فكرة جديدة'}
          description="شارك فكرتك بالتفصيل — يمكنك حفظها كمسودة والعودة لاحقًا لإكمالها."
        />

        <FormAlert message={feedback.message} tone={feedback.tone} />

        <form onSubmit={(e) => e.preventDefault()} noValidate className="flex flex-col gap-6">
          <IdeaBasicInfoSection />
          <IdeaDetailsSection />
          <IdeaAttachmentsSection
            pendingAttachments={pendingAttachments}
            onPendingAttachmentsChange={setPendingAttachments}
            existingAttachments={ideaQuery.data?.attachments}
            disabled={isSavingDraft || isSubmitting}
          />

          <IdeaFormActions
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmitIdea}
            isSavingDraft={isSavingDraft}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </FormProvider>
  );
}
