import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tracks, getTrack } from "@/data/tracks";
import { targetAudience } from "@/data/site";
import { deriveTechnologies, deriveImpact } from "@/lib/derive";
import { toArabicDigits } from "@/lib/utils";
import { InnerHeader } from "@/components/layout/InnerHeader";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Icon } from "@/components/ui/Icon";
import { RegisterButton } from "@/components/ui/CtaButtons";
import { RegistrationStatusBadge } from "@/components/ui/RegistrationStatusBadge";
import { Reveal } from "@/components/ui/Reveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return tracks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const track = getTrack(slug);
  if (!track) return { title: "المسار غير موجود" };
  return {
    title: track.name,
    description: track.summary,
    openGraph: { title: track.name, description: track.summary },
  };
}

export default async function TrackPage({ params }: Props) {
  const { slug } = await params;
  const track = getTrack(slug);
  if (!track) notFound();

  const technologies = deriveTechnologies(track);
  const impact = deriveImpact(track);
  const examplesCount = track.challengeExamples.length;
  const tint = (pct: number) =>
    `color-mix(in oklab, ${track.accent} ${pct}%, transparent)`;

  return (
    <>
      <InnerHeader />

      {/* بانر المسار */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-grid" aria-hidden />
        <div
          className="pointer-events-none absolute -right-24 -top-24 -z-10 size-96 rounded-full opacity-25 blur-3xl"
          style={{ background: track.accent }}
          aria-hidden
        />
        <div className="container-site py-12 sm:py-16">
          <Breadcrumb
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "المسارات", href: "/#tracks" },
              { label: track.name },
            ]}
          />

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <span
                className="inline-flex size-16 items-center justify-center rounded-2xl text-white shadow-sm"
                style={{ backgroundColor: track.accent }}
              >
                <Icon name={track.icon} className="size-8" strokeWidth={1.9} />
              </span>
              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                {track.name}
              </h1>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {track.description}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
              <RegistrationStatusBadge />
              <RegisterButton size="lg" />
            </div>
          </div>
        </div>
      </section>

      <main id="main" className="container-site py-14">
        {/* ─────────── نظرة سريعة على المسار (معلومات مشتقة فقط) ─────────── */}
        <Reveal>
          <div className="flex items-center gap-2">
            <Icon name="Compass" className="size-5 text-brand-green" />
            <h2 className="text-2xl font-bold">نظرة سريعة على المسار</h2>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* المجال */}
          <QuickCard icon="Layers" label="مجال المسار" tint={tint}>
            <p className="text-sm font-semibold leading-snug">{track.name}</p>
          </QuickCard>

          {/* عدد الأمثلة */}
          <QuickCard icon="Target" label="أمثلة للتحديات" tint={tint}>
            <p className="text-sm font-semibold">
              {toArabicDigits(examplesCount)} أمثلة للتحديات
            </p>
          </QuickCard>

          {/* التقنيات المرتبطة */}
          <QuickCard icon="Cpu" label="أبرز التقنيات" tint={tint}>
            {technologies.length ? (
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary px-2.5 py-0.5 text-[0.7rem] font-medium text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">—</p>
            )}
          </QuickCard>

          {/* الأثر المتوقع */}
          <QuickCard icon="TrendingUp" label="نوع الأثر المتوقع" tint={tint}>
            {impact.length ? (
              <div className="flex flex-wrap gap-1.5">
                {impact.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary px-2.5 py-0.5 text-[0.7rem] font-medium text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">—</p>
            )}
          </QuickCard>
        </div>

        {/* الفئة المستهدفة — عامة للهاكثون (ليست خاصة بالمسار) */}
        <Reveal className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-surface-alt px-5 py-4">
          <Icon name="Users" className="size-4 text-brand-gold" />
          <span className="text-sm font-semibold">
            الفئة المستهدفة للهاكثون عمومًا:
          </span>
          <span className="text-sm text-muted-foreground">
            {targetAudience.join(" · ")}
          </span>
        </Reveal>

        {/* ─────────── أمثلة لمجالات التحديات ─────────── */}
        <Reveal className="mt-14">
          <div className="flex items-center gap-2">
            <Icon name="Target" className="size-5 text-brand-green" />
            <h2 className="text-2xl font-bold">أمثلة للتحديات</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            أمثلة توضيحية لمجالات التحديات المحتملة — وليست قائمة تحديات نهائية
            معتمدة.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {track.challengeExamples.map((example, i) => (
            <Reveal
              key={example}
              delay={0.04 * i}
              as="article"
              className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green/40 hover:shadow-[0_20px_44px_-32px_var(--glow)]"
            >
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold tabular-nums text-white transition-transform group-hover:scale-105"
                style={{ backgroundColor: track.accent }}
              >
                {toArabicDigits(String(i + 1).padStart(2, "0"))}
              </span>
              <span className="pt-1 text-sm font-medium leading-relaxed">
                {example}
              </span>
            </Reveal>
          ))}
        </div>

        {/* العودة + تسجيل */}
        <div className="mt-14 flex flex-wrap items-center gap-3">
          <Link
            href="/#tracks"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brand-green/40"
          >
            <Icon name="ArrowLeft" className="size-4 rotate-180" />
            العودة إلى جميع المسارات
          </Link>
          <RegisterButton size="md" />
        </div>
      </main>

      <Footer />
    </>
  );
}

/** بطاقة معلومة سريعة موحّدة. */
function QuickCard({
  icon,
  label,
  tint,
  children,
}: {
  icon: string;
  label: string;
  tint: (pct: number) => string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <span
          className="flex size-9 items-center justify-center rounded-lg text-brand-green"
          style={{ background: tint(14) }}
        >
          <Icon name={icon} className="size-5" />
        </span>
        <span className="text-xs font-semibold text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="mt-3">{children}</div>
    </Reveal>
  );
}
