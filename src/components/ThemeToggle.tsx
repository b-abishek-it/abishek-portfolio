
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isDark ? "bg-slate-700" : "bg-slate-200"
      )}
      aria-label="Toggle dark mode"
    >
      <span
        className={cn(
          "pointer-events-none flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg ring-0 transition-transform",
          isDark ? "translate-x-7" : "translate-x-1"
        )}
      >
        {isDark ? <Moon className="h-4 w-4 text-slate-800" /> : <Sun className="h-4 w-4 text-amber-500" />}
      </span>
    </button>
  );
}
