"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, animate } from "framer-motion";
import { formatNumber } from "@/lib/utils";

/**
 * عدّاد رقمي متحرك — يُشغَّل مرة واحدة عند دخول العنصر إطار الرؤية.
 * خفيف (بدون مكتبات إضافية) ويحترم prefers-reduced-motion.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className,
}: {
  /** القيمة الرقمية النهائية. */
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const format = (n: number) => formatNumber(n);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) {
        ref.current.textContent = `${prefix}${format(value)}${suffix}`;
      }
      return;
    }
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${format(Math.round(v))}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, prefix, suffix, duration, motionValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(0)}
      {suffix}
    </span>
  );
}
