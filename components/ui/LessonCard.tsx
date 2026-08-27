import { PlayCircleIcon, ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr";
import { Badge, type BadgeVariant } from "./Badge";
import { Button } from "./Button";
import { cn } from "@/lib/cn";
import type { PhosphorIcon } from "./types";

export type LessonCardProps = {
  /** "video" usa o badge/estilo de vídeo com ação "assistir"; "lesson" usa o de aula com ação "abrir". */
  variant: "video" | "lesson";
  badgeLabel: string;
  title: string;
  description: string;
  /** Ex.: "Lesson 5.1 • 12:45" (video) ou "Module 5" (lesson). */
  meta: string;
  actionLabel: string;
  href: string;
  className?: string;
};

const variantConfig: Record<
  LessonCardProps["variant"],
  { badgeVariant: BadgeVariant; actionIcon: PhosphorIcon }
> = {
  video: { badgeVariant: "video", actionIcon: PlayCircleIcon },
  lesson: { badgeVariant: "lesson", actionIcon: ArrowSquareOutIcon },
};

// 12 — Cards: Lesson Card (Video) e Lesson Card (Lesson).
export function LessonCard({
  variant,
  badgeLabel,
  title,
  description,
  meta,
  actionLabel,
  href,
  className,
}: LessonCardProps) {
  const { badgeVariant, actionIcon } = variantConfig[variant];

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm",
        className,
      )}
    >
      <Badge variant={badgeVariant}>{badgeLabel}</Badge>
      <h3 className="type-heading-3 text-neutral-900">{title}</h3>
      <p className="type-body text-neutral-500">{description}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        <span className="type-small text-neutral-500">{meta}</span>
        <Button variant="tertiary" href={href} icon={actionIcon} iconPosition="right">
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
