"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

function getPageList(current: number, total: number): Array<number | "ellipsis"> {
  const pages = new Set<number>([1, total]);
  for (let page = current - 1; page <= current + 1; page += 1) {
    if (page >= 1 && page <= total) pages.add(page);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: Array<number | "ellipsis"> = [];
  let previous = 0;
  for (const page of sorted) {
    if (previous && page - previous > 1) result.push("ellipsis");
    result.push(page);
    previous = page;
  }
  return result;
}

// 13 — Navigation: Pagination.
export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const pages = getPageList(currentPage, totalPages);

  const buttonBase =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 type-small font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 " +
    "disabled:cursor-not-allowed disabled:text-neutral-300";

  return (
    <nav aria-label="Paginação" className={cn("flex items-center gap-1 overflow-x-auto", className)}>
      <button
        type="button"
        className={cn(buttonBase, "text-neutral-500 hover:bg-neutral-100")}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Página anterior"
      >
        <CaretLeftIcon size={16} aria-hidden="true" />
      </button>

      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${index}`} aria-hidden="true" className="type-small px-1 text-neutral-500">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              buttonBase,
              page === currentPage
                ? "border border-primary-500 text-primary-500"
                : "text-neutral-700 hover:bg-neutral-100",
            )}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        className={cn(buttonBase, "text-neutral-500 hover:bg-neutral-100")}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Próxima página"
      >
        <CaretRightIcon size={16} aria-hidden="true" />
      </button>
    </nav>
  );
}
