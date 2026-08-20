export const PROJECT_STATUSES = [
  'CREATED',
  'PLANNING',
  'IN_PROGRESS',
  'BLOCKED',
  'ON_HOLD',
  'RESUMED',
  'COMPLETED',
  'CLOSED',
  'ARCHIVED',
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface ProjectRequirement {
  id: string;
  projectId: string;
  title: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  message: string;
  createdAt: string;
}

export interface ProjectAttachment {
  id: string;
  projectId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface ProjectStakeholder {
  id: string;
  name: string;
  role: string;
}

/**
 * A single delivery/milestone set BY THE ORGANIZATION after a project is
 * accepted — the innovator can only view these, never create or edit them
 * (no mutation method exists on `projectService` for this, by design).
 * Reuses `ProjectRequirement`'s status vocabulary (PENDING/IN_PROGRESS/DONE)
 * rather than inventing a parallel one. "Overdue" is deliberately NOT a
 * stored status — it's derived from `dueDate` vs. the current date at
 * view-model mapping time (see `mapDeliveryMilestoneToViewModel`).
 */
export interface ProjectDeliveryMilestone {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  /** Set by the organization, not the innovator. */
  dueDate: string;
  status: ProjectRequirement['status'];
}

export interface Project {
  id: string;
  name: string;
  relatedIdeaId: string;
  relatedIdeaTitle: string;
  status: ProjectStatus;
  progressPercent?: number;
  startDate?: string;
  endDate?: string;
  requirements: ProjectRequirement[];
  updates: ProjectUpdate[];
  attachments?: ProjectAttachment[];
  stakeholders?: ProjectStakeholder[];
  /** Set by the organization once the project is accepted — absent until the organization actually schedules deliveries. Never populated with sample data. */
  deliveryMilestones?: ProjectDeliveryMilestone[];
  createdAt: string;
  updatedAt: string;
}
