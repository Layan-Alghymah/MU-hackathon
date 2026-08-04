// أنواع البيانات المشتركة — تفصل بنية المحتوى عن مكوّنات الواجهة.

export interface NavLink {
  id: string;
  label: string;
}

/** حالة التسجيل العامة للهاكثون (لا تُحدد لكل مسار). */
export type RegistrationStatus = "open" | "closed" | "upcoming";

/** فئات عناصر البرنامج القابلة للفلترة (مشتقة من المحتوى الرسمي فقط). */
export type ProgramCategory =
  | "intro"
  | "remote"
  | "onsite"
  | "closing";

export interface ProgramItem {
  id: string;
  date: string;
  title: string;
  icon: string;
  category: ProgramCategory;
  /** معلومة إضافية اختيارية (مثل وقت الورش الحضورية). */
  meta?: string;
  /** ترتيب زمني ثابت. */
  order: number;
}

/** أعلام تفعيل الأقسام — تبقى false ما لم تتوفر بيانات رسمية. */
export interface FeatureFlags {
  showPartners: boolean;
  showEvaluationCriteria: boolean;
  showChallengePages: boolean;
  showLocation: boolean;
  showNews: boolean;
}

export interface SiteConfig {
  /** الاسم المركزي للهاكثون. */
  name: string;
  /** وصف مختصر جدًا (Hero). */
  tagline: string;
  /** نبذة تعريفية. */
  description: string;
  organizer: string;
  organizerShort: string;
  /**
   * سنة الفعالية. null = لم تُعتمد رسميًا بعد.
   * عند null: يُعطَّل العدّاد وتُعرض التواريخ نصيًا فقط.
   */
  year: number | null;
  /** يوم/شهر فتح التسجيل (نص عربي) + الشهر الرقمي للحساب عند توفر السنة. */
  registrationOpen: DateHint;
  /** يوم/شهر إغلاق التسجيل المبدئي. */
  registrationClose: DateHint;
  /**
   * الموعد النهائي لانتهاء التسجيل بصيغة ISO كاملة (سنة/شهر/يوم/وقت).
   * مثال: "2026-08-05T23:59:59". null = لم تُعتمد السنة رسميًا بعد.
   * عند null: يُعطَّل العدّاد الحيّ ويُعرض التاريخ نصيًا فقط (لا تُخترع سنة).
   */
  registrationDeadline: string | null;
  /** رابط التسجيل الخارجي — null → زر Disabled. */
  registrationUrl: string | null;
  /** رابط الدليل الإرشادي (PDF) — null → زر Disabled. */
  guideUrl: string | null;
  /**
   * حالة التسجيل العامة للهاكثون (تُقرأ مركزيًا، وتُعرض عبر شارة الحالة).
   * "upcoming" = قريبًا · "open" = مفتوح · "closed" = منتهٍ.
   */
  registrationStatus: RegistrationStatus;
  /**
   * معرّف المرحلة الحالية في البرنامج الزمني (id من data/timeline.ts).
   * عند تعيينها: تُبرز تلك المرحلة كـ"الحالية" وتُصنَّف ما قبلها "مكتملة"
   * وما بعدها "قادمة". null = لا حالة حالية معروفة رسميًا (لا تُخمَّن).
   */
  currentPhaseId?: string | null;
}

/** تلميح تاريخ: نص للعرض + شهر/يوم رقمي (1–12) لبناء تاريخ عند اعتماد السنة. */
export interface DateHint {
  label: string;
  month: number;
  day: number;
}

export interface Objective {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Track {
  slug: string;
  name: string;
  icon: string;
  accent: string;
  summary: string;
  description: string;
  /** أمثلة لمجالات التحديات (ليست تحديات نهائية معتمدة). */
  challengeExamples: string[];
}

export interface TimelinePhase {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: string;
  /** مرحلة ختامية تُبرز بصريًا. */
  highlight?: boolean;
}

export interface Workshop {
  id: string;
  date: string;
  title: string;
  icon: string;
}

export interface OnsiteWorkshops {
  date: string;
  time: string;
  activities: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  email: string | null;
  phone: string | null;
  inquiriesGroupUrl: string | null;
  social: { platform: string; url: string; icon: string }[];
}
