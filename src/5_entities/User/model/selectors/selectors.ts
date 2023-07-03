import { StateSchema } from '1_app/providers/StoreProvider';

export const getIsInited = (state: StateSchema) => state.user.isInited;
export const getUserAuthData = (state: StateSchema) => state.user.authData;
export const getUserId = (state: StateSchema) => state.user.authData?.id;
