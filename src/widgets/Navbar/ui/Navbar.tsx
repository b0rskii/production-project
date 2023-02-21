import { FC } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import style from './Navbar.module.scss';

type NavbarProps = {
  className?: string;
};

export const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
  const { className } = props;

  return (
    <nav className={getClassNames(style.navbar, {}, [className])}>
      <div className={style.links} />
    </nav>
  );
};
