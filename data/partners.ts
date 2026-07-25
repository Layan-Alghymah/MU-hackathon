/**
 * الشركاء — تُعرض شعارات الشركاء المعتمدة رسميًا فقط.
 * logo: null يعني أن ملف الشعار لم يُرفع بعد — لا يظهر الشريك في الناقل
 * إطلاقًا حتى يُضاف شعاره (بلا صناديق أو بدائل نصية داخل الشريط).
 */
export interface Partner {
  name: string;
  category: string;
  /** داخلي (من داخل الجامعة) أو خارجي. */
  group: "internal" | "external";
  logo: string | null;
  /** أبعاد ملف الشعار الأصلية (لضبط النسبة الصحيحة تلقائيًا). */
  width?: number;
  height?: number;
  url?: string | null;
}

export const partners: Partner[] = [
  // ── الشركاء الداخليون ──────────────────────────────────────────
  {
    name: "مركز الابتكار وريادة الأعمال",
    category: "شريك داخلي",
    group: "internal",
    logo: "/logos/partners/innovation-center.png",
    width: 1334,
    height: 1037,
    url: null,
  },
  {
    name: "عمادة تقنية المعلومات",
    category: "شريك داخلي",
    group: "internal",
    logo: "/logos/partners/deanship-it.png",
    width: 400,
    height: 400,
    url: null,
  },
  {
    name: "نادي الابتكار وريادة الأعمال",
    category: "شريك داخلي",
    group: "internal",
    logo: "/logos/partners/innovation-club.png",
    width: 1371,
    height: 1037,
    url: null,
  },
  {
    name: "عمادة شؤون الطلاب",
    category: "شركاء داخليون",
    group: "internal",
    logo: "/logos/partners/عمادة شؤون الطلاب.png",
    width: 700,
    height: 356,
    url: null,
  },
  {
    name: "مركز سيفال السعودية",
    category: "شركاء داخليون",
    group: "internal",
    logo: "/logos/partners/مركز سيفال.png",
    width: 197,
    height: 66,
    url: null,
  },
  {
    name: "صندوق الطالب",
    category: "شركاء داخليون",
    group: "internal",
    logo: "/logos/partners/صندوق الطالب.png",
    width: 240,
    height: 240,
    url: null,
  },
  {
    name: "مرصد المسؤولية المجتمعية",
    category: "شركاء داخليون",
    group: "internal",
    logo: "/logos/partners/مرصد المسؤولية الاجتماعية.png",
    width: 700,
    height: 356,
    url: null,
  },
  // ── الشركاء الخارجيون ──────────────────────────────────────────
  {
    name: "منشآت",
    category: "شريك خارجي",
    group: "external",
    logo: "/logos/partners/monshaat.png",
    width: 505,
    height: 361,
    url: null,
  },
  {
    name: "شركة ريناد المجد لتقنية المعلومات",
    category: "شريك خارجي",
    group: "external",
    logo: "/logos/partners/rmg.png",
    width: 1154,
    height: 377,
    url: null,
  },
];

/** الجهة المنظّمة (تظهر في التذييل). */
export const organizer = {
  name: "جامعة المجمعة",
  logo: "/logos/majmaah-university.png",
  url: "https://www.mu.edu.sa",
};
