import { StateSchema } from 'app/providers/StoreProvider';

export const getPageScrollData = (path: string) => (state: StateSchema) => (
  state.ui.scrollData[path] ?? 0
);
