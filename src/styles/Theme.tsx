import React, { createContext, ReactNode, useMemo, useState } from "react";

export type ColorTheme = {
  main: string;
  sub: string;
  character: string;
};

export type ColorThemes = {
  light: ColorTheme;
  dark: ColorTheme;
};

export const themes: ColorThemes = {
  light: {
    main: "#f0f0f0",
    sub: "",
    character: "#151515",
  },
  dark: {
    main: "#151515",
    sub: "",
    character: "#f0f0f0",
  },
};

export type ThemeContextType = {
  theme: ColorTheme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.dark,
  toggleTheme: () => {},
});

type ThemeProviderProps = {
  initialTheme?: ColorTheme;
  children: ReactNode;
};

export const ThemeProvider = React.memo(
  ({ initialTheme = themes.dark, children }: ThemeProviderProps) => {
    const [currentTheme, setCurrentTheme] = useState<ColorTheme>(initialTheme);
    const contextValue = useMemo<ThemeContextType>(() => {
      return {
        theme: currentTheme,
        toggleTheme: () =>
          setCurrentTheme((theme) =>
            theme === themes.dark ? themes.light : themes.dark
          ),
      };
    }, [currentTheme]);

    return (
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    );
  }
);
