import { FC, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routing';
import { AppLink } from 'shared/ui/AppLink';
import { getClassNames } from 'shared/utils/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { Button, ButtonTheme } from 'shared/ui/Button';
import MainIcon from 'shared/assets/icons/main.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import style from './Sidebar.module.scss';

type Link = {
  route: string;
  icon: ReactNode;
  translationKey: string,
};

const Links: Link[] = [
  {
    route: RoutePath.MAIN,
    icon: <MainIcon />,
    translationKey: 'На главную',
  },
  {
    route: RoutePath.ABOUT,
    icon: <AboutIcon />,
    translationKey: 'На страницу о нас',
  },
];

type SidebarProps = {
  className?: string;
};

export const Sidebar: FC<SidebarProps> = (props) => {
  const { className } = props;
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  const onToggleButtonClick = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={getClassNames(style.sidebar, { [style.collapsed]: collapsed }, [className])}
      data-testid="sidebar"
    >
      <Button
        className={style.toggler}
        type="button"
        theme={ButtonTheme.OUTLINE}
        size="xl"
        square
        onClick={onToggleButtonClick}
        data-testid="sidebar-toggler"
      >
        {collapsed ? '>' : '<'}
      </Button>

      <div className={style.linksList}>
        {Links.map(({ route, icon, translationKey }) => (
          <AppLink
            className={style.link}
            to={route}
            key={route}
          >
            {icon}
            {collapsed ? null : t(translationKey)}
          </AppLink>
        ))}
      </div>

      <div className={style.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </div>
  );
};
