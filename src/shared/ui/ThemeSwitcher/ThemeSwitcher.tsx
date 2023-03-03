import { memo } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import { useTheme, Theme } from 'shared/utils/theme';
import { Button, ButtonTheme } from 'shared/ui/Button';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';

type ThemeSwitcherProps = {
  className?: string;
};

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
  const { className } = props;
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      className={getClassNames('', {}, [className])}
      theme={ButtonTheme.CLEAR}
      onClick={toggleTheme}
    >
      {theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon />}
    </Button>
  );
});
