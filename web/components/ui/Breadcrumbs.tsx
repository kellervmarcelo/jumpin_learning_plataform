import Link from "next/link";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

// 13 — Navigation: Breadcrumbs.
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)}>
      <ol className="flex flex-wrap items-center gap-2 type-small text-neutral-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <CaretRightIcon size={12} aria-hidden="true" /> : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-xs">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-neutral-900" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
