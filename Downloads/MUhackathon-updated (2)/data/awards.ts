import type { PrizeTier } from "./types";

/**
 * جوائز المراكز الثلاثة الأولى.
 * القيم المالية غير معتمدة رسميًا بعد → amount: null فتُعرض كـ"تُعلن لاحقًا"
 * بدلًا من اختراع مبالغ (نفس نهج البيانات الأخرى في المشروع).
 * حدّث amount لكل مركز فور اعتماد القيمة الرسمية.
 */
export const prizeTiers: PrizeTier[] = [
  { id: "first", rank: 1, title: "المركز الأول", icon: "Crown", amount: null },
  { id: "second", rank: 2, title: "المركز الثاني", icon: "Medal", amount: null },
  { id: "third", rank: 3, title: "المركز الثالث", icon: "Award", amount: null },
];
