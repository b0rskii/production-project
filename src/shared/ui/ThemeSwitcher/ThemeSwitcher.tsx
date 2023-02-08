import { getClassNames } from 'shared/utils/classNames';
import { useTheme, Theme } from 'shared/utils/theme';
import { Button, ThemeButton } from 'shared/ui/Button';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import style from './ThemeSwitcher.module.scss';

type ThemeSwitcherProps = {
  className?: string;
};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = (props) => {
  const { className } = props;
  const {theme, toggleTheme} = useTheme();

  return (
    <Button
      className={getClassNames(style.themeSwitcher, {}, [className])}
      theme={ThemeButton.CLEAR}
      onClick={toggleTheme}
    >
      {theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon />}
    </Button>
 );
}
