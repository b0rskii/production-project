import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routing';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import { AppLink } from 'shared/ui/AppLink';
import style from './Navbar.module.scss';

type NavbarProps = {
  className?: string;
};

export const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const {className} = props;
  const {t} = useTranslation();

  return (
    <nav className={getClassNames(style.navbar, {}, [className])}>
      <div className={style.links}>
        <AppLink to={RoutePath.MAIN}>{t('На главную')}</AppLink>
        <AppLink to={RoutePath.ABOUT}>{t('На страницу о нас')}</AppLink>
      </div>
    </nav>
  );
}
