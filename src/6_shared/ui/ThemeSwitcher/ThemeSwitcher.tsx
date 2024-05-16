import { memo } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import { useTheme, Theme } from '@/6_shared/utils/theme';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';
import LightIcon from '@/6_shared/assets/icons/theme-light.svg?react';
import DarkIcon from '@/6_shared/assets/icons/theme-dark.svg?react';

type ThemeSwitcherProps = {
  className?: string;
  theme?: Theme;
  onToggleTheme?: () => void;
};

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
  const { className, theme: priorityTheme, onToggleTheme } = props;
  const { theme, toggleTheme } = useTheme(priorityTheme);

  const toggleThemeHandler = () => {
    if (priorityTheme && onToggleTheme) {
      onToggleTheme();
    } else {
      toggleTheme();
    }
  };

  return (
    <Button
      className={getClassNames('', {}, [className])}
      theme={ButtonTheme.CLEAR}
      onClick={toggleThemeHandler}
    >
      {theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon />}
    </Button>
  );
});
