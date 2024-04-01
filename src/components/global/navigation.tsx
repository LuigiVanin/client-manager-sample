import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";
import { useMemo } from "react";
import { GrGroup } from "react-icons/gr";
import { LuMoonStar } from "react-icons/lu";
import { LuSun } from "react-icons/lu";

export const Navigation = () => {
  const context = useTheme();

  const isChecked = useMemo(() => context.theme === "dark", [context.theme]);

  return (
    <header className="flex h-14 w-full items-center justify-between gap-3 border-b-2 border-solid border-muted bg-background px-4">
      <span className="flex items-center gap-2">
        <GrGroup />
        <h3>Client Manager</h3>
      </span>
      <Switch
        checked={isChecked}
        onCheckedChange={context.toggleTheme}
        className=" data-[state=checked]:bg-input data-[state=unchecked]:bg-input"
      >
        {isChecked ? <LuMoonStar /> : <LuSun className="stroke-strong" />}
      </Switch>
    </header>
  );
};
