import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const selectedItem = action.payload;
      const inCart = state.find((item) =>
        item.id === selectedItem.id ? true : false
      );

      return inCart
        ? state.map((item) =>
            item.id === selectedItem.id
              ? { ...item, qty: item.qty + selectedItem.qty }
              : item
          )
        : [...state, selectedItem];
    },
    removeFromCart: (state, action) => {
      const selectedItem = action.payload;
      return state.filter((item) => item.id !== selectedItem);
    },
    adjustItemInCart: (state, action) => {
      const { id, qty } = action.payload;
      const inCart = state.find((item) => (item.id === id ? true : false));
      if (inCart && qty < 1) return state.filter((item) => item.id !== id);

      return state.map((item) => (item.id === id ? { ...item, qty } : item));
    },
  },
});

export const { actions, reducer } = cartSlice;

export default reducer;
