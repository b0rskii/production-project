import { memo } from 'react';
import { useSelector } from 'react-redux';
import { LoginButton } from '4_features/AuthByUsername';
import { CreateArticleButton } from '4_features/EditArticle';
import { userSelectors } from '5_entities/User';
import { Stack } from '6_shared/ui/Stack';
import { Button, ButtonTheme } from '6_shared/ui/Button';
import { Icon } from '6_shared/ui/Icon';
import { getClassNames } from '6_shared/utils/classNames';
import { Text, TextTheme } from '6_shared/ui/Text';
import { Popover } from '6_shared/ui/Popups';
import BellIcon from '6_shared/assets/icons/bell.svg';
import style from './Navbar.module.scss';

type NavbarProps = {
  className?: string;
};

export const Navbar = memo((props: NavbarProps) => {
  const { className } = props;

  const userData = useSelector(userSelectors.getUserAuthData);

  const getNavigation = () => {
    if (userData) {
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
        <Popover trigger={<Icon Svg={BellIcon} inverted />} />
        <LoginButton className={style.loginButton} theme={ButtonTheme.OUTLINE_INVERTED} />
      </Stack>
    </header>
  );
});
