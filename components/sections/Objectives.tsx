import { objectives } from "@/data/objectives";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function Objectives() {
  return (
    <Section id="objectives" alt>
      <SectionHeader
        eyebrow="الأهداف"
        title="ما الذي يسعى الهاكثون لتحقيقه"
        description="سبعة أهداف توضّح الأثر المتوقع من الهاكثون على منظومة الجامعة."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {objectives.map((obj, i) => (
          <Reveal
            key={obj.id}
            delay={0.05 * i}
            as="article"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_1px_0_0_var(--border)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-green/40 hover:shadow-[0_28px_55px_-30px_var(--glow)]"
          >
            {/* توهج متدرّج خفيف يظهر عند المرور */}
            <span
              className="pointer-events-none absolute -left-10 -top-10 size-36 rounded-full bg-gradient-to-br from-brand-green/15 to-brand-gold/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            />
            <span
              className="absolute inset-x-0 top-0 h-0.5 origin-right scale-x-0 bg-gradient-to-l from-brand-green to-brand-gold transition-transform duration-300 group-hover:scale-x-100"
              aria-hidden
            />
            <span className="relative inline-flex size-12 items-center justify-center rounded-xl bg-secondary text-brand-green shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3 group-hover:scale-105 group-hover:bg-brand-green group-hover:text-white group-hover:shadow-[0_10px_24px_-10px_var(--glow)]">
              <Icon name={obj.icon} className="size-6" />
            </span>
            <h3 className="relative mt-5 text-lg font-bold transition-colors group-hover:text-brand-green">
              {obj.title}
            </h3>
            <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
              {obj.description}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
