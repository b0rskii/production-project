import { FC } from 'react';
import { RoutePath } from 'shared/config/routing';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import { AppLink } from 'shared/ui/AppLink';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import style from './Navbar.module.scss';

type NavbarProps = {
  className?: string;
};

export const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
  const {className} = props;

  return (
    <nav className={getClassNames(style.navbar, {}, [className])}>
      <ThemeSwitcher />
      <div className={style.links}>
        <AppLink to={RoutePath.MAIN}>Main</AppLink>
        <AppLink to={RoutePath.ABOUT}>About</AppLink>
      </div>
    </nav>
  );
}
