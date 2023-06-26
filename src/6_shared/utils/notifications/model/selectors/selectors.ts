import { StateSchema } from '1_app/providers/StoreProvider';

export const getNotifications = (state: StateSchema) => state.notifications.data;
