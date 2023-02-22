import { FC, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

type ThemeProviderProps = {
  initialTheme?: Theme;
};

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const {
    children,
    initialTheme,
  } = props;

  const [theme, setTheme] = useState(
    initialTheme
    || localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme,
  );

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
