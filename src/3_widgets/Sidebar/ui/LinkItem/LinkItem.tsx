import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from '@/6_shared/ui/AppLink';
import { getClassNames } from '@/6_shared/utils/classNames/getClassNames';
import { LinkItem as LinkItemType } from '../../model/linkItems';
import style from './LinkItem.module.scss';

type LinkItemProps = {
  className?: string;
  linkItem: LinkItemType;
  isCollapsed: boolean;
};

export const LinkItem = memo((props: LinkItemProps) => {
  const { className, linkItem, isCollapsed } = props;
  const { Icon, route, translationKey } = linkItem;
  const { t } = useTranslation();

  return (
    <AppLink
      className={getClassNames(style.linkItem, {}, [className])}
      to={route}
      theme={AppLinkTheme.PRIMARY_INVERTED}
    >
      <Icon />
      {isCollapsed ? null : t(translationKey)}
    </AppLink>
  );
});
