import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore } from './config/store';
import type {
  StateSchema,
  StoreWithManager,
  ThunkAPI,
  ReducersList,
} from './config/StateSchema';

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  StoreWithManager,
  ReducersList,
  ThunkAPI,
};
