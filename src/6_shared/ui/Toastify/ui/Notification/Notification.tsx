import { PropsWithChildren, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { getClassNames } from '@/6_shared/utils/classNames';
import style from './Notification.module.scss';

type NotificationType = 'success' | 'error';

export type Toast = {
  text: string;
  type: NotificationType;
};

type NotificationProps = PropsWithChildren<{
  className?: string;
  duration: number;
  notification: Toast;
  onRemoveFirstNotification: () => void;
}>;

export const Notification = observer((props: NotificationProps) => {
  const { className, notification, onRemoveFirstNotification, duration } =
    props;

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
