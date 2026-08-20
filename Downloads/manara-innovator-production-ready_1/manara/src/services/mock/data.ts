import type { User, Organization } from '@/types/common';
import type { Idea } from '@/features/ideas/types';
import type { Project } from '@/features/projects/types';
import type { Notification } from '@/features/notifications/types';

/**
 * In-memory seed data for mock services.
 *
 * These values are illustrative only — NOT confirmed business data, file
 * limits, or categories. They exist purely so the UI has something to
 * render while there is no backend. Replace wholesale in Phase 10.
 */

export const MOCK_CURRENT_USER: User = {
  id: 'user-1',
  fullName: 'سارة العتيبي',
  email: 'sara.alotaibi@example.com',
  phone: '+966500000000',
};

export const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-1',
    slug: 'baladi-tech',
    name: 'هيئة بلدي للتقنية',
    description: 'جهة حكومية تُعنى بتطوير الخدمات التقنية البلدية.',
  },
  {
    id: 'org-2',
    slug: 'noor-health',
    name: 'مجموعة نور الصحية',
    description: 'مجموعة رعاية صحية تستقبل أفكار تحسين تجربة المرضى.',
  },
];

export const MOCK_CATEGORIES = [
  'تحسين الخدمات',
  'الاستدامة',
  'التحول الرقمي',
  'تجربة المستخدم',
  'الكفاءة التشغيلية',
];

let ideaCounter = 4;
export function nextIdeaId(): string {
  ideaCounter += 1;
  return `idea-${ideaCounter}`;
}

export const MOCK_IDEAS: Idea[] = [
  {
    id: 'idea-1',
    title: 'منصة ذكية لإدارة طلبات الصيانة البلدية',
    organizationId: 'org-1',
    organizationName: 'هيئة بلدي للتقنية',
    category: 'التحول الرقمي',
    description: 'نظام يتيح للمواطنين تقديم طلبات صيانة ومتابعتها لحظيًا.',
    problem: 'طول زمن الاستجابة لطلبات الصيانة الحالية وغياب الشفافية.',
    proposedSolution: 'تطبيق موحد يربط المواطن بفرق الصيانة مع تتبع مباشر.',
    expectedImpact: 'خفض زمن الاستجابة بنسبة تقديرية وزيادة رضا المستفيدين.',
    status: 'UNDER_EVALUATION',
    submitterType: 'internal',
    attachments: [
      {
        id: 'att-1',
        ideaId: 'idea-1',
        fileName: 'دراسة-أولية.pdf',
        fileUrl: '#',
        fileSize: 245_000,
        mimeType: 'application/pdf',
        uploadedAt: '2026-06-02T09:00:00Z',
      },
    ],
    statusHistory: [
      { id: 'h1', ideaId: 'idea-1', status: 'SUBMITTED', changedAt: '2026-06-01T08:00:00Z' },
      { id: 'h2', ideaId: 'idea-1', status: 'UNDER_REVIEW', changedAt: '2026-06-03T10:00:00Z' },
      { id: 'h3', ideaId: 'idea-1', status: 'UNDER_EVALUATION', changedAt: '2026-06-10T12:00:00Z' },
    ],
    informationRequests: [],
    createdAt: '2026-05-30T07:00:00Z',
    updatedAt: '2026-06-10T12:00:00Z',
    submittedAt: '2026-06-01T08:00:00Z',
  },
  {
    id: 'idea-2',
    title: 'برنامج تدوير النفايات الطبية',
    organizationId: 'org-2',
    organizationName: 'مجموعة نور الصحية',
    category: 'الاستدامة',
    description: 'مبادرة لفرز وتدوير النفايات الطبية غير الخطرة.',
    problem: 'ارتفاع تكلفة التخلص من النفايات وغياب آلية فرز فعالة.',
    proposedSolution: 'نظام فرز مبدئي عند المصدر مع شراكة مع جهة تدوير معتمدة.',
    expectedImpact: 'خفض التكلفة التشغيلية وتحسين الأثر البيئي.',
    status: 'NEEDS_INFORMATION',
    submitterType: 'internal',
    attachments: [],
    statusHistory: [
      { id: 'h4', ideaId: 'idea-2', status: 'SUBMITTED', changedAt: '2026-06-15T08:00:00Z' },
      { id: 'h5', ideaId: 'idea-2', status: 'UNDER_REVIEW', changedAt: '2026-06-17T08:00:00Z' },
      {
        id: 'h6',
        ideaId: 'idea-2',
        status: 'NEEDS_INFORMATION',
        changedAt: '2026-06-20T08:00:00Z',
        note: 'يرجى تزويدنا بدراسة تكلفة تقديرية.',
      },
    ],
    informationRequests: [
      {
        id: 'ir-1',
        ideaId: 'idea-2',
        message: 'يرجى تزويدنا بدراسة تكلفة تقديرية لعملية الفرز والتدوير، ومرفق يوضح الجهة الشريكة المقترحة.',
        requestedAt: '2026-06-20T08:00:00Z',
      },
    ],
    createdAt: '2026-06-14T07:00:00Z',
    updatedAt: '2026-06-20T08:00:00Z',
    submittedAt: '2026-06-15T08:00:00Z',
  },
  {
    id: 'idea-3',
    title: 'مساعد ذكي لاستقبال استفسارات المراجعين',
    organizationId: 'org-1',
    organizationName: 'هيئة بلدي للتقنية',
    category: 'تجربة المستخدم',
    description: 'واجهة تفاعلية تساعد المراجعين على الوصول للخدمة المناسبة بسرعة.',
    problem: 'صعوبة تحديد المراجعين للخدمة المناسبة عبر القنوات الحالية.',
    proposedSolution: 'نظام توجيه ذكي مبني على الأسئلة الشائعة وتصنيف الطلبات.',
    expectedImpact: 'تقليل زمن الانتظار وزيادة نسبة الحل من أول تواصل.',
    status: 'APPROVED',
    submitterType: 'internal',
    attachments: [],
    statusHistory: [
      { id: 'h7', ideaId: 'idea-3', status: 'SUBMITTED', changedAt: '2026-05-01T08:00:00Z' },
      { id: 'h8', ideaId: 'idea-3', status: 'UNDER_REVIEW', changedAt: '2026-05-03T08:00:00Z' },
      { id: 'h9', ideaId: 'idea-3', status: 'UNDER_EVALUATION', changedAt: '2026-05-10T08:00:00Z' },
      { id: 'h10', ideaId: 'idea-3', status: 'PENDING_DECISION', changedAt: '2026-05-20T08:00:00Z' },
      { id: 'h11', ideaId: 'idea-3', status: 'APPROVED', changedAt: '2026-05-25T08:00:00Z' },
    ],
    informationRequests: [],
    decision: {
      id: 'dec-1',
      ideaId: 'idea-3',
      outcome: 'APPROVED',
      decidedAt: '2026-05-25T08:00:00Z',
      reason: 'فكرة قابلة للتنفيذ وتتماشى مع أولويات تحسين خدمة المراجعين.',
    },
    relatedProjectId: 'proj-1',
    createdAt: '2026-04-28T07:00:00Z',
    updatedAt: '2026-05-25T08:00:00Z',
    submittedAt: '2026-05-01T08:00:00Z',
  },
  {
    id: 'idea-draft-1',
    title: 'تحسين نظام حجز القاعات الداخلية',
    organizationId: 'org-1',
    organizationName: 'هيئة بلدي للتقنية',
    category: 'الكفاءة التشغيلية',
    description: '',
    problem: '',
    proposedSolution: '',
    expectedImpact: '',
    status: 'DRAFT',
    submitterType: 'internal',
    attachments: [],
    statusHistory: [],
    informationRequests: [],
    createdAt: '2026-07-20T07:00:00Z',
    updatedAt: '2026-07-20T07:00:00Z',
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'مشروع المساعد الذكي لاستقبال الاستفسارات',
    relatedIdeaId: 'idea-3',
    relatedIdeaTitle: 'مساعد ذكي لاستقبال استفسارات المراجعين',
    status: 'IN_PROGRESS',
    progressPercent: 40,
    startDate: '2026-06-01',
    requirements: [
      { id: 'req-1', projectId: 'proj-1', title: 'تحديد نطاق الأسئلة الشائعة', status: 'DONE' },
      { id: 'req-2', projectId: 'proj-1', title: 'بناء نموذج التوجيه الأولي', status: 'IN_PROGRESS' },
      { id: 'req-3', projectId: 'proj-1', title: 'اختبار تجريبي مع فريق محدود', status: 'PENDING' },
    ],
    updates: [
      { id: 'upd-1', projectId: 'proj-1', message: 'تم الانتهاء من تحديد نطاق الأسئلة الشائعة.', createdAt: '2026-06-15T09:00:00Z' },
      { id: 'upd-2', projectId: 'proj-1', message: 'بدء العمل على نموذج التوجيه الأولي.', createdAt: '2026-06-22T09:00:00Z' },
    ],
    stakeholders: [{ id: 'sh-1', name: 'فريق التحول الرقمي', role: 'الفريق المنفذ' }],
    createdAt: '2026-05-26T08:00:00Z',
    updatedAt: '2026-06-22T09:00:00Z',
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    title: 'تم استلام فكرتك',
    message: 'تم استلام فكرة "برنامج تدوير النفايات الطبية" بنجاح.',
    isRead: true,
    createdAt: '2026-06-15T08:00:00Z',
    relatedEntityType: 'idea',
    relatedEntityId: 'idea-2',
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    title: 'مطلوب استكمال معلومات',
    message: 'يرجى استكمال المعلومات المطلوبة لفكرة "برنامج تدوير النفايات الطبية".',
    isRead: false,
    createdAt: '2026-06-20T08:05:00Z',
    relatedEntityType: 'idea',
    relatedEntityId: 'idea-2',
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    title: 'تم اعتماد فكرتك',
    message: 'تم اعتماد فكرة "مساعد ذكي لاستقبال استفسارات المراجعين" وتحويلها إلى مشروع.',
    isRead: false,
    createdAt: '2026-05-25T08:10:00Z',
    relatedEntityType: 'idea',
    relatedEntityId: 'idea-3',
  },
  {
    id: 'notif-4',
    userId: 'user-1',
    title: 'تحديث على مشروعك',
    message: 'بدء العمل على نموذج التوجيه الأولي في مشروعك.',
    isRead: false,
    createdAt: '2026-06-22T09:05:00Z',
    relatedEntityType: 'project',
    relatedEntityId: 'proj-1',
  },
];
