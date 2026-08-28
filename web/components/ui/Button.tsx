import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { PhosphorIcon } from "./types";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "text";

type BaseProps = {
  variant?: ButtonVariant;
  icon?: PhosphorIcon;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
};

type LinkOnlyProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children" | "href">;
type ButtonOnlyProps = Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = BaseProps &
  (({ href: string } & LinkOnlyProps) | ({ href?: undefined } & ButtonOnlyProps));

// 07 — Buttons: specs (altura 44px, radius 12px, fonte Inter Medium 14–16px).
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-400 disabled:bg-neutral-200 disabled:text-neutral-500",
  secondary:
    "bg-transparent text-primary-500 border border-primary-500 hover:bg-primary-100 disabled:border-neutral-300 disabled:text-neutral-300",
  tertiary:
    "bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 disabled:text-neutral-300",
  text: "bg-transparent text-primary-500 hover:text-primary-400 !px-0 !h-auto disabled:text-neutral-300",
};

export function Button({
  variant = "primary",
  icon: IconComponent,
  iconPosition = "right",
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 type-body font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    variantStyles[variant],
    className,
  );

  const iconEl = IconComponent ? (
    <IconComponent size={18} weight="regular" aria-hidden="true" />
  ) : null;

  const content = (
    <>
      {iconPosition === "left" && iconEl}
      <span>{children}</span>
      {iconPosition === "right" && iconEl}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as LinkOnlyProps)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonOnlyProps)}>
      {content}
    </button>
  );
}
