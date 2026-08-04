import { siteConfig } from "@/data/site";
import type { RegistrationStatus } from "@/data/types";
import { cn } from "@/lib/utils";

/** إعداد كل حالة: نص عربي + ألوان دلالية (بلا Emoji). */
const STATUS: Record<
  RegistrationStatus,
  { label: string; dot: string; className: string }
> = {
  open: {
    label: "التسجيل مفتوح",
    dot: "bg-[var(--success)]",
    className:
      "border-[color-mix(in_oklab,var(--success)_45%,transparent)] bg-[color-mix(in_oklab,var(--success)_12%,transparent)] text-[var(--success)]",
  },
  closed: {
    label: "انتهى التسجيل",
    dot: "bg-[var(--destructive)]",
    className:
      "border-[color-mix(in_oklab,var(--destructive)_45%,transparent)] bg-[color-mix(in_oklab,var(--destructive)_12%,transparent)] text-[var(--destructive)]",
  },
  upcoming: {
    label: "التسجيل قريبًا",
    dot: "bg-brand-gold",
    className:
      "border-brand-gold/45 bg-brand-gold/12 text-brand-gold",
  },
};

/**
 * شارة حالة التسجيل العامة للهاكثون.
 * تُقرأ الحالة مركزيًا من siteConfig (لا حالة مستقلة لكل مسار).
 */
export function RegistrationStatusBadge({
  className,
  status = siteConfig.registrationStatus,
}: {
  className?: string;
  status?: RegistrationStatus;
}) {
  const s = STATUS[status];
  return (
    <span
      role="status"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold",
        s.className,
        className,
      )}
    >
      <span className={cn("size-2 rounded-full", s.dot)} aria-hidden />
      {s.label}
    </span>
  );
}
