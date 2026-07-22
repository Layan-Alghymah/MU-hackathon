import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed";

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

/** زر التسجيل — يقرأ الرابط من siteConfig؛ يظهر Disabled إذا لم يتوفر أو انتهى. */
export function RegisterButton({
  size = "lg",
  className,
  label = "سجّل الآن",
  forceDisabled = false,
}: {
  size?: keyof typeof sizes;
  className?: string;
  label?: string;
  /** تعطيل الزر قسريًا (مثلًا عند انتهاء التسجيل). */
  forceDisabled?: boolean;
}) {
  // انتهى التسجيل → زر معطّل بنص واضح (له الأولوية).
  if (forceDisabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled
        className={cn(
          base,
          sizes[size],
          "bg-muted text-muted-foreground opacity-70",
          className,
        )}
      >
        <Icon name="LockKeyhole" className="size-4" />
        انتهى التسجيل
      </button>
    );
  }

  if (!siteConfig.registrationUrl) {
    return (
      <button
        type="button"
        disabled
        aria-disabled
        className={cn(
          base,
          sizes[size],
          "bg-muted text-muted-foreground opacity-70",
          className,
        )}
      >
        <Icon name="Clock" className="size-4" />
        رابط التسجيل قريبًا
      </button>
    );
  }

  return (
    <a
      href={siteConfig.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        base,
        sizes[size],
        "bg-primary text-primary-foreground shadow-[0_14px_30px_-16px_var(--primary)] hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0",
        className,
      )}
    >
      {label}
      <Icon name="ArrowUpLeft" className="size-4" />
    </a>
  );
}

/** زر الدليل الإرشادي — يفتح PDF في تبويب جديد أو يظهر "الدليل الإرشادي قريبًا". */
export function GuideButton({
  size = "lg",
  className,
}: {
  size?: keyof typeof sizes;
  className?: string;
}) {
  if (!siteConfig.guideUrl) {
    return (
      <button
        type="button"
        disabled
        aria-disabled
        className={cn(
          base,
          sizes[size],
          "border border-border bg-transparent text-muted-foreground opacity-70",
          className,
        )}
      >
        <Icon name="FileText" className="size-4" />
        الدليل الإرشادي قريبًا
      </button>
    );
  }

  return (
    <a
      href={siteConfig.guideUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        base,
        sizes[size],
        "border border-border bg-card text-foreground hover:border-brand-green hover:-translate-y-0.5 active:translate-y-0",
        className,
      )}
    >
      <Icon name="FileText" className="size-4" />
      الدليل الإرشادي
    </a>
  );
}
