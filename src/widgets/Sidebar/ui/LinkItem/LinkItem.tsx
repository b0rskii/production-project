import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import { LinkItem as LinkItemType } from '../../model/linkItems';
import style from './LinkItem.module.scss';

type LinkItemProps = {
  className?: string;
  linkItem: LinkItemType;
  isCollapsed: boolean;
};

export const LinkItem: FC<LinkItemProps> = (props) => {
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
};
