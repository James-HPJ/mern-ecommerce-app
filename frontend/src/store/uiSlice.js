import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showCart: false,
    cartErrors: null,
  },
  reducers: {
    openCartModal(state) {
      state.showCart = true;
    },
    closeCartModal(state) {
      state.showCart = false;
    },
    errorNotification(state, action) {
      state.cartErrors = {
        title: "Error",
        message: action.payload || "Could not get details or modify cart",
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
