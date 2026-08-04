"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";

interface Shape {
  icon: IconName;
  className: string;
  size: number;
  duration: number;
  delay: number;
  distance: number;
}

/** عناصر زخرفية عائمة مستوحاة من الذكاء الاصطناعي والابتكار — خفيفة وغير مزعجة. */
const SHAPES: Shape[] = [
  { icon: "BrainCircuit", className: "left-[6%] top-[20%]", size: 34, duration: 7, delay: 0, distance: 14 },
  { icon: "Sparkles", className: "left-[14%] top-[68%]", size: 22, duration: 5.5, delay: 0.6, distance: 10 },
  { icon: "Cpu", className: "right-[8%] top-[24%]", size: 30, duration: 6.5, delay: 0.3, distance: 12 },
  { icon: "Zap", className: "right-[16%] top-[70%]", size: 20, duration: 5, delay: 1, distance: 9 },
  { icon: "Network", className: "left-[27%] top-[10%]", size: 20, duration: 6, delay: 1.3, distance: 8 },
  { icon: "Bot", className: "right-[28%] top-[12%]", size: 24, duration: 7.5, delay: 0.8, distance: 11 },
];

export function HeroFloatingShapes() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] hidden sm:block" aria-hidden>
      {SHAPES.map((s, i) => (
        <motion.span
          key={i}
          className={`absolute ${s.className} flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm`}
          style={{ width: s.size * 1.9, height: s.size * 1.9 }}
          initial={{ opacity: 0, y: reduce ? 0 : s.distance, rotate: -4 }}
          animate={
            reduce
              ? { opacity: 0.35 }
              : {
                  opacity: [0.28, 0.55, 0.28],
                  y: [s.distance, -s.distance, s.distance],
                  rotate: [-4, 4, -4],
                }
          }
          transition={
            reduce
              ? { duration: 0.6 }
              : {
                  duration: s.duration,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          <Icon name={s.icon} className="text-brand-gold-soft" style={{ width: s.size, height: s.size }} strokeWidth={1.4} />
        </motion.span>
      ))}

      {/* توهجات ناعمة إضافية */}
      <div className="absolute -left-10 top-1/3 size-56 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute -right-10 bottom-16 size-64 rounded-full bg-white/10 blur-3xl" />
    </div>
  );
}
