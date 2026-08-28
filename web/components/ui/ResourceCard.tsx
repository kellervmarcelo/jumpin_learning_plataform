import { FileTextIcon, ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import type { PhosphorIcon } from "./types";

export type ResourceCardProps = {
  title: string;
  description: string;
  /** Ex.: "PDF • 1.2 MB" */
  meta: string;
  href: string;
  icon?: PhosphorIcon;
  className?: string;
};

// 12 — Cards: Resource Card.
export function ResourceCard({
  title,
  description,
  meta,
  href,
  icon: Icon = FileTextIcon,
  className,
}: ResourceCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} (abre em nova aba) — ${meta}`}
      className={cn(
        "group flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2",
        className,
      )}
    >
      <Icon size={22} weight="regular" aria-hidden="true" className="mt-0.5 flex-none text-neutral-500" />
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="type-heading-3 text-neutral-900 group-hover:text-primary-500">{title}</h3>
        <p className="type-body text-neutral-500">{description}</p>
        <span className="type-small text-neutral-500">{meta}</span>
      </div>
      <ArrowSquareOutIcon size={18} weight="regular" aria-hidden="true" className="mt-0.5 flex-none text-neutral-500" />
    </a>
  );
}
