"use client";

import { siteConfig } from "@/data/site";
import { useCountdown, type CountdownParts } from "@/lib/useCountdown";
import { toArabicDigits } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

const units: { key: keyof CountdownParts; label: string }[] = [
  { key: "days", label: "يوم" },
  { key: "hours", label: "ساعة" },
  { key: "minutes", label: "دقيقة" },
  { key: "seconds", label: "ثانية" },
];

/**
 * عدّاد انتهاء التسجيل — قابل لإعادة الاستخدام.
 * يقرأ الموعد النهائي من siteConfig.registrationDeadline (لا تاريخ داخل المكوّن).
 * - لا موعد معتمد → يعرض التاريخ نصيًا.
 * - انتهى الوقت → «انتهى التسجيل».
 * - غير ذلك → أربع خانات (يوم/ساعة/دقيقة/ثانية) في المنتصف.
 */
export function RegistrationCountdown() {
  const { enabled, mounted, parts, expired } = useCountdown();

  // لا موعد نهائي معتمد بعد → عرض نصّي هادئ (بلا عدّاد حيّ).
  if (!enabled) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2.5 text-center">
        <span className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur">
          <Icon name="CalendarDays" className="size-4 text-brand-gold-soft" />
          يفتح التسجيل: {siteConfig.registrationOpen.label}
        </span>
        <span className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur">
          <Icon name="CalendarClock" className="size-4 text-brand-gold-soft" />
          ينتهي التسجيل: {siteConfig.registrationClose.label}
        </span>
      </div>
    );
  }

  // انتهى الموعد النهائي.
  if (expired) {
    return (
      <p className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-black/30 px-5 py-3 text-sm font-bold text-white backdrop-blur">
        <Icon name="LockKeyhole" className="size-4 text-brand-gold-soft" />
        انتهى التسجيل
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      <p className="mb-3 text-sm font-medium text-white/85">ينتهي التسجيل خلال</p>
      <div
        className="grid grid-cols-4 gap-2 sm:gap-3"
        role="timer"
        aria-label="الوقت المتبقّي على انتهاء التسجيل"
      >
        {units.map(({ key, label }) => (
          <div
            key={key}
            className="flex min-w-[3.6rem] flex-col items-center rounded-2xl border border-white/20 bg-white/12 px-3 py-3 backdrop-blur-md sm:min-w-[4.6rem]"
          >
            <span className="tabular-nums text-2xl font-bold text-white sm:text-3xl">
              {mounted && parts
                ? toArabicDigits(String(parts[key]).padStart(2, "0"))
                : "—"}
            </span>
            <span className="mt-1 text-[0.7rem] text-white/75">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
