import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** غلاف قسم موحّد المسافات والحاوية. */
export function Section({
  id,
  children,
  className,
  alt = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        // نظام مسافات موحّد (أقل ~20% من السابق) — راحة بصرية دون ازدحام.
        "py-16 sm:py-24",
        alt && "bg-surface-alt",
        className,
      )}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}
