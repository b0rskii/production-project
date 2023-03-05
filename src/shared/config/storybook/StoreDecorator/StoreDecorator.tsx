import { Story } from '@storybook/react';
import { StateSchema, StoreProvider, ReducersList } from 'app/providers/StoreProvider';
import { LOGIN_SLICE, loginReducer } from 'features/AuthByUsername';
import { PROFILE_SLICE, profileReducer } from 'entities/Profile';

const defaultAsyncReducers: ReducersList = {
  [LOGIN_SLICE]: loginReducer,
  [PROFILE_SLICE]: profileReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
  <StoreProvider
    initialState={state}
    asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
  >
    <StoryComponent />
  </StoreProvider>
);
