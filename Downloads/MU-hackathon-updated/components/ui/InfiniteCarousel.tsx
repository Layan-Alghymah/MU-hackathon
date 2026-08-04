"use client";

import { useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ناقل أفقي لانهائي (Marquee) يعتمد على .animate-marquee / .marquee-paused
 * المعرّفتين في globals.css — بلا مكتبات إضافية.
 * - تمرير سلس من اليمين إلى اليسار عبر نسختين متطابقتين من المحتوى.
 * - يتوقف عند المرور بالماوس (marquee-paused).
 * - يحترم prefers-reduced-motion بعرض صف واحد قابل للتمرير يدويًا.
 */
export function InfiniteCarousel({
  items,
  durationSeconds = 30,
  gapClassName = "gap-12 sm:gap-16",
  className,
}: {
  /** عناصر لفّة واحدة (تُكرَّر مرتين تلقائيًا للحصول على حلقة سلسة). */
  items: ReactNode[];
  durationSeconds?: number;
  gapClassName?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div
        className={cn(
          "flex items-center overflow-x-auto",
          gapClassName,
          className,
        )}
      >
        {items}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "marquee-paused relative overflow-hidden [mask-image:linear-gradient(to_left,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
    >
      <div
        dir="ltr"
        className={cn("animate-marquee flex w-max items-center", gapClassName)}
        style={{ "--marquee-duration": `${durationSeconds}s` } as CSSProperties}
      >
        <div className={cn("flex shrink-0 items-center", gapClassName)}>
          {items}
        </div>
        <div
          className={cn("flex shrink-0 items-center", gapClassName)}
          aria-hidden
        >
          {items}
        </div>
      </div>
    </div>
  );
}
