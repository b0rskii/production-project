import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSelectors, userActions } from '5_entities/User';
import { Button, ButtonTheme } from '6_shared/ui/Button';
import { useAppDispatch } from '6_shared/utils/redux';
import { I18nNameSpace } from '6_shared/utils/i18n/nameSpace';
import { LocalStorageKey } from '6_shared/const/localStorage';
import { getClassNames } from '6_shared/utils/classNames';
import { RoutePath } from '6_shared/config/routing';
import { DropDown } from '6_shared/ui/DropDown';
import { Avatar } from '6_shared/ui/Avatar';
import { LoginModal } from '../LoginModal/LoginModal';

type LoginButtonProps = {
  className?: string;
  theme?: ButtonTheme;
};

export const LoginButton = memo((props: LoginButtonProps) => {
  const { className, theme = ButtonTheme.DEFAULT } = props;
  const { t } = useTranslation([I18nNameSpace.Translation, I18nNameSpace.Profile]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
  const userAuthData = useSelector(userSelectors.getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpened(false);
  }, []);

  const loginButtonClickHandler = useCallback(() => {
    setIsAuthModalOpened(true);
  }, []);

  const profileMenuItemClickHandler = useCallback(() => {
    if (!userAuthData) return;
    navigate(RoutePath.PROFILE(userAuthData.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutMenuItemClickHandler = useCallback(() => {
    dispatch(userActions.logout());
    localStorage.removeItem(LocalStorageKey.USER);
  }, [dispatch]);

  return (
    <>
      {userAuthData ? (
        <DropDown
          className={className}
          button={(
            <Avatar
              src={userAuthData.avatar}
              alt="avatar"
              size={35}
            />
          )}
          items={[
            {
              content: t('Профиль', { ns: I18nNameSpace.Profile }),
              onClick: profileMenuItemClickHandler,
            },
            {
              content: t('Выйти'),
              onClick: logoutMenuItemClickHandler,
            },
          ]}
          direction="left"
        />
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
