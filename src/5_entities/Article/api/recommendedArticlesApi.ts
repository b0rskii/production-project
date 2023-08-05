import { ApiRoutes, rtkApi } from '6_shared/api';

const recommendedArticlesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getRecommendedArticles: build.query({
      query: (limit: number) => ({
        url: ApiRoutes.ARTICLES,
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

export const useGetRecommendedArticles = recommendedArticlesApi.useGetRecommendedArticlesQuery;
