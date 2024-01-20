import { createSelector } from '@reduxjs/toolkit';
import { articleSelectors } from '@/5_entities/Article';
import { userSelectors } from '@/5_entities/User';

export const getCanEdit = createSelector(
  articleSelectors.getArticle,
  userSelectors.getUserId,
  (article, userId) => Boolean(article && userId && article.userId === userId),
);
