import { memo } from 'react';
import { LoginButton } from '4_features/AuthByUsername';
import { ButtonTheme } from '6_shared/ui/Button';
import { getClassNames } from '6_shared/utils/classNames';
import style from './Navbar.module.scss';

type NavbarProps = {
  className?: string;
};

export const Navbar = memo((props: NavbarProps) => {
  const { className } = props;

  return (
    <header className={getClassNames(style.navbar, {}, [className])}>
      <nav className={style.links} />
      <LoginButton theme={ButtonTheme.OUTLINE_INVERTED} />
    </header>
  );
});
