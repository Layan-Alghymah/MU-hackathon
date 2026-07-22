import Link from "next/link";
import type { Track } from "@/data/types";
import { arabicPlural } from "@/lib/utils";
import { Icon } from "./Icon";

/**
 * بطاقة مسار — هوية بصرية مستقلة لكل مسار عبر لون Accent من نظام التصميم.
 * بلا حالة تسجيل. شارة عدد مجالات التحديات مشتقة مباشرة من طول
 * challengeExamples في بيانات كل مسار (بلا أرقام مُخترعة).
 */
export function TrackCard({ track }: { track: Track }) {
  const tint = (pct: number) =>
    `color-mix(in oklab, ${track.accent} ${pct}%, transparent)`;

  return (
    <Link
      href={`/tracks/${track.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-green/40 hover:shadow-[0_34px_70px_-40px_var(--glow)]"
    >
      {/* توهج زاوية بلون المسار */}
      <span
        className="pointer-events-none absolute -left-16 -top-16 size-44 rounded-full opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: tint(18) }}
        aria-hidden
      />
      {/* شريط علوي بلون المسار يظهر عند المرور */}
      <span
        className="absolute inset-x-0 top-0 h-1 origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ backgroundColor: track.accent }}
        aria-hidden
      />
      {/* Watermark — أيقونة المسار الكبيرة كعنصر بصري مميّز */}
      <Icon
        name={track.icon}
        className="pointer-events-none absolute -bottom-6 -left-6 size-40 opacity-[0.06] transition-all duration-500 group-hover:opacity-[0.1] group-hover:-rotate-6"
        style={{ color: track.accent }}
        strokeWidth={1.25}
      />

      {/* رأس البطاقة: الأيقونة + شارة عدد التحديات */}
      <div className="relative flex items-start justify-between">
        <span
          className="flex size-16 items-center justify-center rounded-2xl text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
          style={{ backgroundColor: track.accent }}
        >
          <Icon name={track.icon} className="size-8" strokeWidth={1.9} />
        </span>

        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-bold transition-transform duration-300 group-hover:scale-105"
          style={{
            borderColor: tint(35),
            backgroundColor: tint(10),
            color: track.accent,
          }}
        >
          <Icon name="ClipboardList" className="size-3.5" />
          {arabicPlural(track.challengeExamples.length, {
            one: "مجال تحدٍّ واحد",
            two: "مجالا تحدٍّ",
            few: "مجالات تحدٍّ",
            many: "مجال تحدٍّ",
          })}
        </span>
      </div>

      <h3 className="relative mt-6 text-xl font-bold leading-snug">
        {track.name}
      </h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {track.summary}
      </p>

      <span
        className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:-translate-x-1"
        style={{ color: track.accent }}
      >
        استكشف المسار
        <Icon name="ChevronLeft" className="size-4" />
      </span>
    </Link>
  );
}
