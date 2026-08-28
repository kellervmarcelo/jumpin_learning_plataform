import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "video" | "lesson" | "popular";

export type BadgeProps = {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
};

// 09 — Badges/Tags. Pílulas de fundo claro + texto colorido (conferido por
// amostragem de pixel no PNG de referência — não são fundos sólidos).
const variantStyles: Record<BadgeVariant, string> = {
  video: "bg-primary-100 text-primary-500",
  lesson: "bg-indigo-50 text-indigo-700",
  popular: "bg-primary-100 text-primary-500",
};

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-3 py-1 type-small font-semibold uppercase tracking-wide",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
