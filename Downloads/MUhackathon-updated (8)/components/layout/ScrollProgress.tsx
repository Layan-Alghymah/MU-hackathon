"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** شريط تقدم ثابت أعلى الشاشة يعكس موضع التمرير. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-right bg-gradient-to-l from-brand-green via-brand-green-soft to-brand-gold"
    />
  );
}
