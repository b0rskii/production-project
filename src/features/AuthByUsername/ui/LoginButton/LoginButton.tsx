import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors, userActions } from 'entities/User';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { LoginModal } from '../LoginModal/LoginModal';

type LoginButtonProps = {
  theme?: ButtonTheme;
};

export const LoginButton: FC<LoginButtonProps> = (props: LoginButtonProps) => {
  const { theme = ButtonTheme.DEFAULT } = props;
  const dispatch = useDispatch();
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
      {isAuthModalOpened && (
        <LoginModal
          isOpen={isAuthModalOpened}
          onClose={onCloseModal}
        />
      )}
    </>
  );
};
