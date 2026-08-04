import type {
  SiteConfig,
  NavLink,
  FeatureFlags,
  ContactInfo,
} from "./types";

/**
 * الإعدادات المركزية لموقع «هاكثون الجامعة الذكية».
 * كل قيمة غير معلنة رسميًا تبقى null لتُخفى من الواجهة (لا بيانات مُخترعة).
 */
export const siteConfig: SiteConfig = {
  name: "هاكثون الجامعة الذكية",
  tagline: "من التحدي إلى حلٍّ رقمي قابل للتنفيذ.",
  description:
    "منصة عملية تجمع بين المعرفة والتطبيق، وتحوّل التحديات المؤسسية في جامعة المجمعة إلى حلول رقمية مبتكرة قابلة للتنفيذ.",
  organizer: "جامعة المجمعة",
  organizerShort: "جامعة المجمعة",

  // ⚠️ السنة غير معتمدة رسميًا بعد. عيّنها (مثال: 2025) لتفعيل العدّاد التنازلي.
  //    عند بقائها null: يُعطَّل العدّاد وتُعرض التواريخ نصيًا فقط.
  year: 2026,

  registrationOpen: { label: "26 يوليو", month: 7, day: 26 },
  registrationClose: { label: "7 أغسطس", month: 8, day: 7 },

  // الموعد النهائي المعتمد للتسجيل (٧ أغسطس ٢٠٢٦ نهاية اليوم) — يفعّل العدّاد الحيّ.
  registrationDeadline: "2026-08-07T23:59:59",

  // رابط التسجيل الرسمي (نموذج Google Forms).
  registrationUrl: "https://forms.gle/Y1QcuBPrtEyHb3Hy8",
  // الدليل الإرشادي غير متوفر بعد → الزر يظهر Disabled.
  guideUrl: null,

  // حالة التسجيل العامة — "open" لتوفر رابط تسجيل رسمي فعّال الآن.
  // غيّرها إلى "closed" عند انتهاء التسجيل.
  registrationStatus: "open",

  // المرحلة الحالية في البرنامج الزمني (id من data/timeline.ts، مثال: "ws-2").
  // اتركها null حتى تُعتمد فعليًا — لا تُخمَّن المرحلة الحالية تلقائيًا من التاريخ.
  currentPhaseId: null,
};

/** أعلام التفعيل — لا يُعرض أي قسم مرتبط بها حتى تتوفر بياناته رسميًا. */
export const featureFlags: FeatureFlags = {
  showPartners: true,
  showEvaluationCriteria: false,
  showChallengePages: false,
  showLocation: false,
  showNews: false,
};

/** روابط التنقل داخل الصفحة الرئيسية (RTL). */
export const navLinks: NavLink[] = [
  { id: "objectives", label: "الأهداف" },
  { id: "tracks", label: "المسارات" },
  { id: "timeline", label: "البرنامج الزمني" },
  { id: "workshops", label: "الورش" },
  { id: "faq", label: "الأسئلة الشائعة" },
];

/**
 * بيانات التواصل — كلها null/[] حاليًا فلا تظهر عناصرها في الواجهة.
 * لإضافة حساب تواصل اجتماعي رسمي: أضف عنصرًا لمصفوفة social بالشكل:
 *   { platform: "X (تويتر)", url: "https://x.com/...", icon: "Twitter" }
 * أسماء الأيقونات المتاحة: Facebook · Instagram · Linkedin · Twitter · Youtube · Globe.
 */
export const contact: ContactInfo = {
  email: null,
  phone: null,
  inquiriesGroupUrl: null,
  social: [],
};

/** التقنيات المحورية للهاكثون (وسوم في النبذة). */
export const focusTechnologies: string[] = [
  "الذكاء الاصطناعي",
  "تحليل البيانات",
  "إنترنت الأشياء",
  "التحول الرقمي",
];

/** الفئة المستهدفة. */
export const targetAudience: string[] = [
  "أعضاء هيئة التدريس",
  "الموظفون",
  "الطلاب",
  "رواد الأعمال",
  "المبتكرون",
  "الباحثون",
  "المهتمون بالابتكار والتحول الرقمي من داخل وخارج جامعة المجمعة",
];
