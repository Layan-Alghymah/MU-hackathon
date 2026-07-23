import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

/** شعار جامعة المجمعة + اسم الهاكثون (Lockup) — شعار الهاكثون Placeholder حتى اعتماده. */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/#hero"
      aria-label={`${siteConfig.name} — الصفحة الرئيسية`}
      className={cn("group flex items-center gap-3", className)}
    >
      <span className="relative block size-11 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-border">
        <Image
          src={asset("/logos/majmaah-university.png")}
          alt="شعار جامعة المجمعة"
          fill
          sizes="44px"
          className="object-contain p-1"
          priority
        />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-bold sm:text-[0.95rem]">
            {siteConfig.name}
          </span>
          <span className="text-[0.7rem] font-medium text-muted-foreground">
            {siteConfig.organizer}
          </span>
        </span>
      )}
    </Link>
  );
}
