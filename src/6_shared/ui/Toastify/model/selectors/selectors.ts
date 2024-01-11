import { StateSchema } from '1_app/providers/StoreProvider';

export const getToastify = (state: StateSchema) => state.toastify.data;
