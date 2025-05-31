import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    AddItem: (state, action) => {
      state.push(action.payload)
    },
    RemoveItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload)
    },
    IncreaseQty: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) item.qty += 1;
    },
    DecreaseQty: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
    },
      ClearCart: () => {
      return [];
    }
  },
})

export const { AddItem, RemoveItem, IncreaseQty, DecreaseQty ,ClearCart } = cartSlice.actions;


export default cartSlice.reducer