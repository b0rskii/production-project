import { FC } from 'react';
import { RoutePath } from 'shared/config/routesConfig';
import { AppLink } from 'shared/ui/AppLink';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import style from './Navbar.module.scss';

type NavbarProps = {
  className?: string;
};

export const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
  const {className} = props;

  return (
    <nav className={getClassNames(style.navbar, {}, [className])}>
      <div className={style.links}>
        <AppLink to={RoutePath.MAIN}>Main</AppLink>
        <AppLink to={RoutePath.ABOUT}>About</AppLink>
      </div>
    </nav>
  );
}
