import { FC, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme
    || Theme.LIGHT,
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
