/** دمج أسماء الأصناف بشكل مشروط (بديل خفيف عن clsx). */
export function cn(
  ...inputs: (string | false | null | undefined)[]
): string {
  return inputs.filter(Boolean).join(" ");
}

/** تحويل الأرقام اللاتينية إلى أرقام عربية-هندية للعرض. */
export function toArabicDigits(input: string | number): string {
  const map = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(input).replace(/[0-9]/g, (d) => map[Number(d)]);
}

export interface PluralForms {
  /** المفرد: «يوم واحد». */
  one: string;
  /** المثنى: «يومان». */
  two: string;
  /** جمع القِلّة (٣–١٠): الاسم فقط، «أيام». */
  few: string;
  /** جمع الكثرة (١١+): الاسم منصوبًا، «يومًا». */
  many: string;
}

/**
 * صياغة عربية سليمة للعدد مع تمييزه (مفرد/مثنى/جمع قِلّة/جمع كثرة).
 * مثال: 1→«يوم واحد» · 2→«يومان» · 5→«٥ أيام» · 11→«١١ يومًا».
 */
export function arabicPlural(n: number, forms: PluralForms): string {
  if (n === 1) return forms.one;
  if (n === 2) return forms.two;
  const mod = n % 100;
  if (mod >= 3 && mod <= 10) return `${toArabicDigits(n)} ${forms.few}`;
  return `${toArabicDigits(n)} ${forms.many}`;
}
