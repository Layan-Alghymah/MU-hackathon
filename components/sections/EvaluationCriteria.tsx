import { evaluationCriteria } from "@/data/evaluationCriteria";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { toEnglishDigits } from "@/lib/utils";

/** قسم "معايير التقييم" — ثمانية معايير تُستخدم في تقييم المشاريع. */
export function EvaluationCriteria() {
  return (
    <Section id="evaluation" alt>
      <SectionHeader
        eyebrow="آلية التحكيم"
        title="معايير التقييم"
        description="يُقيَّم كل مشروع وفق ثمانية معايير أساسية على يد لجنة التحكيم."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {evaluationCriteria.map((c, i) => (
          <Reveal
            key={c.id}
            delay={0.05 * i}
            as="article"
            className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-card px-4 pb-5 pt-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-[0_22px_44px_-30px_var(--glow)]"
          >
            <span
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-brand-green via-brand-green-soft to-brand-gold"
              aria-hidden
            />
            <span className="flex size-11 items-center justify-center self-start rounded-full bg-brand-gold/10 text-lg font-bold leading-none text-brand-gold tabular-nums ring-1 ring-brand-gold/20">
              {toEnglishDigits(String(i + 1).padStart(2, "0"))}
            </span>
            <span className="-mt-5 flex size-14 items-center justify-center rounded-2xl bg-secondary text-brand-green transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:bg-brand-green group-hover:text-white">
              <Icon name={c.icon} className="size-7" strokeWidth={1.8} />
            </span>
            <h3 className="mt-3 text-sm font-bold leading-snug sm:text-base">
              {c.title}
            </h3>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
