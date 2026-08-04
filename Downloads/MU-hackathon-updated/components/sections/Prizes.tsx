"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";
import { prizes, totalPrizeAmount, type Prize } from "@/data/prizes";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { formatNumber } from "@/lib/utils";

/** عدّاد رقمي يتحرك من 0 إلى القيمة المستهدفة عند دخول المنطقة إطار الرؤية. */
function AnimatedTotal({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(value)}
    </span>
  );
}

/** تنسيق موضع/حجم كل بطاقة ضمن التخطيط الشبيه بالمنصّة (podium). */
const podiumStyles: Record<
  number,
  {
    order: string;
    size: string;
    lift: string;
    rotate: string;
    ring: string;
    z: string;
  }
> = {
  1: {
    order: "order-3",
    size: "sm:w-64 sm:py-10",
    lift: "sm:-translate-y-6",
    rotate: "sm:rotate-0",
    ring: "border-brand-gold/60 shadow-[0_30px_70px_-25px_var(--glow)] bg-gradient-to-b from-[color-mix(in_oklab,var(--brand-gold)_14%,var(--card))] to-card",
    z: "z-20",
  },
  2: {
    order: "order-2",
    size: "sm:w-52 sm:py-8",
    lift: "sm:translate-y-2",
    rotate: "sm:-rotate-3",
    ring: "border-border",
    z: "z-10",
  },
  3: {
    order: "order-4",
    size: "sm:w-52 sm:py-8",
    lift: "sm:translate-y-2",
    rotate: "sm:rotate-3",
    ring: "border-border",
    z: "z-10",
  },
  4: {
    order: "order-1",
    size: "sm:w-44 sm:py-6",
    lift: "sm:translate-y-8",
    rotate: "sm:-rotate-6",
    ring: "border-border",
    z: "z-0",
  },
  5: {
    order: "order-5",
    size: "sm:w-44 sm:py-6",
    lift: "sm:translate-y-8",
    rotate: "sm:rotate-6",
    ring: "border-border",
    z: "z-0",
  },
};

function PrizeCard({ prize, index }: { prize: Prize; index: number }) {
  const style = podiumStyles[prize.rank];
  const isFirst = prize.rank === 1;

  return (
    <Reveal
      delay={0.08 * index}
      y={32}
      as="article"
      className={`${style.order} ${style.z} w-full sm:w-auto`}
    >
      <motion.div
        whileHover={{
          y: -10,
          scale: 1.045,
          rotate: 0,
          transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        }}
        className={`group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border ${style.ring} bg-card px-6 py-6 text-center transition-shadow duration-300 hover:shadow-[0_32px_65px_-28px_var(--glow)] ${style.size} ${style.lift} ${style.rotate}`}
      >
        {/* توهّج علوي عند التحويم */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-right scale-x-0 bg-gradient-to-l from-brand-gold to-brand-green transition-transform duration-300 group-hover:scale-x-100"
          aria-hidden
        />
        {/* توهّج خلفي ناعم عند التحويم */}
        <span
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 20%, var(--glow), transparent 70%)",
          }}
          aria-hidden
        />

        {isFirst && (
          <span className="eyebrow mb-1">
            <span className="h-px w-5 bg-brand-gold" aria-hidden />
            الجائزة الكبرى
          </span>
        )}

        <span
          className={`leading-none transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 ${
            isFirst ? "text-6xl" : "text-4xl"
          }`}
          role="img"
          aria-hidden
        >
          {prize.emoji}
        </span>

        <h3
          className={`font-bold ${isFirst ? "text-xl" : "text-base"}`}
        >
          {prize.title}
        </h3>

        <p
          className={`font-extrabold text-brand-green dark:text-brand-gold-soft ${
            isFirst ? "text-3xl" : "text-xl"
          }`}
        >
          {formatNumber(prize.amount)}{" "}
          <span className="text-sm font-semibold text-muted-foreground">
            ريال
          </span>
        </p>
      </motion.div>
    </Reveal>
  );
}

/** قسم "الجوائز" — إجمالي متحرك + بطاقات المراكز الخمسة بتصميم Podium فاخر. */
export function Prizes() {
  return (
    <Section id="prizes" className="relative overflow-hidden">
      {/* شبكة خلفية خفيفة للعمق */}
      <div
        className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_20%,black,transparent)]"
        aria-hidden
      />

      <SectionHeader
        eyebrow="جوائز الهاكثون"
        title="جوائز تستحق التنافس"
        description="يتنافس المشاركون على جوائز مالية للمراكز الخمسة الأولى بإجمالي قدره 30,000 ريال."
      />

      <Reveal className="relative mx-auto mt-12 w-full max-w-md overflow-hidden rounded-3xl border border-brand-gold/30 bg-gradient-to-br from-brand-green via-brand-green-deep to-brand-ink px-8 py-9 text-center shadow-[0_35px_80px_-30px_var(--glow)]">
        {/* زخرفة توهّج ذهبية */}
        <span
          className="pointer-events-none absolute -inset-x-10 -top-16 h-40 rotate-6 bg-brand-gold/25 blur-3xl"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute -inset-x-10 -bottom-20 h-40 -rotate-6 bg-brand-green-soft/20 blur-3xl"
          aria-hidden
        />

        <p className="eyebrow relative justify-center !text-brand-gold-soft">
          <span className="h-px w-6 bg-brand-gold-soft" aria-hidden />
          إجمالي الجوائز
        </p>
        <p className="relative mt-3 text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
          <AnimatedTotal target={totalPrizeAmount} />
          <span className="mr-2 align-middle text-2xl font-bold text-brand-gold-soft sm:text-3xl">
            ريال
          </span>
        </p>
      </Reveal>

      <div className="mt-16 flex flex-col items-center gap-5 sm:mt-24 sm:flex-row sm:flex-wrap sm:items-end sm:justify-center sm:gap-4">
        {prizes.map((prize, i) => (
          <PrizeCard key={prize.id} prize={prize} index={i} />
        ))}
      </div>
    </Section>
  );
}
