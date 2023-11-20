import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'adressList';

interface IS {
  test: boolean;
}

const initialState: IS = {
  test: true,
};

const slice = createSlice({ name: SLICE_NAME, initialState, reducers: {} });

export const addressListSlice = {
  reducer: slice.reducer,
  actions: slice.actions,
  thunks: {},
} as const;
