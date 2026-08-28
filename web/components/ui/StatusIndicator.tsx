import {
  CircleNotchIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  LockSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { IconWeight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import type { PhosphorIcon } from "./types";

export type StatusKind = "in-progress" | "completed" | "now-playing" | "locked";

export type StatusIndicatorProps = {
  status: StatusKind;
  /** Texto do estado (ex.: "In Progress") — nunca só a cor comunica o estado. */
  label: string;
  className?: string;
};

// 10 — Status/Indicators. Cada estado tem forma de ícone própria (não só
// cor), e o rótulo de texto é sempre exibido junto para leitores de tela.
const config: Record<StatusKind, { icon: PhosphorIcon; weight: IconWeight; color: string }> = {
  "in-progress": { icon: CircleNotchIcon, weight: "bold", color: "text-primary-500" },
  completed: { icon: CheckCircleIcon, weight: "regular", color: "text-success" },
  "now-playing": { icon: PlayCircleIcon, weight: "fill", color: "text-primary-500" },
  locked: { icon: LockSimpleIcon, weight: "regular", color: "text-neutral-500" },
};

export function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
  const { icon: Icon, weight, color } = config[status];

  return (
    <span className={cn("inline-flex items-center gap-1.5 type-small text-neutral-700", className)}>
      <Icon size={16} weight={weight} aria-hidden="true" className={color} />
      {label}
    </span>
  );
}
