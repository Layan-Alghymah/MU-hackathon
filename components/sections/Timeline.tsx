"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/data/timeline";
import { siteConfig } from "@/data/site";
import type { TimelinePhase } from "@/data/types";
import { toEnglishDigits, cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

type PhaseStatus = "completed" | "current" | "upcoming" | "none";

/** يحسب حالة كل مرحلة اعتمادًا على currentPhaseId (بلا أي تخمين للتاريخ). */
function getPhaseStatus(id: string, index: number): PhaseStatus {
  const currentId = siteConfig.currentPhaseId;
  if (!currentId) return "none";
  const currentIndex = timeline.findIndex((p) => p.id === currentId);
  if (currentIndex === -1) return "none";
  if (index < currentIndex) return "completed";
  if (index === currentIndex) return "current";
  return "upcoming";
}

const STATUS_LABEL: Record<Exclude<PhaseStatus, "none">, string> = {
  completed: "مكتملة",
  current: "المرحلة الحالية",
  upcoming: "قادمة",
};

/** بطاقة محطة زمنية. */
function PhaseCard({
  phase,
  index,
  align,
  status,
}: {
  phase: TimelinePhase;
  index: number;
  align: "start" | "end";
  status: PhaseStatus;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={{ opacity: 0, x: reduce ? 0 : align === "end" ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card p-5 transition-colors hover:border-brand-green/40",
        status === "current"
          ? "border-brand-green/60 ring-2 ring-brand-green/25"
          : phase.highlight
            ? "border-brand-gold/50 ring-1 ring-brand-gold/25"
            : "border-border",
        status === "completed" && "opacity-75",
      )}
    >
      {status === "current" && (
        <span
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-brand-green to-brand-gold"
          aria-hidden
        />
      )}
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl",
            status === "completed"
              ? "bg-[var(--success)]/15 text-[var(--success)]"
              : "bg-secondary text-brand-green",
          )}
        >
          <Icon name={status === "completed" ? "CircleCheck" : phase.icon} className="size-5" />
        </span>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tabular-nums">
            <span className="text-sm text-brand-gold">
              المرحلة {toEnglishDigits(String(index + 1).padStart(2, "0"))}
            </span>
            {status !== "none" && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold normal-case",
                  status === "completed" &&
                    "bg-[var(--success)]/12 text-[var(--success)]",
                  status === "current" &&
                    "bg-brand-green text-white",
                  status === "upcoming" &&
                    "bg-secondary text-muted-foreground",
                )}
              >
                {status === "current" && (
                  <span className="size-1.5 animate-pulse rounded-full bg-white" />
                )}
                {STATUS_LABEL[status]}
              </span>
            )}
          </div>
          <h3 className="text-base font-bold leading-tight">{phase.title}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {phase.description}
      </p>
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
        <Icon name="CalendarDays" className="size-3.5" />
        {phase.date}
      </div>
    </motion.article>
  );
}

/** نقطة متوهجة على المسار. */
function GlowDot({ status = "none" }: { status?: PhaseStatus }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={{ scale: reduce ? 1 : 0.4, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={cn(
        "relative z-10 flex items-center justify-center rounded-full border-2 border-background shadow-[0_0_0_4px_var(--glow)]",
        status === "current" ? "size-6 bg-brand-green" : "size-5 bg-brand-green",
        status === "completed" && "bg-[var(--success)]",
      )}
    >
      {status === "current" && !reduce && (
        <motion.span
          className="absolute inset-0 rounded-full bg-brand-green/50"
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="size-1.5 rounded-full bg-white" />
    </motion.span>
  );
}

/** مسار منحنٍ خفيف يُرسم أثناء التمرير (viewBox يُمدّ رأسيًا). */
const CURVE =
  "M 20 0 C 26 120, 14 240, 20 360 C 26 480, 14 600, 20 720 C 26 840, 14 960, 20 1000";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const mobileScaleY = useTransform(scaleY, (v) => v);

  return (
    <section id="timeline" className="bg-surface-alt py-16 sm:py-24">
      <div className="container-site">
        <SectionHeader
          eyebrow="البرنامج الزمني"
          title="رحلة الهاكثون خطوة بخطوة"
          description="من الإعلان وفتح التسجيل حتى التحكيم والعروض النهائية وحفل التكريم."
        />

        {/* ─────────── سطح المكتب: مسار مركزي منحنٍ يُرسم ─────────── */}
        <div ref={ref} className="relative mt-14 hidden lg:block">
          <svg
            className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-10 -translate-x-1/2"
            viewBox="0 0 40 1000"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="tl-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand-green)" />
                <stop offset="55%" stopColor="var(--brand-green-soft)" />
                <stop offset="100%" stopColor="var(--brand-gold)" />
              </linearGradient>
            </defs>
            {/* المسار الأساسي الباهت */}
            <path
              d={CURVE}
              stroke="var(--border)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            {/* المسار المتدرّج الذي يُرسم مع التمرير */}
            <motion.path
              d={CURVE}
              stroke="url(#tl-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: reduce ? 1 : scaleY }}
            />
          </svg>

          <ol className="relative flex flex-col gap-4">
            {timeline.map((phase, i) => {
              const align = i % 2 === 0 ? "start" : "end";
              const status = getPhaseStatus(phase.id, i);
              return (
                <li
                  key={phase.id}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-8"
                >
                  <div className={align === "end" ? "" : "col-start-1"}>
                    {align === "start" && (
                      <PhaseCard phase={phase} index={i} align="start" status={status} />
                    )}
                  </div>
                  <div className="flex justify-center">
                    <GlowDot status={status} />
                  </div>
                  <div className={align === "start" ? "" : "col-start-3"}>
                    {align === "end" && (
                      <PhaseCard phase={phase} index={i} align="end" status={status} />
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ─────────── الجوال/التابلت: مسار عمودي واضح ─────────── */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute inset-y-0 start-[0.6rem] w-0.5 bg-border" />
          <motion.div
            style={{ scaleY: mobileScaleY }}
            className="absolute inset-y-0 start-[0.6rem] w-0.5 origin-top bg-gradient-to-b from-brand-green via-brand-green-soft to-brand-gold"
            aria-hidden
          />
          <ol className="flex flex-col gap-6">
            {timeline.map((phase, i) => {
              const status = getPhaseStatus(phase.id, i);
              return (
                <li key={phase.id} className="relative ps-10">
                  <span className="absolute start-0 top-1.5">
                    <GlowDot status={status} />
                  </span>
                  <PhaseCard phase={phase} index={i} align="start" status={status} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
