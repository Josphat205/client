import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  status: "idle",
  error: null
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    updateUser: (state, action) => {
      state.users = state.users.map(
        user => (user.id === action.payload.id ? action.payload : user)
      );
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    }
  }
});

export const { getUsers, addUser, updateUser, deleteUser } = usersSlice.actions;

export const selectUsers = state => state.users.users;

export default usersSlice.reducer;