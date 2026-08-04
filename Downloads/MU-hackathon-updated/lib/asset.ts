/**
 * بادئة المسار الأساسي (مثل "/MUhackathon" على GitHub Pages، وفارغة محليًا).
 * تُقرأ وقت البناء وتُدمَج في الحزمة.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * يبني مسار أصل داخل مجلد public مع مراعاة basePath.
 * ضروري للصور لأن next/image لا يضيف basePath مع التصدير الثابت + unoptimized.
 * مثال: asset("/Hero.jpeg") → "/MUhackathon/Hero.jpeg" عند النشر.
 */
export function asset(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}
