import type { Track } from "@/data/types";

/*
 * اشتقاق معلومات «نظرة سريعة» للمسار من وصفه الرسمي فقط —
 * لا يُضاف أي مصطلح غير وارد فعليًا في نص المسار.
 */

const TECH_MAP: [RegExp, string][] = [
  [/الذكاء الاصطناعي/, "الذكاء الاصطناعي"],
  [/تحليل البيانات|البيانات/, "تحليل البيانات"],
  [/الأتمتة/, "الأتمتة"],
  [/التقنيات الرقمية|الرقمية/, "التقنيات الرقمية"],
  [/إنترنت الأشياء/, "إنترنت الأشياء"],
];

const IMPACT_MAP: [RegExp, string][] = [
  [/كفاءة/, "رفع الكفاءة"],
  [/الاستدامة|مستدام/, "الاستدامة"],
  [/تجربة المستفيد/, "تحسين تجربة المستفيد"],
  [/جودة/, "جودة الخدمات"],
  [/القرار/, "دعم اتخاذ القرار"],
];

function match(source: string, map: [RegExp, string][]): string[] {
  const out: string[] = [];
  for (const [re, label] of map) {
    if (re.test(source) && !out.includes(label)) out.push(label);
  }
  return out;
}

/** التقنيات المرتبطة بالمسار (مشتقة من الوصف الرسمي). */
export function deriveTechnologies(track: Track): string[] {
  return match(track.description, TECH_MAP);
}

/** نوع الأثر المتوقع (مشتق من الوصف الرسمي). */
export function deriveImpact(track: Track): string[] {
  return match(track.description, IMPACT_MAP);
}
