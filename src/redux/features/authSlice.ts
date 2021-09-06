import { createSlice } from '@reduxjs/toolkit';

import { User } from 'types/user';
import type { RootState } from 'redux/store';

import { authApi } from 'redux/services/auth';

type AuthState = {
  user: User | null;
  accessToken: string | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: null } as AuthState,
  reducers: {
    logout: (state: AuthState) => {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    });
  },
});

export default slice.reducer;

export const selectCurrentUser = (state: RootState): User | null => state.auth.user;
export const isUserLoggedIn = (state: RootState) => !!state.auth.user;

export const logout = slice.actions.logout;
