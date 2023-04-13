import { StateSchema } from 'app/providers/StoreProvider';

export const getIsInited = (state: StateSchema) => state.user.isInited;
