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
function PartnerLogo({ name, logo, width = 200, height = 64 }: Partial<Partner> & { name: string }) {
  if (!logo) return null;
  return (
    <div className="flex h-[4.75rem] shrink-0 items-center sm:h-[5.5rem]">
      <Image
        src={asset(logo)}
        alt={name}
        width={width}
        height={height}
        className="h-full w-auto object-contain"
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
          <InfiniteCarousel
            className="mt-6"
            durationSeconds={26}
            items={internalPartners.map((p) => (
              <PartnerLogo key={p.name} {...p} />
            ))}
          />
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
