import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";
import { useMemo } from "react";
import { GrGroup } from "react-icons/gr";
import { LuMoonStar } from "react-icons/lu";
import { LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const context = useTheme();

  const isChecked = useMemo(() => context.theme === "dark", [context.theme]);

  return (
    <header className="flex h-12 w-full items-center justify-center gap-3 border-b-2 border-solid border-muted bg-background px-4">
      <div className="flex h-12 w-full max-w-content items-center justify-between">
        <span className="flex h-12 items-center gap-2">
          <GrGroup />
          <h3 className="">Customer Manager</h3>
        </span>
        <div className="flex items-center gap-6">
          <nav>
            <Link
              to="/"
              className="rounded-sm px-2  py-1 text-sm text-strong transition-all duration-150 hover:bg-foreground/10 hover:text-foreground hover:underline"
            >
              Customers
            </Link>
          </nav>
          <Switch
            checked={isChecked}
            onCheckedChange={context.toggleTheme}
            className=" data-[state=checked]:bg-input data-[state=unchecked]:bg-input"
          >
            {isChecked ? <LuMoonStar /> : <LuSun className="stroke-strong" />}
          </Switch>
        </div>
      </div>
    </header>
  );
};
