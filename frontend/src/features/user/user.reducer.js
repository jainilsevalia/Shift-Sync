import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  userDetail: {},
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      state.user.push(action.payload);
    },
    addUserDetails(state, action) {
      state.userDetail = action.payload;
    },
    deleteUser(state, action) {
      state.user = [];
    },
  },
});

export const { addUser } = user.actions;
export const { addUserDetails } = user.actions;
export const { deleteUser } = user.actions;

export default user.reducer;
