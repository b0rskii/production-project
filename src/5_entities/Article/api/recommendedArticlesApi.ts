import { ApiRoutes, rtkApi } from '@/6_shared/api';
import { Article } from '../model/types/articleSchema';

const recommendedArticlesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getRecommendedArticles: build.query<Article[], number>({
      query: (limit) => ({
        url: ApiRoutes.ARTICLES,
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

export const useGetRecommendedArticles = recommendedArticlesApi.useGetRecommendedArticlesQuery;
