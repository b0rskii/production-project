import { useCallback, useContext, useEffect } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

type UseThemeResult = {
  theme: Theme;
  toggleTheme: () => void;
};

export const useTheme = (priorityTheme?: Theme): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = useCallback(() => {
    let newTheme: Theme;

    if (priorityTheme) {
      newTheme = priorityTheme;
    } else {
      newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    }

    setTheme?.(newTheme);
    document.body.className = newTheme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  }, [theme, setTheme, priorityTheme]);

  useEffect(() => {
    if (priorityTheme && priorityTheme !== theme) {
      toggleTheme();
    }
  }, [priorityTheme, theme, toggleTheme]);

  return {
    theme: priorityTheme ?? theme ?? Theme.LIGHT,
    toggleTheme,
  };
};
