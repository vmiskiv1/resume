/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { getUserData, getUserLanguagePercentage } from '../thunks/user';

interface InitialState {
  user: any;
  repos: any;
  reposByPercentage: any;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  user: null,
  repos: null,
  reposByPercentage: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        const { user, repos } = action.payload;

        state.loading = false;
        state.user = user;
        state.repos = repos;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(getUserLanguagePercentage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserLanguagePercentage.fulfilled, (state, action) => {
        state.loading = false;
        state.reposByPercentage = action.payload;
      })
      .addCase(getUserLanguagePercentage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.reposByPercentage = null;
      });
  },
});

export const userDataSelector = (state: { user: InitialState }) => state.user;

export default userSlice.reducer;