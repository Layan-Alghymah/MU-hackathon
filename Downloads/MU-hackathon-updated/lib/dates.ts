import { siteConfig } from "@/data/site";

/**
 * الموعد النهائي للتسجيل كـ timestamp — أو null إذا لم يُعتمد بعد.
 * يُقرأ من siteConfig.registrationDeadline (ISO كامل). عند null يُعطَّل العدّاد.
 */
export function getRegistrationDeadlineTs(): number | null {
  const iso = siteConfig.registrationDeadline;
  if (!iso) return null;
  const ts = Date.parse(iso);
  return Number.isNaN(ts) ? null : ts;
}

/** هل العدّاد التنازلي مفعّل؟ (يتطلب موعدًا نهائيًا صحيحًا). */
export function isCountdownEnabled(): boolean {
  return getRegistrationDeadlineTs() != null;
}
