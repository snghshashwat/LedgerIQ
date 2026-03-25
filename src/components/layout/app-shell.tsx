"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <div className="min-h-screen flex flex-col bg-[color:var(--app-bg)] text-[color:var(--text-primary)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--app-bg)] text-[color:var(--text-primary)]">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-full px-4 sm:px-6 md:px-8 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
