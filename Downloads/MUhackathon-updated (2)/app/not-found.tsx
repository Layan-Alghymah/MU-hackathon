import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo showWordmark={false} />
      <p className="text-7xl font-bold text-gradient-brand">٤٠٤</p>
      <h1 className="text-2xl font-bold">الصفحة غير موجودة</h1>
      <p className="max-w-sm text-muted-foreground">
        عذرًا، الصفحة التي تبحث عنها غير متاحة أو تم نقلها.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
      >
        <Icon name="Home" className="size-4" />
        العودة إلى الرئيسية
      </Link>
    </main>
  );
}
