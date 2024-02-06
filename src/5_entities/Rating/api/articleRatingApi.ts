import { ApiRoutes, rtkApi } from '@/6_shared/api';
import { Rating } from '../model/types/rating';

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating[], { userId: string, articleId: string }>({
      query: ({ userId, articleId }) => ({
        url: ApiRoutes.ARTICLE_RATINGS,
        params: {
          userId,
          articleId,
        },
      }),
    }),
  }),
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
