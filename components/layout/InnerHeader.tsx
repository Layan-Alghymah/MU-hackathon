import Link from "next/link";
import { navLinks } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { RegisterButton } from "@/components/ui/CtaButtons";

/** رأس مبسّط للصفحات الداخلية — روابطه تعود إلى أقسام الصفحة الرئيسية. */
export function InnerHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.slice(0, 5).map((link) => (
            <Link
              key={link.id}
              href={`/#${link.id}`}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden sm:block">
          <RegisterButton size="md" />
        </div>
      </div>
    </header>
  );
}
