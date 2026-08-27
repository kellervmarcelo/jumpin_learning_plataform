import type { Icon } from "@phosphor-icons/react";

/**
 * Tipo de um componente de ícone Phosphor (import sempre a partir de
 * "@phosphor-icons/react/dist/ssr" nos usos reais — ver seção 06 do
 * design system: outline por padrão, weight="fill" para a variante filled).
 * Importar o tipo do pacote principal é seguro: tipos são apagados na
 * compilação e não puxam o runtime baseado em Context daquele pacote.
 */
export type { Icon as PhosphorIcon };
