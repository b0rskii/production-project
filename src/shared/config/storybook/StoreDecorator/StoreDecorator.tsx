import { Story } from '@storybook/react';
import { StateSchema, StoreProvider, ReducersList } from 'app/providers/StoreProvider';
import { LOGIN_SLICE, loginReducer } from 'features/AuthByUsername';
import { EDIT_PROFILE_SLICE, editProfileReducer } from 'features/EditProfile';
import { ADD_COMMENT_SLICE, addCommentReducer } from 'features/AddComment';
import { PROFILE_SLICE, profileReducer } from 'entities/Profile';
import { ARTICLE_SLICE, articleReducer } from 'entities/Article';
import { ARTICLE_COMMENTS_SLICE, articleCommentsReducer } from 'entities/ArticleComment';

const defaultAsyncReducers: ReducersList = {
  [LOGIN_SLICE]: loginReducer,
  [PROFILE_SLICE]: profileReducer,
  [EDIT_PROFILE_SLICE]: editProfileReducer,
  [ARTICLE_SLICE]: articleReducer,
  [ARTICLE_COMMENTS_SLICE]: articleCommentsReducer,
  [ADD_COMMENT_SLICE]: addCommentReducer,
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
