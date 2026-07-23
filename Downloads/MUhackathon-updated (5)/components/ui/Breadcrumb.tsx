import Link from "next/link";
import { Icon } from "./Icon";

export interface Crumb {
  label: string;
  href?: string;
}

/** مسار التنقل (Breadcrumb) متوافق مع RTL. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="مسار التنقل">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={last ? "font-medium text-foreground" : undefined}
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <Icon name="ChevronLeft" className="size-3.5 opacity-60" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
