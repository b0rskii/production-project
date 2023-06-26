import { StateSchema } from '1_app/providers/StoreProvider';

export const getIsInited = (state: StateSchema) => state.user.isInited;
