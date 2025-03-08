import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from '@/5_entities/User';
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

export const Sidebar = observer((props: SidebarProps) => {
  const { className } = props;
  const [collapsed, setCollapsed] = useState(false);

  const { authData, userId, theme } = userStore;

  const onToggleButtonClick = () => {
    setCollapsed((prev) => !prev);
  };

  const onToggleTheme = () => {
    userStore.toggleTheme();
    userStore.updateJsonSettings();
  };

  return (
    <section
      className={getClassNames(
        style.sidebar,
        { [style.collapsed]: collapsed },
        [className],
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
        {getLinkItems(userId).map((linkItem) => {
          if (!authData && linkItem.authOnly) {
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
        <ThemeSwitcher theme={theme} onToggleTheme={onToggleTheme} />
        <LangSwitcher />
      </div>
    </section>
  );
});
