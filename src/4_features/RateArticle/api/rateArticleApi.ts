import { ApiRoutes, rtkApi } from '@/6_shared/api';

type RateArticlePayload = {
  userId: string;
  articleId: string;
  rate: number;
  feedback?: string;
};

const rateArticleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    rateArticle: build.mutation<void, RateArticlePayload>({
      query: (args) => ({
        url: ApiRoutes.ARTICLE_RATINGS,
        method: 'POST',
        body: args,
      }),
    }),
  }),
});

export const useRateArticle = rateArticleApi.useRateArticleMutation;
