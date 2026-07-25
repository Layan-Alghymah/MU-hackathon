import Image from "next/image";
import { siteConfig, navLinks, contact } from "@/data/site";
import { organizer } from "@/data/partners";
import { formatNumber, toEnglishDigits } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { RegisterButton } from "@/components/ui/CtaButtons";
import { asset } from "@/lib/asset";

export function Footer() {
  const year = formatNumber(new Date().getFullYear());
  const hasContact = Boolean(
    contact.email || contact.phone || contact.inquiriesGroupUrl,
  );

  return (
    <footer className="mt-20 border-t border-border bg-surface-alt">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        {/* نبذة + منظّم */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="relative block size-14 overflow-hidden rounded-xl bg-white ring-1 ring-border">
              <Image
                src={asset(organizer.logo)}
                alt={`شعار ${organizer.name}`}
                fill
                sizes="56px"
                className="object-contain p-1.5"
              />
            </span>
            <div>
              <div className="text-sm font-bold">{siteConfig.name}</div>
              <div className="text-xs text-muted-foreground">
                تنظيم {siteConfig.organizer}
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        {/* روابط سريعة */}
        <nav aria-label="روابط سريعة" className="md:col-span-3">
          <h3 className="text-sm font-bold">روابط سريعة</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-all duration-200 hover:translate-x-[-2px] hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* تواصل (يظهر فقط عند توفره) + وسائل التواصل + CTA */}
        <div className="md:col-span-4">
          {hasContact && (
            <>
              <h3 className="text-sm font-bold">التواصل</h3>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <Icon name="Mail" className="size-4" />
                    {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <Icon name="Phone" className="size-4" />
                    {toEnglishDigits(contact.phone)}
                  </a>
                )}
                {contact.inquiriesGroupUrl && (
                  <a
                    href={contact.inquiriesGroupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <Icon name="MessageCircle" className="size-4" />
                    مجموعة الاستفسارات
                  </a>
                )}
              </div>
            </>
          )}

          {/* روابط التواصل الاجتماعي — تظهر فقط عند توفّرها رسميًا */}
          {contact.social.length > 0 && (
            <div className={hasContact ? "mt-5" : ""}>
              <h3 className="text-sm font-bold">تابعنا</h3>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {contact.social.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-green/40 hover:text-brand-green hover:shadow-[0_10px_24px_-14px_var(--glow)]"
                  >
                    <Icon name={s.icon} className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className={hasContact || contact.social.length > 0 ? "mt-5" : ""}>
            <h3 className="mb-4 text-sm font-bold">انضم إلى الهاكثون</h3>
            <div className="flex flex-wrap items-center gap-3">
              <RegisterButton size="md" />
              {siteConfig.guideUrl && (
                <a
                  href={siteConfig.guideUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-green/40"
                >
                  <Icon name="FileText" className="size-4" />
                  الدليل الإرشادي
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-muted-foreground sm:flex-row sm:text-start">
          <p>
            © {year} {siteConfig.organizer}. جميع الحقوق محفوظة.
          </p>
          <a
            href="#hero"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 font-semibold text-foreground transition-colors hover:border-brand-green/40"
          >
            <Icon name="ArrowDown" className="size-3.5 rotate-180" />
            العودة إلى الأعلى
          </a>
        </div>
      </div>
    </footer>
  );
}
