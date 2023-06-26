import { Story } from '@storybook/react';
import { StateSchema, StoreProvider, ReducersList } from '1_app/providers/StoreProvider';
import { LOGIN_SLICE, loginReducer } from '4_features/AuthByUsername';
import { EDIT_PROFILE_SLICE, editProfileReducer } from '4_features/EditProfile';
import { ADD_COMMENT_SLICE, addCommentReducer } from '4_features/AddComment';
import { PROFILE_SLICE, profileReducer } from '5_entities/Profile';
import { ARTICLE_SLICE, articleReducer, ARTICLES_SLICE, articlesReducer } from '5_entities/Article';
import { ARTICLE_COMMENTS_SLICE, articleCommentsReducer } from '5_entities/ArticleComment';

const defaultAsyncReducers: ReducersList = {
  [LOGIN_SLICE]: loginReducer,
  [PROFILE_SLICE]: profileReducer,
  [EDIT_PROFILE_SLICE]: editProfileReducer,
  [ARTICLE_SLICE]: articleReducer,
  [ARTICLE_COMMENTS_SLICE]: articleCommentsReducer,
  [ADD_COMMENT_SLICE]: addCommentReducer,
  [ARTICLES_SLICE]: articlesReducer,
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
