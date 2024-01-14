import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import { Popover } from '6_shared/ui/Popups';
import { Button, ButtonTheme } from '6_shared/ui/Button';
import { Icon } from '6_shared/ui/Icon';
import BellIcon from '6_shared/assets/icons/bell.svg';
import { useGetNotifications } from '../../api/notificationsApi';
import { NotificationsList } from '../NotificationsList';
import style from './NotificationsButton.module.scss';

const POLLING_INTERVAL_MS = 5000;

type Props = PropsWithChildren<{
  className?: string;
}>;

export const NotificationsButton = memo((props: Props) => {
  const { className } = props;

  const { data, isLoading } = useGetNotifications(null, {
    pollingInterval: POLLING_INTERVAL_MS,
  });

  return (
    <Popover
      className={getClassNames(style.notificationsButton, {}, [className])}
      trigger={(
        <Button theme={ButtonTheme.CLEAR}>
          <Icon Svg={BellIcon} inverted />
        </Button>
      )}
      direction="bottom-left"
    >
      <NotificationsList
        className={style.notificationsList}
        data={data}
        isLoading={isLoading}
      />
    </Popover>
  );
});
