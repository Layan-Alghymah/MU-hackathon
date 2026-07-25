import { tracks } from "@/data/tracks";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TrackCard } from "@/components/ui/TrackCard";

export function Tracks() {
  return (
    <Section id="tracks">
      <SectionHeader
        eyebrow="المسارات"
        title="أربعة مسارات لصناعة الأثر"
        description="اختر المجال الأقرب لفكرتك واستكشف أمثلة مجالات التحديات في كل مسار."
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
        {tracks.map((track, i) => (
          <Reveal key={track.slug} delay={0.07 * i} className="h-full">
            <TrackCard track={track} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
