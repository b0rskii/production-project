import { CounterSchema, COUNTER_NAME } from 'entities/Counter';

export type StateSchema = {
  [COUNTER_NAME]: CounterSchema;
};
