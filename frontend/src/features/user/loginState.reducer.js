import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userStatus: false,
};

const loginState = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    updateLoginState: (state, action) => {
      state.userStatus = action.payload;
    },
  },
});

export const { updateLoginState } = loginState.actions;

export default loginState.reducer;
