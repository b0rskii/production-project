import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import { Skeleton } from '6_shared/ui/Skeleton';
import { useGetNotifications } from '../../api/notificationsApi';
import { Notification } from '../Notification';
import style from './NotificationsList.module.scss';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const NotificationsList = memo((props: Props) => {
  const { className } = props;
  const { data, isLoading } = useGetNotifications(null);

  return (
    <ul className={getClassNames(style.notificationsList, {}, [className])}>
      {isLoading && (
        <>
          <Skeleton width={300} height={100} />
          <Skeleton width={300} height={100} />
          <Skeleton width={300} height={100} />
        </>
      )}

      {!isLoading && data?.map((notification) => (
        <li className={style.listItem} key={notification.id}>
          <Notification data={notification} />
        </li>
      ))}
    </ul>
  );
});
