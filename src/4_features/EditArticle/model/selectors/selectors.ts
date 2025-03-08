import { createSelector } from '@reduxjs/toolkit';
import { articleSelectors } from '@/5_entities/Article';
import { userStore } from '@/5_entities/User';

export const getCanEdit = createSelector(
  articleSelectors.getArticle,
  () => userStore.userId,
  (article, userId) => Boolean(article && userId && article.userId === userId),
);
