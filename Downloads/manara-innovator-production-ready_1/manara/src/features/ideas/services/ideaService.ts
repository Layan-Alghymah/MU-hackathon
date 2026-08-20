import type { Idea, IdeaAttachment, IdeaFormValues, IdeaListQuery, SubmitterType } from '../types';
import { resolveIdeaSort } from '../sortOptions';
import { MOCK_IDEAS, nextIdeaId } from '@/services/mock/data';
import { mockDelay, generateId } from '@/services/mock/utils';

/**
 * ideaService abstraction. Components/hooks must depend on this interface
 * only. Replace `mockIdeaService` with a real HTTP-backed implementation
 * (using `apiClient`) once the backend contract is confirmed — no caller
 * needs to change.
 *
 * EXTENSION (Phase 4B): `saveDraft`/`submit` now accept an already-resolved
 * `attachments: IdeaAttachment[]` — this service only ever receives
 * finished attachment records, never raw `File`s. Uploading files into that
 * shape is `attachmentUploadService`'s job, coordinated by
 * `ideaWorkflow`; this is an additive extension of the Phase 1
 * contract, not a breaking change to how ideas themselves are saved.
 *
 * EXTENSION (Phase 8): both methods also accept an optional
 * `submitterType`, used ONLY when creating a brand-new idea (`draftId`
 * absent) — ignored on updates, since `submitterType` is immutable once
 * set (Phase 1 decision: "يجب حفظ submitterType وقت تقديم الفكرة"). Resolved
 * by `ideaWorkflow` via `membershipService`, never guessed here.
 */
export interface IdeaService {
  list(query?: IdeaListQuery): Promise<Idea[]>;
  getById(id: string): Promise<Idea>;
  saveDraft(
    values: IdeaFormValues,
    attachments: IdeaAttachment[],
    draftId?: string,
    submitterType?: SubmitterType,
  ): Promise<Idea>;
  submit(
    values: IdeaFormValues,
    attachments: IdeaAttachment[],
    draftId?: string,
    submitterType?: SubmitterType,
  ): Promise<Idea>;
  respondToInformationRequest(
    ideaId: string,
    requestId: string,
    response: string,
    attachments: IdeaAttachment[],
  ): Promise<Idea>;
  withdraw(ideaId: string, reason: string): Promise<Idea>;
}

// In-memory mutable store seeded from MOCK_IDEAS, so create/update/withdraw persist within the session.
const store: Idea[] = [...MOCK_IDEAS];

function applyQuery(ideas: Idea[], query?: IdeaListQuery): Idea[] {
  let result = [...ideas];

  if (query?.search) {
    const q = query.search.trim().toLowerCase();
    result = result.filter((idea) => idea.title.toLowerCase().includes(q));
  }
  if (query?.status) {
    result = result.filter((idea) => idea.status === query.status);
  }
  if (query?.organizationId) {
    result = result.filter((idea) => idea.organizationId === query.organizationId);
  }
  if (query?.categoryId) {
    // categoryId doubles as the category string itself — see IdeaListQuery note.
    result = result.filter((idea) => idea.category === query.categoryId);
  }

  const { sortBy, sortDirection } = resolveIdeaSort(query?.sort);
  result.sort((a, b) => {
    const aVal = a[sortBy] ?? '';
    const bVal = b[sortBy] ?? '';
    const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return result;
}

class MockIdeaService implements IdeaService {
  async list(query?: IdeaListQuery): Promise<Idea[]> {
    return mockDelay(applyQuery(store, query), 500);
  }

  async getById(id: string): Promise<Idea> {
    const idea = store.find((i) => i.id === id);
    if (!idea) throw new Error('الفكرة غير موجودة.');
    return mockDelay(idea, 400);
  }

  async saveDraft(
    values: IdeaFormValues,
    attachments: IdeaAttachment[],
    draftId?: string,
    submitterType: SubmitterType = 'internal',
  ): Promise<Idea> {
    const now = new Date().toISOString();
    const orgName =
      store.find((i) => i.organizationId === values.organizationId)?.organizationName ?? '';

    if (draftId) {
      const idx = store.findIndex((i) => i.id === draftId);
      if (idx === -1) throw new Error('المسودة غير موجودة.');
      store[idx] = {
        ...store[idx],
        ...values,
        organizationName: orgName || store[idx].organizationName,
        attachments: attachments.map((a) => ({ ...a, ideaId: draftId })),
        updatedAt: now,
      };
      return mockDelay(store[idx], 500);
    }

    const newId = nextIdeaId();
    const newIdea: Idea = {
      id: newId,
      ...values,
      organizationName: orgName,
      status: 'DRAFT',
      submitterType,
      attachments: attachments.map((a) => ({ ...a, ideaId: newId })),
      statusHistory: [],
      informationRequests: [],
      createdAt: now,
      updatedAt: now,
    };
    store.unshift(newIdea);
    return mockDelay(newIdea, 500);
  }

  async submit(
    values: IdeaFormValues,
    attachments: IdeaAttachment[],
    draftId?: string,
    submitterType: SubmitterType = 'internal',
  ): Promise<Idea> {
    const now = new Date().toISOString();
    const orgName =
      store.find((i) => i.organizationId === values.organizationId)?.organizationName ?? '';

    if (draftId) {
      const idx = store.findIndex((i) => i.id === draftId);
      if (idx === -1) throw new Error('المسودة غير موجودة.');
      store[idx] = {
        ...store[idx],
        ...values,
        organizationName: orgName || store[idx].organizationName,
        attachments: attachments.map((a) => ({ ...a, ideaId: draftId })),
        status: 'SUBMITTED',
        updatedAt: now,
        submittedAt: now,
        statusHistory: [
          ...store[idx].statusHistory,
          { id: generateId('hist'), ideaId: draftId, status: 'SUBMITTED', changedAt: now },
        ],
      };
      return mockDelay(store[idx], 600);
    }

    const id = nextIdeaId();
    const newIdea: Idea = {
      id,
      ...values,
      organizationName: orgName,
      status: 'SUBMITTED',
      submitterType,
      attachments: attachments.map((a) => ({ ...a, ideaId: id })),
      statusHistory: [{ id: generateId('hist'), ideaId: id, status: 'SUBMITTED', changedAt: now }],
      informationRequests: [],
      createdAt: now,
      updatedAt: now,
      submittedAt: now,
    };
    store.unshift(newIdea);
    return mockDelay(newIdea, 600);
  }

  async respondToInformationRequest(
    ideaId: string,
    requestId: string,
    response: string,
    attachments: IdeaAttachment[],
  ): Promise<Idea> {
    const idx = store.findIndex((i) => i.id === ideaId);
    if (idx === -1) throw new Error('الفكرة غير موجودة.');
    const now = new Date().toISOString();

    const idea = store[idx];
    const updatedRequests = idea.informationRequests.map((req) =>
      req.id === requestId ? { ...req, response, respondedAt: now } : req,
    );

    store[idx] = {
      ...idea,
      informationRequests: updatedRequests,
      attachments: attachments.map((a) => ({ ...a, ideaId })),
      status: 'UNDER_REVIEW',
      updatedAt: now,
      statusHistory: [
        ...idea.statusHistory,
        { id: generateId('hist'), ideaId, status: 'UNDER_REVIEW', changedAt: now, note: 'تم استلام الاستكمال المطلوب.' },
      ],
    };

    return mockDelay(store[idx], 600);
  }

  async withdraw(ideaId: string, reason: string): Promise<Idea> {
    const idx = store.findIndex((i) => i.id === ideaId);
    if (idx === -1) throw new Error('الفكرة غير موجودة.');
    const now = new Date().toISOString();

    store[idx] = {
      ...store[idx],
      status: 'WITHDRAWN',
      withdrawnAt: now,
      withdrawReason: reason,
      updatedAt: now,
      statusHistory: [
        ...store[idx].statusHistory,
        { id: generateId('hist'), ideaId, status: 'WITHDRAWN', changedAt: now, note: reason },
      ],
    };

    return mockDelay(store[idx], 600);
  }
}

export const ideaService: IdeaService = new MockIdeaService();
