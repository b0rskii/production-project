import { PropsWithChildren, memo, useEffect } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import style from './Notification.module.scss';

type NotificationType = 'success' | 'error';

export type ToastifyItem = {
  text: string;
  type: NotificationType;
};

type NotificationProps = PropsWithChildren<{
  className?: string;
  duration: number;
  notification: ToastifyItem;
  onRemoveFirstNotification: () => void;
}>;

export const Notification = memo((props: NotificationProps) => {
  const { className, notification, onRemoveFirstNotification, duration } = props;

  useEffect(() => {
    setTimeout(() => {
      onRemoveFirstNotification();
    }, duration);
  }, [onRemoveFirstNotification, duration]);

  const modes = {
    [style.error]: notification.type === 'error',
  };

  return (
    <li className={getClassNames(style.notification, modes, [className])}>
      {notification.text}
    </li>
  );
});
