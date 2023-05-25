import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/utils/redux';
import { Timer } from 'shared/const/timers';
import { notificationsSelectors } from '../model/selectors';
import { NotificationsList } from '../NotificationsList';
import { notificationsActions } from '../model/slice/notificationsSlice';

export const NotificationsContainer = () => {
  const dispatch = useAppDispatch();
  const notifications = useSelector(notificationsSelectors.getNotifications);

  const onRemoveFirstNotification = useCallback(() => {
    dispatch(notificationsActions.removeFirstNotification());
  }, [dispatch]);

  return (
    <NotificationsList
      duration={Timer.NOTIFICATION}
      notifications={notifications}
      onRemoveFirstNotification={onRemoveFirstNotification}
    />
  );
};
