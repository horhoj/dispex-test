import { configureStore } from '@reduxjs/toolkit';
import { addressListSlice } from '~/features/addressList/store/slice';

export const store = configureStore({
  devTools: true,
  reducer: {
    addressList: addressListSlice.reducer,
  },
});
