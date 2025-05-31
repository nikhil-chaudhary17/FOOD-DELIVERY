import cartSlice from './cartSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    cart: cartSlice
  },
});
