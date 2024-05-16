import { useSelector } from 'react-redux';
import { memo, useState } from 'react';
import { useAppDispatch } from '@/6_shared/utils/redux';
import {
  userActions,
  userSelectors,
  updateJsonSettings,
} from '@/5_entities/User';
import { getClassNames } from '@/6_shared/utils/classNames';
import { ThemeSwitcher } from '@/6_shared/ui/ThemeSwitcher';
import { LangSwitcher } from '@/6_shared/ui/LangSwitcher';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';
import { getLinkItems } from '../../model/linkItems';
import { LinkItem } from '../LinkItem/LinkItem';
import style from './Sidebar.module.scss';

type SidebarProps = {
  className?: string;
};

export const Sidebar = memo((props: SidebarProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const [collapsed, setCollapsed] = useState(false);

  const userData = useSelector(userSelectors.getUserAuthData);
  const { theme } = useSelector(userSelectors.getJsonSettings);

  const onToggleButtonClick = () => {
    setCollapsed((prev) => !prev);
  };

  const onToggleTheme = () => {
    dispatch(userActions.toggleTheme());
    dispatch(updateJsonSettings());
  };

  return (
    <section
      className={getClassNames(
        style.sidebar,
        { [style.collapsed]: collapsed },
        [className]
      )}
      data-testid="sidebar"
    >
      <Button
        className={style.toggler}
        type="button"
        theme={ButtonTheme.OUTLINE_INVERTED}
        size="xl"
        square
        onClick={onToggleButtonClick}
        data-testid="sidebar-toggler"
      >
        {collapsed ? '>' : '<'}
      </Button>

      <nav className={style.linksList}>
        {getLinkItems(userData?.id).map((linkItem) => {
          if (!userData && linkItem.authOnly) {
            return null;
          }

          return (
            <LinkItem
              linkItem={linkItem}
              isCollapsed={collapsed}
              key={linkItem.route}
            />
          );
        })}
      </nav>

      <div className={style.switchers}>
        <ThemeSwitcher
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
        <LangSwitcher />
      </div>
    </section>
  );
});
