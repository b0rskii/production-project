import { CounterSchema, COUNTER_SLICE } from 'entities/Counter';
import { UserSchema, USER_SLICE } from 'entities/User';
import { LoginSchema, LOGIN_SLICE } from 'features/AuthByUsername';

export type StateSchema = {
  [COUNTER_SLICE]: CounterSchema;
  [USER_SLICE]: UserSchema;
  [LOGIN_SLICE]: LoginSchema;
};
