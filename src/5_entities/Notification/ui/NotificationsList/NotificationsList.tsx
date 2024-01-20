import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Skeleton } from '@/6_shared/ui/Skeleton';
import { Notification as NotificationItem } from '../Notification';
import { Notification } from '../../model/types/notification';
import style from './NotificationsList.module.scss';

type Props = PropsWithChildren<{
  className?: string;
  data?: Notification[];
  isLoading: boolean;
}>;

export const NotificationsList = memo((props: Props) => {
  const { className, data, isLoading } = props;

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
          <NotificationItem data={notification} />
        </li>
      ))}
    </ul>
  );
});
