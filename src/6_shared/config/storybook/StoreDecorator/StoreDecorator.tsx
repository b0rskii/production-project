import { Story } from '@storybook/react';
import { StateSchema, StoreProvider, ReducersList } from '@/1_app/providers/StoreProvider';
import { LOGIN_SLICE, loginReducer } from '@/4_features/AuthByUsername';
import { EDIT_PROFILE_SLICE, editProfileReducer } from '@/4_features/EditProfile';
import { ADD_COMMENT_SLICE, addCommentReducer } from '@/4_features/AddComment';
import { PROFILE_SLICE, profileReducer } from '@/5_entities/Profile';
import {
  ARTICLE_SLICE,
  articleReducer,
  ARTICLES_SLICE,
  articlesReducer,
  RECOMMENDED_ARTICLES_SLICE,
  recommendedArticlesReducer,
} from '@/5_entities/Article';

import { ARTICLE_COMMENTS_SLICE, articleCommentsReducer } from '@/5_entities/ArticleComment';
import { SORT_ARTICLES_SLICE, sortArticlesReducer } from '@/4_features/SortArticles';
import { FILTER_ARTICLES_SLICE, filterArticlesReducer } from '@/4_features/FilterArticles';
import { EDIT_ARTICLE_SLICE, editArticleReducer } from '@/4_features/EditArticle';

const defaultAsyncReducers: ReducersList = {
  [LOGIN_SLICE]: loginReducer,
  [PROFILE_SLICE]: profileReducer,
  [EDIT_PROFILE_SLICE]: editProfileReducer,
  [ARTICLE_SLICE]: articleReducer,
  [ARTICLE_COMMENTS_SLICE]: articleCommentsReducer,
  [ADD_COMMENT_SLICE]: addCommentReducer,
  [ARTICLES_SLICE]: articlesReducer,
  [SORT_ARTICLES_SLICE]: sortArticlesReducer,
  [FILTER_ARTICLES_SLICE]: filterArticlesReducer,
  [RECOMMENDED_ARTICLES_SLICE]: recommendedArticlesReducer,
  [EDIT_ARTICLE_SLICE]: editArticleReducer,
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
