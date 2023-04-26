import { useSelector } from 'react-redux';
import { memo, useState } from 'react';
import { userSelectors } from 'entities/User';
import { getClassNames } from 'shared/utils/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { getLinkItems } from '../../model/linkItems';
import { LinkItem } from '../LinkItem/LinkItem';
import style from './Sidebar.module.scss';

type SidebarProps = {
  className?: string;
};

export const Sidebar = memo((props: SidebarProps) => {
  const { className } = props;
  const [collapsed, setCollapsed] = useState(false);
  const userData = useSelector(userSelectors.getUserAuthData);

  const onToggleButtonClick = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={getClassNames(style.sidebar, { [style.collapsed]: collapsed }, [className])}
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

      <div className={style.linksList}>
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
      </div>

      <div className={style.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </div>
  );
});
