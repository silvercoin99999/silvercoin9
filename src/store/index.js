import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import quickMenuReducer from "./quickMenuSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    quickMenu: quickMenuReducer,
  },
});
