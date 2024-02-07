import { memo } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import { useTheme, Theme } from '@/6_shared/utils/theme';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';
import LightIcon from '@/6_shared/assets/icons/theme-light.svg?react';
import DarkIcon from '@/6_shared/assets/icons/theme-dark.svg?react';

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
