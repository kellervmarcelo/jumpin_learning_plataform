import { useId, type ComponentPropsWithoutRef } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export type InputProps = Omit<ComponentPropsWithoutRef<"input">, "id"> & {
  /** Rótulo visível acima do campo. Omita só quando `aria-label` for passado. */
  label?: string;
  id?: string;
  /** "search" adiciona o ícone de lupa e o atalho de teclado (seção 08). */
  variant?: "text" | "search";
  /** Ex.: "⌘K" — mostrado à direita, só faz sentido em variant="search". */
  shortcut?: string;
  wrapperClassName?: string;
};

// 08 — Inputs: altura 44px, radius 12px, borda neutral-200, foco primary-400.
export function Input({
  label,
  id,
  variant = "text",
  shortcut,
  className,
  wrapperClassName,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label ? (
        <label htmlFor={inputId} className="type-small font-medium text-neutral-700">
          {label}
        </label>
      ) : null}
      <div className="relative flex items-center">
        {variant === "search" ? (
          <MagnifyingGlassIcon
            size={18}
            weight="regular"
            aria-hidden="true"
            className="pointer-events-none absolute left-4 text-neutral-500"
          />
        ) : null}
        <input
          id={inputId}
          className={cn(
            "h-11 w-full rounded-md border border-neutral-200 bg-white type-body text-neutral-900 placeholder:text-neutral-500",
            "px-4 outline-none transition-colors",
            "focus-visible:border-primary-400 focus-visible:ring-2 focus-visible:ring-primary-100",
            "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-300",
            variant === "search" && "pl-11",
            shortcut && "pr-14",
            className,
          )}
          {...props}
        />
        {shortcut ? (
          <kbd
            aria-hidden="true"
            className="absolute right-3 rounded-sm border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 type-small text-neutral-500"
          >
            {shortcut}
          </kbd>
        ) : null}
      </div>
    </div>
  );
}
