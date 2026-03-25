"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ledgeriq-theme";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    return saved;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      suppressHydrationWarning
      className="rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface)] px-3 py-1.5 text-xs font-medium text-[color:var(--text-secondary)] transition-colors hover:bg-[color:var(--surface-hover)]"
      aria-label="Toggle color theme"
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
