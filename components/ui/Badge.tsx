import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "video" | "lesson" | "popular";

export type BadgeProps = {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
};

// 09 — Badges/Tags.
const variantStyles: Record<BadgeVariant, string> = {
  video: "bg-neutral-900 text-white",
  lesson: "bg-neutral-100 text-neutral-700",
  popular: "bg-primary-500 text-white",
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
