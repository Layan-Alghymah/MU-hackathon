"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { program, programFilters } from "@/data/program";
import type { ProgramCategory } from "@/data/types";
import { toArabicDigits } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";

type Filter = ProgramCategory | "all";

const CATEGORY_LABEL: Record<ProgramCategory, string> = {
  intro: "لقاء تعريفي",
  remote: "ورشة عن بُعد",
  onsite: "ورش حضورية",
  closing: "مرحلة ختامية",
};

/**
 * وضع الحضور — يُشتق فقط من الفئات المعروفة رسميًا (عن بُعد / حضوري).
 * لا وضع محدد لـ"لقاء تعريفي" أو "مرحلة ختامية" لعدم توفر تصنيف رسمي لهما.
 */
const ATTENDANCE_MODE: Partial<
  Record<ProgramCategory, { label: string; icon: string }>
> = {
  remote: { label: "عن بُعد", icon: "Wifi" },
  onsite: { label: "حضوري", icon: "Building2" },
};

const CATEGORY_ACCENT: Record<ProgramCategory, string> = {
  intro: "var(--brand-green)",
  remote: "var(--brand-gold)",
  onsite: "var(--brand-green-soft)",
  closing: "var(--brand-gold-soft)",
};

export function Program() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduce = useReducedMotion();

  const items = useMemo(
    () =>
      program
        .filter((p) => filter === "all" || p.category === filter)
        .sort((a, b) => a.order - b.order),
    [filter],
  );

  return (
    <Section id="workshops">
      <SectionHeader
        eyebrow="البرنامج والورش"
        title="برنامج تدريبي يبني الجاهزية"
        description="من اللقاء التعريفي والورش عن بُعد إلى الورش الحضورية والمراحل الختامية."
      />

      {/* أزرار الفلترة — قابلة للتمرير أفقيًا على الجوال */}
      <div
        role="tablist"
        aria-label="فلترة البرنامج"
        className="mt-10 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {programFilters.map((f) => {
          const isActive = filter === f.id;
          return (
            <motion.button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(f.id)}
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                isActive
                  ? "text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="program-filter-active"
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {f.label}
            </motion.button>
          );
        })}
      </div>

      {/* قائمة الفعاليات */}
      <motion.ol layout className="mx-auto mt-8 grid max-w-4xl gap-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item) => {
            const mode = ATTENDANCE_MODE[item.category];
            const accent = CATEGORY_ACCENT[item.category];
            return (
              <motion.li
                key={item.id}
                layout={!reduce}
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                whileHover={reduce ? undefined : { y: -3 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-[0_1px_0_0_var(--border)] transition-shadow duration-300 hover:shadow-[0_20px_45px_-28px_var(--glow)] sm:p-5"
              >
                {/* شريط جانبي بلون الفئة */}
                <span
                  className="absolute inset-y-0 start-0 w-1"
                  style={{ backgroundColor: accent }}
                  aria-hidden
                />

                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: accent }}
                >
                  <Icon name={item.icon} className="size-5" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                      <Icon name="CalendarDays" className="size-3.5" />
                      {item.date}
                    </span>
                    <span className="text-[0.7rem] font-medium text-brand-gold">
                      {CATEGORY_LABEL[item.category]}
                    </span>
                    {mode && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold"
                        style={{
                          borderColor: `color-mix(in oklab, ${accent} 35%, transparent)`,
                          backgroundColor: `color-mix(in oklab, ${accent} 10%, transparent)`,
                          color: accent,
                        }}
                      >
                        <Icon name={mode.icon} className="size-3" />
                        {mode.label}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1.5 text-sm font-bold leading-snug sm:text-base">
                    {item.title}
                  </h3>
                  {item.meta && (
                    <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon name="Clock" className="size-3.5" />
                      {item.meta}
                    </p>
                  )}
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ol>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        إجمالي عناصر البرنامج: {toArabicDigits(program.length)}
      </p>
    </Section>
  );
}
