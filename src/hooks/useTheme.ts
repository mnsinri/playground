import { useContext } from "react";
import { ThemeContext, themes } from "@styles/Theme";

export const useTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return { theme, toggleTheme, themes };
};
