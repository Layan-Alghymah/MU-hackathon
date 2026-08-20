import type { Objective } from "./types";

/** أهداف الهاكثون السبعة (رسمية) — عناوين مختصرة دون تغيير المعنى. */
export const objectives: Objective[] = [
  {
    id: "culture",
    title: "نشر ثقافة الابتكار الرقمي",
    description: "نشر ثقافة الابتكار الرقمي داخل الجامعة.",
    icon: "Lightbulb",
  },
  {
    id: "emerging-tech",
    title: "توظيف التقنيات الناشئة",
    description:
      "تمكين المشاركين من استخدام التقنيات الناشئة في معالجة التحديات المؤسسية.",
    icon: "Cpu",
  },
  {
    id: "applicable-solutions",
    title: "حلول قابلة للتطبيق",
    description: "تطوير حلول رقمية مبتكرة قابلة للتطبيق.",
    icon: "Rocket",
  },
  {
    id: "efficiency",
    title: "رفع كفاءة العمليات",
    description: "رفع كفاءة العمليات الأكاديمية والإدارية.",
    icon: "Gauge",
  },
  {
    id: "experience",
    title: "تحسين تجربة المستفيد",
    description: "تحسين تجربة المستفيد وجودة الخدمات.",
    icon: "Sparkles",
  },
  {
    id: "integration",
    title: "التكامل والابتكار المفتوح",
    description:
      "تعزيز التكامل بين الإدارات والكليات من خلال الابتكار المفتوح.",
    icon: "Network",
  },
  {
    id: "incubation",
    title: "مشاريع قابلة للاحتضان",
    description: "بناء مشاريع نوعية قابلة للاحتضان والتطوير.",
    icon: "Trophy",
  },
];
