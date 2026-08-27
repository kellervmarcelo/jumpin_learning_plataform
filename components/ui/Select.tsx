import { useId, type ComponentPropsWithoutRef } from "react";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = Omit<ComponentPropsWithoutRef<"select">, "id"> & {
  label?: string;
  id?: string;
  options: SelectOption[];
  wrapperClassName?: string;
};

// 08 — Inputs (Select): mesma altura/radius/borda do Input de texto,
// com o chevron indicando que é um campo de escolha.
export function Select({
  label,
  id,
  options,
  className,
  wrapperClassName,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label ? (
        <label htmlFor={selectId} className="type-small font-medium text-neutral-700">
          {label}
        </label>
      ) : null}
      <div className="relative flex items-center">
        <select
          id={selectId}
          className={cn(
            "h-11 w-full appearance-none rounded-md border border-neutral-200 bg-white type-body text-neutral-900",
            "px-4 pr-10 outline-none transition-colors",
            "focus-visible:border-primary-400 focus-visible:ring-2 focus-visible:ring-primary-100",
            "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-300",
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <CaretDownIcon
          size={16}
          weight="bold"
          aria-hidden="true"
          className="pointer-events-none absolute right-4 text-neutral-500"
        />
      </div>
    </div>
  );
}
