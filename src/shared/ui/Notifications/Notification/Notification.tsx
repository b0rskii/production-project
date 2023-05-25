import { PropsWithChildren, memo, useEffect } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import style from './Notification.module.scss';

export type NotificationItem = {
  text: string;
};

type NotificationProps = PropsWithChildren<{
  className?: string;
  duration: number;
  notification: NotificationItem;
  onRemoveFirstNotification: () => void;
}>;

export const Notification = memo((props: NotificationProps) => {
  const { className, notification, onRemoveFirstNotification, duration } = props;

  useEffect(() => {
    setTimeout(() => {
      onRemoveFirstNotification();
    }, duration);
  }, [onRemoveFirstNotification, duration]);

  return (
    <li className={getClassNames(style.notification, {}, [className])}>
      {notification.text}
    </li>
  );
});
