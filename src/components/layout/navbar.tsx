"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@/components/logo/logo-icon";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Chat", href: "/chat" },
  { label: "Company", href: "/company/apple" },
  { label: "Insights", href: "/insights" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 border-b border-[color:var(--border-subtle)] bg-[color:var(--surface)] backdrop-blur">
      <div className="mx-auto flex max-w-full items-center justify-between px-4 py-2.5 sm:px-6 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 flex-shrink-0 transition-opacity hover:opacity-80"
        >
          <div className="text-[color:var(--text-primary)]">
            <LogoIcon size={24} />
          </div>
          <span className="text-base font-bold tracking-tight text-[color:var(--text-primary)]">
            LEDGERIQ
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[color:var(--metric-highlight)] font-semibold"
                    : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/chat"
            className="hidden sm:inline-block rounded-lg bg-[color:var(--button-primary)] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
          >
            Ask AI
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden border-t border-[color:var(--border-subtle)] gap-0 px-4 py-2 overflow-x-auto">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-[color:var(--surface-strong)] text-[color:var(--metric-highlight)]"
                  : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
