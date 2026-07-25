"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { RegisterButton } from "@/components/ui/CtaButtons";
import { RegistrationStatusBadge } from "@/components/ui/RegistrationStatusBadge";
import { asset } from "@/lib/asset";
import { useCountdown } from "@/lib/useCountdown";
import { RegistrationCountdown } from "./RegistrationCountdown";
import { HeroFloatingShapes } from "./HeroFloatingShapes";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { tracks } from "@/data/tracks";

/**
 * مسار صورة خلفية الـHero.
 * ضع صورة الجامعة في: web/public/Hero.jpeg
 * (الاسم حسّاس لحالة الأحرف عند النشر على GitHub Pages).
 */
const HERO_IMAGE = "/Hero.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 * i },
  }),
};

/** إحصاءات موجزة تُعرض أسفل الدعوة لاتخاذ إجراء. */
const heroStats: { icon: "Layers" | "Presentation" | "CalendarClock"; value: number; suffix: string; label: string }[] = [
  { icon: "Layers", value: tracks.length, suffix: "", label: "مسارات" },
  { icon: "Presentation", value: 6, suffix: "", label: "ورشة عمل" },
  { icon: "CalendarClock", value: 4, suffix: "", label: "أسابيع" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const { expired } = useCountdown();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand-green-deep pt-24 pb-16 text-white"
    >
      {/* ─────────── الخلفية: صورة الجامعة تغطي كامل القسم ─────────── */}
      <motion.div
        initial={reduce ? undefined : { scale: 1.09 }}
        animate={reduce ? undefined : { scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
        aria-hidden
      >
        <Image
          src={asset(HERO_IMAGE)}
          alt=""
          fill
          priority
          sizes="100vw"
          // المبنى في يسار الصورة: نحيّز الموضع لليسار على الجوال لضمان ظهوره.
          className="object-cover object-[32%_center] sm:object-center"
        />
      </motion.div>

      {/* طبقات التحسين فوق الصورة */}
      {/* 1) Overlay أخضر داكن شفاف */}
      <div
        className="absolute inset-0 z-[1] bg-[color-mix(in_oklab,var(--brand-green-deep)_55%,transparent)]"
        aria-hidden
      />
      {/* 2) تدرّج هادئ من الأعلى والأسفل + دمج مع خلفية الصفحة */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/10 to-black/50"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      {/* عناصر عائمة زخرفية مستوحاة من الابتكار والذكاء الاصطناعي */}
      <HeroFloatingShapes />

      {/* ─────────── المحتوى: مركزي أفقيًا وعموديًا ─────────── */}
      <div className="container-site relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center rounded-[2rem] px-2 text-center">
          {/* لوح زجاجي خفيف جدًا خلف كتلة النص لتعزيز الوضوح */}
          <div className="flex flex-col items-center rounded-[2rem] bg-black/10 px-4 py-8 backdrop-blur-[2px] sm:px-8 sm:py-10">
            {/* شارة الجهة المنظّمة (بديل مؤقت لشعار الهاكثون) */}
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur"
            >
              <Icon name="Sparkles" className="size-3.5 text-brand-gold-soft" />
              {siteConfig.organizer}
            </motion.span>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 text-balance text-4xl font-bold leading-[1.15] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl"
            >
              هاكثون{" "}
              <span className="text-brand-gold-soft">الجامعة الذكية</span>
            </motion.h1>

            {/* شارة حالة التسجيل العامة (تصبح "منتهٍ" عند انتهاء العدّاد) */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-7"
            >
              <RegistrationStatusBadge status={expired ? "closed" : undefined} />
            </motion.div>

            {/* عدّاد انتهاء التسجيل — أسفل الوصف وقبل زر التسجيل */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-5"
            >
              <RegistrationCountdown />
            </motion.div>

            {/* زر التسجيل — مركزي */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-9 flex w-full justify-center"
            >
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.035 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="w-full sm:w-auto"
              >
                <RegisterButton
                  size="lg"
                  className="w-full sm:w-auto"
                  forceDisabled={expired}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* شريط إحصاءات موجز */}
          <motion.div
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 grid w-full grid-cols-3 gap-3 sm:gap-4"
          >
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/15 bg-white/[0.07] px-3 py-4 text-center backdrop-blur-sm transition-colors hover:bg-white/[0.12] sm:py-5"
              >
                <Icon name={s.icon} className="size-5 text-brand-gold-soft" />
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix}
                  className="text-2xl font-bold tabular-nums sm:text-3xl"
                />
                <span className="text-xs text-white/75 sm:text-sm">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* مؤشر النزول */}
      <motion.a
        href="#audience"
        aria-label="انتقل إلى القسم التالي"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-white/80 sm:block"
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-xs">اكتشف المزيد</span>
          <Icon name="ArrowDown" className="size-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
