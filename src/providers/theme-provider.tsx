import { createContext, useEffect, useState } from "react";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
};

export type Theme = "dark" | "light";

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeProviderState>(initialState);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "light",
  storageKey = "ui-theme",
}) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  const setDocumentTheme = (theme: Theme) => {
    const root = window.document.documentElement;
    const currentTheme = theme;

    root.classList.remove("dark", "light");
    root.classList.add(currentTheme);
  };

  const setUiTheme = (nextTheme: Theme) => {
    localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);
  };

  const toggleTheme = () => {
    theme === "dark" ? setUiTheme("light") : setUiTheme("dark");
  };

  useEffect(() => {
    setDocumentTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ setTheme: setUiTheme, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
