
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
      />
      <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    </div>
  );
};

export default ThemeSwitch;
