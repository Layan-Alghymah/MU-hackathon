import { benefits } from "@/data/benefits";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

/** قسم "مزايا المشاركة" — يحل محل قسم الجوائز السابق. */
export function Benefits() {
  return (
    <Section id="benefits">
      <SectionHeader
        eyebrow="مزايا المشاركة"
        title="ماذا يقدّم لك الهاكثون"
        description="مجموعة من المزايا العملية لكل من يشارك في هاكثون الجامعة الذكية."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {benefits.map((b, i) => (
          <Reveal
            key={b.id}
            delay={0.06 * i}
            as="article"
            className="group relative flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-green/40 hover:shadow-[0_28px_55px_-30px_var(--glow)]"
          >
            <span
              className="absolute inset-x-0 top-0 h-0.5 origin-right scale-x-0 bg-gradient-to-l from-brand-green to-brand-gold transition-transform duration-300 group-hover:scale-x-100"
              aria-hidden
            />
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand-green transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3 group-hover:bg-brand-green group-hover:text-white">
              <Icon name={b.icon} className="size-6" />
            </span>
            <p className="mt-1 text-base font-semibold leading-relaxed">
              {b.title}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
