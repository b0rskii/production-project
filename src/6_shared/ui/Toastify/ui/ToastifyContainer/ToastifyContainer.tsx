import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '6_shared/utils/redux';
import { Timer } from '6_shared/const/timers';
import { toastifySelectors } from '../../model/selectors';
import { NotificationsList } from '../NotificationsList';
import { toastifyActions } from '../../model/slice/toastifySlice';

export const ToastifyContainer = () => {
  const dispatch = useAppDispatch();
  const notifications = useSelector(toastifySelectors.getToastify);

  const onRemoveFirstNotification = useCallback(() => {
    dispatch(toastifyActions.removeFirstNotification());
  }, [dispatch]);

  return (
    <NotificationsList
      duration={Timer.NOTIFICATION}
      notifications={notifications}
      onRemoveFirstNotification={onRemoveFirstNotification}
    />
  );
};
