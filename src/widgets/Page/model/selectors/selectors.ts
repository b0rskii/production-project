import { StateSchema } from 'app/providers/StoreProvider';

export const getPageScrollData = (state: StateSchema, path: string) => (
  state.ui.scrollData[path] ?? 0
);
