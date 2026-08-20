"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { faq } from "@/data/faq";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";

export function Faq() {
  const [open, setOpen] = useState<string | null>(faq[0]?.id ?? null);
  const reduce = useReducedMotion();

  return (
    <Section id="faq">
      <SectionHeader
        title="الأسئلة الشائعة"
        description="كل ما تحتاج معرفته قبل التسجيل في الهاكثون."
      />

      <div className="mx-auto mt-12 max-w-3xl">
        <ul className="flex flex-col gap-3.5">
          {faq.map((item) => {
            const isOpen = open === item.id;
            const panelId = `faq-panel-${item.id}`;
            const btnId = `faq-btn-${item.id}`;
            return (
              <li
                key={item.id}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                  isOpen
                    ? "border-brand-green/40 shadow-[0_20px_45px_-32px_var(--glow)]"
                    : "border-border hover:border-brand-green/25",
                )}
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start transition-colors hover:bg-secondary/40"
                  >
                    <span className="text-base font-semibold">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-brand-green transition-all duration-300",
                        isOpen && "rotate-180 bg-brand-green text-white",
                      )}
                    >
                      <Icon name="ChevronDown" className="size-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
