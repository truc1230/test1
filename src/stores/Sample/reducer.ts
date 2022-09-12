import { createSlice } from '@reduxjs/toolkit';

import { Sample } from 'services/Sample/types';

import { getUsersAction } from './thunks';

interface SampleState {
  loaded: boolean;
  users: Array<Sample>;
}

const initialState: SampleState = {
  loaded: false,
  users: [],
};

export const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsersAction.pending, state => {
      state.loaded = true;
    });
    builder.addCase(getUsersAction.fulfilled, (state, action) => {
      state.loaded = true;
      state.users = action.payload;
    });
    builder.addCase(getUsersAction.rejected, state => {
      state.loaded = true;
      state.users = [];
    });
  },
});
