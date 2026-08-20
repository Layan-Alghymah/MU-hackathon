import { targetAudience } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

/** قسم "الفئة المستهدفة" — عرض نظيف لمن يمكنهم المشاركة في الهاكثون. */
export function TargetAudience() {
  return (
    <Section id="audience">
      <SectionHeader
        eyebrow="لمن هذا الهاكثون"
        title="الفئة المستهدفة"
        description="الهاكثون مفتوح لكل فئات المجتمع الجامعي والمهتمين بالابتكار."
      />

      <Reveal className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
        {targetAudience.map((a) => (
          <span
            key={a}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green/40 hover:bg-brand-green hover:text-white hover:shadow-[0_16px_32px_-18px_var(--glow)]"
          >
            <Icon
              name="CircleCheck"
              className="size-4 text-[var(--success)] transition-colors group-hover:text-white"
            />
            {a}
          </span>
        ))}
      </Reveal>
    </Section>
  );
}
