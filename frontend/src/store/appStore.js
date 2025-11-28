import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userListReducer from "./userListSlice";
import visitorReducer from "./visitorSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    userlist: userListReducer,
    visitor: visitorReducer,
  },
});

export default appStore;
