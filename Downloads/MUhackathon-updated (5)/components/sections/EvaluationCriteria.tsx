import { evaluationCriteria } from "@/data/evaluationCriteria";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { toArabicDigits } from "@/lib/utils";

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
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-[0_24px_50px_-30px_var(--glow)]"
          >
            <span className="text-xs font-bold text-brand-gold tabular-nums">
              {toArabicDigits(String(i + 1).padStart(2, "0"))}
            </span>
            <span className="mt-3 flex size-11 items-center justify-center rounded-xl bg-secondary text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white">
              <Icon name={c.icon} className="size-5" />
            </span>
            <h3 className="mt-4 text-sm font-bold leading-snug">
              {c.title}
            </h3>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
