"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/theme/ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Washa mwonekano mwepesi" : "Washa mwonekano wa giza"}
      aria-pressed={isDark}
      className={`flex items-center justify-center rounded-full border border-cream/20 p-2 text-cream transition hover:border-brand-gold hover:text-brand-gold ${className}`}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
