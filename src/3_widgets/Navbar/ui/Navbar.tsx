import { observer } from 'mobx-react-lite';
import { LoginButton } from '@/4_features/AuthByUsername';
import { CreateArticleButton } from '@/4_features/EditArticle';
import { userStore } from '@/5_entities/User';
import { NotificationsButton } from '@/5_entities/Notification';
import { Stack } from '@/6_shared/ui/Stack';
import { ButtonTheme } from '@/6_shared/ui/Button';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Text, TextTheme } from '@/6_shared/ui/Text';
import style from './Navbar.module.scss';

type NavbarProps = {
  className?: string;
};

export const Navbar = observer((props: NavbarProps) => {
  const { className } = props;
  const { authData } = userStore;

  const getNavigation = () => {
    if (authData) {
      return (
        <nav className={style.links}>
          <CreateArticleButton />
        </nav>
      );
    }

    return <nav className={style.links} />;
  };

  return (
    <header className={getClassNames(style.navbar, {}, [className])}>
      {/* eslint-disable i18next/no-literal-string */}
      <Text
        className={style.logo}
        title="Prod App"
        theme={TextTheme.BG_COLOR}
      />

      {getNavigation()}

      <Stack gap="l">
        {authData && <NotificationsButton />}
        <LoginButton
          className={style.loginButton}
          theme={ButtonTheme.OUTLINE_INVERTED}
        />
      </Stack>
    </header>
  );
});
