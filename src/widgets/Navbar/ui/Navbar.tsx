import { memo } from 'react';
import { LoginButton } from 'features/AuthByUsername';
import { ButtonTheme } from 'shared/ui/Button';
import { getClassNames } from 'shared/utils/classNames';
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
