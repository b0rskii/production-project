import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalStorageKey } from '6_shared/const/localStorage';

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LocalStorageKey.USER) || '';

      if (token) {
        headers.set('authorization', token);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
