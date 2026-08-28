import { cn } from "@/lib/cn";

export type ProgressBarProps = {
  /** 0–100 */
  value: number;
  /** Ex.: "35% complete" — exibido ao lado da trilha. */
  label?: string;
  className?: string;
};

// 11 — Progress Bar: trilho neutral-100, preenchimento primary-500.
export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100"
      >
        <div
          className="h-full rounded-full bg-primary-500 transition-[width]"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {label ? <span className="type-small whitespace-nowrap text-neutral-700">{label}</span> : null}
    </div>
  );
}
