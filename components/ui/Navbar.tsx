"use client";

import { useState } from "react";
import Link from "next/link";
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export type NavLink = {
  label: string;
  href: string;
  active?: boolean;
};

export type NavbarProps = {
  links: NavLink[];
  logoHref?: string;
  className?: string;
};

// 13 — Navigation. Sem referência mobile: abaixo de `md` os links recolhem
// atrás de um botão de menu para não espremer o logo.
export function Navbar({ links, logoHref = "/", className }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={cn("border-b border-neutral-200 bg-white", className)}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={logoHref} className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2">
          <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary-500 type-heading-3 font-bold text-white">
            V
          </span>
          <span className="type-heading-2 font-display text-neutral-900">Vertex</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "type-body font-medium text-neutral-700 transition-colors hover:text-primary-500",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 rounded-xs",
                link.active && "text-primary-500",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="navbar-mobile-menu"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <XIcon size={22} aria-hidden="true" /> : <ListIcon size={22} aria-hidden="true" />}
        </button>
      </div>

      {isMenuOpen ? (
        <nav id="navbar-mobile-menu" aria-label="Principal (mobile)" className="flex flex-col gap-1 border-t border-neutral-200 px-4 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 type-body font-medium text-neutral-700 hover:bg-neutral-100 hover:text-primary-500",
                link.active && "text-primary-500",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
