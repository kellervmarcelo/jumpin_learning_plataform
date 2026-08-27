import Link from "next/link";
import type { ReactNode } from "react";
import { ChartBarIcon, ClockIcon, FolderIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export type CourseCardProps = {
  title: string;
  description: string;
  /** Ex.: "Intermediate" */
  level: string;
  /** Ex.: "18h 24m" */
  duration: string;
  /** Ex.: "12 modules" — texto já formatado, o card não presume idioma/plural. */
  modulesLabel: string;
  /** Slot da miniatura; se omitido, cai na inicial do título sobre um quadrado neutro. */
  thumbnail?: ReactNode;
  /** Sem página de curso real ainda (ex.: catálogo vindo do Sanity), o card
   * renderiza sem navegação (`<div>`) em vez de linkar para uma rota inexistente. */
  href?: string;
  className?: string;
};

// 12 — Cards: Course Card.
export function CourseCard({
  title,
  description,
  level,
  duration,
  modulesLabel,
  thumbnail,
  href,
  className,
}: CourseCardProps) {
  const initial = title.charAt(0).toUpperCase();

  const content = (
    <>
      <div className="flex items-start gap-3">
        {thumbnail ?? (
          <span
            aria-hidden="true"
            className="flex h-12 w-12 flex-none items-center justify-center rounded-md bg-neutral-900 type-heading-2 text-white"
          >
            {initial}
          </span>
        )}
        <h3 className={cn("type-heading-3 text-neutral-900", href && "group-hover:text-primary-500")}>
          {title}
        </h3>
      </div>
      <p className="type-body text-neutral-500">{description}</p>
      <div className="mt-auto flex flex-wrap items-center gap-4 type-small text-neutral-500">
        <span className="inline-flex items-center gap-1.5">
          <ChartBarIcon size={14} aria-hidden="true" />
          {level}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon size={14} aria-hidden="true" />
          {duration}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FolderIcon size={14} aria-hidden="true" />
          {modulesLabel}
        </span>
      </div>
    </>
  );

  const sharedClassName = cn(
    "group flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm",
    className,
  );

  if (!href) {
    return <div className={sharedClassName}>{content}</div>;
  }

  return (
    <Link
      href={href}
      className={cn(
        sharedClassName,
        "transition-shadow hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2",
      )}
    >
      {content}
    </Link>
  );
}
