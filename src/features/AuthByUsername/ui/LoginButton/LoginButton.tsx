import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { userSelectors, userActions } from 'entities/User';
import { useAppDispatch } from 'shared/utils/redux';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { LoginModal } from '../LoginModal/LoginModal';

type LoginButtonProps = {
  theme?: ButtonTheme;
};

export const LoginButton: FC<LoginButtonProps> = (props: LoginButtonProps) => {
  const { theme = ButtonTheme.DEFAULT } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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
    setIsAuthModalOpened(false);
  }, [dispatch]);

  return (
    <>
      {userAuthData ? (
        <Button
          theme={theme}
          onClick={logoutButtonClickHandler}
        >
          {t('Выйти')}
        </Button>
      ) : (
        <Button
          onClick={loginButtonClickHandler}
          theme={theme}
        >
          {t('Войти')}
        </Button>
      )}
      {isAuthModalOpened && !userAuthData && (
        <LoginModal
          isOpen={isAuthModalOpened}
          onClose={onCloseModal}
        />
      )}
    </>
  );
};
