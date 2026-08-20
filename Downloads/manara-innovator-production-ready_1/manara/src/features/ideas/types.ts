/**
 * Idea domain types.
 *
 * NOTE on strategic goals: the architecture supports attaching strategic
 * goal references to an Idea (`strategicGoalIds`), but per product decision
 * this is NOT exposed in the Submit Idea UI yet — ownership of that
 * selection (innovator vs. organization) hasn't been confirmed. The field
 * stays in the model so the UI can light it up later without a data
 * migration or type break.
 */

export const IDEA_STATUSES = [
  'DRAFT',
  'SUBMITTED',
  'UNDER_REVIEW',
  'NEEDS_INFORMATION',
  'UNDER_EVALUATION',
  'RECOMMENDATION_SUBMITTED',
  'PENDING_DECISION',
  'APPROVED',
  'RETURNED_FOR_REVIEW',
  'DEFERRED',
  'NOT_PURSUED',
  'WITHDRAWN',
] as const;

export type IdeaStatus = (typeof IDEA_STATUSES)[number];

/**
 * Captured once, at submission time, and never recomputed afterward.
 * Determined by the user's relationship to the receiving organization
 * at that moment — NOT a permanent property of the user account.
 */
export type SubmitterType = 'internal' | 'external';

export interface IdeaAttachment {
  id: string;
  ideaId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface IdeaStatusHistoryEntry {
  id: string;
  ideaId: string;
  status: IdeaStatus;
  changedAt: string;
  note?: string;
}

export interface InformationRequest {
  id: string;
  ideaId: string;
  message: string;
  requestedAt: string;
  respondedAt?: string;
  response?: string;
  responseAttachmentIds?: string[];
}

export type DecisionOutcome = 'APPROVED' | 'DEFERRED' | 'NOT_PURSUED' | 'RETURNED_FOR_REVIEW';

export interface Decision {
  id: string;
  ideaId: string;
  outcome: DecisionOutcome;
  decidedAt: string;
  reason?: string;
}

export interface Idea {
  id: string;
  title: string;
  organizationId: string;
  organizationName: string;
  category: string;
  description: string;
  problem: string;
  proposedSolution: string;
  expectedImpact: string;
  status: IdeaStatus;
  submitterType: SubmitterType;
  /** See note above — model support only, not yet exposed in Submit Idea UI. */
  strategicGoalIds?: string[];
  /**
   * Idea/project maturity stage — distinct from `status` (which tracks the
   * idea's processing lifecycle within the platform). No approved value
   * list exists yet, so this is a free-text field until one is confirmed;
   * converting it to a Select later is additive, not a data migration.
   */
  ideaStage?: string;
  /** Same "no approved list yet" situation as `ideaStage` — free text until confirmed values exist. */
  supportType?: string;
  /** Freeform notes from the innovator, separate from the structured description/problem/solution/impact fields. */
  additionalNotes?: string;
  attachments: IdeaAttachment[];
  statusHistory: IdeaStatusHistoryEntry[];
  informationRequests: InformationRequest[];
  decision?: Decision;
  relatedProjectId?: string;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  withdrawnAt?: string;
  withdrawReason?: string;
}

/** Shape used by the Submit Idea / Save Draft form. */
export interface IdeaFormValues {
  title: string;
  organizationId: string;
  category: string;
  description: string;
  problem: string;
  proposedSolution: string;
  expectedImpact: string;
  /** Optional — no required list of values exists yet (see `Idea.ideaStage`). */
  ideaStage?: string;
  /** Optional — no required list of values exists yet (see `Idea.supportType`). */
  supportType?: string;
  additionalNotes?: string;
}

export type IdeaSortOption = 'newest' | 'oldest' | 'recentlyUpdated';

/**
 * The single object all idea-listing operations consume — `useIdeas()`,
 * `ideaService.list()`, and the URL-sync hook all speak this shape instead
 * of passing separate search/status/organization/category/sort arguments.
 * Scales cleanly to real pagination later (add `page`/`cursor` here once
 * the backend supports it — no call site needs to change shape).
 *
 * NOTE: `categoryId` — categories currently have no separate id concept in
 * the mock data (`organizationService.listCategories()` returns plain
 * strings); the category string doubles as its own id until a real
 * category entity exists on the backend.
 */
export interface IdeaListQuery {
  search?: string;
  status?: IdeaStatus;
  organizationId?: string;
  categoryId?: string;
  sort?: IdeaSortOption;
}
