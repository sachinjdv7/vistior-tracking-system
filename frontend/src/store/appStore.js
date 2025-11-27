import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userListReducer from "./userListSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    userlist: userListReducer,
  },
});

export default appStore;
