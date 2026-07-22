import type { Workshop, OnsiteWorkshops } from "./types";

/** ورش العمل عن بُعد (رسمية). */
export const remoteWorkshops: Workshop[] = [
  {
    id: "rw-1",
    date: "٣٠ يوليو",
    title: "مقدمة في الابتكار الرقمي والتقنيات الناشئة",
    icon: "Lightbulb",
  },
  {
    id: "rw-2",
    date: "١ أغسطس",
    title: "تبسيط مفاهيم التقنيات الناشئة وتطبيقاتها",
    icon: "Cpu",
  },
  {
    id: "rw-3",
    date: "٢ أغسطس",
    title: "تصميم الخدمات الرقمية وتجربة المستفيد",
    icon: "Sparkles",
  },
  {
    id: "rw-4",
    date: "٤ أغسطس",
    title: "البيانات والذكاء المؤسسي",
    icon: "Database",
  },
];

/** الورش الحضورية (رسمية) — دون ذكر أي مكان. */
export const onsiteWorkshops: OnsiteWorkshops = {
  date: "١٠ – ١١ أغسطس",
  time: "من ١٠:٠٠ صباحًا حتى ٢:٠٠ مساءً",
  activities: [
    "جلسات التفكير التصميمي.",
    "العصف الذهني.",
    "تصميم الحلول.",
    "بناء النماذج الأولية الرقمية.",
    "التحقق من نموذج الأعمال.",
    "إعداد عرض المشروع (Pitch Deck).",
    "التدريب على العرض أمام لجنة التحكيم.",
  ],
};

/** المراحل الختامية (رسمية). «يحدد لاحقًا» مرتبطة بتاريخ حفل التكريم فقط. */
export const closingStages: { date: string; title: string; icon: string }[] = [
  { date: "١٤ أغسطس", title: "تسليم المشاريع النهائية", icon: "UploadCloud" },
  { date: "١٦ أغسطس", title: "التحكيم والعروض النهائية", icon: "Scale" },
  { date: "يحدد لاحقًا", title: "حفل التكريم وإعلان الفائزين", icon: "Award" },
];
