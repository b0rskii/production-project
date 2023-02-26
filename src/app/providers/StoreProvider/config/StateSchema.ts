import { CounterSchema, COUNTER_SLICE } from 'entities/Counter';
import { UserSchema, USER_SLICE } from 'entities/User';

export type StateSchema = {
  [COUNTER_SLICE]: CounterSchema;
  [USER_SLICE]: UserSchema;
};
