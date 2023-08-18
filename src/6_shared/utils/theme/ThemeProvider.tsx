import { ReactNode, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

type ThemeProviderProps = {
  initialTheme?: Theme;
  children: ReactNode;
};

const ThemeProvider = (props: ThemeProviderProps) => {
  const {
    children,
    initialTheme,
  } = props;

  const [theme, setTheme] = useState(
    initialTheme
    || localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme
    || Theme.LIGHT,
  );

  document.body.className = theme;

  const defaultProps = useMemo(() => ({
    theme,
    setTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
