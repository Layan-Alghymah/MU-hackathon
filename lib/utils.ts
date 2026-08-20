/** دمج أسماء الأصناف بشكل مشروط (بديل خفيف عن clsx). */
export function cn(
  ...inputs: (string | false | null | undefined)[]
): string {
  return inputs.filter(Boolean).join(" ");
}

const englishNumberFormatter = new Intl.NumberFormat("en-US", {
  useGrouping: false,
});

/** تنسيق الأرقام الديناميكية بالأرقام الإنجليزية في جميع واجهات الموقع. */
export function formatNumber(input: number): string {
  return englishNumberFormatter.format(input);
}

/** تحويل أي أرقام عربية-هندية داخل نص إلى أرقام إنجليزية. */
export function toEnglishDigits(input: string | number): string {
  return String(input).replace(/[٠-٩]/g, (digit) =>
    String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)),
  );
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
  if (mod >= 3 && mod <= 10) return `${formatNumber(n)} ${forms.few}`;
  return `${formatNumber(n)} ${forms.many}`;
}
