import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  products: [],
  cartItems: [],
  status: "idle",
  error: null
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts(state) {
      state.products = [...state.products];
    },
    addProducts(state, { payload }) {
      state.products = [...payload];
    },
    addCartItems(state, { payload }) {
      const check = state.cartItems.some(item => item.id === payload.id);

      if (check) {
        toast.error("Item already exists in cart");
      } else {
        state.cartItems = [
          ...state.cartItems,
          { ...payload, quantity: 1, total: payload.price }
        ];
        toast.success("Item added to cart");
      }
    },
    deleteCartItem(state, { payload }) {
      const index = state.cartItems.findIndex(item => item.id === payload);
      state.cartItems.splice(index, 1);
      toast.success("Item removed from cart");
    },
    incrementQuantity(state, { payload }) {
      const index = state.cartItems.findIndex(item => item.id === payload);
      state.cartItems[index].quantity += 1;
      state.cartItems[index].total =
        state.cartItems[index].quantity * state.cartItems[index].price;
    },
    decrementQuantity(state, { payload }) {
      const index = state.cartItems.findIndex(item => item.id === payload);
      if (state.cartItems[index].quantity > 1) {
        state.cartItems[index].quantity -= 1;
        state.cartItems[index].total =
          state.cartItems[index].quantity * state.cartItems[index].price;
      }
    },
    getCartItems(state) {
      state.cartItems = [...state.cartItems];
    }
  }
});

export const {
  getProducts,
  addProducts,
  addCartItems,
  deleteCartItem,
  incrementQuantity,
  decrementQuantity,
  getCartItems
} = productsSlice.actions;

export default productsSlice.reducer;
