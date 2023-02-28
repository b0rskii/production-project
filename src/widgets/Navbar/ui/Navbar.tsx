import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions, LoginModal } from 'features/AuthByUsername';
import { userActions, userSelectors } from 'entities/User';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { getClassNames } from 'shared/utils/classNames';
import style from './Navbar.module.scss';

type NavbarProps = {
  className?: string;
};

export const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
  const { className } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
  const userAuthData = useSelector(userSelectors.getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpened(false);
    dispatch(loginActions.clearData());
  }, [dispatch]);

  const loginButtonClickHandler = useCallback(() => {
    setIsAuthModalOpened(true);
  }, []);

  const logoutButtonClickHandler = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  return (
    <nav className={getClassNames(style.navbar, {}, [className])}>
      <div className={style.links} />

      {userAuthData ? (
        <Button
          theme={ButtonTheme.OUTLINE}
          onClick={logoutButtonClickHandler}
        >
          {t('Выйти')}
        </Button>
      ) : (
        <Button
          onClick={loginButtonClickHandler}
          theme={ButtonTheme.OUTLINE}
        >
          {t('Войти')}
        </Button>
      )}

      {isAuthModalOpened && (
        <LoginModal
          isOpen={isAuthModalOpened}
          onClose={onCloseModal}
        />
      )}
    </nav>
  );
};
