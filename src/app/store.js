import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice.js";
import productsReducer from "../features/products/productsSlice.js";
export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer
  }
});
