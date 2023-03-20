import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user.reducer";
import shiftReducer from "./features/shift/shift.reducer";
import loginStateReducer from "./features/user/loginState.reducer";
import logger from "redux-logger";
const store = configureStore({
  reducer: {
    shift: shiftReducer,
    user: userReducer,
    loginState: loginStateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
