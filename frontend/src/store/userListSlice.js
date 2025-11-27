import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
  name: "userlist",
  initialState: null,
  reducers: {
    addUserList: (state, action) => {
      return action.payload;
    },
  },
});

export const { addUserList } = userListSlice.actions;

export default userListSlice.reducer;
