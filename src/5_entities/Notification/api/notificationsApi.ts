import { ApiRoutes, rtkApi } from '@/6_shared/api';
import { Notification } from '../model/types/notification';

const notificationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Notification[], null>({
      query: () => ({
        url: ApiRoutes.NOTIFICATIONS,
      }),
    }),
  }),
});

export const useGetNotifications = notificationsApi.useGetNotificationsQuery;
