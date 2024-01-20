import { StateSchema } from '@/1_app/providers/StoreProvider';

export const getPageScrollData = (path: string) => (state: StateSchema) => (
  state.ui.scrollData[path] ?? 0
);
