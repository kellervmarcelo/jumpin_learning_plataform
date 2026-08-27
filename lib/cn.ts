import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes condicionais (clsx) e resolve conflitos de utilitários
 * Tailwind (tailwind-merge), para que uma classe passada via `className`
 * sempre vença a equivalente definida internamente pelo componente.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
