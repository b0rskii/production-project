import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Timer } from '@/6_shared/const/timers';
import { NotificationsList } from '../NotificationsList';
import { toastifyStore } from '../../model/store/tostifyStore';

export const ToastifyContainer = observer(() => {
  const onRemoveFirstNotification = useCallback(() => {
    toastifyStore.removeFirstNotification();
  }, []);

  return (
    <NotificationsList
      duration={Timer.NOTIFICATION}
      notifications={toastifyStore.toasts}
      onRemoveFirstNotification={onRemoveFirstNotification}
    />
  );
});
