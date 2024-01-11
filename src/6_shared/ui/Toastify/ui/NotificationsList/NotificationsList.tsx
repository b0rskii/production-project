import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import { Notification, ToastifyItem } from '../Notification';
import style from './NotificationsList.module.scss';

const DEFAULT_DURATION = 3000;

type NotificationsListProps = PropsWithChildren<{
  className?: string;
  duration?: number;
  notifications: ToastifyItem[];
  onRemoveFirstNotification: () => void;
}>;

export const NotificationsList = memo((props: NotificationsListProps) => {
  const {
    className,
    notifications,
    onRemoveFirstNotification,
    duration = DEFAULT_DURATION,
  } = props;

  if (!notifications.length) {
    return null;
  }

  return (
    <ul className={getClassNames(style.notificationsList, {}, [className])}>
      {notifications.map((notification, i) => (
        <Notification
          duration={duration}
          notification={notification}
          onRemoveFirstNotification={onRemoveFirstNotification}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
        />
      ))}
    </ul>
  );
});
