import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';

import { apiEndpoint } from 'config';

// base api
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiEndpoint,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Message', 'Conversation'],
  endpoints: () => ({}),
});
