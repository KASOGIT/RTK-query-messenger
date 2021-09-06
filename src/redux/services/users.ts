import { api } from './api';

import { User } from 'types/user';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, number>({
      query: (id) => ({
        url: `user/${id}`,
      }),
      transformResponse: (response: User[]) => {
        return response?.[0];
      },
    }),
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: `users`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery, useGetUsersQuery } = userApi;
