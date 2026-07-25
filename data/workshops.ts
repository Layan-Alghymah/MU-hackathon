import type { Workshop, OnsiteWorkshops } from "./types";

/** ورش العمل عن بُعد (رسمية). */
export const remoteWorkshops: Workshop[] = [
  {
    id: "rw-1",
    date: "30 يوليو",
    title: "مقدمة في الابتكار الرقمي والتقنيات الناشئة",
    icon: "Lightbulb",
  },
  {
    id: "rw-2",
    date: "1 أغسطس",
    title: "تبسيط مفاهيم التقنيات الناشئة وتطبيقاتها",
    icon: "Cpu",
  },
  {
    id: "rw-3",
    date: "2 أغسطس",
    title: "تصميم الخدمات الرقمية وتجربة المستفيد",
    icon: "Sparkles",
  },
  {
    id: "rw-4",
    date: "4 أغسطس",
    title: "البيانات والذكاء المؤسسي",
    icon: "Database",
  },
];

/** الورش الحضورية (رسمية) — دون ذكر أي مكان. */
export const onsiteWorkshops: OnsiteWorkshops = {
  date: "10 – 11 أغسطس",
  time: "من 10:00 صباحًا حتى 2:00 مساءً",
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
  { date: "14 أغسطس", title: "تسليم المشاريع النهائية", icon: "UploadCloud" },
  { date: "16 أغسطس", title: "التحكيم والعروض النهائية", icon: "Scale" },
  { date: "يحدد لاحقًا", title: "حفل التكريم وإعلان الفائزين", icon: "Award" },
];
