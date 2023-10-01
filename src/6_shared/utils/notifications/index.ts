export { NotificationsContainer } from './ui/NotificationsContainer/NotificationsContainer';
export type { NotificationsSchema } from './model/types/notificationsSchema';
export {
  SLICE_NAME as NOTIFICATION_SLICE,
  notificationsReducer,
  notificationsActions,
} from './model/slice/notificationsSlice';
