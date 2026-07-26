import Image from "next/image";
import { partners, type Partner } from "@/data/partners";
import { asset } from "@/lib/asset";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { InfiniteCarousel } from "@/components/ui/InfiniteCarousel";

/**
 * شعار شريك فقط — بلا صندوق أو حدود أو خلفية، بارتفاع موحّد مع الحفاظ
 * الكامل على نسبة أبعاده الأصلية. يُعرض فقط عند توفر ملف الشعار فعليًا.
 */
function PartnerLogo({
  name,
  logo,
  width = 200,
  height = 64,
  layout = "marquee",
}: Partial<Partner> & {
  name: string;
  layout?: "grid" | "marquee";
}) {
  if (!logo) return null;
  return (
    <div
      className={
        layout === "grid"
          ? "flex h-24 w-full items-center justify-center px-3 transition-transform duration-200 hover:-translate-y-0.5 sm:h-28 sm:px-5"
          : "flex h-[4.75rem] w-44 shrink-0 items-center justify-center sm:h-[5.5rem] sm:w-52"
      }
    >
      <Image
        src={asset(logo)}
        alt={name}
        width={width}
        height={height}
        className={
          layout === "grid"
            ? "h-16 w-full object-contain sm:h-20"
            : "max-h-full max-w-full object-contain"
        }
      />
    </div>
  );
}

export function Partners() {
  // يُعرض الشريك فقط بعد توفر شعاره فعليًا (بلا بطاقات بديلة أو حدود مؤقتة).
  const internalPartners = partners.filter(
    (p) => p.group === "internal" && p.logo,
  );
  const externalPartners = partners.filter(
    (p) => p.group === "external" && p.logo,
  );

  return (
    <Section id="partners" alt>
      <SectionHeader
        eyebrow="شركاؤنا"
        title="شركاء النجاح"
        description="بالتعاون مع شركائنا نسعى إلى تمكين الابتكار وتحويل الأفكار إلى مشاريع ذات أثر."
      />

      {internalPartners.length > 0 && (
        <Reveal className="mt-12">
          <h3 className="text-center text-sm font-bold text-brand-gold">
            الشركاء الداخليون
          </h3>
          <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 items-center gap-x-6 gap-y-5 sm:gap-x-8 lg:grid-cols-4">
            {internalPartners.map((p) => (
              <PartnerLogo key={p.name} {...p} layout="grid" />
            ))}
          </div>
        </Reveal>
      )}

      {externalPartners.length > 0 && (
        <Reveal delay={0.08} className="mt-12">
          <h3 className="text-center text-sm font-bold text-brand-gold">
            الشركاء الخارجيون
          </h3>
          <InfiniteCarousel
            className="mt-6"
            durationSeconds={26}
            items={externalPartners.map((p) => (
              <PartnerLogo key={p.name} {...p} />
            ))}
          />
        </Reveal>
      )}
    </Section>
  );
}
