import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import { Popover } from '6_shared/ui/Popups';
import { Button, ButtonTheme } from '6_shared/ui/Button';
import { Icon } from '6_shared/ui/Icon';
import BellIcon from '6_shared/assets/icons/bell.svg';
import { NotificationsList } from '../NotificationsList';
import style from './NotificationsPopover.module.scss';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const NotificationsPopover = memo((props: Props) => {
  const { className } = props;

  return (
    <Popover
      className={getClassNames(style.notificationsPopover, {}, [className])}
      trigger={(
        <Button theme={ButtonTheme.CLEAR}>
          <Icon Svg={BellIcon} inverted />
        </Button>
      )}
      direction="bottom-left"
    >
      <NotificationsList className={style.notificationsList} />
    </Popover>
  );
});
