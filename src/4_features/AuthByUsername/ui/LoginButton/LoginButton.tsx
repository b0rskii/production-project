import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSelectors, userActions } from '5_entities/User';
import { profileActions } from '5_entities/Profile';
import { Button, ButtonTheme } from '6_shared/ui/Button';
import { useAppDispatch } from '6_shared/utils/redux';
import { I18nNameSpace } from '6_shared/utils/i18n/nameSpace';
import { LocalStorageKey } from '6_shared/const/localStorage';
import { getClassNames } from '6_shared/utils/classNames';
import { RoutePath } from '6_shared/config/routing';
import { DropDown } from '6_shared/ui/Popups';
import { Avatar } from '6_shared/ui/Avatar';
import { LoginModal } from '../LoginModal/LoginModal';

type LoginButtonProps = {
  className?: string;
  theme?: ButtonTheme;
};

export const LoginButton = memo((props: LoginButtonProps) => {
  const { className, theme = ButtonTheme.DEFAULT } = props;

  const { t } = useTranslation([
    I18nNameSpace.Translation,
    I18nNameSpace.Profile,
    I18nNameSpace.AdminPanel,
  ]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
  const userAuthData = useSelector(userSelectors.getUserAuthData);
  const isAdmin = useSelector(userSelectors.isAdmin);
  const isManager = useSelector(userSelectors.isManager);

  const hasAccessToAdmin = isAdmin || isManager;

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpened(false);
  }, []);

  const loginButtonClickHandler = useCallback(() => {
    setIsAuthModalOpened(true);
  }, []);

  const adminMenuItemClickHandler = useCallback(() => {
    navigate(RoutePath.ADMIN_PANEL);
  }, [navigate]);

  const profileMenuItemClickHandler = useCallback(() => {
    if (!userAuthData) return;
    navigate(RoutePath.PROFILE(userAuthData.id));
  }, [navigate, userAuthData]);

  const logoutMenuItemClickHandler = useCallback(() => {
    dispatch(userActions.logout());
    dispatch(profileActions.cleanProfile());
    localStorage.removeItem(LocalStorageKey.USER);
  }, [dispatch]);

  const menuItems = useMemo(() => [
    ...(hasAccessToAdmin ? [
      {
        content: t('Админка', { ns: I18nNameSpace.AdminPanel }),
        onClick: adminMenuItemClickHandler,
      },
    ] : []),
    {
      content: t('Профиль', { ns: I18nNameSpace.Profile }),
      onClick: profileMenuItemClickHandler,
    },
    {
      content: t('Выйти'),
      onClick: logoutMenuItemClickHandler,
    },
  ], [
    t,
    adminMenuItemClickHandler,
    profileMenuItemClickHandler,
    logoutMenuItemClickHandler,
    hasAccessToAdmin,
  ]);

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
          items={menuItems}
          direction="bottom-left"
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
