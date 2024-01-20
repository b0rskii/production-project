import { StateSchema } from '@/1_app/providers/StoreProvider';
import { initialState } from '../../slice/loginSlice';

export const getLoginState = (state: StateSchema) => state?.login || initialState;
