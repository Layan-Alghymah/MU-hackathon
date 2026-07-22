import { featureFlags } from "@/data/site";
import { prizeTiers } from "@/data/awards";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/** قسم "قيمة الجوائز" — يُعرض فقط عند تفعيل featureFlags.showAwards. */
export function Awards() {
  if (!featureFlags.showAwards) return null;

  return (
    <Section id="awards">
      <SectionHeader
        eyebrow="الجوائز"
        title="قيمة الجوائز"
        description="تكريم الفرق الفائزة عن أفضل الحلول الابتكارية في الهاكثون."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {prizeTiers.map((prize, i) => (
          <Reveal
            key={prize.id}
            delay={0.07 * i}
            as="article"
            className={cn(
              "group relative flex flex-col items-center overflow-hidden rounded-2xl border bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-30px_var(--glow)]",
              prize.rank === 1
                ? "border-brand-gold/50 ring-1 ring-brand-gold/25 sm:-translate-y-2"
                : "border-border hover:border-brand-green/40",
            )}
          >
            {/* شريط علوي بلون العلامة */}
            <span
              className="absolute inset-x-0 top-0 h-1 origin-right scale-x-0 bg-gradient-to-l from-brand-green to-brand-gold transition-transform duration-300 group-hover:scale-x-100"
              aria-hidden
            />

            <span
              className={cn(
                "flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105",
                prize.rank === 1
                  ? "size-20 bg-brand-gold text-white shadow-[0_16px_34px_-14px_var(--glow)]"
                  : "size-16 bg-secondary text-brand-green",
              )}
            >
              <Icon name={prize.icon} className={prize.rank === 1 ? "size-10" : "size-8"} strokeWidth={1.6} />
            </span>

            <h3 className="mt-6 text-lg font-bold">{prize.title}</h3>

            {prize.amount ? (
              <p className="mt-3 text-2xl font-bold text-brand-green">
                {prize.amount}
              </p>
            ) : (
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold text-muted-foreground">
                <Icon name="Clock" className="size-3.5" />
                تُعلن قيمة الجائزة لاحقًا
              </span>
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
