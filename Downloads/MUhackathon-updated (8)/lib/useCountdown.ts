"use client";

import { useEffect, useState } from "react";
import { getRegistrationDeadlineTs } from "./dates";

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeParts(target: number): CountdownParts | null {
  const delta = target - Date.now();
  if (delta <= 0) return null;
  return {
    days: Math.floor(delta / 86_400_000),
    hours: Math.floor((delta / 3_600_000) % 24),
    minutes: Math.floor((delta / 60_000) % 60),
    seconds: Math.floor((delta / 1000) % 60),
  };
}

export interface CountdownState {
  /** هل هناك موعد نهائي معتمد؟ */
  enabled: boolean;
  /** رُكّب المكوّن على العميل (لتفادي Hydration Mismatch). */
  mounted: boolean;
  /** أجزاء الوقت المتبقّي، أو null. */
  parts: CountdownParts | null;
  /** انتهى الموعد النهائي فعلًا. */
  expired: boolean;
}

/**
 * خطاف العدّ التنازلي — يقرأ الموعد النهائي من الإعدادات ويحدّث كل ثانية.
 * يبدأ الحساب بعد التركيب فقط لتفادي اختلاف SSR/CSR.
 */
export function useCountdown(): CountdownState {
  const target = getRegistrationDeadlineTs();
  const [mounted, setMounted] = useState(false);
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    setMounted(true);
    if (target == null) return;
    const tick = () => setParts(computeParts(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return {
    enabled: target != null,
    mounted,
    parts,
    expired: target != null && mounted && parts === null,
  };
}
