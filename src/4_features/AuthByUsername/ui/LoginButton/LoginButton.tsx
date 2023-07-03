import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { userSelectors, userActions } from '5_entities/User';
import { Button, ButtonTheme } from '6_shared/ui/Button';
import { useAppDispatch } from '6_shared/utils/redux';
import { LocalStorageKey } from '6_shared/const/localStorage';
import { getClassNames } from '6_shared/utils/classNames';
import { LoginModal } from '../LoginModal/LoginModal';

type LoginButtonProps = {
  className?: string;
  theme?: ButtonTheme;
};

export const LoginButton = memo((props: LoginButtonProps) => {
  const { className, theme = ButtonTheme.DEFAULT } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
  const userAuthData = useSelector(userSelectors.getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpened(false);
  }, []);

  const loginButtonClickHandler = useCallback(() => {
    setIsAuthModalOpened(true);
  }, []);

  const logoutButtonClickHandler = useCallback(() => {
    dispatch(userActions.logout());
    localStorage.removeItem(LocalStorageKey.USER);
  }, [dispatch]);

  return (
    <>
      {userAuthData ? (
        <Button
          className={getClassNames('', {}, [className])}
          theme={theme}
          onClick={logoutButtonClickHandler}
        >
          {t('Выйти')}
        </Button>
      ) : (
        <Button
          className={getClassNames('', {}, [className])}
          theme={theme}
          onClick={loginButtonClickHandler}
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
    </>
  );
});
